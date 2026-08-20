import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, ArrowLeft, Clock, Target, Compass, BookOpen } from 'lucide-react';
import { ExperienceLevel, LearningGoal, TimeCommitment } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  const { updateOnboarding } = useAuth();
  const { paths } = useLearning();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [experience, setExperience] = useState<ExperienceLevel>('know_basics');
  const [goals, setGoals] = useState<LearningGoal[]>(['better_at_job']);
  const [time, setTime] = useState<TimeCommitment>(10);
  const [startingTopic, setStartingTopic] = useState<string>('path-2');

  if (!isOpen) return null;

  const toggleGoal = (g: LearningGoal) => {
    if (goals.includes(g)) {
      if (goals.length > 1) {
        setGoals(goals.filter((item) => item !== g));
      }
    } else {
      setGoals([...goals, g]);
    }
  };

  const handleFinish = () => {
    updateOnboarding({
      experienceLevel: experience,
      learningGoals: goals,
      dailyTimeMinutes: time,
      startingPathId: startingTopic,
    });
    onComplete();
  };

  const selectedPath = paths.find((p) => p.id === startingTopic) || paths[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        id="onboarding-card"
        className="w-full max-w-xl bg-[#0b0d18] border border-[#1a1e2d] glass-border rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Top Progress Track */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#3d5afe]/15 border border-[#3d5afe]/30 flex items-center justify-center text-[#3d5afe] font-bold text-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="serif-display text-sm font-semibold text-gray-200 tracking-wide">AI Atlas Onboarding</span>
          </div>
          <div className="flex items-center space-x-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step >= i ? 'w-6 bg-[#3d5afe]' : 'w-2 bg-[#1a1e2d]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Experience Level */}
        {step === 1 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#3d5afe]">Step 1 of 4</span>
              <h2 className="serif-display text-2xl font-bold text-white mt-1">What is your AI experience?</h2>
              <p className="text-sm text-gray-400 mt-1">We’ll tailor every explanation and technical depth to your background.</p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'completely_new', label: "I'm completely new", desc: 'No prior AI background. Want clear intuitive explanations without jargon.' },
                { id: 'know_basics', label: 'I know the basics', desc: 'Used ChatGPT and understand general concepts, but want deeper mechanics.' },
                { id: 'use_tools_regularly', label: 'I use AI tools regularly', desc: 'Daily user of LLM tools looking to master prompt steering and RAG workflows.' },
                { id: 'work_with_ai', label: 'I work with AI', desc: 'Product manager, designer, or analyst directing AI-driven product features.' },
                { id: 'technical_developer', label: "I'm technical / developer", desc: 'Software engineer building production LLM apps, embeddings, and agents.' },
              ].map((item) => (
                <button
                  key={item.id}
                  id={`experience-${item.id}`}
                  onClick={() => setExperience(item.id as ExperienceLevel)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start justify-between ${
                    experience === item.id
                      ? 'bg-[#3d5afe]/15 border-[#3d5afe] ring-1 ring-[#3d5afe]/50 shadow-sm'
                      : 'bg-[#080a14] border-[#1a1e2d] hover:bg-[#111424] hover:border-gray-600'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm text-white">{item.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                  </div>
                  {experience === item.id && (
                    <div className="w-5 h-5 rounded-full bg-[#3d5afe] flex items-center justify-center text-white shrink-0 ml-3">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                id="onboarding-next-1"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-[#3d5afe] hover:bg-[#536dfe] text-white font-medium rounded-xl text-sm flex items-center space-x-2 transition-colors shadow-lg shadow-[#3d5afe]/25"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Learning Goals */}
        {step === 2 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#3d5afe]">Step 2 of 4</span>
              <h2 className="serif-display text-2xl font-bold text-white mt-1">Why are you learning AI?</h2>
              <p className="text-sm text-gray-400 mt-1">Select all that apply to guide your recommendation engine.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'better_at_job', label: 'Become better at my job', icon: Target },
                { id: 'build_products', label: 'Build AI products', icon: Compass },
                { id: 'start_business', label: 'Start an AI business', icon: Sparkles },
                { id: 'become_engineer', label: 'Become an AI engineer', icon: BookOpen },
                { id: 'understand_revolution', label: 'Understand the AI revolution', icon: Compass },
                { id: 'research', label: 'Research & frontier science', icon: Target },
                { id: 'personal_curiosity', label: 'Personal curiosity', icon: Sparkles },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = goals.includes(item.id as LearningGoal);
                return (
                  <button
                    key={item.id}
                    id={`goal-${item.id}`}
                    onClick={() => toggleGoal(item.id as LearningGoal)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#3d5afe]/15 border-[#3d5afe] ring-1 ring-[#3d5afe]/50'
                        : 'bg-[#080a14] border-[#1a1e2d] hover:bg-[#111424] hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#3d5afe]' : 'text-gray-400'}`} />
                      <span className="text-xs font-semibold text-gray-200">{item.label}</span>
                    </div>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-[#3d5afe] flex items-center justify-center text-white shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-gray-400 hover:text-white text-sm font-medium flex items-center space-x-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                id="onboarding-next-2"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-[#3d5afe] hover:bg-[#536dfe] text-white font-medium rounded-xl text-sm flex items-center space-x-2 transition-colors shadow-lg shadow-[#3d5afe]/25"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Daily Time Commitment */}
        {step === 3 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#3d5afe]">Step 3 of 4</span>
              <h2 className="serif-display text-2xl font-bold text-white mt-1">How much time do you have?</h2>
              <p className="text-sm text-gray-400 mt-1">Short, focused micro-lessons designed for maximum retention.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 5, label: '5 minutes / day', desc: '1 bite-sized lesson', badge: 'Casual' },
                { id: 10, label: '10 minutes / day', desc: '1 lesson + quiz check', badge: 'Recommended' },
                { id: 20, label: '20 minutes / day', desc: '2 lessons + exercise', badge: 'Pro' },
                { id: 30, label: '30+ minutes / day', desc: 'Full module deep dive', badge: 'Intensive' },
              ].map((item) => (
                <button
                  key={item.id}
                  id={`time-${item.id}`}
                  onClick={() => setTime(item.id as TimeCommitment)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 relative ${
                    time === item.id
                      ? 'bg-[#3d5afe]/15 border-[#3d5afe] ring-1 ring-[#3d5afe]/50'
                      : 'bg-[#080a14] border-[#1a1e2d] hover:bg-[#111424] hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Clock className={`w-5 h-5 ${time === item.id ? 'text-[#3d5afe]' : 'text-gray-400'}`} />
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0b0d18] border border-[#1a1e2d] text-gray-300">
                      {item.badge}
                    </span>
                  </div>
                  <div className="font-semibold text-sm text-white">{item.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 text-gray-400 hover:text-white text-sm font-medium flex items-center space-x-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                id="onboarding-next-3"
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-[#3d5afe] hover:bg-[#536dfe] text-white font-medium rounded-xl text-sm flex items-center space-x-2 transition-colors shadow-lg shadow-[#3d5afe]/25"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Starting Topic Focus */}
        {step === 4 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#3d5afe]">Step 4 of 4</span>
              <h2 className="serif-display text-2xl font-bold text-white mt-1">What would you like to learn first?</h2>
              <p className="text-sm text-gray-400 mt-1">Choose the primary learning path to anchor your custom journey.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {paths.slice(0, 8).map((path) => (
                <button
                  key={path.id}
                  id={`topic-${path.id}`}
                  onClick={() => setStartingTopic(path.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-start justify-between ${
                    startingTopic === path.id
                      ? 'bg-[#3d5afe]/15 border-[#3d5afe] ring-1 ring-[#3d5afe]/50'
                      : 'bg-[#080a14] border-[#1a1e2d] hover:bg-[#111424] hover:border-gray-600'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#3d5afe]">{path.difficulty}</span>
                    <div className="font-semibold text-xs text-white mt-0.5">{path.title}</div>
                    <div className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{path.tagline}</div>
                  </div>
                  {startingTopic === path.id && (
                    <div className="w-4 h-4 rounded-full bg-[#3d5afe] flex items-center justify-center text-white shrink-0 ml-2">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2.5 text-gray-400 hover:text-white text-sm font-medium flex items-center space-x-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                id="onboarding-next-4"
                onClick={() => setStep(5)}
                className="px-6 py-2.5 bg-[#3d5afe] hover:bg-[#536dfe] text-white font-medium rounded-xl text-sm flex items-center space-x-2 transition-colors shadow-lg shadow-[#3d5afe]/25"
              >
                <span>Generate Path</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Personalized Journey Ready */}
        {step === 5 && (
          <div className="text-center py-2 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-[#3d5afe]/20 border border-[#3d5afe]/50 flex items-center justify-center text-[#3d5afe] mx-auto mb-4 shadow-lg shadow-[#3d5afe]/20">
              <Sparkles className="w-8 h-8" />
            </div>

            <h2 className="serif-display text-2xl font-bold text-white">Your AI journey is ready.</h2>
            <p className="text-sm text-gray-400 mt-1 max-w-md mx-auto">
              We’ve crafted a personalized starting curriculum tailored to your {experience.replace('_', ' ')} background.
            </p>

            <div className="my-6 p-5 rounded-xl bg-[#080a14] border border-[#1a1e2d] text-left">
              <div className="flex items-center justify-between text-xs text-[#3d5afe] font-semibold uppercase tracking-wider mb-2">
                <span>Recommended Starting Path</span>
                <span>{selectedPath.difficulty}</span>
              </div>
              <div className="serif-display text-lg font-bold text-white">{selectedPath.title}</div>
              <p className="text-xs text-gray-300 mt-1">{selectedPath.tagline}</p>

              <div className="mt-4 pt-4 border-t border-[#1a1e2d] flex items-center justify-between text-xs text-gray-400">
                <span className="font-semibold text-gray-200">27 structured lessons</span>
                <span>~4 hours total</span>
                <span className="text-emerald-400 font-medium">Beginner → AI Practitioner</span>
              </div>
            </div>

            <button
              id="onboarding-start-btn"
              onClick={handleFinish}
              className="w-full py-3.5 bg-[#3d5afe] hover:bg-[#536dfe] text-white font-semibold rounded-xl text-sm flex items-center justify-center space-x-2 transition-all shadow-xl shadow-[#3d5afe]/30 transform hover:-translate-y-0.5"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
