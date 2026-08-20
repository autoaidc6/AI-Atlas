import React from 'react';
import {
  Home,
  BookOpen,
  Compass,
  BarChart2,
  Bookmark,
  Settings,
  Database,
  Layers,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { TopNav } from './TopNav';
import { AskAtlasPanel } from '../tutor/AskAtlasPanel';
import { useAuth } from '../../context/AuthContext';

export type AppView = 'home' | 'learn' | 'lesson' | 'explore' | 'progress' | 'bookmarks' | 'admin' | 'settings';

interface AppShellProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenAuth,
  children,
}) => {
  const { user } = useAuth();

  const navItems = [
    { id: 'home', label: 'Today', icon: Home },
    { id: 'learn', label: 'Curriculum', icon: BookOpen },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'progress', label: 'Fluency', icon: BarChart2 },
    { id: 'bookmarks', label: 'Saved', icon: Bookmark },
  ];

  return (
    <div className="min-h-screen bg-[#020308] text-[#e0e1e6] flex flex-col selection:bg-[#3d5afe]/30 selection:text-white">
      {/* Top Header */}
      <TopNav
        currentView={currentView}
        onOpenSearch={onOpenSearch}
        onOpenAuth={onOpenAuth}
        onNavigate={onNavigate}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-60 shrink-0 flex flex-row md:flex-col justify-between md:justify-start gap-1">
          <div className="flex flex-row md:flex-col gap-1.5 w-full overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id || (item.id === 'learn' && currentView === 'lesson');
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id as AppView)}
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#3d5afe]/15 text-white border border-[#3d5afe]/40 shadow-sm shadow-[#3d5afe]/10'
                      : 'text-gray-400 hover:text-white hover:bg-[#0b0d18] border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#3d5afe]' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Secondary Admin & Settings links */}
          <div className="hidden md:flex flex-col gap-1.5 pt-6 mt-6 border-t border-[#1a1e2d]">
            <button
              id="nav-link-admin"
              onClick={() => onNavigate('admin')}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'admin'
                  ? 'bg-[#3d5afe]/15 text-white border border-[#3d5afe]/40'
                  : 'text-gray-400 hover:text-white hover:bg-[#0b0d18] border border-transparent'
              }`}
            >
              <Database className="w-4 h-4 text-gray-400" />
              <span>Curriculum CMS</span>
            </button>

            <button
              id="nav-link-settings"
              onClick={() => onNavigate('settings')}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'settings'
                  ? 'bg-[#3d5afe]/15 text-white border border-[#3d5afe]/40'
                  : 'text-gray-400 hover:text-white hover:bg-[#0b0d18] border border-transparent'
              }`}
            >
              <Settings className="w-4 h-4 text-gray-400" />
              <span>Settings</span>
            </button>

            {/* AI Fluency Score & Daily goal card in sidebar matching design */}
            {user && (
              <div className="mt-6 p-4 bg-[#0b0d18] rounded-xl glass-border text-xs space-y-3">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-semibold">
                    AI Fluency Score
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {user.fluencyScore}<span className="text-xs font-normal text-gray-400">/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#020308] rounded-full overflow-hidden border border-[#1a1e2d]">
                    <div
                      className="h-full bg-[#3d5afe] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(user.fluencyScore, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1a1e2d] flex justify-between items-center text-gray-400 text-[11px]">
                  <span>Daily: {user.dailyTimeMinutes}m</span>
                  <span className="text-emerald-400 font-semibold">{user.currentStreak}d Streak 🔥</span>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      {/* Slide-over Ask Atlas Panel */}
      <AskAtlasPanel />
    </div>
  );
};
