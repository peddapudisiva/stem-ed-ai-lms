import React from 'react'
import { cn } from '../../utils/cn'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'green' | 'amber' | 'red' | 'slate' | 'purple'
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'slate', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-[600] uppercase tracking-wide',
          {
            'bg-blue-lt text-blue-dk': variant === 'blue',
            'bg-green-lt text-green-dk': variant === 'green',
            'bg-amber-lt text-amber-dk': variant === 'amber',
            'bg-red-lt text-red-dk': variant === 'red',
            'bg-purple-lt text-purple': variant === 'purple',
            'bg-slate-100 text-slate-600': variant === 'slate',
          },
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
