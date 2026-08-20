import React from 'react';
import { Bookmark } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { ContentCategory } from '../../types';

interface BookmarkButtonProps {
  itemId: string;
  title: string;
  category: ContentCategory;
  tagline?: string;
  type?: 'lesson' | 'concept' | 'resource';
  className?: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  itemId,
  title,
  category,
  tagline,
  type = 'lesson',
  className = '',
}) => {
  const { isBookmarked, toggleBookmark } = useLearning();
  const bookmarked = isBookmarked(itemId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark({
      id: `bm-${itemId}`,
      type,
      itemId,
      title,
      category,
      tagline,
    });
  };

  return (
    <button
      id={`bookmark-btn-${itemId}`}
      onClick={handleClick}
      title={bookmarked ? 'Remove from bookmarks' : 'Save for later'}
      className={`p-2 rounded-lg transition-all duration-200 ${
        bookmarked
          ? 'bg-[#3d5afe]/15 text-[#3d5afe] border border-[#3d5afe]/30 hover:bg-[#3d5afe]/25'
          : 'text-gray-400 hover:text-white hover:bg-[#111424] border border-transparent'
      } ${className}`}
    >
      <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
    </button>
  );
};
