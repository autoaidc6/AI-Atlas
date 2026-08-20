# AI Atlas — System Architecture & Technical Specifications

## 1. System Overview
**AI Atlas** is a personalized AI-learning web platform engineered to transform world-class artificial intelligence concepts, research, and expert knowledge into structured, interactive bite-sized lessons, quizzes, and AI-guided mastery paths.

```
+-------------------------------------------------------------------------+
|                              CLIENT LAYER                               |
|   React 19 + TypeScript + Tailwind CSS + Lucide Icons + Motion Layout   |
|   - AppShell & Global Navigation (Home, Learn, Explore, Progress, Saved)|
|   - Distraction-Free Editorial Lesson Player (12 Structural Pillars)    |
|   - Interactive Quiz Engine with Diagnostic Feedback                    |
|   - "Ask Atlas" AI Tutor Panel (Context-Aware Learning Companion)       |
|   - Knowledge Graph Concept Navigator & Global Search Engine            |
|   - Content Admin CMS (Path, Module, Lesson, Quiz Publishing Workflow)  |
+-------------------------------------------------------------------------+
                                    |  JSON / SSE / REST
                                    v
+-------------------------------------------------------------------------+
|                              SERVER LAYER                               |
|   Express 4 + TypeScript (Vite Middleware in Dev / Bundled in Prod)     |
|   - /api/auth: User Authentication, Session State & Role Control        |
|   - /api/paths & /api/lessons: Normalized Curriculum & Content Delivery |
|   - /api/progress: Multi-factor AI Fluency Engine & Streak Logic        |
|   - /api/tutor: Server-Side Gemini API Proxy with Prompt Shielding      |
|   - /api/recommendations: Goal & Level-Weighted Rule-Based Engine       |
|   - /api/admin: Internal Educational Content Management & Publishing    |
+-------------------------------------------------------------------------+
                                    |
        +---------------------------+---------------------------+
        |                                                       |
        v                                                       v
+------------------------------------+   +------------------------------------+
|         AI PROVIDER LAYER          |   |          PERSISTENCE LAYER         |
|   Google GenAI SDK (gemini-3.7)    |   |   Relational In-Memory / SQLite /  |
|   - Contextual Lesson Q&A          |   |   LocalStorage Synced Store        |
|   - Adaptive Simplification        |   |   - Normalized Data Schemas        |
|   - Dynamic Quiz Verification      |   |   - Atomic Progress & Metrics      |
+------------------------------------+   +------------------------------------+
```

---

## 2. Core Domain Entities & Relational Schema

```sql
-- Core User & Account Model
User {
  id: string (UUID)
  email: string
  name: string
  avatarUrl: string
  role: 'user' | 'admin'
  subscriptionTier: 'free' | 'plus' | 'pro'
  createdAt: timestamp
  updatedAt: timestamp
}

UserProfile {
  userId: string (FK -> User.id)
  experienceLevel: 'beginner' | 'basic' | 'regular_user' | 'professional' | 'developer'
  learningGoals: string[] -- e.g. ['career', 'build_products', 'understand_tech', 'research']
  dailyTimeMinutes: 5 | 10 | 20 | 30
  startingTopicId: string
  fluencyScore: number (0 - 100)
  currentStreak: number
  longestStreak: number
  lastActiveDate: string (YYYY-MM-DD)
  totalMinutesLearned: number
}

-- Curriculum Hierarchy: Path -> Module -> Lesson -> Quiz
LearningPath {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: 'Fundamentals' | 'LLMs' | 'Engineering' | 'Business' | 'Agents'
  estimatedHours: number
  totalLessons: number
  icon: string
  featured: boolean
  orderIndex: number
  status: 'draft' | 'review' | 'published' | 'archived'
}

Module {
  id: string
  pathId: string (FK -> LearningPath.id)
  title: string
  description: string
  orderIndex: number
}

Lesson {
  id: string
  slug: string
  moduleId: string (FK -> Module.id)
  pathId: string (FK -> LearningPath.id)
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedMinutes: number
  orderIndex: number
  status: 'draft' | 'review' | 'published' | 'archived'
  
  -- The 12 Lesson Sections
  bigIdea: string
  whyItMatters: string
  simpleExplanation: string
  realWorldExample: {
    scenario: string
    impact: string
  }
  keyIdeas: Array<{ title: string; summary: string }>
  visualExplanation: {
    type: 'comparison' | 'flow' | 'architecture' | 'cards'
    title: string
    content: string
    items?: Array<{ label: string; detail: string }>
  }
  goDeeper: string
  keyTakeaways: string[]
  applyIt: {
    prompt: string
    actionSteps: string[]
    reflectionQuestion: string
  }
  sources?: Array<{
    title: string
    type: 'original' | 'paper' | 'book' | 'article'
    author: string
    url?: string
  }>
  nextLessonId?: string
}

Quiz {
  id: string
  lessonId: string (FK -> Lesson.id)
  title: string
  questions: QuizQuestion[]
}

QuizQuestion {
  id: string
  questionText: string
  type: 'multiple_choice' | 'true_false' | 'scenario'
  options: Array<{
    id: string
    text: string
  }>
  correctOptionId: string
  explanation: string
}

-- Progress Tracking & Analytics
LessonProgress {
  id: string
  userId: string
  lessonId: string
  pathId: string
  status: 'not_started' | 'in_progress' | 'completed'
  completedAt?: timestamp
  quizAttempt?: {
    score: number
    passed: boolean
    attemptsCount: number
    lastAttemptDate: timestamp
  }
  lastReadPosition?: number
}

-- Knowledge Graph
Concept {
  id: string
  name: string
  category: string
  description: string
  prerequisiteConceptIds: string[]
  relatedConceptIds: string[]
  lessonIds: string[]
}
```

---

## 3. AI Tutor ("Ask Atlas") Architecture
- **Server-Side Proxy (`/api/tutor/chat`)**: All Gemini API calls run securely server-side using `@google/genai` with model `gemini-3.7-flash`.
- **System Prompting Strategy**:
  - Injects: User Persona, Daily Goals, Current Lesson Content (Big Idea, Key Ideas, Go Deeper), and Pedagogical Guardrails.
  - Guardrails: Focus on clarity, constructive Socratic explanations, analogies tailored to the user's role (PM, Developer, Curious), and zero fabricated citations.
- **Offline / Fallback Mode**: If `GEMINI_API_KEY` is not present, the tutor automatically provides rich, heuristic lesson breakdowns, guided study prompts, and structured concept expansions without breaking the user experience.

---

## 4. AI Fluency Algorithm
The MVP AI Fluency score ($0 - 100$) is computed via transparent weighted indicators:
$$\text{Fluency Score} = (0.35 \times C_{\text{lessons}}) + (0.30 \times S_{\text{quiz}}) + (0.20 \times B_{\text{topics}}) + (0.15 \times K_{\text{streak}})$$
- $C_{\text{lessons}}$: Percentage of completed core lessons against starting path targets (scaled $0-100$).
- $S_{\text{quiz}}$: Average quiz accuracy on first/best attempts ($0-100$).
- $B_{\text{topics}}$: Breadth score across the 6 major domains ($0-100$).
- $K_{\text{streak}}$: Consistency multiplier based on continuous 7-day learning activity ($0-100$).

---

## 5. Mobile Portability & Future Architecture
- **API First**: The web client interacts exclusively via REST endpoints and JSON data models.
- **Zero Web-Lock**: State, scoring logic, recommendations, and curriculum schemas are isolated in platform-agnostic TypeScript modules that can be shared directly with future React Native / Expo iOS and Android mobile clients.
