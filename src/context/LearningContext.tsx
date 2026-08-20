import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  LearningPath,
  Lesson,
  QuizAttempt,
  BookmarkItem,
  RecommendationItem,
  NotificationItem,
  FluencyBreakdown,
  PathProgress,
} from '../types';
import { SEED_LEARNING_PATHS, SEED_NOTIFICATIONS } from '../data/seedData';
import { useAuth } from './AuthContext';

interface LearningContextType {
  paths: LearningPath[];
  isLoading: boolean;
  completedLessonIds: string[];
  inProgressLessonIds: string[];
  quizAttempts: Record<string, QuizAttempt>;
  bookmarks: BookmarkItem[];
  recommendations: RecommendationItem[];
  notifications: NotificationItem[];
  fluencyBreakdown: FluencyBreakdown;
  completeLesson: (lessonId: string, pathId: string) => void;
  submitQuizAttempt: (attempt: QuizAttempt) => void;
  toggleBookmark: (item: Omit<BookmarkItem, 'savedAt'>) => void;
  isBookmarked: (itemId: string) => boolean;
  isLessonCompleted: (lessonId: string) => boolean;
  getPathProgress: (pathId: string) => PathProgress;
  markNotificationRead: (id: string) => void;
  getLessonById: (lessonId: string) => { lesson: Lesson; path: LearningPath } | null;
  createAdminLesson: (pathId: string, moduleId: string, lesson: Partial<Lesson>) => Promise<boolean>;
  updateAdminLesson: (lessonId: string, updates: Partial<Lesson>) => Promise<boolean>;
  refreshRecommendations: () => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

const STORAGE_KEYS = {
  COMPLETED_LESSONS: 'ai_atlas_completed_lessons',
  IN_PROGRESS_LESSONS: 'ai_atlas_inprogress_lessons',
  QUIZ_ATTEMPTS: 'ai_atlas_quiz_attempts',
  BOOKMARKS: 'ai_atlas_bookmarks',
  NOTIFICATIONS: 'ai_atlas_notifications',
  CURRICULUM_OVERRIDE: 'ai_atlas_curriculum_override',
};

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateProfile } = useAuth();

  const [paths, setPaths] = useState<LearningPath[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRICULUM_OVERRIDE);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return SEED_LEARNING_PATHS;
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['lesson-what-is-ai', 'lesson-ai-vs-ml', 'lesson-what-is-llm', 'lesson-prompt-engineering-core'];
  });

  const [inProgressLessonIds, setInProgressLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.IN_PROGRESS_LESSONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['lesson-how-tokens-work', 'lesson-what-is-rag'];
  });

  const [quizAttempts, setQuizAttempts] = useState<Record<string, QuizAttempt>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      'lesson-what-is-ai': {
        lessonId: 'lesson-what-is-ai',
        quizId: 'quiz-what-is-ai',
        score: 100,
        totalQuestions: 3,
        correctAnswers: 3,
        passed: true,
        answeredOptions: { q1: 'opt2', q2: 'opt3', q3: 'opt1' },
        completedAt: '2026-08-18T14:30:00.000Z',
      },
      'lesson-what-is-llm': {
        lessonId: 'lesson-what-is-llm',
        quizId: 'quiz-llm',
        score: 100,
        totalQuestions: 2,
        correctAnswers: 2,
        passed: true,
        answeredOptions: { q1: 'opt1', q2: 'opt2' },
        completedAt: '2026-08-19T10:15:00.000Z',
      },
    };
  });

  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'bm-1',
        type: 'lesson',
        itemId: 'lesson-what-is-rag',
        title: 'What Is Retrieval-Augmented Generation (RAG)?',
        category: 'Building AI Applications',
        tagline: 'Connecting LLMs to your private data without retraining the model.',
        savedAt: '2026-08-18',
      },
      {
        id: 'bm-2',
        type: 'concept',
        itemId: 'concept-embeddings',
        title: 'Vector Embeddings & Semantic Search',
        category: 'Building AI Applications',
        tagline: 'High-dimensional geometric representations of semantic meaning.',
        savedAt: '2026-08-19',
      },
    ];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return SEED_NOTIFICATIONS;
  });

  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(completedLessonIds));
  }, [completedLessonIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IN_PROGRESS_LESSONS, JSON.stringify(inProgressLessonIds));
  }, [inProgressLessonIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Calculate Fluency Breakdown
  const fluencyBreakdown: FluencyBreakdown = useMemo(() => {
    // 1. Completed lessons score (out of 35 max points)
    const targetLessons = 16;
    const lessonCompletionRate = Math.min(1, completedLessonIds.length / targetLessons);
    const completedLessonsScore = Math.round(lessonCompletionRate * 35);

    // 2. Quiz accuracy score (out of 30 max points)
    const attempts = Object.values(quizAttempts);
    const avgAccuracy =
      attempts.length > 0
        ? attempts.reduce((acc, curr) => acc + curr.score, 0) / attempts.length
        : 80;
    const quizAccuracyScore = Math.round((avgAccuracy / 100) * 30);

    // 3. Topic breadth (out of 20 max points)
    const domainMap: Record<string, number> = {
      'AI Fundamentals': 0,
      'ChatGPT & LLMs': 0,
      'Prompt Engineering': 0,
      'Building AI Applications': 0,
      'AI Agents': 0,
      'AI Engineering': 0,
    };

    paths.forEach((p) => {
      p.modules.forEach((m) => {
        m.lessons.forEach((l) => {
          if (completedLessonIds.includes(l.id) && domainMap[l.category] !== undefined) {
            domainMap[l.category] += 1;
          }
        });
      });
    });

    const activeDomainsCount = Object.values(domainMap).filter((c) => c > 0).length;
    const topicBreadthScore = Math.round((activeDomainsCount / Object.keys(domainMap).length) * 20);

    // 4. Consistency score (out of 15 max points)
    const streak = user?.currentStreak || 3;
    const consistencyScore = Math.min(15, Math.round((streak / 7) * 15));

    const totalScore = Math.min(100, completedLessonsScore + quizAccuracyScore + topicBreadthScore + consistencyScore);

    const domains = Object.entries(domainMap).map(([name, count]) => ({
      name,
      level: Math.min(100, count * 35),
      lessonsCount: count,
    }));

    const topicsToRevisit = [
      {
        topic: 'Attention Mechanism & Transformers',
        reason: 'Recommended refresh to strengthen foundation before AI Engineering',
        lessonId: 'lesson-transformer-architecture',
      },
      {
        topic: 'Preventing AI Hallucinations',
        reason: 'Essential prerequisite for building high-trust RAG systems',
        lessonId: 'lesson-ai-hallucinations',
      },
    ];

    return {
      score: totalScore,
      completedLessonsScore,
      quizAccuracyScore,
      topicBreadthScore,
      consistencyScore,
      domains,
      topicsToRevisit,
    };
  }, [completedLessonIds, quizAttempts, paths, user?.currentStreak]);

  // Sync computed score to user profile
  useEffect(() => {
    if (user && user.fluencyScore !== fluencyBreakdown.score) {
      updateProfile({
        fluencyScore: fluencyBreakdown.score,
        completedLessonsCount: completedLessonIds.length,
        passedQuizzesCount: Object.values(quizAttempts).filter((q) => q.passed).length,
      });
    }
  }, [fluencyBreakdown.score, completedLessonIds.length, quizAttempts, updateProfile, user]);

  // Fetch / Compute Recommendations
  const refreshRecommendations = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile: user,
          completedLessonIds,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data);
      }
    } catch {
      // Fallback local rule-based recommendations
      const recs: RecommendationItem[] = [];
      for (const p of paths) {
        for (const m of p.modules) {
          for (const l of m.lessons) {
            if (!completedLessonIds.includes(l.id)) {
              recs.push({
                lesson: l,
                pathTitle: p.title,
                reason: `Recommended next step in ${p.title}`,
                matchScore: 92,
              });
              break;
            }
          }
          if (recs.length >= 3) break;
        }
      }
      setRecommendations(recs);
    } finally {
      setIsLoading(false);
    }
  }, [user, completedLessonIds, paths]);

  useEffect(() => {
    refreshRecommendations();
  }, [refreshRecommendations]);

  const completeLesson = (lessonId: string, _pathId: string) => {
    setCompletedLessonIds((prev) => (prev.includes(lessonId) ? prev : [...prev, lessonId]));
    setInProgressLessonIds((prev) => prev.filter((id) => id !== lessonId));

    if (user) {
      updateProfile({
        totalMinutesLearned: (user.totalMinutesLearned || 0) + 8,
        completedLessonsCount: completedLessonIds.length + 1,
      });
    }
  };

  const submitQuizAttempt = (attempt: QuizAttempt) => {
    setQuizAttempts((prev) => ({
      ...prev,
      [attempt.lessonId]: attempt,
    }));
    completeLesson(attempt.lessonId, '');
  };

  const toggleBookmark = (item: Omit<BookmarkItem, 'savedAt'>) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.itemId === item.itemId);
      if (exists) {
        return prev.filter((b) => b.itemId !== item.itemId);
      } else {
        return [
          {
            ...item,
            savedAt: new Date().toISOString().split('T')[0],
          },
          ...prev,
        ];
      }
    });
  };

  const isBookmarked = (itemId: string) => {
    return bookmarks.some((b) => b.itemId === itemId);
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessonIds.includes(lessonId);
  };

  const getPathProgress = (pathId: string): PathProgress => {
    const pathItem = paths.find((p) => p.id === pathId);
    if (!pathItem) {
      return { pathId, completedLessons: 0, totalLessons: 0, percent: 0, status: 'not_started' };
    }

    let total = 0;
    let completed = 0;
    let lastLessonId: string | undefined;

    pathItem.modules.forEach((m) => {
      m.lessons.forEach((l) => {
        total++;
        if (completedLessonIds.includes(l.id)) {
          completed++;
        } else if (!lastLessonId) {
          lastLessonId = l.id;
        }
      });
    });

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    const status = percent === 100 ? 'completed' : percent > 0 ? 'in_progress' : 'not_started';

    return {
      pathId,
      completedLessons: completed,
      totalLessons: total,
      percent,
      status,
      lastAccessedLessonId: lastLessonId || pathItem.modules[0]?.lessons[0]?.id,
    };
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getLessonById = (lessonId: string) => {
    for (const p of paths) {
      for (const m of p.modules) {
        const lesson = m.lessons.find((l) => l.id === lessonId || l.slug === lessonId);
        if (lesson) {
          return { lesson, path: p };
        }
      }
    }
    return null;
  };

  const createAdminLesson = async (pathId: string, moduleId: string, lesson: Partial<Lesson>): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pathId, moduleId, newLesson: lesson }),
      });
      if (res.ok) {
        const data = await res.json();
        setPaths((prev) => {
          const updated = JSON.parse(JSON.stringify(prev));
          const p = updated.find((item: LearningPath) => item.id === pathId);
          if (p) {
            const m = p.modules.find((mod: any) => mod.id === moduleId);
            if (m) {
              m.lessons.push(data.lesson);
              p.totalLessons = p.modules.reduce((acc: number, curr: any) => acc + curr.lessons.length, 0);
            }
          }
          localStorage.setItem(STORAGE_KEYS.CURRICULUM_OVERRIDE, JSON.stringify(updated));
          return updated;
        });
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const updateAdminLesson = async (lessonId: string, updates: Partial<Lesson>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admin/lessons/${lessonId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        setPaths((prev) => {
          const updated = JSON.parse(JSON.stringify(prev));
          for (const p of updated) {
            for (const m of p.modules) {
              const idx = m.lessons.findIndex((l: Lesson) => l.id === lessonId);
              if (idx !== -1) {
                m.lessons[idx] = { ...m.lessons[idx], ...updates };
              }
            }
          }
          localStorage.setItem(STORAGE_KEYS.CURRICULUM_OVERRIDE, JSON.stringify(updated));
          return updated;
        });
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  return (
    <LearningContext.Provider
      value={{
        paths,
        isLoading,
        completedLessonIds,
        inProgressLessonIds,
        quizAttempts,
        bookmarks,
        recommendations,
        notifications,
        fluencyBreakdown,
        completeLesson,
        submitQuizAttempt,
        toggleBookmark,
        isBookmarked,
        isLessonCompleted,
        getPathProgress,
        markNotificationRead,
        getLessonById,
        createAdminLesson,
        updateAdminLesson,
        refreshRecommendations,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
