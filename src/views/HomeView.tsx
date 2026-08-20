import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  Flame,
  CheckCircle2,
  Clock,
  TrendingUp,
  BrainCircuit,
  Compass,
  Award,
  Bot,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';
import { useTutor } from '../context/TutorContext';
import { ProgressBar } from '../components/common/ProgressBar';
import { ProgressRing } from '../components/common/ProgressRing';
import { BookmarkButton } from '../components/common/BookmarkButton';

interface HomeViewProps {
  onSelectLesson: (lessonId: string) => void;
  onSelectPath: (pathId: string) => void;
  onNavigate: (view: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectLesson,
  onSelectPath,
  onNavigate,
}) => {
  const { user } = useAuth();
  const { paths, recommendations, fluencyBreakdown, getPathProgress, isLessonCompleted } = useLearning();
  const { openTutor } = useTutor();

  // Find active starting path
  const activePathId = user?.startingPathId || 'path-2';
  const activePath = paths.find((p) => p.id === activePathId) || paths[0];
  const pathProgress = getPathProgress(activePath.id);

  // Find next lesson to learn
  let nextLesson = activePath.modules[0]?.lessons[0];
  for (const m of activePath.modules) {
    for (const l of m.lessons) {
      if (!isLessonCompleted(l.id)) {
        nextLesson = l;
        break;
      }
    }
    if (nextLesson && !isLessonCompleted(nextLesson.id)) break;
  }

  return (
    <div className="space-y-8 animate-fadeIn pb-8">
      {/* Top Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#3d5afe] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Atlas Command Center</span>
          </div>
          <h1 className="serif-display text-2xl sm:text-3xl italic text-white mt-1">
            Welcome, {user?.name || 'Alex'}.
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            {user?.currentStreak || 1} day streak • Ready for your {user?.dailyTimeMinutes || 10}-minute daily AI mastery session.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('learn')}
            className="px-4 py-2 rounded-xl bg-[#0b0d18] hover:bg-[#111424] text-gray-300 hover:text-white text-xs font-semibold border border-[#1a1e2d] transition-colors flex items-center space-x-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-[#3d5afe]" />
            <span>All 12 Paths</span>
          </button>
          <button
            onClick={() => openTutor()}
            className="px-4 py-2 rounded-xl bg-[#3d5afe] hover:bg-[#536dfe] text-white text-xs font-semibold shadow-md shadow-[#3d5afe]/25 transition-all flex items-center space-x-1.5"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Chat with Atlas</span>
          </button>
        </div>
      </div>

      {/* Hero Continue Learning Card */}
      {nextLesson && (
        <section
          id="hero-continue-card"
          className="bg-[#0b0d18] rounded-2xl p-6 sm:p-8 glass-border relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#3d5afe] opacity-5 blur-[120px] pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#3d5afe]/15 text-[#3d5afe] border border-[#3d5afe]/30">
                  Current Learning Path
                </span>
                <span className="text-xs text-gray-400">
                  {activePath.title}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {nextLesson.title}
              </h2>

              <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed">
                {nextLesson.bigIdea}
              </p>

              <div className="flex items-center space-x-4 pt-1 text-xs text-gray-400">
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#3d5afe]" />
                  <span>{nextLesson.durationMinutes || nextLesson.estimatedMinutes || 8} MIN • {nextLesson.difficulty.toUpperCase()}</span>
                </span>
                <span className="flex items-center space-x-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Comprehension Quiz</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
              <div className="text-xs text-gray-400 mb-0.5 hidden lg:block">
                Next: <span className="text-white font-medium">{nextLesson.title}</span>
              </div>

              <button
                id="hero-start-lesson-btn"
                onClick={() => onSelectLesson(nextLesson.id)}
                className="bg-white hover:bg-gray-100 text-black px-7 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 fill-current text-black" />
                <span>Resume Lesson</span>
              </button>

              <button
                onClick={() => onSelectPath(activePath.id)}
                className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white flex items-center justify-center space-x-1 transition-colors"
              >
                <span>View Full Path ({pathProgress.completedLessons}/{pathProgress.totalLessons})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Bottom Path Progress Line */}
          <div className="mt-6 pt-5 border-t border-[#1a1e2d] relative z-10">
            <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
              <span className="font-semibold text-gray-300">{activePath.title}</span>
              <span className="text-white font-medium">{pathProgress.percent}% Complete</span>
            </div>
            <div className="w-full h-2 bg-[#020308] rounded-full overflow-hidden border border-[#1a1e2d]">
              <div
                className="h-full bg-[#3d5afe] rounded-full transition-all duration-500"
                style={{ width: `${pathProgress.percent}%` }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Grid: Fluency Card & Quick AI Tutor Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fluency Overview Widget */}
        <div
          onClick={() => onNavigate('progress')}
          className="p-6 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border hover:border-gray-600 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3d5afe]">Mastery Index</span>
              <h3 className="text-base font-bold text-white group-hover:text-[#3d5afe] transition-colors">
                AI Fluency Score
              </h3>
            </div>
            <Award className="w-5 h-5 text-[#3d5afe]" />
          </div>

          <div className="flex items-center justify-around py-2">
            <ProgressRing score={fluencyBreakdown.score} size={110} strokeWidth={9} label="Fluency" sublabel="Index" />
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#3d5afe]" />
                <span className="text-gray-400">Lessons:</span>
                <span className="font-bold text-white">{fluencyBreakdown.completedLessonsScore}/35</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-gray-400">Quizzes:</span>
                <span className="font-bold text-white">{fluencyBreakdown.quizAccuracyScore}/30</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-gray-400">Breadth:</span>
                <span className="font-bold text-white">{fluencyBreakdown.topicBreadthScore}/20</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1a1e2d] flex items-center justify-between text-xs text-gray-400">
            <span>Level: AI Practitioner</span>
            <span className="text-[#3d5afe] font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
              <span>View Analytics</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Quick Ask Atlas Tutor Shortcuts */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#3d5afe]/15 text-[#3d5afe] flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Ask Atlas Anything</h3>
              </div>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400">Gemini 3.7 Flash</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Get clear, concise explanations, architectural breakdowns, and real-world system designs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { title: 'Explain RAG vs Fine-Tuning', prompt: 'Explain the practical differences between RAG and Fine-tuning for enterprise applications.' },
                { title: 'How does Self-Attention work?', prompt: 'Explain the intuition behind the Self-Attention mechanism in Transformers.' },
                { title: 'AI Product Manager Checklist', prompt: 'What are the top 5 metrics an AI product manager must track for LLM features?' },
                { title: 'Preventing Hallucinations', prompt: 'What are the most effective engineering techniques to prevent LLM hallucinations?' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => openTutor(undefined, item.prompt)}
                  className="p-3 rounded-xl bg-[#080a14] hover:bg-[#111424] border border-[#1a1e2d] hover:border-[#3d5afe]/40 text-left transition-all group"
                >
                  <div className="text-xs font-semibold text-gray-200 group-hover:text-[#3d5afe] transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowRight className="w-3 h-3 text-gray-500 group-hover:text-[#3d5afe] transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{item.prompt}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1a1e2d] flex justify-end">
            <button
              onClick={() => openTutor()}
              className="text-xs font-semibold text-[#3d5afe] hover:text-[#536dfe] flex items-center space-x-1"
            >
              <span>Open full interactive tutor</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Personalized Recommendations Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Recommended For You</h3>
            <p className="text-xs text-gray-500 mt-0.5">Personalized based on your goals and fluency progression</p>
          </div>
          <button
            onClick={() => onNavigate('learn')}
            className="text-xs font-semibold text-[#3d5afe] hover:text-[#536dfe] flex items-center space-x-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.slice(0, 3).map((rec, i) => (
            <div
              key={i}
              onClick={() => onSelectLesson(rec.lesson.id)}
              className="p-5 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border hover:border-gray-600 hover:bg-[#111424] transition-all cursor-pointer group flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#3d5afe] px-2 py-0.5 rounded bg-[#3d5afe]/10 border border-[#3d5afe]/20">
                    {rec.matchScore}% Match
                  </span>
                  <BookmarkButton
                    itemId={rec.lesson.id}
                    title={rec.lesson.title}
                    category={rec.lesson.category}
                    tagline={rec.lesson.bigIdea}
                  />
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-[#3d5afe] transition-colors line-clamp-2">
                  {rec.lesson.title}
                </h4>

                <p className="text-xs text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
                  {rec.lesson.bigIdea}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1a1e2d] flex items-center justify-between text-[11px] text-gray-400">
                <span>{rec.lesson.durationMinutes || rec.lesson.estimatedMinutes || 8} MIN • {rec.lesson.difficulty}</span>
                <span className="text-[#3d5afe] font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                  <span>Start</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
