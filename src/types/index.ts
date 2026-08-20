/**
 * AI Atlas — Core Domain Types
 */

export type ExperienceLevel = 
  | 'completely_new'
  | 'know_basics'
  | 'use_tools_regularly'
  | 'work_with_ai'
  | 'technical_developer';

export type LearningGoal =
  | 'better_at_job'
  | 'build_products'
  | 'start_business'
  | 'become_engineer'
  | 'understand_revolution'
  | 'research'
  | 'personal_curiosity';

export type TimeCommitment = 5 | 10 | 20 | 30;

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type SubscriptionTier = 'free' | 'plus' | 'pro';

export type ContentCategory = 
  | 'AI Fundamentals'
  | 'Generative AI'
  | 'ChatGPT & LLMs'
  | 'Prompt Engineering'
  | 'AI at Work'
  | 'AI Agents'
  | 'Building AI Applications'
  | 'AI Engineering'
  | 'AI Product Management'
  | 'AI Research'
  | 'AI Ethics & Safety';

export type ContentStatus = 'draft' | 'review' | 'published' | 'archived';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  subscriptionTier: SubscriptionTier;
  avatarUrl?: string;
  experienceLevel: ExperienceLevel;
  learningGoals: LearningGoal[];
  dailyTimeMinutes: TimeCommitment;
  startingPathId: string;
  onboardingCompleted: boolean;
  fluencyScore: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalMinutesLearned: number;
  completedLessonsCount: number;
  passedQuizzesCount: number;
  createdAt: string;
}

export interface VisualCard {
  type: 'comparison' | 'flow' | 'architecture' | 'cards';
  title: string;
  content: string;
  items?: Array<{ label: string; detail: string; icon?: string }>;
}

export interface ContentSource {
  title: string;
  type: 'original' | 'book' | 'paper' | 'podcast' | 'article' | 'expert';
  author: string;
  url?: string;
  notes?: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  questionText?: string;
  question?: string;
  type?: 'multiple_choice' | 'true_false' | 'scenario';
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  questions: QuizQuestion[];
}

export interface Lesson {
  id: string;
  slug: string;
  moduleId: string;
  pathId: string;
  title: string;
  tagline?: string;
  difficulty: DifficultyLevel;
  category: ContentCategory;
  estimatedMinutes?: number;
  durationMinutes?: number;
  orderIndex?: number;
  status?: ContentStatus;

  // The 12 Structural Lesson Elements
  bigIdea: string;
  whyItMatters: string;
  simpleExplanation: string;
  realWorldExample?: {
    scenario: string;
    impact: string;
  };
  keyIdeas?: Array<{ title: string; summary: string }>;
  visualExplanation?: VisualCard;
  misconceptions?: Array<{ myth: string; reality: string }> | string[];
  practicePrompt?: string;
  goDeeper: string;
  keyTakeaways: string[];
  applyIt?: {
    prompt: string;
    actionSteps: string[];
    reflectionQuestion: string;
  };
  quiz?: Quiz;
  sources?: ContentSource[];
  nextLessonId?: string;
}

export interface Module {
  id: string;
  pathId: string;
  title: string;
  description: string;
  orderIndex: number;
  lessons: Lesson[];
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: DifficultyLevel;
  category: ContentCategory;
  estimatedHours?: number;
  estimatedMinutes?: number;
  totalLessons: number;
  icon: string;
  featured?: boolean;
  orderIndex: number;
  status: ContentStatus;
  modules: Module[];
}

export interface QuizAttempt {
  lessonId: string;
  quizId: string;
  score: number; // e.g. 100 for 3/3
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
  answeredOptions: Record<string, string>; // questionId -> optionId
  completedAt: string;
}

export interface LessonProgress {
  lessonId: string;
  pathId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt?: string;
  completedAt?: string;
  quizAttempt?: QuizAttempt;
  lastReadPosition?: number;
}

export interface PathProgress {
  pathId: string;
  completedLessons: number;
  totalLessons: number;
  percent: number;
  status: 'not_started' | 'in_progress' | 'completed';
  lastAccessedLessonId?: string;
}

export interface BookmarkItem {
  id: string;
  type: 'lesson' | 'concept' | 'resource';
  itemId: string;
  title: string;
  category: ContentCategory;
  tagline?: string;
  savedAt: string;
  notes?: string;
}

export interface ConceptNode {
  id: string;
  name: string;
  title?: string;
  category: ContentCategory;
  description: string;
  summary?: string;
  difficulty: DifficultyLevel;
  prerequisites: string[];
  relatedConcepts: string[];
  connections?: string[];
  relatedLessonIds?: string[];
  lessonId?: string;
}

export interface TutorMessage {
  id: string;
  sender: 'user' | 'atlas';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  contextLessonId?: string;
}

export interface RecommendationItem {
  lesson: Lesson;
  pathTitle: string;
  reason: string;
  matchScore: number;
}

export interface FluencyBreakdown {
  score: number;
  completedLessonsScore: number;
  quizAccuracyScore: number;
  topicBreadthScore: number;
  consistencyScore: number;
  domains: Array<{
    name: string;
    level: number; // 0 - 100
    lessonsCount: number;
  }>;
  topicsToRevisit: Array<{
    topic: string;
    reason: string;
    lessonId: string;
  }>;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'lesson' | 'streak' | 'achievement' | 'update';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  targetLessonId?: string;
}
