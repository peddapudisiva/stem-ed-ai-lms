import React from 'react';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'amber' | 'red';
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ 
  value, 
  size = 'md', 
  color = 'blue', 
  className,
  showLabel = false 
}: ProgressBarProps) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  const colors = {
    blue: 'bg-blue',
    green: 'bg-green',
    amber: 'bg-amber',
    red: 'bg-red'
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className={cn("w-full flex items-center gap-3", className)}>
      <div className={cn("flex-1 bg-slate-100 rounded-full overflow-hidden", sizes[size])}>
        <div 
          className={cn("h-full transition-all duration-500 ease-out rounded-full", colors[color])}
          style={{ width: `${safeValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-[12px] font-[500] text-slate-500 w-8 text-right shrink-0">
          {Math.round(safeValue)}%
        </span>
      )}
    </div>
  );
}
