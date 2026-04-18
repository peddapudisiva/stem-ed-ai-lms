import React from 'react'
import { cn } from '../../utils/cn'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-sm h-[36px] px-4 text-[14px] font-[600] transition-fast',
          'disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]',
          {
            'bg-blue text-white shadow-sm hover:bg-blue-dk hover:shadow-md': variant === 'primary',
            'bg-surface border border-slate-300 text-primary hover:bg-slate-50': variant === 'secondary',
            'bg-red text-white hover:bg-red-dk': variant === 'danger',
            'bg-transparent text-slate-600 hover:bg-slate-100': variant === 'ghost',
          },
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
