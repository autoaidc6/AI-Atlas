import React, { useState } from 'react';
import { Bookmark, Trash2, ArrowRight, BookOpen, Sparkles, Filter } from 'lucide-react';
import { useLearning } from '../context/LearningContext';

interface BookmarksViewProps {
  onSelectLesson: (lessonId: string) => void;
  onNavigate: (view: any) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  onSelectLesson,
  onNavigate,
}) => {
  const { bookmarks, toggleBookmark } = useLearning();
  const [filterType, setFilterType] = useState<'all' | 'lesson' | 'concept'>('all');

  const filteredBookmarks = bookmarks.filter((b) => {
    if (filterType === 'all') return true;
    return b.type === filterType;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#3d5afe] uppercase tracking-wider">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Library & Bookmarks</span>
          </div>
          <h1 className="serif-display text-2xl sm:text-3xl italic text-white mt-1">
            Your Knowledge Archive
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Saved lessons, mental models, and architectural concepts for quick reference.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center space-x-1.5 bg-[#0b0d18] p-1.5 rounded-xl border border-[#1a1e2d] self-start sm:self-auto text-xs glass-border">
          {(['all', 'lesson', 'concept'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                filterType === type
                  ? 'bg-[#3d5afe]/15 text-[#3d5afe] border border-[#3d5afe]/40'
                  : 'text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}s
            </button>
          ))}
        </div>
      </div>

      {filteredBookmarks.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#080a14] border border-[#1a1e2d] flex items-center justify-center text-gray-400 mx-auto">
            <Bookmark className="w-6 h-6 text-[#3d5afe]" />
          </div>
          <h3 className="text-base font-bold text-white">No saved bookmarks yet</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Click the bookmark icon on any lesson or concept card to save it for quick retrieval.
          </p>
          <button
            onClick={() => onNavigate('learn')}
            className="px-4 py-2 bg-[#3d5afe] hover:bg-[#536dfe] text-white font-semibold rounded-xl text-xs inline-flex items-center space-x-1.5 transition-colors mt-2 shadow-lg shadow-[#3d5afe]/20"
          >
            <span>Browse Curriculum</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBookmarks.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border hover:border-gray-600 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#080a14] border border-[#1a1e2d] text-gray-300">
                      {item.type}
                    </span>
                    <span className="text-[11px] text-gray-400">{item.category}</span>
                  </div>

                  <button
                    onClick={() =>
                      toggleBookmark({
                        id: item.id,
                        type: item.type,
                        itemId: item.itemId,
                        title: item.title,
                        category: item.category,
                      })
                    }
                    title="Remove from saved"
                    className="p-1.5 text-gray-500 hover:text-rose-400 rounded-lg hover:bg-[#111424] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-[#3d5afe] transition-colors">
                  {item.title}
                </h3>

                {item.tagline && (
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {item.tagline}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#1a1e2d] flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-500">Saved on {item.savedAt}</span>

                {item.type === 'lesson' ? (
                  <button
                    onClick={() => onSelectLesson(item.itemId)}
                    className="text-[#3d5afe] font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1"
                  >
                    <span>Read Lesson</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('explore')}
                    className="text-[#3d5afe] font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1"
                  >
                    <span>Explore in Graph</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
