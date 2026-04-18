import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChangeDate?: (date: string) => void;
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ value, onChangeDate, className, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          type="date"
          value={value}
          onChange={(e) => onChangeDate?.(e.target.value)}
          className={cn(
            "w-full h-10 px-3 pl-10 bg-surface border border-slate-200 rounded-md text-[14px]",
            "focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all",
            "text-slate-700",
            className
          )}
          {...props}
        />
        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
