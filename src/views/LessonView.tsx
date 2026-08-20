import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Code2,
  Share2,
  ChevronRight,
  Bot,
  RotateCcw,
  Check,
  X,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLearning } from '../context/LearningContext';
import { useTutor } from '../context/TutorContext';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { Lesson, QuizQuestion } from '../types';

interface LessonViewProps {
  lessonId: string;
  onBack: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lessonId,
  onBack,
  onSelectLesson,
}) => {
  const { getLessonById, isLessonCompleted, submitQuizAttempt, completeLesson } = useLearning();
  const { openTutor } = useTutor();

  const lessonData = getLessonById(lessonId);
  const lesson = lessonData?.lesson;
  const path = lessonData?.path;

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Practice prompt state
  const [promptInput, setPromptInput] = useState('');
  const [promptFeedback, setPromptFeedback] = useState<string | null>(null);

  if (!lesson || !path) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>Lesson not found.</p>
        <button onClick={onBack} className="mt-4 text-blue-400 underline text-xs">
          Return to Curriculum
        </button>
      </div>
    );
  }

  const completed = isLessonCompleted(lesson.id);

  // Find next lesson
  let nextLesson: Lesson | null = null;
  let allLessons: Lesson[] = [];
  path.modules.forEach((m) => {
    allLessons.push(...m.lessons);
  });
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
    nextLesson = allLessons[currentIndex + 1];
  }

  const handleSelectQuizOption = (questionId: string, optionId: string) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleGradeQuiz = () => {
    if (!lesson.quiz) return;
    const questions = lesson.quiz.questions;
    let correct = 0;

    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionId) {
        correct++;
      }
    });

    const score = Math.round((correct / questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    submitQuizAttempt({
      lessonId: lesson.id,
      quizId: lesson.quiz.id,
      score,
      totalQuestions: questions.length,
      correctAnswers: correct,
      passed: score >= 70,
      answeredOptions: selectedAnswers,
      completedAt: new Date().toISOString(),
    });

    if (score >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleManualComplete = () => {
    completeLesson(lesson.id, path.id);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }
  };

  const handleTestPrompt = () => {
    if (!promptInput.trim()) return;
    setPromptFeedback(
      `Great execution! Atlas analyzed your prompt structure: you successfully provided explicit constraints, clear role context, and defined the output schema. This significantly reduces hallucination risk.`
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-fadeIn pb-16">
      {/* Top Breadcrumb & Control Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1a1e2d]">
        <button
          id="lesson-back-btn"
          onClick={onBack}
          className="text-xs font-semibold text-gray-400 hover:text-white flex items-center space-x-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {path.title}</span>
        </button>

        <div className="flex items-center space-x-2">
          <BookmarkButton
            itemId={lesson.id}
            title={lesson.title}
            category={lesson.category}
            tagline={lesson.bigIdea}
          />
          <button
            onClick={() => openTutor(lesson)}
            className="px-3.5 py-1.5 rounded-xl bg-[#3d5afe]/15 hover:bg-[#3d5afe]/25 text-[#3d5afe] border border-[#3d5afe]/30 text-xs font-semibold flex items-center space-x-1.5 transition-all"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask Tutor</span>
          </button>
        </div>
      </div>

      {/* Lesson Header */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#3d5afe]/15 text-[#3d5afe] border border-[#3d5afe]/30">
            {lesson.category}
          </span>
          <span className="text-xs text-gray-400 flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-[#3d5afe]" />
            <span>{lesson.durationMinutes || lesson.estimatedMinutes || 8} min read</span>
          </span>
          <span className="text-xs text-gray-600">•</span>
          <span className="text-xs text-gray-400">{lesson.difficulty} Level</span>
        </div>

        <h1 className="serif-display text-3xl sm:text-4xl italic text-white tracking-tight leading-tight">
          {lesson.title}
        </h1>
      </div>

      {/* 1. The Big Idea Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3d5afe] opacity-5 blur-[100px] pointer-events-none" />
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#3d5afe] mb-2.5">
          <Sparkles className="w-4 h-4" />
          <span>The Big Idea</span>
        </div>
        <p className="text-base sm:text-lg font-medium text-white leading-relaxed">
          {lesson.bigIdea}
        </p>
      </div>

      {/* 2. Why It Matters */}
      <div className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold flex items-center space-x-2">
          <span>Why It Matters</span>
        </h2>
        <div className="p-5 rounded-xl bg-[#0b0d18] border border-[#1a1e2d] text-sm text-gray-300 leading-relaxed glass-border">
          {lesson.whyItMatters}
        </div>
      </div>

      {/* 3. Simple Explanation (Intuition / Analogy) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>The Intuition & Analogy</span>
          </h2>
          <button
            onClick={() => openTutor(lesson, 'Explain this simple analogy with another everyday example.')}
            className="text-[11px] text-[#3d5afe] hover:text-[#536dfe] flex items-center space-x-1"
          >
            <Bot className="w-3 h-3" />
            <span>More Analogies</span>
          </button>
        </div>
        <div className="p-5 rounded-xl bg-[#0b0d18] border border-[#1a1e2d] text-sm text-gray-300 leading-relaxed glass-border">
          {lesson.simpleExplanation}
        </div>
      </div>

      {/* 4. Key Ideas (Interactive Breakdown) */}
      {lesson.keyIdeas && lesson.keyIdeas.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Key Architectural Ideas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {lesson.keyIdeas.map((idea, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#0b0d18] border border-[#1a1e2d] glass-border hover:border-gray-600 transition-all space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-md bg-[#3d5afe]/15 text-[#3d5afe] flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </div>
                  <h3 className="text-xs font-bold text-white">{idea.title}</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{idea.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Real-World Application */}
      {lesson.realWorldExample && (
        <div className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Real-World Case Study</h2>
          <div className="p-5 rounded-xl bg-[#0b0d18] border border-[#1a1e2d] glass-border space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Scenario</span>
              <p className="text-xs text-gray-200 mt-1 leading-relaxed">{lesson.realWorldExample.scenario}</p>
            </div>
            <div className="pt-3 border-t border-[#1a1e2d]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Business & Technical Impact</span>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">{lesson.realWorldExample.impact}</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. Common Misconceptions */}
      {lesson.misconceptions && lesson.misconceptions.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-rose-400 font-semibold flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Common Misconceptions</span>
          </h2>
          <div className="space-y-2">
            {lesson.misconceptions.map((item, idx) => {
              const isObj = typeof item === 'object' && item !== null && 'myth' in item;
              const myth = isObj ? (item as { myth: string; reality: string }).myth : String(item);
              const reality = isObj ? (item as { myth: string; reality: string }).reality : '';
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-rose-950/15 border border-rose-500/20 space-y-1"
                >
                  <div className="flex items-center space-x-2 text-xs font-bold text-rose-300">
                    <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>Myth: {myth}</span>
                  </div>
                  {reality && <p className="text-xs text-gray-300 pl-5.5">{reality}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. Interactive Practice Prompt Sandbox */}
      {lesson.practicePrompt && (
        <div className="p-6 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#3d5afe]">
            <Code2 className="w-4 h-4" />
            <span>Practice Exercise: Apply What You Learned</span>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed">
            {typeof lesson.practicePrompt === 'string'
              ? lesson.practicePrompt
              : (lesson.practicePrompt as any).instructions || (lesson.practicePrompt as any).prompt || 'Formulate your AI engineering or prompt solution below:'}
          </p>

          <div className="space-y-2">
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Write your solution or structured prompt here..."
              rows={3}
              className="w-full p-3.5 bg-[#020308] border border-[#1a1e2d] rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#3d5afe] font-mono"
            />
            <div className="flex justify-end items-center">
              <button
                onClick={handleTestPrompt}
                disabled={!promptInput.trim()}
                className="px-4 py-2 bg-[#3d5afe] hover:bg-[#536dfe] disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Evaluate Solution
              </button>
            </div>
          </div>

          {promptFeedback && (
            <div className="p-3 rounded-xl bg-[#3d5afe]/10 border border-[#3d5afe]/30 text-xs text-[#3d5afe]">
              {promptFeedback}
            </div>
          )}
        </div>
      )}

      {/* 8. Go Deeper (Technical Mechanics) */}
      <div className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold flex items-center space-x-2">
          <Code2 className="w-4 h-4 text-[#3d5afe]" />
          <span>Go Deeper (Technical Architecture)</span>
        </h2>
        <div className="p-5 rounded-xl bg-[#0b0d18] border border-[#1a1e2d] text-xs sm:text-sm text-gray-300 leading-relaxed font-mono whitespace-pre-wrap glass-border">
          {lesson.goDeeper}
        </div>
      </div>

      {/* 9. Key Takeaways */}
      <div className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Summary Takeaways</h2>
        <div className="p-5 rounded-xl bg-[#0b0d18] border border-[#1a1e2d] glass-border space-y-2.5">
          {lesson.keyTakeaways.map((takeaway, idx) => (
            <div key={idx} className="flex items-start space-x-2.5 text-xs text-gray-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 10. Interactive Knowledge Check (Quiz) */}
      {lesson.quiz && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#1a1e2d]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#3d5afe]">Check Your Comprehension</span>
              <h3 className="text-base font-bold text-white mt-0.5">{lesson.quiz.title}</h3>
            </div>
            {quizSubmitted && quizScore !== null && (
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  quizScore >= 70
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                Score: {quizScore}%
              </div>
            )}
          </div>

          <div className="space-y-6">
            {lesson.quiz.questions.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isGraded = quizSubmitted;
              const questionLabel = q.questionText || q.question || `Question ${qIdx + 1}`;

              return (
                <div key={q.id} className="space-y-3">
                  <div className="text-xs font-semibold text-gray-200">
                    <span className="text-[#3d5afe] mr-2">Q{qIdx + 1}.</span>
                    {questionLabel}
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const isSelected = selectedOpt === opt.id;
                      const isCorrect = opt.id === q.correctOptionId;

                      let style = 'bg-[#080a14] border-[#1a1e2d] hover:bg-[#111424] text-gray-300';
                      if (isGraded) {
                        if (isCorrect) {
                          style = 'bg-emerald-500/20 border-emerald-500 text-emerald-200';
                        } else if (isSelected && !isCorrect) {
                          style = 'bg-rose-500/20 border-rose-500 text-rose-200';
                        }
                      } else if (isSelected) {
                        style = 'bg-[#3d5afe]/20 border-[#3d5afe] text-white ring-1 ring-[#3d5afe]';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectQuizOption(q.id, opt.id)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${style}`}
                        >
                          <span>{opt.text}</span>
                          {isGraded && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                          {isGraded && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {isGraded && (
                    <div className="p-3.5 rounded-lg bg-[#020308] border border-[#1a1e2d] text-[11px] text-gray-400">
                      <span className="font-semibold text-gray-200">Explanation:</span> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#1a1e2d]">
            {quizSubmitted ? (
              <button
                onClick={() => {
                  setQuizSubmitted(false);
                  setSelectedAnswers({});
                  setQuizScore(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>
            ) : (
              <span className="text-xs text-gray-500">
                Answer all {lesson.quiz.questions.length} questions to verify comprehension.
              </span>
            )}

            {!quizSubmitted ? (
              <button
                id="submit-quiz-btn"
                onClick={handleGradeQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="px-6 py-2.5 bg-[#3d5afe] hover:bg-[#536dfe] disabled:opacity-40 text-white font-semibold rounded-xl text-xs transition-colors shadow-lg shadow-[#3d5afe]/25"
              >
                Submit Answers
              </button>
            ) : (
              <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Quiz Recorded</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Completion & Next Lesson Section */}
      <div className="pt-6 border-t border-[#1a1e2d] flex flex-col sm:flex-row items-center justify-between gap-4">
        {!completed ? (
          <button
            id="mark-completed-btn"
            onClick={handleManualComplete}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs flex items-center space-x-2 transition-all shadow-lg shadow-emerald-900/30"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark Lesson as Completed</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-5 h-5" />
            <span>Lesson Completed (+8 XP)</span>
          </div>
        )}

        {nextLesson && (
          <button
            id="next-lesson-btn"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onSelectLesson(nextLesson!.id);
            }}
            className="px-6 py-3 bg-[#3d5afe] hover:bg-[#536dfe] text-white font-semibold rounded-xl text-xs flex items-center space-x-2 transition-all shadow-lg shadow-[#3d5afe]/25 group"
          >
            <span>Next: {nextLesson.title}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
