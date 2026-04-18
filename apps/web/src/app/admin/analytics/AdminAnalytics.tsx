import React from 'react';
import { Card } from '../../../components/ui/Card';
import { LineChart } from '../../../components/charts/LineChart';
import { PieChart } from '../../../components/charts/PieChart';
import { DEMO_ANALYTICS } from '../../../data/analytics';
import { TrendingUp, Users, Award, BookOpen, Clock } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';

export function AdminAnalytics() {
  const enrollmentData = [
    { name: 'Freshmen (9th)', value: 340 },
    { name: 'Sophomores (10th)', value: 310 },
    { name: 'Juniors (11th)', value: 298 },
    { name: 'Seniors (12th)', value: 300 },
  ];
  const pieColors = ['#0EA5E9', '#8B5CF6', '#F59E0B', '#10B981'];

  const performanceTrendData = [
    { month: 'Aug', math: 78, science: 81, english: 85 },
    { month: 'Sep', math: 80, science: 82, english: 86 },
    { month: 'Oct', math: 82, science: 85, english: 87 },
    { month: 'Nov', math: 81, science: 84, english: 88 },
    { month: 'Dec', math: 85, science: 88, english: 89 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 w-full mt-2">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-2">
        <div className="relative">
          <div className="absolute -left-8 -top-8 w-24 h-24 bg-blue-400/10 rounded-full blur-xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/50 border border-blue-100 mb-4 text-blue-dk shadow-sm backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[11px] font-[700] uppercase tracking-wider">Metrics</span>
          </div>
          <h1 className="text-[36px] font-[800] tracking-tight text-slate-900 leading-tight">Analytics <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">& Reports</span></h1>
          <p className="text-slate-500 text-[16px] mt-2 max-w-xl">Comprehensive overview of school performance, standard masteries, and cohort metrics.</p>
        </div>
        <div className="flex bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50 shadow-inner backdrop-blur-sm">
          <button className="px-3 py-1.5 text-[13px] font-[500] rounded bg-white shadow-sm text-slate-800">This Term</button>
          <button className="px-3 py-1.5 text-[13px] font-[500] rounded text-slate-500 hover:text-slate-700">Last Term</button>
          <button className="px-3 py-1.5 text-[13px] font-[500] rounded text-slate-500 hover:text-slate-700">Year to Date</button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <MetricCard title="Enrollment" value="1,248" trend="+2.4%" icon={<Users />} />
        <MetricCard title="Avg Attendance" value="94.5%" trend="-0.5%" icon={<Clock />} />
        <MetricCard title="Avg GPA" value="3.14" trend="+1.2%" icon={<TrendingUp />} />
        <MetricCard title="Honors" value="412" trend="+5.0%" icon={<Award />} />
        <MetricCard title="Courses" value="86" trend="0%" icon={<BookOpen />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h2 className="text-[18px] font-[600] mb-6">Subject Performance Trends</h2>
          <LineChart 
            data={performanceTrendData} 
            xKey="month" 
            height={350}
            series={[
              { key: 'math', name: 'Mathematics', color: '#0EA5E9' },
              { key: 'science', name: 'Science', color: '#10B981' },
              { key: 'english', name: 'English Lit', color: '#8B5CF6' }
            ]} 
          />
        </Card>

        <Card>
          <h2 className="text-[18px] font-[600] mb-6">Enrollment by Grade</h2>
          <PieChart data={enrollmentData} colors={pieColors} height={300} />
          <div className="mt-4 grid grid-cols-2 gap-3 pl-4">
            {enrollmentData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                <span className="text-[13px] text-slate-600">{d.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-[18px] font-[600] mb-4">Standards Mastery Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="border-b text-left text-slate-500 font-[500]">
                <th className="pb-3 pr-4 font-[500]">Standard Code</th>
                <th className="pb-3 px-4 font-[500]">Description</th>
                <th className="pb-3 px-4 font-[500]">Status</th>
                <th className="pb-3 pl-4 font-[500] w-64">Mastery Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b last:border-0 hover:bg-slate-50/80 transition-colors group">
                <td className="py-4 pr-4 font-[600] text-slate-800">HS-LS1-1</td>
                <td className="py-4 px-4 text-slate-600 truncate max-w-xs group-hover:text-blue transition-colors">DNA structure to proteins...</td>
                <td className="py-4 px-4"><Badge variant="green">On Track</Badge></td>
                <td className="py-4 pl-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full group-hover:shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all" style={{ width: '85%' }} />
                    </div>
                    <span className="w-8 text-right font-[700] text-[13px] text-slate-700">85%</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b last:border-0 hover:bg-slate-50/80 transition-colors group">
                <td className="py-4 pr-4 font-[600] text-slate-800">LIM-1</td>
                <td className="py-4 px-4 text-slate-600 truncate max-w-xs group-hover:text-amber-600 transition-colors">Calculus definition theorems...</td>
                <td className="py-4 px-4"><Badge variant="amber">Needs Review</Badge></td>
                <td className="py-4 pl-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full group-hover:shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all" style={{ width: '62%' }} />
                    </div>
                    <span className="w-8 text-right font-[700] text-[13px] text-slate-700">62%</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors group">
                <td className="py-4 pr-4 font-[600] text-slate-800">RL.9-10.1</td>
                <td className="py-4 px-4 text-slate-600 truncate max-w-xs group-hover:text-green-600 transition-colors">Cite textual evidence...</td>
                <td className="py-4 px-4"><Badge variant="green">Mastered</Badge></td>
                <td className="py-4 pl-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full group-hover:shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all" style={{ width: '92%' }} />
                    </div>
                    <span className="w-8 text-right font-[700] text-[13px] text-slate-700">92%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, trend, icon }: any) {
  const isPositive = trend.startsWith('+');
  const isNegative = trend.startsWith('-');
  return (
    <Card className="p-5 flex flex-col justify-between h-[120px] group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border hover:border-blue-200 cursor-pointer overflow-hidden relative">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-transparent to-slate-100 opacity-50 rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
      <div className="flex items-start justify-between relative z-10">
        <h3 className="text-[13px] font-[600] text-slate-500 group-hover:text-slate-800 transition-colors tracking-wide">{title}</h3>
        <div className="text-slate-400 [&_svg]:w-5 [&_svg]:h-5 group-hover:text-blue transition-colors group-hover:scale-110 duration-300">{icon}</div>
      </div>
      <div className="flex items-end gap-2 relative z-10">
        <span className="text-[28px] font-[800] text-slate-900 leading-none tracking-tight">{value}</span>
        <span className={`text-[12px] font-[700] pb-0.5 ${isPositive ? 'text-green' : isNegative ? 'text-red' : 'text-slate-400'}`}>
          {trend}
        </span>
      </div>
    </Card>
  );
}
