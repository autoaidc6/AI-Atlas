import React, { useState } from 'react';
import {
  Compass,
  Search,
  Sparkles,
  Network,
  ArrowRight,
  BookOpen,
  Layers,
  Zap,
  TrendingUp,
  Cpu,
  Brain,
} from 'lucide-react';
import { SEED_CONCEPTS } from '../data/seedData';
import { useLearning } from '../context/LearningContext';
import { ConceptNode } from '../types';

interface ExploreViewProps {
  onSelectLesson: (lessonId: string) => void;
  onSelectPath: (pathId: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onSelectLesson,
  onSelectPath,
}) => {
  const { paths } = useLearning();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedConcept, setSelectedConcept] = useState<ConceptNode | null>(SEED_CONCEPTS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'AI Fundamentals',
    'ChatGPT & LLMs',
    'Building AI Applications',
    'AI Agents',
    'AI Engineering',
  ];

  const filteredConcepts = SEED_CONCEPTS.filter((c) => {
    const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchQ =
      !searchQuery.trim() ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#3d5afe] uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>Knowledge Atlas & Exploration</span>
        </div>
        <h1 className="serif-display text-2xl sm:text-3xl italic text-white mt-1">
          Explore AI Concepts & Graphs
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Navigate interconnected AI principles, mental models, and frontier architectures.
        </p>
      </div>

      {/* Interactive Conceptual Knowledge Graph Explorer */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#3d5afe] opacity-5 blur-[120px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#1a1e2d] relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#3d5afe] uppercase tracking-widest">
              <Network className="w-4 h-4" />
              <span>Interactive Knowledge Map</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              Topological Connections in Modern AI
            </h3>
          </div>
          <span className="text-xs text-gray-400">Click any node to reveal architectural relationships</span>
        </div>

        {/* Visual Graph Node Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
          {SEED_CONCEPTS.map((concept) => {
            const isSelected = selectedConcept?.id === concept.id;
            return (
              <button
                key={concept.id}
                onClick={() => setSelectedConcept(concept)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#3d5afe]/20 border-[#3d5afe] ring-1 ring-[#3d5afe]/50 shadow-md shadow-[#3d5afe]/20'
                    : 'bg-[#080a14] border-[#1a1e2d] hover:bg-[#111424] hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#3d5afe]">
                    {concept.category.split(' ')[0]}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-[#3d5afe] animate-ping' : 'bg-gray-600'
                    }`}
                  />
                </div>
                <div className="text-xs font-bold text-white">{concept.title}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Concept Deep Dive Details */}
        {selectedConcept && (
          <div className="p-6 rounded-xl bg-[#080a14] border border-[#1a1e2d] space-y-4 animate-fadeIn relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#3d5afe]">
                  Concept In Focus • {selectedConcept.category}
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">{selectedConcept.title}</h4>
              </div>

              {selectedConcept.relatedLessonIds && selectedConcept.relatedLessonIds[0] && (
                <button
                  onClick={() => onSelectLesson(selectedConcept.relatedLessonIds[0])}
                  className="px-4 py-2 bg-[#3d5afe] hover:bg-[#536dfe] text-white font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-colors self-start shadow-lg shadow-[#3d5afe]/20"
                >
                  <span>Open Master Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {selectedConcept.summary}
            </p>

            {/* Related Connections */}
            {selectedConcept.connections && selectedConcept.connections.length > 0 && (
              <div className="pt-3 border-t border-[#1a1e2d] flex flex-wrap items-center gap-2 text-xs">
                <span className="text-gray-500 font-semibold">Related Nodes:</span>
                {selectedConcept.connections.map((connId) => {
                  const target = SEED_CONCEPTS.find((c) => c.id === connId);
                  if (!target) return null;
                  return (
                    <button
                      key={connId}
                      onClick={() => setSelectedConcept(target)}
                      className="px-2.5 py-1 rounded-lg bg-[#0b0d18] hover:bg-[#111424] text-gray-300 hover:text-white border border-[#1a1e2d] text-xs transition-colors"
                    >
                      ↔ {target.title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Directory & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search directory..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#3d5afe]"
            />
          </div>
        </div>

        {/* Concepts Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConcepts.map((concept) => (
            <div
              key={concept.id}
              className="p-5 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border hover:border-gray-600 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {concept.category}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#3d5afe] opacity-60 group-hover:opacity-100" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#3d5afe] transition-colors">
                  {concept.title}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-3 mt-1.5 leading-relaxed">
                  {concept.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1a1e2d] flex items-center justify-between text-xs">
                <span className="text-gray-500">{concept.connections?.length || 0} connections</span>
                {concept.relatedLessonIds && concept.relatedLessonIds[0] && (
                  <button
                    onClick={() => onSelectLesson(concept.relatedLessonIds[0])}
                    className="text-[#3d5afe] font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1"
                  >
                    <span>Read Lesson</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
