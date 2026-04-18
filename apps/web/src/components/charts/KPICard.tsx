import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: number; // e.g. 5 for +5%, -2 for -2%
  trendLabel?: string;
  icon: React.ReactNode;
  sparklineData?: number[];
  color?: 'blue' | 'green' | 'amber' | 'purple';
}

export function KPICard({ 
  title, 
  value, 
  trend, 
  trendLabel = 'vs last month', 
  icon, 
  sparklineData,
  color = 'blue'
}: KPICardProps) {
  
  const colors = {
    blue: { bg: 'bg-blue-lt', text: 'text-blue-dk', stroke: '#1E6FD9' },
    green: { bg: 'bg-green-lt', text: 'text-green-dk', stroke: '#10B981' },
    amber: { bg: 'bg-amber-lt', text: 'text-amber-dk', stroke: '#F59E0B' },
    purple: { bg: 'bg-purple-lt', text: 'text-purple', stroke: '#8B5CF6' }
  };

  const selectedColor = colors[color];

  const chartData = sparklineData?.map((val, i) => ({ value: val, index: i }));

  return (
    <Card className="flex flex-col relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border hover:border-slate-300 cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-[14px] font-[600] text-slate-500 group-hover:text-slate-700 transition-colors">{title}</h3>
        <div className={cn("p-2.5 rounded-xl shadow-sm transition-all duration-300 group-hover:scale-110", selectedColor.bg, selectedColor.text)}>
          {icon}
        </div>
      </div>
      
      <div className="flex items-end gap-3 mb-1 relative z-10">
        <h2 className="text-[32px] font-[800] text-slate-900 leading-none tracking-tight">{value}</h2>
        {trend !== undefined && (
          <div className="flex items-center gap-1 pb-1">
            {trend > 0 ? (
              <TrendingUp className="w-4 h-4 text-green" />
            ) : trend < 0 ? (
              <TrendingDown className="w-4 h-4 text-red" />
            ) : (
              <Minus className="w-4 h-4 text-slate-400" />
            )}
            <span className={cn(
              "text-[13px] font-[600]",
              trend > 0 ? "text-green" : trend < 0 ? "text-red" : "text-slate-500"
            )}>
              {Math.abs(trend)}%
            </span>
          </div>
        )}
      </div>

      {trend !== undefined && (
        <p className="text-[12px] text-slate-500 mb-4">{trendLabel}</p>
      )}

      {sparklineData && sparklineData.length > 0 && (
        <div className="h-12 w-full mt-auto relative z-0 opacity-60 group-hover:opacity-100 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={selectedColor.stroke} 
                strokeWidth={2} 
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
