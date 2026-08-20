import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { SEED_LEARNING_PATHS, SEED_CONCEPTS, SEED_NOTIFICATIONS } from "./src/data/seedData";
import { askAtlasTutor } from "./src/server/geminiService";
import { LearningPath, Lesson, UserProfile, RecommendationItem } from "./src/types";

// In-memory curriculum state (initialized with seed data, supports Admin CRUD updates)
let learningPaths: LearningPath[] = JSON.parse(JSON.stringify(SEED_LEARNING_PATHS));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Get all learning paths
  app.get("/api/paths", (req, res) => {
    const { category, difficulty, search } = req.query;
    let paths = [...learningPaths];

    if (category && category !== "All") {
      paths = paths.filter((p) => p.category === category);
    }
    if (difficulty && difficulty !== "All") {
      paths = paths.filter((p) => p.difficulty === difficulty);
    }
    if (search && typeof search === "string") {
      const q = search.toLowerCase();
      paths = paths.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    res.json(paths);
  });

  // Get single path
  app.get("/api/paths/:id", (req, res) => {
    const pathItem = learningPaths.find((p) => p.id === req.params.id || p.slug === req.params.id);
    if (!pathItem) {
      return res.status(404).json({ error: "Learning path not found" });
    }
    res.json(pathItem);
  });

  // Get single lesson
  app.get("/api/lessons/:id", (req, res) => {
    for (const pathItem of learningPaths) {
      for (const mod of pathItem.modules) {
        const lesson = mod.lessons.find((l) => l.id === req.params.id || l.slug === req.params.id);
        if (lesson) {
          return res.json({
            lesson,
            pathId: pathItem.id,
            pathTitle: pathItem.title,
            moduleTitle: mod.title,
          });
        }
      }
    }
    res.status(404).json({ error: "Lesson not found" });
  });

  // Get concepts knowledge graph
  app.get("/api/concepts", (_req, res) => {
    res.json(SEED_CONCEPTS);
  });

  // Get initial notifications
  app.get("/api/notifications", (_req, res) => {
    res.json(SEED_NOTIFICATIONS);
  });

  // Personalized recommendations engine
  app.post("/api/recommendations", (req, res) => {
    const userProfile: Partial<UserProfile> = req.body.userProfile || {};
    const completedLessonIds: string[] = req.body.completedLessonIds || [];

    const recommendations: RecommendationItem[] = [];

    // Collect all published lessons
    const allLessons: Array<{ lesson: Lesson; pathTitle: string }> = [];
    for (const p of learningPaths) {
      for (const m of p.modules) {
        for (const l of m.lessons) {
          if (l.status === "published") {
            allLessons.push({ lesson: l, pathTitle: p.title });
          }
        }
      }
    }

    // Filter out completed lessons
    const candidateLessons = allLessons.filter(
      (item) => !completedLessonIds.includes(item.lesson.id)
    );

    // Rule 1: Next uncompleted in starting path
    if (userProfile.startingPathId) {
      const startingPath = learningPaths.find((p) => p.id === userProfile.startingPathId);
      if (startingPath) {
        for (const m of startingPath.modules) {
          for (const l of m.lessons) {
            if (!completedLessonIds.includes(l.id)) {
              recommendations.push({
                lesson: l,
                pathTitle: startingPath.title,
                reason: `Up next on your core path: ${startingPath.title}`,
                matchScore: 98,
              });
              break;
            }
          }
          if (recommendations.length > 0) break;
        }
      }
    }

    // Rule 2: Goal alignment
    const goals = userProfile.learningGoals || [];
    for (const item of candidateLessons) {
      if (recommendations.some((r) => r.lesson.id === item.lesson.id)) continue;

      let matchScore = 70;
      let reason = "Recommended for your curriculum";

      if (goals.includes("build_products") && item.lesson.category === "Building AI Applications") {
        matchScore = 95;
        reason = "Aligned with your goal to build AI products";
      } else if (goals.includes("better_at_job") && (item.lesson.category === "AI at Work" || item.lesson.category === "Prompt Engineering")) {
        matchScore = 92;
        reason = "High-impact practical skill for your daily workflow";
      } else if (goals.includes("become_engineer") && item.lesson.category === "AI Engineering") {
        matchScore = 94;
        reason = "Core technical foundation for AI engineering";
      } else if (goals.includes("understand_revolution") && item.lesson.category === "ChatGPT & LLMs") {
        matchScore = 90;
        reason = "Essential modern AI literacy";
      }

      recommendations.push({
        lesson: item.lesson,
        pathTitle: item.pathTitle,
        reason,
        matchScore,
      });

      if (recommendations.length >= 4) break;
    }

    // Fallback if needed
    if (recommendations.length === 0 && candidateLessons.length > 0) {
      recommendations.push({
        lesson: candidateLessons[0].lesson,
        pathTitle: candidateLessons[0].pathTitle,
        reason: "Popular starter lesson for AI mastery",
        matchScore: 85,
      });
    }

    res.json(recommendations.slice(0, 4));
  });

  // AI Tutor "Ask Atlas" endpoint
  app.post("/api/tutor/chat", async (req, res) => {
    try {
      const { message, lesson, userProfile, chatHistory, actionType } = req.body;
      if (!message && !actionType) {
        return res.status(400).json({ error: "Message or actionType is required" });
      }

      const result = await askAtlasTutor({
        message: message || "Tell me more about this concept.",
        lesson,
        userProfile,
        chatHistory,
        actionType,
      });

      res.json(result);
    } catch (error) {
      console.error("AI Tutor endpoint error:", error);
      res.status(500).json({ error: "Failed to generate tutor response", details: String(error) });
    }
  });

  // Admin content management APIs
  app.post("/api/admin/lessons", (req, res) => {
    const { pathId, moduleId, newLesson } = req.body;
    const pathItem = learningPaths.find((p) => p.id === pathId);
    if (!pathItem) {
      return res.status(404).json({ error: "Path not found" });
    }
    const moduleItem = pathItem.modules.find((m) => m.id === moduleId);
    if (!moduleItem) {
      return res.status(404).json({ error: "Module not found" });
    }

    const createdLesson: Lesson = {
      ...newLesson,
      id: newLesson.id || `lesson-custom-${Date.now()}`,
      slug: newLesson.slug || `custom-lesson-${Date.now()}`,
      moduleId,
      pathId,
      orderIndex: moduleItem.lessons.length + 1,
      status: newLesson.status || "published",
    };

    moduleItem.lessons.push(createdLesson);
    pathItem.totalLessons = pathItem.modules.reduce((sum, m) => sum + m.lessons.length, 0);

    res.status(201).json({ message: "Lesson created successfully", lesson: createdLesson });
  });

  app.put("/api/admin/lessons/:id", (req, res) => {
    const lessonId = req.params.id;
    const updatedFields = req.body;

    let found = false;
    for (const pathItem of learningPaths) {
      for (const mod of pathItem.modules) {
        const index = mod.lessons.findIndex((l) => l.id === lessonId);
        if (index !== -1) {
          mod.lessons[index] = { ...mod.lessons[index], ...updatedFields };
          found = true;
          return res.json({ message: "Lesson updated", lesson: mod.lessons[index] });
        }
      }
    }

    if (!found) {
      res.status(404).json({ error: "Lesson not found to update" });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Atlas server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
