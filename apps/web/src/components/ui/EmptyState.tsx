import React from 'react';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center", className)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
        {icon}
      </div>
      <h3 className="text-[16px] font-[600] text-primary mb-1">{title}</h3>
      <p className="text-[14px] text-muted mb-6 max-w-sm">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
