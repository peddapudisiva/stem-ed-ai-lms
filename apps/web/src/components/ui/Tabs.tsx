import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: 'underline' | 'pills';
}

export function Tabs({ tabs, activeId, onChange, className, variant = 'underline' }: TabsProps) {
  return (
    <div className={cn("flex items-center gap-2", {
      "border-b": variant === 'underline'
    }, className)}>
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-4 py-2 text-[14px] font-[500] transition-colors focus:outline-none flex items-center gap-2",
              {
                "text-primary": isActive,
                "text-slate-500 hover:text-slate-800": !isActive,
                "rounded-full": variant === 'pills',
                "bg-slate-100": variant === 'pills' && isActive,
                "hover:bg-slate-50": variant === 'pills' && !isActive
              }
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn("px-2 py-0.5 rounded-full text-[11px]", {
                "bg-primary text-white": isActive,
                "bg-slate-100 text-slate-500": !isActive
              })}>
                {tab.count}
              </span>
            )}
            
            {isActive && variant === 'underline' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
