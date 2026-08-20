import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Clock,
  CheckCircle2,
  Play,
  ArrowRight,
  Filter,
  Layers,
  ChevronRight,
  ChevronDown,
  Lock,
  Sparkles,
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { ContentCategory, DifficultyLevel, LearningPath } from '../types';
import { ProgressBar } from '../components/common/ProgressBar';

interface LearnViewProps {
  onSelectLesson: (lessonId: string) => void;
  selectedPathId?: string | null;
  onSelectPath?: (pathId: string) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  onSelectLesson,
  selectedPathId: initialPathId,
  onSelectPath,
}) => {
  const { paths, getPathProgress, isLessonCompleted } = useLearning();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activePathId, setActivePathId] = useState<string | null>(initialPathId || null);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  const categories = [
    'All',
    'AI Fundamentals',
    'Generative AI',
    'ChatGPT & LLMs',
    'Prompt Engineering',
    'AI at Work',
    'AI Agents',
    'Building AI Applications',
    'AI Engineering',
    'AI Product Management',
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filtered paths
  const filteredPaths = useMemo(() => {
    return paths.filter((p) => {
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
      const matchQuery =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchDiff && matchQuery;
    });
  }, [paths, selectedCategory, selectedDifficulty, searchQuery]);

  const activePath = useMemo(() => {
    if (!activePathId) return null;
    return paths.find((p) => p.id === activePathId) || null;
  }, [paths, activePathId]);

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const handleSelectPathCard = (pathId: string) => {
    setActivePathId(pathId);
    if (onSelectPath) onSelectPath(pathId);
    // Expand first module by default
    const p = paths.find((item) => item.id === pathId);
    if (p && p.modules[0]) {
      setExpandedModules({ [p.modules[0].id]: true });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#3d5afe] uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curriculum Atlas</span>
        </div>
        <h1 className="serif-display text-2xl sm:text-3xl italic text-white mt-1">
          12 Master Learning Paths
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Structured, modular, and distraction-free AI education from fundamental intuition to advanced systems architecture.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pathways, concepts, architectures..."
              className="w-full pl-10 pr-4 py-2 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#3d5afe]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3.5 py-2 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-gray-200 focus:outline-none focus:border-[#3d5afe]"
            >
              {difficulties.map((d) => (
                <option key={d} value={d} className="bg-[#0b0d18]">
                  {d === 'All' ? 'All Difficulties' : d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category horizontal pill row */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap ${
                selectedCategory === c
                  ? 'bg-[#3d5afe]/15 text-white border border-[#3d5afe]/50'
                  : 'bg-[#080a14] text-gray-400 hover:text-white border border-[#1a1e2d]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Path Details Drawer OR Grid of Paths */}
      {activePath ? (
        <div className="space-y-6 animate-fadeIn">
          {/* Back button to grid */}
          <button
            onClick={() => setActivePathId(null)}
            className="text-xs font-semibold text-[#3d5afe] hover:text-[#536dfe] flex items-center space-x-1.5"
          >
            <span>← Back to all 12 learning paths</span>
          </button>

          {/* Path Detailed Header */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#3d5afe] opacity-5 blur-[100px] pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2.5 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#3d5afe]/15 text-[#3d5afe] border border-[#3d5afe]/30">
                    {activePath.difficulty} • {activePath.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {activePath.totalLessons} lessons • ~{activePath.estimatedMinutes || (activePath.estimatedHours ? activePath.estimatedHours * 60 : 60)} mins
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activePath.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {activePath.description}
                </p>
              </div>

              {/* Progress pill on path */}
              {(() => {
                const prog = getPathProgress(activePath.id);
                return (
                  <div className="p-4 rounded-xl bg-[#080a14] border border-[#1a1e2d] min-w-[220px] text-xs">
                    <div className="flex justify-between items-center text-gray-400 mb-2">
                      <span>Path Progress</span>
                      <span className="font-bold text-white">{prog.percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#020308] rounded-full overflow-hidden border border-[#1a1e2d]">
                      <div
                        className="h-full bg-[#3d5afe] rounded-full transition-all duration-500"
                        style={{ width: `${prog.percent}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-gray-500 mt-2 text-center">
                      {prog.completedLessons} of {prog.totalLessons} lessons completed
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Modules & Lessons List */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Modules & Lessons</h3>

            {activePath.modules.map((mod, modIdx) => {
              const isExpanded = expandedModules[mod.id] ?? true;
              const moduleLessonsCompleted = mod.lessons.filter((l) => isLessonCompleted(l.id)).length;

              return (
                <div
                  key={mod.id}
                  className="rounded-xl bg-[#0b0d18] border border-[#1a1e2d] glass-border overflow-hidden"
                >
                  {/* Module Header */}
                  <div
                    onClick={() => toggleModule(mod.id)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-[#111424] transition-colors"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-7 h-7 rounded-lg bg-[#3d5afe]/15 border border-[#3d5afe]/30 text-[#3d5afe] flex items-center justify-center text-xs font-bold">
                        {modIdx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{mod.title}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{mod.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-400">
                        {moduleLessonsCompleted}/{mod.lessons.length} done
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Lessons List within Module */}
                  {isExpanded && (
                    <div className="p-4 pt-0 space-y-2 border-t border-[#1a1e2d] bg-[#080a14]/60">
                      {mod.lessons.map((lesson, lIdx) => {
                        const completed = isLessonCompleted(lesson.id);

                        return (
                          <div
                            key={lesson.id}
                            id={`path-lesson-${lesson.id}`}
                            onClick={() => onSelectLesson(lesson.id)}
                            className="p-3.5 rounded-xl bg-[#0b0d18] hover:bg-[#111424] border border-[#1a1e2d] hover:border-[#3d5afe]/40 transition-all cursor-pointer flex items-center justify-between group"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="shrink-0">
                                {completed ? (
                                  <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 rounded-full bg-[#080a14] border border-[#1a1e2d] flex items-center justify-center text-[11px] font-semibold text-gray-400 group-hover:text-[#3d5afe]">
                                    {lIdx + 1}
                                  </div>
                                )}
                              </div>

                              <div>
                                <div className="text-xs font-semibold text-gray-200 group-hover:text-[#3d5afe] transition-colors">
                                  {lesson.title}
                                </div>
                                <div className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                                  {lesson.bigIdea}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3 shrink-0 ml-3">
                              <span className="text-[11px] text-gray-500 flex items-center space-x-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span>{lesson.durationMinutes || lesson.estimatedMinutes || 8}m</span>
                              </span>
                              <button className="px-3 py-1 rounded-lg bg-[#3d5afe]/15 group-hover:bg-[#3d5afe] text-[#3d5afe] group-hover:text-white text-xs font-semibold transition-all">
                                {completed ? 'Review' : 'Start'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* 12 Learning Paths Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPaths.map((path) => {
            const prog = getPathProgress(path.id);

            return (
              <div
                key={path.id}
                id={`path-card-${path.id}`}
                onClick={() => handleSelectPathCard(path.id)}
                className="p-5 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border hover:border-gray-600 hover:bg-[#111424] transition-all cursor-pointer group flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#3d5afe]/10 text-[#3d5afe] border border-[#3d5afe]/20">
                      {path.difficulty}
                    </span>
                    <span className="text-[11px] text-gray-400">{path.category}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#3d5afe] transition-colors leading-snug">
                    {path.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {path.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1a1e2d]">
                  <div className="flex justify-between items-center text-[11px] text-gray-400 mb-2">
                    <span>
                      {path.totalLessons} lessons • {path.estimatedMinutes || (path.estimatedHours ? path.estimatedHours * 60 : 60)}m
                    </span>
                    <span className="font-semibold text-white">{prog.percent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#020308] rounded-full overflow-hidden border border-[#1a1e2d]">
                    <div
                      className="h-full bg-[#3d5afe] rounded-full transition-all duration-500"
                      style={{ width: `${prog.percent}%` }}
                    />
                  </div>

                  <div className="mt-3.5 flex justify-end">
                    <span className="text-xs font-semibold text-[#3d5afe] group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                      <span>Explore Path</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
