import React from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ 
  title = "Something went wrong", 
  message = "We encountered an unexpected error while loading this content.",
  onRetry,
  className 
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center bg-red-50/50 rounded-lg border border-red-100", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
        <AlertOctagon className="h-6 w-6" />
      </div>
      <h3 className="text-[16px] font-[600] text-slate-800 mb-2">{title}</h3>
      <p className="text-[14px] text-slate-600 mb-6 max-w-sm">{message}</p>
      
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="gap-2 text-slate-700 bg-white hover:bg-slate-50">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
