import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, BookOpen, Clock, Award, Target, Calendar, 
  MessageSquare, Sparkles, ChevronRight, Flame
} from 'lucide-react';
import { useAuthStore } from '../../../stores/authStore';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { KPICard } from '../../../components/charts/KPICard';

export function StudentDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const courses = [
    { name: 'Intro to Computer Science', code: 'CS101', grade: 'A', pct: 94, progress: 72, teacher: 'Ms. Thompson', color: 'from-blue-500 to-indigo-600' },
    { name: 'AP Calculus AB', code: 'MATH201', grade: 'B+', pct: 87, progress: 65, teacher: 'Mr. Richards', color: 'from-emerald-500 to-teal-600' },
    { name: 'AP Physics', code: 'PHY301', grade: 'A-', pct: 91, progress: 58, teacher: 'Dr. Park', color: 'from-purple-500 to-violet-600' },
  ];

  const deadlines = [
    { title: 'Python Basics: Variables', course: 'CS101', due: 'Tomorrow, 11:59 PM', urgent: true },
    { title: 'Derivatives Worksheet 3', course: 'MATH201', due: 'Apr 22, 5:00 PM', urgent: false },
    { title: 'Lab Report: Forces', course: 'PHY301', due: 'Apr 25, 11:59 PM', urgent: false },
  ];

  const schedule = [
    { name: 'Calculus 101', time: '08:00 - 09:30', room: 'Room 302', status: 'done' },
    { name: 'AP Physics', time: '10:00 - 11:30', room: 'Lab 4B', status: 'current' },
    { name: 'Computer Science', time: '01:00 - 02:30', room: 'Room 114', status: 'upcoming' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8 max-w-7xl mx-auto pb-12 w-full mt-2">

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0f172a] p-8 sm:p-10 text-white shadow-2xl border border-white/10 group">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-gradient-to-br from-violet-600/40 via-purple-600/20 to-transparent rounded-full blur-[80px] group-hover:blur-[100px] transition-all duration-1000" />
          <div className="absolute top-[20%] -right-[20%] w-[60%] h-[120%] bg-gradient-to-tl from-pink-400/20 via-rose-500/10 to-transparent rounded-full blur-[60px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom_right,white,transparent)]" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 shadow-sm backdrop-blur-md mb-4">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[12px] font-medium tracking-wide text-orange-50 uppercase">7-Day Streak 🔥</span>
            </div>
            <h1 className="text-[36px] sm:text-[42px] font-[800] mb-3 tracking-tight text-white leading-tight">
              Hey, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-pink-300">{user?.name || 'Student'}</span>!
            </h1>
            <p className="text-slate-300 text-[16px] leading-relaxed font-light">
              You're doing great this semester. Your GPA is <strong className="text-white font-semibold">3.72</strong> and you have <strong className="text-amber-300 font-semibold">{deadlines.length} assignments</strong> due this week.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Button onClick={() => navigate('/student/ai-tutor')} className="w-full sm:w-auto h-12 px-6 bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-md transition-all rounded-xl font-medium shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)] gap-2">
              <Sparkles className="w-4 h-4" /> AI Tutor
            </Button>
            <Button onClick={() => navigate('/student/grades')} className="w-full sm:w-auto h-12 px-6 bg-violet-500 hover:bg-violet-600 text-white border-transparent transition-all rounded-xl shadow-violet-500/20 shadow-lg font-medium">
              View Grades
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <KPICard
          title="Current GPA"
          value="3.72"
          trend={0.15}
          color="blue"
          icon={<TrendingUp className="w-5 h-5" />}
          sparklineData={[3.45, 3.52, 3.60, 3.65, 3.72]}
        />
        <KPICard
          title="Courses Active"
          value="3"
          trendLabel="On track"
          color="green"
          icon={<BookOpen className="w-5 h-5" />}
          sparklineData={[3, 3, 3, 3, 3]}
        />
        <KPICard
          title="Assignments Due"
          value={deadlines.length}
          trend={-2}
          trendLabel="vs last week"
          color="amber"
          icon={<Clock className="w-5 h-5" />}
          sparklineData={[7, 5, 4, 3, deadlines.length]}
        />
        <KPICard
          title="Achievements"
          value="12"
          trend={3}
          trendLabel="new this month"
          color="purple"
          icon={<Award className="w-5 h-5" />}
          sparklineData={[5, 7, 8, 10, 12]}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">

        {/* Left: Courses + Deadlines */}
        <div className="xl:col-span-2 space-y-6 lg:space-y-8">

          {/* My Courses */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-[700] text-slate-900 tracking-tight">My Courses</h2>
              <Button variant="ghost" className="text-blue text-sm font-semibold gap-1" onClick={() => navigate('/student/grades')}>
                All Grades <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {courses.map((course, i) => (
                <motion.div
                  key={course.code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => navigate('/student/grades')}
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white font-bold text-sm shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {course.code.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-[600] text-slate-900 text-[14px] truncate">{course.name}</h3>
                      <Badge variant={course.pct >= 90 ? 'green' : course.pct >= 80 ? 'blue' : 'amber'}>
                        {course.grade} ({course.pct}%)
                      </Badge>
                    </div>
                    <p className="text-[12px] text-slate-500 mb-2">{course.teacher} • {course.code}</p>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className={`h-full rounded-full bg-gradient-to-r ${course.color}`}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{course.progress}% curriculum completed</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-[700] text-slate-900 tracking-tight">Upcoming Deadlines</h2>
              <Badge variant="amber">{deadlines.length} Due</Badge>
            </div>
            <div className="space-y-3">
              {deadlines.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${
                    d.urgent ? 'border-red-200 bg-red-50/30' : 'border-slate-100 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      d.urgent ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue'
                    }`}>
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-[600] text-slate-900 text-[14px]">{d.title}</p>
                      <p className="text-[12px] text-slate-500">{d.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-[13px] font-semibold ${d.urgent ? 'text-red-600' : 'text-slate-600'}`}>{d.due}</p>
                    {d.urgent && <p className="text-[11px] text-red-500 font-medium">⚠ Due soon!</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Schedule + Quick Links */}
        <div className="xl:col-span-1 space-y-6">

          {/* Today's Schedule */}
          <Card className="h-auto">
            <div className="flex items-center justify-between mb-4 border-b pb-4">
              <h2 className="text-[18px] font-[600]">Today's Schedule</h2>
              <Badge variant="blue">3 Classes</Badge>
            </div>
            <div className="space-y-3">
              {schedule.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                    s.status === 'current'
                      ? 'border-blue-200 bg-blue-50/40 ring-1 ring-blue-100'
                      : s.status === 'done'
                      ? 'border-slate-100 bg-slate-50/40 opacity-60'
                      : 'border-slate-100 bg-slate-50/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-[15px] font-[700] text-slate-900">{s.name}</h4>
                      <p className="text-[12px] text-slate-500 mt-0.5">{s.time} • {s.room}</p>
                    </div>
                    <Badge variant={s.status === 'done' ? 'green' : s.status === 'current' ? 'blue' : 'amber'}>
                      {s.status === 'done' ? 'Done' : s.status === 'current' ? 'Now' : 'Later'}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button variant="secondary" className="w-full mt-4" onClick={() => navigate('/student/calendar')}>
              <Calendar className="w-4 h-4 mr-2" /> View Full Calendar
            </Button>
          </Card>

          {/* Quick Links */}
          <Card className="bg-gradient-to-br from-slate-50 to-violet-50/30 border-slate-200">
            <h2 className="text-[18px] font-[700] mb-4 text-slate-900 tracking-tight">Quick Links</h2>
            <div className="space-y-2">
              <button onClick={() => navigate('/student/ai-tutor')} className="flex items-center w-full p-3 rounded-xl bg-white border border-transparent hover:border-violet-200 hover:shadow-md transition-all duration-300 group">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-colors duration-300 mr-3">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-[600] text-slate-900 text-[14px]">Ask AI Tutor</span>
              </button>
              <button onClick={() => navigate('/student/achievements')} className="flex items-center w-full p-3 rounded-xl bg-white border border-transparent hover:border-amber-200 hover:shadow-md transition-all duration-300 group">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 mr-3">
                  <Award className="w-4 h-4" />
                </div>
                <span className="font-[600] text-slate-900 text-[14px]">My Achievements</span>
              </button>
              <button onClick={() => navigate('/student/messages')} className="flex items-center w-full p-3 rounded-xl bg-white border border-transparent hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue group-hover:bg-blue group-hover:text-white transition-colors duration-300 mr-3">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="font-[600] text-slate-900 text-[14px]">Messages</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
