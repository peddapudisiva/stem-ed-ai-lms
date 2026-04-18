import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface BarChartProps {
  data: any[];
  xKey: string;
  series: { key: string; name: string; color: string }[];
  height?: number;
}

export function BarChart({ data, xKey, series, height = 300 }: BarChartProps) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis 
            dataKey={xKey} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748B', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748B', fontSize: 12 }} 
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)', padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}
          />
          {series.length > 1 && <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />}
          
          <defs>
            {series.map((s) => (
              <linearGradient key={`grad-${s.key}`} id={`color-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity={1}/>
                <stop offset="100%" stopColor={s.color} stopOpacity={0.6}/>
              </linearGradient>
            ))}
          </defs>

          {series.map((s, idx) => (
            <Bar 
              key={s.key} 
              dataKey={s.key} 
              name={s.name} 
              fill={`url(#color-${s.key})`}
              radius={[6, 6, 0, 0]} 
              barSize={40}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
