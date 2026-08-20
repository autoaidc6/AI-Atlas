import { GoogleGenAI } from "@google/genai";
import { Lesson, UserProfile } from "../types";

let geminiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      geminiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return geminiClient;
}

export interface TutorChatPayload {
  message: string;
  lesson?: Lesson;
  userProfile?: Partial<UserProfile>;
  chatHistory?: Array<{ role: "user" | "model"; content: string }>;
  actionType?: "explain_simply" | "real_world_example" | "role_pm" | "role_dev" | "quiz_me" | "deep_dive" | "general";
}

export async function askAtlasTutor(payload: TutorChatPayload): Promise<{ text: string; suggestedActions?: string[] }> {
  const { message, lesson, userProfile, chatHistory = [], actionType = "general" } = payload;
  const ai = getGeminiClient();

  // Prepare rich context
  const lessonContext = lesson
    ? `
Current Lesson: "${lesson.title}" (${lesson.difficulty} level, Category: ${lesson.category})
The Big Idea: ${lesson.bigIdea}
Why It Matters: ${lesson.whyItMatters}
Simple Explanation: ${lesson.simpleExplanation}
Key Ideas: ${lesson.keyIdeas.map((k) => `- ${k.title}: ${k.summary}`).join("\n")}
Technical Go Deeper: ${lesson.goDeeper}
Key Takeaways: ${lesson.keyTakeaways.join("; ")}
`
    : "No specific lesson currently open (General AI Atlas inquiry).";

  const userContext = userProfile
    ? `
User Experience Level: ${userProfile.experienceLevel || "know_basics"}
User Goals: ${(userProfile.learningGoals || []).join(", ") || "better_at_job"}
`
    : "";

  let promptDirective = "";
  if (actionType === "explain_simply") {
    promptDirective = "Explain this concept using a vivid, everyday analogy suitable for a total beginner without sacrificing technical correctness.";
  } else if (actionType === "real_world_example") {
    promptDirective = "Provide 2 concrete, modern real-world enterprise or consumer applications of this exact concept.";
  } else if (actionType === "role_pm") {
    promptDirective = "Explain this from the perspective of an AI Product Manager: focus on user value, UX tradeoffs, latency, cost per token, and business risk.";
  } else if (actionType === "role_dev") {
    promptDirective = "Explain the technical architecture, data structures, algorithms, and implementation considerations for a software engineer.";
  } else if (actionType === "quiz_me") {
    promptDirective = "Generate a quick 1-question scenario-based check to test my understanding of this concept. Provide multiple choices and ask me to choose.";
  } else if (actionType === "deep_dive") {
    promptDirective = "Provide a rigorous technical deep dive into the underlying mechanics, mathematical intuition, and research foundations.";
  }

  const systemInstruction = `You are "Atlas", the premier AI learning companion and personal tutor on the AI Atlas platform.
Your guiding philosophy is: Learn -> Understand -> Practice -> Apply -> Remember.
You are calm, intellectually rigorous, encouraging, precise, and editorial in your tone. Never give long, rambling walls of text. Format with clear Markdown, bold key terms, and bullet points where helpful.

When answering, prioritize the verified lesson context provided below. Do not fabricate citations or claim facts not supported by science.

Context:
${lessonContext}
${userContext}
${promptDirective ? `Special Focus: ${promptDirective}` : ""}
`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: [
          ...chatHistory.map((h) => ({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.content }],
          })),
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const responseText = response.text || "I processed your question. How else can I help deepen your understanding?";
      return {
        text: responseText,
        suggestedActions: [
          "Explain this simply",
          "Give me an example",
          "Explain like a PM",
          "Quiz me on this",
        ],
      };
    } catch (error) {
      console.warn("Gemini API call failed, falling back to heuristic tutor logic:", error);
    }
  }

  // Graceful heuristic fallback if API key is not yet set or in offline mode
  let fallbackResponse = "";
  if (lesson) {
    if (actionType === "explain_simply" || message.toLowerCase().includes("simply") || message.toLowerCase().includes("simple")) {
      fallbackResponse = `**Simple Breakdown of ${lesson.title}:**\n\n${lesson.simpleExplanation}\n\n*Key Analogy:* Think of it like this — **${lesson.bigIdea}**`;
    } else if (actionType === "real_world_example" || message.toLowerCase().includes("example")) {
      fallbackResponse = `**Real-World Scenario for ${lesson.title}:**\n\n📍 **Scenario:** ${lesson.realWorldExample.scenario}\n\n🚀 **Impact:** ${lesson.realWorldExample.impact}\n\n*Why it matters:* ${lesson.whyItMatters}`;
    } else if (actionType === "role_pm" || message.toLowerCase().includes("product") || message.toLowerCase().includes("pm")) {
      fallbackResponse = `**Product Manager Perspective on ${lesson.title}:**\n\n1. **User Value:** Solves user pain through probabilistic assistance.\n2. **Unit Economics:** Requires managing token budgets and latency.\n3. **Failure UX:** Always design graceful fallback mechanisms for when the model confidence is low.\n\n*Core takeaway:* ${lesson.keyTakeaways[0] || lesson.bigIdea}`;
    } else if (actionType === "role_dev" || message.toLowerCase().includes("technical") || message.toLowerCase().includes("code")) {
      fallbackResponse = `**Technical Deep Dive for ${lesson.title}:**\n\n${lesson.goDeeper}\n\n**Architectural Notes:**\n${lesson.keyIdeas.map((k) => `• **${k.title}**: ${k.summary}`).join("\n")}`;
    } else {
      fallbackResponse = `**Atlas Tutor Insights on ${lesson.title}:**\n\n${lesson.bigIdea}\n\n**Key Concept Focus:**\n${lesson.keyIdeas.map((k) => `• **${k.title}**: ${k.summary}`).join("\n")}\n\n*Feel free to ask me to explain this simply, provide a real-world scenario, or quiz you!*`;
    }
  } else {
    fallbackResponse = `Welcome to **AI Atlas**! I am Atlas, your AI learning companion. Ask me anything about Large Language Models, RAG, Prompt Engineering, Agents, or neural architectures.`;
  }

  return {
    text: fallbackResponse,
    suggestedActions: [
      "Explain this simply",
      "Give me a real-world example",
      "Explain like a product manager",
      "Quiz me on this",
    ],
  };
}
