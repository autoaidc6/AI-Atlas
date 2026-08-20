import React, { useState } from 'react';
import {
  Settings,
  User,
  Crown,
  CheckCircle2,
  Clock,
  Target,
  Sparkles,
  LogOut,
  RotateCcw,
  Shield,
  CreditCard,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ExperienceLevel, LearningGoal, SubscriptionTier, TimeCommitment } from '../types';

interface SettingsViewProps {
  onRestartOnboarding: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onRestartOnboarding }) => {
  const { user, updateProfile, logout } = useAuth();

  const [name, setName] = useState(user?.name || 'Alex Chen');
  const [dailyTime, setDailyTime] = useState<TimeCommitment>(user?.dailyTimeMinutes || 10);
  const [experience, setExperience] = useState<ExperienceLevel>(user?.experienceLevel || 'know_basics');
  const [subscription, setSubscription] = useState<SubscriptionTier>(user?.subscriptionTier || 'free');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      dailyTimeMinutes: dailyTime,
      experienceLevel: experience,
      subscriptionTier: subscription,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleUpgradeTier = (tier: SubscriptionTier) => {
    setSubscription(tier);
    updateProfile({ subscriptionTier: tier });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#3d5afe] uppercase tracking-wider">
          <Settings className="w-3.5 h-3.5" />
          <span>Account & Preferences</span>
        </div>
        <h1 className="serif-display text-2xl sm:text-3xl italic text-white mt-1">
          Settings & Subscription
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Manage your AI learning profile, daily commitment, and subscription tier.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border space-y-6">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <User className="w-4 h-4 text-[#3d5afe]" />
          <span>Learner Profile</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#3d5afe]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Email Address</label>
            <input
              type="email"
              disabled
              value={user?.email || 'alex.chen@example.com'}
              className="w-full px-3.5 py-2.5 bg-[#080a14]/50 border border-[#1a1e2d]/50 rounded-xl text-xs text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Daily Time Commitment</label>
            <select
              value={dailyTime}
              onChange={(e) => setDailyTime(Number(e.target.value) as TimeCommitment)}
              className="w-full px-3.5 py-2.5 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#3d5afe]"
            >
              <option value={5} className="bg-[#0b0d18]">5 minutes / day (1 lesson)</option>
              <option value={10} className="bg-[#0b0d18]">10 minutes / day (1 lesson + quiz)</option>
              <option value={20} className="bg-[#0b0d18]">20 minutes / day (2 lessons)</option>
              <option value={30} className="bg-[#0b0d18]">30+ minutes / day (Intensive)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Experience Level</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value as ExperienceLevel)}
              className="w-full px-3.5 py-2.5 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#3d5afe]"
            >
              <option value="completely_new" className="bg-[#0b0d18]">Completely New</option>
              <option value="know_basics" className="bg-[#0b0d18]">Know the Basics</option>
              <option value="use_tools_regularly" className="bg-[#0b0d18]">Use AI Tools Regularly</option>
              <option value="work_with_ai" className="bg-[#0b0d18]">Work with AI</option>
              <option value="technical_developer" className="bg-[#0b0d18]">Technical Developer</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#1a1e2d]">
          <button
            type="button"
            onClick={onRestartOnboarding}
            className="text-xs font-semibold text-gray-400 hover:text-[#3d5afe] flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake AI Onboarding Quiz</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#3d5afe] hover:bg-[#536dfe] text-white font-semibold rounded-xl text-xs shadow-lg shadow-[#3d5afe]/25 transition-colors"
          >
            Save Profile
          </button>
        </div>
      </form>

      {/* Subscription Plans */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Subscription & Membership</span>
          </h3>
          <p className="text-xs text-gray-400">Choose the plan that matches your AI acceleration goals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Free Tier */}
          <div className={`p-5 rounded-2xl bg-[#0b0d18] border glass-border flex flex-col justify-between ${
            user?.subscriptionTier === 'free' ? 'border-[#3d5afe]/60 ring-1 ring-[#3d5afe]/30' : 'border-[#1a1e2d]'
          }`}>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-300">Free Tier</span>
                {user?.subscriptionTier === 'free' && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#3d5afe]/15 text-[#3d5afe] border border-[#3d5afe]/30">
                    Active
                  </span>
                )}
              </div>
              <div className="text-2xl font-extrabold text-white mb-2">$0 <span className="text-xs font-normal text-gray-400">/ forever</span></div>
              <p className="text-xs text-gray-400 mb-4">Core intuition and foundational lessons.</p>

              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>3 Starting learning paths</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interactive quizzes & scores</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Basic Ask Atlas tutor</span>
                </div>
              </div>
            </div>

            <button
              disabled={user?.subscriptionTier === 'free'}
              onClick={() => handleUpgradeTier('free')}
              className="mt-6 w-full py-2 bg-[#080a14] hover:bg-[#111424] border border-[#1a1e2d] disabled:opacity-50 text-white rounded-xl text-xs font-semibold"
            >
              {user?.subscriptionTier === 'free' ? 'Current Plan' : 'Downgrade to Free'}
            </button>
          </div>

          {/* Atlas Plus */}
          <div className={`p-5 rounded-2xl bg-[#0b0d18] border glass-border flex flex-col justify-between relative ${
            user?.subscriptionTier === 'plus' ? 'border-[#3d5afe] ring-1 ring-[#3d5afe]' : 'border-[#1a1e2d]'
          }`}>
            <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-[#3d5afe] text-white text-[9px] font-bold uppercase tracking-wider">
              Most Popular
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#3d5afe]">Atlas Plus</span>
                {user?.subscriptionTier === 'plus' && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#3d5afe]/15 text-[#3d5afe] border border-[#3d5afe]/30">
                    Active
                  </span>
                )}
              </div>
              <div className="text-2xl font-extrabold text-white mb-2">$12 <span className="text-xs font-normal text-gray-400">/ month</span></div>
              <p className="text-xs text-gray-400 mb-4">Unlimited learning paths & full AI tutor.</p>

              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>All 12 Learning Paths</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Full Gemini AI Tutor</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Personalized Fluency Index</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Knowledge Graph Explorer</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleUpgradeTier('plus')}
              className="mt-6 w-full py-2 bg-[#3d5afe] hover:bg-[#536dfe] text-white rounded-xl text-xs font-semibold shadow-lg shadow-[#3d5afe]/25 transition-colors"
            >
              {user?.subscriptionTier === 'plus' ? 'Active' : 'Upgrade to Plus'}
            </button>
          </div>

          {/* Atlas Pro */}
          <div className={`p-5 rounded-2xl bg-[#0b0d18] border glass-border flex flex-col justify-between ${
            user?.subscriptionTier === 'pro' ? 'border-[#3d5afe] ring-1 ring-[#3d5afe]' : 'border-[#1a1e2d]'
          }`}>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-white">Atlas Pro & Enterprise</span>
                {user?.subscriptionTier === 'pro' && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#3d5afe]/15 text-[#3d5afe] border border-[#3d5afe]/30">
                    Active
                  </span>
                )}
              </div>
              <div className="text-2xl font-extrabold text-white mb-2">$29 <span className="text-xs font-normal text-gray-400">/ month</span></div>
              <p className="text-xs text-gray-400 mb-4">Architecture deep dives, CMS authoring, and teams.</p>

              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Everything in Plus</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Curriculum CMS Authoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Team Fluency Reports</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Exportable Certificates</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleUpgradeTier('pro')}
              className="mt-6 w-full py-2 bg-[#3d5afe] hover:bg-[#536dfe] text-white rounded-xl text-xs font-semibold shadow-lg shadow-[#3d5afe]/25 transition-colors"
            >
              {user?.subscriptionTier === 'pro' ? 'Active' : 'Upgrade to Pro'}
            </button>
          </div>
        </div>
      </div>

      {/* Logout button */}
      <div className="p-4 rounded-xl bg-[#0b0d18] border border-[#1a1e2d] glass-border flex items-center justify-between">
        <span className="text-xs text-gray-400">Signed in as {user?.email}</span>
        <button
          onClick={logout}
          className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1.5 font-semibold"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
