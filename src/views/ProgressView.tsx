import React from 'react';
import {
  BarChart2,
  Award,
  Flame,
  CheckCircle2,
  BrainCircuit,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { useAuth } from '../context/AuthContext';
import { ProgressRing } from '../components/common/ProgressRing';
import { ProgressBar } from '../components/common/ProgressBar';

interface ProgressViewProps {
  onSelectLesson: (lessonId: string) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onSelectLesson }) => {
  const { user } = useAuth();
  const { fluencyBreakdown, completedLessonIds, quizAttempts, getLessonById } = useLearning();

  return (
    <div className="space-y-8 animate-fadeIn pb-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#3d5afe] uppercase tracking-wider">
          <BarChart2 className="w-3.5 h-3.5" />
          <span>AI Fluency & Skill Analytics</span>
        </div>
        <h1 className="serif-display text-2xl sm:text-3xl italic text-white mt-1">
          Your AI Mastery Index
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Quantitative tracking across lesson volume, comprehension accuracy, domain breadth, and retention consistency.
        </p>
      </div>

      {/* Hero Fluency Score Summary */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#3d5afe] opacity-5 blur-[120px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <ProgressRing
              score={fluencyBreakdown.score}
              size={140}
              strokeWidth={12}
              label="Fluency"
              sublabel="Score"
            />
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#3d5afe]/15 text-[#3d5afe] border border-[#3d5afe]/30">
                Level 2: AI Practitioner
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Mastery Score: {fluencyBreakdown.score}/100
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 max-w-md">
                You understand core LLM mechanics, prompt engineering paradigms, and RAG architectures.
              </p>
            </div>
          </div>

          {/* 4 Pillars Breakdown */}
          <div className="w-full lg:w-72 p-5 rounded-xl bg-[#080a14] border border-[#1a1e2d] space-y-3 text-xs">
            <div className="flex justify-between items-center text-gray-300">
              <span>Curriculum Volume</span>
              <span className="font-bold text-white">{fluencyBreakdown.completedLessonsScore} / 35</span>
            </div>
            <div className="w-full h-1.5 bg-[#020308] rounded-full overflow-hidden border border-[#1a1e2d]">
              <div
                className="h-full bg-[#3d5afe] rounded-full transition-all duration-500"
                style={{ width: `${(fluencyBreakdown.completedLessonsScore / 35) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-gray-300 pt-1">
              <span>Quiz Accuracy</span>
              <span className="font-bold text-emerald-400">{fluencyBreakdown.quizAccuracyScore} / 30</span>
            </div>
            <div className="w-full h-1.5 bg-[#020308] rounded-full overflow-hidden border border-[#1a1e2d]">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${(fluencyBreakdown.quizAccuracyScore / 30) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-gray-300 pt-1">
              <span>Domain Breadth</span>
              <span className="font-bold text-[#3d5afe]">{fluencyBreakdown.topicBreadthScore} / 20</span>
            </div>
            <div className="w-full h-1.5 bg-[#020308] rounded-full overflow-hidden border border-[#1a1e2d]">
              <div
                className="h-full bg-[#3d5afe] rounded-full transition-all duration-500"
                style={{ width: `${(fluencyBreakdown.topicBreadthScore / 20) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-gray-300 pt-1">
              <span>Daily Consistency</span>
              <span className="font-bold text-amber-400">{fluencyBreakdown.consistencyScore} / 15</span>
            </div>
            <div className="w-full h-1.5 bg-[#020308] rounded-full overflow-hidden border border-[#1a1e2d]">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${(fluencyBreakdown.consistencyScore / 15) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Domain Breakdown & Topics to Revisit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Domain Mastery Bars */}
        <div className="p-6 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <BrainCircuit className="w-4 h-4 text-[#3d5afe]" />
              <span>Domain Mastery Breakdown</span>
            </h3>
            <span className="text-xs text-gray-400">6 Core Domains</span>
          </div>

          <div className="space-y-4 pt-2">
            {fluencyBreakdown.domains.map((domain, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-gray-200">{domain.name}</span>
                  <span className="text-gray-400">{domain.lessonsCount} lessons completed</span>
                </div>
                <div className="w-full h-2 bg-[#080a14] rounded-full overflow-hidden border border-[#1a1e2d]">
                  <div
                    className="h-full bg-[#3d5afe] rounded-full transition-all duration-500"
                    style={{ width: `${domain.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topics to Revisit (Spaced Repetition) */}
        <div className="p-6 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Reinforcement & Revisit</span>
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Spaced Repetition
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Atlas identifies high-leverage concepts to review for long-term retention.
            </p>

            <div className="space-y-3 mt-4">
              {fluencyBreakdown.topicsToRevisit.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectLesson(item.lessonId)}
                  className="p-3.5 rounded-xl bg-[#080a14] hover:bg-[#111424] border border-[#1a1e2d] hover:border-amber-500/40 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-gray-200 group-hover:text-amber-400 transition-colors">
                      {item.topic}
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">{item.reason}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-1 shrink-0 ml-3" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#1a1e2d] flex justify-between items-center text-xs text-gray-400">
            <span className="flex items-center space-x-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Current Streak: {user?.currentStreak || 3} days</span>
            </span>
            <span className="text-gray-300">Total Minutes: {user?.totalMinutesLearned || 64}m</span>
          </div>
        </div>
      </div>

      {/* Completed Lessons Activity Table */}
      <div className="p-6 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border space-y-4">
        <h3 className="text-base font-bold text-white">Completed Lessons History</h3>

        <div className="space-y-2">
          {completedLessonIds.map((lId) => {
            const data = getLessonById(lId);
            if (!data) return null;
            const quizAttempt = quizAttempts[lId];

            return (
              <div
                key={lId}
                onClick={() => onSelectLesson(lId)}
                className="p-3.5 rounded-xl bg-[#080a14] hover:bg-[#111424] border border-[#1a1e2d] flex items-center justify-between cursor-pointer transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-gray-200 group-hover:text-[#3d5afe] transition-colors">
                      {data.lesson.title}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {data.path.title} • {data.lesson.durationMinutes || data.lesson.estimatedMinutes || 8} min
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {quizAttempt && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      Quiz: {quizAttempt.score}%
                    </span>
                  )}
                  <span className="text-xs text-[#3d5afe] group-hover:translate-x-0.5 transition-transform">Review →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
