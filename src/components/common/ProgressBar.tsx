import React from 'react';

interface ProgressBarProps {
  percent: number;
  className?: string;
  height?: string;
  showLabel?: boolean;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  className = '',
  height = 'h-2',
  showLabel = false,
  color = 'bg-[#3d5afe]',
}) => {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-medium">
          <span>Progress</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-[#080a14] rounded-full overflow-hidden ${height} border border-[#1a1e2d]`}>
        <div
          className={`${height} ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
