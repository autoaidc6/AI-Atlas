import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LearningProvider } from './context/LearningContext';
import { TutorProvider } from './context/TutorContext';
import { AppShell, AppView } from './components/layout/AppShell';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { AuthModal } from './components/auth/AuthModal';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';

import { HomeView } from './views/HomeView';
import { LearnView } from './views/LearnView';
import { LessonView } from './views/LessonView';
import { ExploreView } from './views/ExploreView';
import { ProgressView } from './views/ProgressView';
import { BookmarksView } from './views/BookmarksView';
import { AdminView } from './views/AdminView';
import { SettingsView } from './views/SettingsView';

const MainApp: React.FC = () => {
  const { user } = useAuth();

  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Auto trigger onboarding if not completed
  useEffect(() => {
    if (user && !user.onboardingCompleted) {
      setIsOnboardingOpen(true);
    }
  }, [user]);

  // Global Keyboard shortcuts (Cmd+K or Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPath = (pathId: string) => {
    setSelectedPathId(pathId);
    setCurrentView('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    if (view !== 'lesson') {
      setSelectedLessonId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppShell
      currentView={currentView}
      onNavigate={handleNavigate}
      onOpenSearch={() => setIsSearchOpen(true)}
      onOpenAuth={() => setIsAuthOpen(true)}
    >
      {currentView === 'home' && (
        <HomeView
          onSelectLesson={handleSelectLesson}
          onSelectPath={handleSelectPath}
          onNavigate={handleNavigate}
        />
      )}

      {currentView === 'learn' && (
        <LearnView
          onSelectLesson={handleSelectLesson}
          selectedPathId={selectedPathId}
          onSelectPath={setSelectedPathId}
        />
      )}

      {currentView === 'lesson' && selectedLessonId && (
        <LessonView
          lessonId={selectedLessonId}
          onBack={() => handleNavigate('learn')}
          onSelectLesson={handleSelectLesson}
        />
      )}

      {currentView === 'explore' && (
        <ExploreView
          onSelectLesson={handleSelectLesson}
          onSelectPath={handleSelectPath}
        />
      )}

      {currentView === 'progress' && (
        <ProgressView onSelectLesson={handleSelectLesson} />
      )}

      {currentView === 'bookmarks' && (
        <BookmarksView
          onSelectLesson={handleSelectLesson}
          onNavigate={handleNavigate}
        />
      )}

      {currentView === 'admin' && (
        <AdminView onSelectLesson={handleSelectLesson} />
      )}

      {currentView === 'settings' && (
        <SettingsView
          onRestartOnboarding={() => setIsOnboardingOpen(true)}
        />
      )}

      {/* Global Modals */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onComplete={() => setIsOnboardingOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={handleSelectLesson}
        onSelectPath={handleSelectPath}
      />
    </AppShell>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LearningProvider>
        <TutorProvider>
          <MainApp />
        </TutorProvider>
      </LearningProvider>
    </AuthProvider>
  );
}
