import React from 'react';
import { Sparkles, Flame, Search, BookOpen, Bot, Shield, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { useTutor } from '../../context/TutorContext';

interface TopNavProps {
  currentView: string;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onNavigate: (view: any) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentView,
  onOpenSearch,
  onOpenAuth,
  onNavigate,
}) => {
  const { user, isAuthenticated } = useAuth();
  const { notifications, markNotificationRead } = useLearning();
  const { openTutor } = useTutor();

  const [showNotifications, setShowNotifications] = React.useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 w-full bg-[#020308]/90 backdrop-blur-md border-b border-[#1a1e2d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand / Logo */}
        <div className="flex items-center space-x-6">
          <button
            id="nav-brand-logo"
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 text-left group"
          >
            <div className="w-8 h-8 bg-[#3d5afe] rounded-lg flex items-center justify-center font-bold text-white shadow-md shadow-[#3d5afe]/20 group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg tracking-tight text-white group-hover:text-[#3d5afe] transition-colors">
                AI Atlas
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-[#3d5afe]/15 text-[#3d5afe] border border-[#3d5afe]/30">
                PRO
              </span>
            </div>
          </button>
        </div>

        {/* Center: Search bar shortcut */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <button
            id="top-search-trigger"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-4 py-2 bg-[#0b0d18] hover:bg-[#111424] border border-[#1a1e2d] hover:border-[#3d5afe]/40 rounded-xl text-xs text-gray-400 transition-colors"
          >
            <div className="flex items-center space-x-2.5">
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <span>Search 12 learning paths, concepts, architectures...</span>
            </div>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#020308] text-gray-400 rounded border border-[#1a1e2d]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Stats, Ask Atlas button & User */}
        <div className="flex items-center space-x-3">
          {/* Mobile search icon */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#0b0d18]"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Streak pill */}
          {user && (
            <div
              id="top-streak-pill"
              title={`${user.currentStreak} day learning streak`}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold"
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{user.currentStreak}d</span>
            </div>
          )}

          {/* Fluency Score Pill */}
          {user && (
            <button
              id="top-fluency-pill"
              onClick={() => onNavigate('progress')}
              title="View AI Fluency breakdown"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#3d5afe]/10 border border-[#3d5afe]/30 text-[#3d5afe] hover:bg-[#3d5afe]/20 text-xs font-semibold transition-colors"
            >
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Fluency</span>
              <span className="font-bold text-white">{user.fluencyScore}%</span>
            </button>
          )}

          {/* Ask Atlas Tutor Trigger */}
          <button
            id="top-ask-atlas-btn"
            onClick={() => openTutor()}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#3d5afe] hover:bg-[#536dfe] text-white text-xs font-semibold shadow-md shadow-[#3d5afe]/25 transition-all"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask Atlas</span>
          </button>

          {/* Notification Center */}
          <div className="relative">
            <button
              id="top-notifications-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#0b0d18] relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#3d5afe] animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0b0d18] border border-[#1a1e2d] rounded-xl shadow-2xl p-3 z-50 animate-fadeIn glass-border">
                <div className="flex items-center justify-between pb-2 border-b border-[#1a1e2d] text-xs font-bold text-gray-200">
                  <span>Notifications</span>
                  <span className="text-[10px] text-[#3d5afe]">{unreadCount} unread</span>
                </div>
                <div className="space-y-2 mt-2 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.targetLessonId) {
                          onNavigate('learn');
                        }
                      }}
                      className={`p-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                        n.read ? 'bg-[#020308]/40 text-gray-400' : 'bg-[#111424] text-gray-200 font-medium'
                      }`}
                    >
                      <div className="font-semibold text-white">{n.title}</div>
                      <p className="text-[11px] text-gray-400 mt-0.5">{n.message}</p>
                      <span className="text-[9px] text-gray-500 mt-1 block">{n.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar / Sign In */}
          {isAuthenticated && user ? (
            <button
              id="top-profile-btn"
              onClick={() => onNavigate('settings')}
              className="flex items-center space-x-2 p-0.5 rounded-full hover:ring-2 hover:ring-[#3d5afe]/50 transition-all"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-[#1a1e2d]"
              />
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-lg bg-[#0b0d18] hover:bg-[#111424] text-white text-xs font-semibold border border-[#1a1e2d] transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
