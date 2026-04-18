import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp, BookOpen, Clock, Award, Users, MessageSquare,
  Calendar, ChevronRight, CheckCircle, AlertTriangle, Eye,
  Flame, Bell, FileText, Shield
} from 'lucide-react';
import { useAuthStore } from '../../../stores/authStore';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { KPICard } from '../../../components/charts/KPICard';

interface ChildData {
  id: string;
  name: string;
  grade: number;
  gpa: number;
  attendance: number;
  avatar: string;
  courses: { name: string; code: string; grade: string; pct: number; teacher: string; color: string }[];
  recentActivity: { text: string; time: string; type: 'grade' | 'attendance' | 'achievement' | 'message' }[];
  upcomingDeadlines: { title: string; course: string; due: string; urgent: boolean }[];
}

const CHILDREN: ChildData[] = [
  {
    id: 'child-1',
    name: 'Marcus Johnson',
    grade: 10,
    gpa: 3.72,
    attendance: 96,
    avatar: 'MJ',
    courses: [
      { name: 'Intro to Computer Science', code: 'CS101', grade: 'A', pct: 94, teacher: 'Ms. Thompson', color: 'from-blue-500 to-indigo-600' },
      { name: 'AP Calculus AB', code: 'MATH201', grade: 'B+', pct: 87, teacher: 'Mr. Richards', color: 'from-emerald-500 to-teal-600' },
      { name: 'AP Physics', code: 'PHY301', grade: 'A-', pct: 91, teacher: 'Dr. Park', color: 'from-purple-500 to-violet-600' },
    ],
    recentActivity: [
      { text: 'Scored 95% on Python Basics: Variables', time: '2h ago', type: 'grade' },
      { text: 'Earned "Quiz Master" achievement badge', time: '1d ago', type: 'achievement' },
      { text: 'Marked present in all classes today', time: '1d ago', type: 'attendance' },
      { text: 'Ms. Thompson sent a progress update', time: '2d ago', type: 'message' },
      { text: 'Scored 48/50 on Control Flow Quiz', time: '3d ago', type: 'grade' },
    ],
    upcomingDeadlines: [
      { title: 'Python Basics: Variables', course: 'CS101', due: 'Tomorrow, 11:59 PM', urgent: true },
      { title: 'Derivatives Worksheet 3', course: 'MATH201', due: 'Apr 22, 5:00 PM', urgent: false },
      { title: 'Lab Report: Forces', course: 'PHY301', due: 'Apr 25, 11:59 PM', urgent: false },
    ],
  },
];

export function ParentDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState(CHILDREN[0]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'grade': return <FileText className="w-4 h-4" />;
      case 'attendance': return <CheckCircle className="w-4 h-4" />;
      case 'achievement': return <Award className="w-4 h-4" />;
      case 'message': return <MessageSquare className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'grade': return 'bg-blue-50 text-blue-600';
      case 'attendance': return 'bg-emerald-50 text-emerald-600';
      case 'achievement': return 'bg-amber-50 text-amber-600';
      case 'message': return 'bg-violet-50 text-violet-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8 max-w-7xl mx-auto pb-12 w-full mt-2">

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0f172a] p-8 sm:p-10 text-white shadow-2xl border border-white/10 group">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-gradient-to-br from-sky-600/40 via-blue-600/20 to-transparent rounded-full blur-[80px] group-hover:blur-[100px] transition-all duration-1000" />
          <div className="absolute top-[20%] -right-[20%] w-[60%] h-[120%] bg-gradient-to-tl from-teal-400/20 via-emerald-500/10 to-transparent rounded-full blur-[60px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom_right,white,transparent)]" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 shadow-sm backdrop-blur-md mb-4">
              <Shield className="w-3.5 h-3.5 text-sky-300" />
              <span className="text-[12px] font-medium tracking-wide text-sky-50 uppercase">Parent Portal</span>
            </div>
            <h1 className="text-[36px] sm:text-[42px] font-[800] mb-3 tracking-tight text-white leading-tight">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-teal-300">{user?.name || 'Parent'}</span>
            </h1>
            <p className="text-slate-300 text-[16px] leading-relaxed font-light">
              Stay connected with <strong className="text-white font-semibold">{selectedChild.name}'s</strong> academic journey. Current GPA: <strong className="text-emerald-300 font-semibold">{selectedChild.gpa}</strong>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Button onClick={() => navigate('/parent/messages')} className="w-full sm:w-auto h-12 px-6 bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-md transition-all rounded-xl font-medium gap-2">
              <MessageSquare className="w-4 h-4" /> Message Teacher
            </Button>
            <Button onClick={() => navigate('/parent/calendar')} className="w-full sm:w-auto h-12 px-6 bg-sky-500 hover:bg-sky-600 text-white border-transparent transition-all rounded-xl shadow-sky-500/20 shadow-lg font-medium gap-2">
              <Calendar className="w-4 h-4" /> Calendar
            </Button>
          </div>
        </div>
      </div>

      {/* Child Selector (for parents with multiple children) */}
      {CHILDREN.length > 1 && (
        <div className="flex gap-3">
          {CHILDREN.map(child => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                selectedChild.id === child.id
                  ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                {child.avatar}
              </div>
              {child.name}
            </button>
          ))}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <KPICard
          title="Current GPA"
          value={selectedChild.gpa.toString()}
          trend={0.15}
          color="blue"
          icon={<TrendingUp className="w-5 h-5" />}
          sparklineData={[3.45, 3.52, 3.60, 3.65, selectedChild.gpa]}
        />
        <KPICard
          title="Attendance Rate"
          value={`${selectedChild.attendance}%`}
          trend={0.5}
          color="green"
          icon={<CheckCircle className="w-5 h-5" />}
          sparklineData={[93, 94, 95, 95.5, selectedChild.attendance]}
        />
        <KPICard
          title="Active Courses"
          value={selectedChild.courses.length.toString()}
          trendLabel="All on track"
          color="purple"
          icon={<BookOpen className="w-5 h-5" />}
          sparklineData={[3, 3, 3, 3, selectedChild.courses.length]}
        />
        <KPICard
          title="Upcoming Due"
          value={selectedChild.upcomingDeadlines.length.toString()}
          trend={-1}
          trendLabel="vs last week"
          color="amber"
          icon={<Clock className="w-5 h-5" />}
          sparklineData={[5, 4, 4, 3, selectedChild.upcomingDeadlines.length]}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">

        {/* Left: Courses + Deadlines */}
        <div className="xl:col-span-2 space-y-6 lg:space-y-8">

          {/* Academic Performance */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-[700] text-slate-900 tracking-tight">Academic Performance</h2>
              <Badge variant="green">On Track</Badge>
            </div>
            <div className="space-y-4">
              {selectedChild.courses.map((course, i) => (
                <motion.div
                  key={course.code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
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
                    <p className="text-[12px] text-slate-500">{course.teacher} • {course.code}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-[700] text-slate-900 tracking-tight">Upcoming Deadlines</h2>
              <Badge variant={selectedChild.upcomingDeadlines.some(d => d.urgent) ? 'red' : 'blue'}>
                {selectedChild.upcomingDeadlines.length} Due
              </Badge>
            </div>
            <div className="space-y-3">
              {selectedChild.upcomingDeadlines.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
                    d.urgent ? 'border-red-200 bg-red-50/30' : 'border-slate-100 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      d.urgent ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue'
                    }`}>
                      {d.urgent ? <AlertTriangle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-[600] text-slate-900 text-[14px]">{d.title}</p>
                      <p className="text-[12px] text-slate-500">{d.course}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className={`text-[13px] font-semibold ${d.urgent ? 'text-red-600' : 'text-slate-600'}`}>{d.due}</p>
                    {d.urgent && <p className="text-[11px] text-red-500 font-medium">⚠ Due soon!</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Attendance Summary */}
          <Card>
            <h2 className="text-[18px] font-[700] text-slate-900 tracking-tight mb-4">Attendance Summary</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-emerald-50 rounded-xl text-center border border-emerald-100">
                <p className="text-2xl font-[800] text-emerald-700">92</p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">Days Present</p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl text-center border border-red-100">
                <p className="text-2xl font-[800] text-red-700">2</p>
                <p className="text-xs text-red-600 font-semibold mt-1">Days Absent</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl text-center border border-amber-100">
                <p className="text-2xl font-[800] text-amber-700">3</p>
                <p className="text-xs text-amber-600 font-semibold mt-1">Tardy</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl text-center border border-blue-100">
                <p className="text-2xl font-[800] text-blue-700">{selectedChild.attendance}%</p>
                <p className="text-xs text-blue-600 font-semibold mt-1">Overall Rate</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Activity Feed + Quick Actions */}
        <div className="xl:col-span-1 space-y-6">

          {/* Recent Activity */}
          <Card className="h-auto">
            <div className="flex items-center justify-between mb-4 border-b pb-4">
              <h2 className="text-[18px] font-[600]">Recent Activity</h2>
              <Badge variant="blue">Live</Badge>
            </div>
            <div className="space-y-3">
              {selectedChild.recentActivity.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all duration-200"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800 font-medium leading-snug">{activity.text}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-slate-50 to-sky-50/30 border-slate-200">
            <h2 className="text-[18px] font-[700] mb-4 text-slate-900 tracking-tight">Parent Actions</h2>
            <div className="space-y-2">
              <button onClick={() => navigate('/parent/messages')} className="flex items-center w-full p-3 rounded-xl bg-white border border-transparent hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue group-hover:bg-blue group-hover:text-white transition-colors duration-300 mr-3">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-[600] text-slate-900 text-[14px]">Contact Teacher</span>
                  <span className="text-[11px] text-slate-500">Send a message</span>
                </div>
              </button>
              <button onClick={() => navigate('/parent/calendar')} className="flex items-center w-full p-3 rounded-xl bg-white border border-transparent hover:border-emerald-200 hover:shadow-md transition-all duration-300 group">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 mr-3">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-[600] text-slate-900 text-[14px]">School Calendar</span>
                  <span className="text-[11px] text-slate-500">Events & deadlines</span>
                </div>
              </button>
              <button onClick={() => navigate('/shared/settings')} className="flex items-center w-full p-3 rounded-xl bg-white border border-transparent hover:border-violet-200 hover:shadow-md transition-all duration-300 group">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-colors duration-300 mr-3">
                  <Eye className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-[600] text-slate-900 text-[14px]">Account Settings</span>
                  <span className="text-[11px] text-slate-500">Update notifications</span>
                </div>
              </button>
            </div>
          </Card>

          {/* Quick Child Info Card */}
          <Card className="border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {selectedChild.avatar}
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{selectedChild.name}</h3>
                <p className="text-sm text-slate-500">Grade {selectedChild.grade} • CPEHS</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-100">
                <p className="text-lg font-[800] text-slate-900">{selectedChild.gpa}</p>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">GPA</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-100">
                <p className="text-lg font-[800] text-slate-900">{selectedChild.attendance}%</p>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Attendance</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
