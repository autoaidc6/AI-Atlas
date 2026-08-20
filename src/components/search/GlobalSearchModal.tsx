import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, BookOpen, Map, Sparkles, ArrowRight } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { SEED_CONCEPTS } from '../../data/seedData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
  onSelectPath: (pathId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  onSelectPath,
}) => {
  const { paths } = useLearning();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'paths' | 'lessons' | 'concepts'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return { paths: paths.slice(0, 3), lessons: [], concepts: [] };
    }
    const q = query.toLowerCase();

    const matchedPaths = paths.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );

    const matchedLessons: Array<{
      id: string;
      title: string;
      bigIdea: string;
      category: string;
      difficulty: string;
      durationMinutes: number;
    }> = [];

    paths.forEach((p) => {
      p.modules.forEach((m) => {
        m.lessons.forEach((l) => {
          if (
            l.title.toLowerCase().includes(q) ||
            l.bigIdea.toLowerCase().includes(q) ||
            l.simpleExplanation.toLowerCase().includes(q) ||
            l.keyIdeas.some((k) => k.title.toLowerCase().includes(q) || k.summary.toLowerCase().includes(q))
          ) {
            matchedLessons.push({
              id: l.id,
              title: l.title,
              bigIdea: l.bigIdea,
              category: l.category,
              difficulty: l.difficulty,
              durationMinutes: l.durationMinutes,
            });
          }
        });
      });
    });

    const matchedConcepts = SEED_CONCEPTS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );

    return {
      paths: filterType === 'all' || filterType === 'paths' ? matchedPaths : [],
      lessons: filterType === 'all' || filterType === 'lessons' ? matchedLessons : [],
      concepts: filterType === 'all' || filterType === 'concepts' ? matchedConcepts : [],
    };
  }, [query, paths, filterType]);

  if (!isOpen) return null;

  const totalResultsCount = results.paths.length + results.lessons.length + results.concepts.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        id="global-search-container"
        className="w-full max-w-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#1a1e2d] flex items-center space-x-3 bg-[#0b0d18]/90">
          <Search className="w-5 h-5 text-[#3d5afe] shrink-0" />
          <input
            id="global-search-input"
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, concepts, paths, architectures..."
            className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-gray-400 hover:text-white px-2 py-1 bg-[#080a14] border border-[#1a1e2d] rounded"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#111424]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 border-b border-[#1a1e2d] bg-[#080a14]/60 flex items-center space-x-2 text-xs">
          <span className="text-gray-500 font-medium mr-1">Filter:</span>
          {(['all', 'paths', 'lessons', 'concepts'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                filterType === type
                  ? 'bg-[#3d5afe]/15 text-[#3d5afe] border border-[#3d5afe]/40'
                  : 'bg-[#0b0d18] text-gray-400 hover:text-gray-200 border border-[#1a1e2d]'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          {totalResultsCount === 0 && query && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">No exact matches found for "{query}".</p>
              <p className="text-xs text-gray-500 mt-1">Try searching for "Transformers", "RAG", "Embeddings", or "Agents".</p>
            </div>
          )}

          {/* Paths */}
          {results.paths.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center space-x-1.5">
                <Map className="w-3.5 h-3.5 text-[#3d5afe]" />
                <span>Learning Paths ({results.paths.length})</span>
              </div>
              <div className="space-y-2">
                {results.paths.map((p) => (
                  <div
                    key={p.id}
                    id={`search-result-path-${p.id}`}
                    onClick={() => {
                      onSelectPath(p.id);
                      onClose();
                    }}
                    className="p-3.5 rounded-xl bg-[#080a14] hover:bg-[#111424] border border-[#1a1e2d] hover:border-[#3d5afe]/40 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white group-hover:text-[#3d5afe] transition-colors">
                          {p.title}
                        </span>
                        <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#0b0d18] border border-[#1a1e2d] text-gray-300">
                          {p.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{p.tagline}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#3d5afe] transition-transform group-hover:translate-x-1 shrink-0 ml-3" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lessons */}
          {results.lessons.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#3d5afe]" />
                <span>Lessons ({results.lessons.length})</span>
              </div>
              <div className="space-y-2">
                {results.lessons.map((l) => (
                  <div
                    key={l.id}
                    id={`search-result-lesson-${l.id}`}
                    onClick={() => {
                      onSelectLesson(l.id);
                      onClose();
                    }}
                    className="p-3.5 rounded-xl bg-[#080a14] hover:bg-[#111424] border border-[#1a1e2d] hover:border-[#3d5afe]/40 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white group-hover:text-[#3d5afe] transition-colors">
                          {l.title}
                        </span>
                        <span className="text-[10px] font-medium text-gray-400">
                          {l.durationMinutes} min • {l.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{l.bigIdea}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#3d5afe] transition-transform group-hover:translate-x-1 shrink-0 ml-3" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Concepts */}
          {results.concepts.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#3d5afe]" />
                <span>Knowledge Graph Concepts ({results.concepts.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.concepts.map((c) => (
                  <div
                    key={c.id}
                    id={`search-result-concept-${c.id}`}
                    onClick={() => {
                      if (c.relatedLessonIds[0]) {
                        onSelectLesson(c.relatedLessonIds[0]);
                        onClose();
                      }
                    }}
                    className="p-3 rounded-xl bg-[#080a14] hover:bg-[#111424] border border-[#1a1e2d] transition-all cursor-pointer"
                  >
                    <div className="text-xs font-bold text-gray-200">{c.title}</div>
                    <p className="text-[11px] text-gray-400 line-clamp-2 mt-1">{c.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#080a14] border-t border-[#1a1e2d] flex items-center justify-between text-[11px] text-gray-500">
          <span>Navigate with click or search terms</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
