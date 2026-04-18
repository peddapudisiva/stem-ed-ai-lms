import React from 'react'
import { cn } from '../../utils/cn'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials: string
  role?: 'admin' | 'teacher' | 'student' | 'parent'
  src?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, initials, role, src, size = 'md', ...props }, ref) => {
    const roleColors = {
      admin: 'bg-purple-lt text-purple font-bold',
      teacher: 'bg-green-lt text-green-dk font-bold',
      student: 'bg-teal-lt text-teal font-bold',
      parent: 'bg-amber-lt text-amber-dk font-bold',
      default: 'bg-slate-100 text-slate-600 font-bold',
    }

    const sizeClasses = {
      sm: 'w-8 h-8 text-[11px]',
      md: 'w-10 h-10 text-[14px]',
      lg: 'w-16 h-16 text-[20px]',
    }

    const colorClass = role ? roleColors[role] : roleColors.default

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 items-center justify-center rounded-full overflow-hidden',
          sizeClasses[size],
          !src && colorClass,
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          initials.substring(0, 2).toUpperCase()
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'
