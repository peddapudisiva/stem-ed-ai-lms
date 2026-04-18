import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  FileText,
  Calendar,
  BookOpen,
  ClipboardCheck,
  PenLine,
  BarChart3
} from 'lucide-react';
import { useAuthStore } from '../../../stores/authStore';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { KPICard } from '../../../components/charts/KPICard';
import { DEMO_ASSIGNMENTS as ASSIGNMENTS } from '../../../data/assignments';
import { DEMO_STUDENTS as STUDENTS } from '../../../data/students';

export function TeacherDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  // Quick grading queue state
  const [pendingGrading, setPendingGrading] = useState([
    { id: '1', studentName: 'Marcus Johnson', assignment: 'Python Basics: Variables', maxPoints: 100, submittedAt: '2h ago' },
    { id: '2', studentName: 'Sarah Chen', assignment: 'Control Flow Quiz', maxPoints: 50, submittedAt: '4h ago' },
    { id: '3', studentName: 'David Smith', assignment: 'Derivatives Worksheet 1', maxPoints: 20, submittedAt: '1d ago' },
    { id: '4', studentName: 'Emma Rodriguez', assignment: 'Python Basics: Variables', maxPoints: 100, submittedAt: '1d ago' },
  ]);

  const handleQuickGrade = (id: string) => {
    setPendingGrading(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6 lg:space-y-8 max-w-7xl mx-auto pb-12 w-full mt-2">
      
      {/* Welcome Banner - Premium Design (matching Admin) */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0f172a] p-8 sm:p-10 text-white shadow-2xl border border-white/10 group">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-gradient-to-br from-emerald-600/40 via-teal-600/20 to-transparent rounded-full blur-[80px] group-hover:blur-[100px] transition-all duration-1000" />
          <div className="absolute top-[20%] -right-[20%] w-[60%] h-[120%] bg-gradient-to-tl from-blue-400/20 via-cyan-500/10 to-transparent rounded-full blur-[60px]" />
          {/* Subtle Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom_right,white,transparent)]" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 shadow-sm backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[12px] font-medium tracking-wide text-emerald-50 uppercase">Live Classroom Hub</span>
            </div>
            <h1 className="text-[36px] sm:text-[42px] font-[800] mb-3 tracking-tight text-white leading-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">{user?.name || 'Educator'}</span>
            </h1>
            <p className="text-slate-300 text-[16px] leading-relaxed font-light">
              Here is what's happening across your classes today. You have <strong className="text-white font-semibold">{pendingGrading.length} submissions</strong> awaiting grading and <strong className="text-emerald-300 font-semibold">3 classes</strong> scheduled.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Button onClick={() => navigate('/teacher/gradebook')} className="w-full sm:w-auto h-12 px-6 bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-md transition-all rounded-xl font-medium shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)]">
              View Gradebook
            </Button>
            <Button onClick={() => navigate('/teacher/assignments')} className="w-full sm:w-auto h-12 px-6 bg-emerald-500 hover:bg-emerald-600 text-white border-transparent transition-all rounded-xl shadow-emerald-500/20 shadow-lg font-medium">
              Create Assignment
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards - Same style as Admin with sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <KPICard 
          title="Average Class Grade"
          value="87.4%"
          trend={1.2}
          color="blue"
          icon={<TrendingUp className="w-5 h-5" />}
          sparklineData={[82, 83.5, 85, 86.2, 87.4]}
        />
        <KPICard 
          title="Pending Grading"
          value={pendingGrading.length}
          trend={-15}
          trendLabel="vs last week"
          color="amber"
          icon={<FileText className="w-5 h-5" />}
          sparklineData={[12, 9, 7, 5, pendingGrading.length]}
        />
        <KPICard 
          title="Attendance Rate"
          value="94.2%"
          trend={0.8}
          color="green"
          icon={<Users className="w-5 h-5" />}
          sparklineData={[92.1, 93.0, 93.5, 93.8, 94.2]}
        />
        <KPICard 
          title="Upcoming Classes"
          value="3"
          trendLabel="Next in 15 min"
          color="purple"
          icon={<Clock className="w-5 h-5" />}
          sparklineData={[4, 3, 5, 4, 3]}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column: Rapid Grading + Quick Actions */}
        <div className="xl:col-span-2 space-y-6 lg:space-y-8">
          
          {/* Rapid Grading Widget */}
          <Card className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[18px] font-[700] text-slate-900 tracking-tight">Rapid Grading Queue</h2>
                <p className="text-[13px] text-slate-500 mt-1">Submissions waiting for your review.</p>
              </div>
              <Badge variant="amber">{pendingGrading.length} Pending</Badge>
            </div>

            {pendingGrading.length > 0 ? (
              <div className="space-y-3">
                {pendingGrading.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-[700] text-[13px] shadow-sm border-2 border-white shrink-0">
                        {item.studentName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-[600] text-slate-900 text-[14px]">{item.studentName}</p>
                        <p className="text-[12px] text-slate-500">{item.assignment} • {item.submittedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue/20 focus-within:border-blue transition-all">
                        <input 
                          type="number" 
                          className="w-16 h-9 px-3 text-center outline-none text-[14px]" 
                          placeholder="---"
                          max={item.maxPoints}
                          id={`score-${item.id}`}
                        />
                        <div className="px-3 py-1 bg-slate-50 border-l border-slate-200 text-[12px] text-slate-500 font-[600]">
                          / {item.maxPoints}
                        </div>
                      </div>
                      <Button 
                        variant="primary" 
                        className="h-9 px-4 rounded-lg"
                        onClick={() => {
                          const val = (document.getElementById(`score-${item.id}`) as HTMLInputElement)?.value;
                          if (val) handleQuickGrade(item.id);
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-[16px] font-[700] text-slate-900">All caught up!</h3>
                <p className="text-slate-500 mt-1 max-w-sm text-[13px]">You have zero pending assignments to grade. Great job!</p>
              </div>
            )}
          </Card>

          {/* Bottom Row: Class Overview + Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Class Overview */}
            <Card className="overflow-hidden">
              <h2 className="text-[18px] font-[700] mb-4 text-slate-900 tracking-tight">My Classes</h2>
              <div className="space-y-3">
                {[
                  { name: 'Intro to Computer Science', code: 'CS101', students: 32, avg: 87 },
                  { name: 'AP Calculus AB', code: 'MATH201', students: 28, avg: 82 },
                ].map((c, i) => (
                  <div key={i} onClick={() => navigate('/teacher/gradebook')} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue group-hover:bg-blue group-hover:text-white transition-colors duration-300 shadow-inner">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-[600] text-slate-900 text-[14px]">{c.name}</p>
                        <p className="text-[12px] text-slate-500">{c.code} • {c.students} students</p>
                      </div>
                    </div>
                    <Badge variant={c.avg > 85 ? 'green' : 'amber'}>{c.avg}%</Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-slate-50 to-indigo-50/30 border-slate-200">
              <h2 className="text-[18px] font-[700] mb-6 text-slate-900 tracking-tight">Quick Actions</h2>
              <div className="space-y-3">
                <button onClick={() => navigate('/teacher/assignments')} className="flex items-center w-full p-3 rounded-xl bg-white border border-transparent hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue group-hover:bg-blue group-hover:text-white transition-colors duration-300 mr-4 shadow-inner">
                    <PenLine className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-[600] text-slate-900 text-[14px]">Create Assignment</span>
                    <span className="text-[12px] text-slate-500">New homework or quiz</span>
                  </div>
                </button>
                
                <button onClick={() => navigate('/teacher/attendance')} className="flex items-center w-full p-3 rounded-xl bg-white border border-transparent hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-500/10 transition-all duration-300 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 mr-4 shadow-inner">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-[600] text-slate-900 text-[14px]">Take Attendance</span>
                    <span className="text-[12px] text-slate-500">Mark today's roster</span>
                  </div>
                </button>
                
                <button onClick={() => navigate('/teacher/gradebook')} className="flex items-center w-full p-3 rounded-xl bg-white border border-transparent hover:border-purple-200 hover:shadow-md hover:shadow-purple-500/10 transition-all duration-300 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple group-hover:bg-purple group-hover:text-white transition-colors duration-300 mr-4 shadow-inner">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-[600] text-slate-900 text-[14px]">View Analytics</span>
                    <span className="text-[12px] text-slate-500">Class performance trends</span>
                  </div>
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column: Today's Schedule */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b pb-4">
              <h2 className="text-[18px] font-[600]">Today's Schedule</h2>
              <Badge variant="blue">3 Classes</Badge>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {/* Completed Class */}
              <div className="flex flex-col gap-2 p-4 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-[15px] font-[700] text-slate-900 tracking-tight">Calculus 101</h4>
                    <p className="text-[12px] text-slate-500 mt-0.5">08:00 AM – 09:30 AM • Room 302</p>
                  </div>
                  <Badge variant="green">Done</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2 bg-white/60 p-2.5 rounded-lg border border-slate-100/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-[700] tracking-wider mb-0.5">Students</span>
                    <span className="text-[14px] font-[700] text-slate-900 leading-none">28</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-[700] tracking-wider mb-0.5">Attendance</span>
                    <span className="text-[14px] font-[700] text-emerald-600 leading-none">96%</span>
                  </div>
                </div>
              </div>

              {/* Up Next Class */}
              <div className="flex flex-col gap-2 p-4 rounded-xl border border-blue-200 bg-blue-50/40 hover:bg-blue-50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ring-1 ring-blue-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-[15px] font-[700] text-slate-900 tracking-tight">AP Physics</h4>
                    <p className="text-[12px] text-blue mt-0.5 font-[500]">10:00 AM – 11:30 AM • Lab 4B</p>
                  </div>
                  <Badge variant="blue">Up Next</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2 bg-white/60 p-2.5 rounded-lg border border-blue-100/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-[700] tracking-wider mb-0.5">Students</span>
                    <span className="text-[14px] font-[700] text-slate-900 leading-none">32</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-[700] tracking-wider mb-0.5">Starts In</span>
                    <span className="text-[14px] font-[700] text-blue leading-none">15 min</span>
                  </div>
                </div>
              </div>

              {/* Later Class */}
              <div className="flex flex-col gap-2 p-4 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-[15px] font-[700] text-slate-900 tracking-tight">Office Hours</h4>
                    <p className="text-[12px] text-slate-500 mt-0.5">12:30 PM – 02:00 PM • Faculty Lounge</p>
                  </div>
                  <Badge variant="amber">Later</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2 bg-white/60 p-2.5 rounded-lg border border-slate-100/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-[700] tracking-wider mb-0.5">Type</span>
                    <span className="text-[14px] font-[700] text-slate-900 leading-none">Open</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-[700] tracking-wider mb-0.5">Booked</span>
                    <span className="text-[14px] font-[700] text-amber-600 leading-none">4 slots</span>
                  </div>
                </div>
              </div>
            </div>

            <Button variant="secondary" className="w-full mt-4" onClick={() => navigate('/teacher/calendar')}>
              View Full Calendar
            </Button>
          </Card>
        </div>

      </div>
    </div>
  );
}
