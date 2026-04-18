import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, ChevronDown } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

interface GradeEntry {
  assignment: string;
  category: string;
  score: number;
  maxScore: number;
  date: string;
  weight: number;
}

interface CourseGrades {
  name: string;
  code: string;
  teacher: string;
  grade: string;
  pct: number;
  color: string;
  entries: GradeEntry[];
}

const COURSES: CourseGrades[] = [
  {
    name: 'Intro to Computer Science', code: 'CS101', teacher: 'Ms. Thompson',
    grade: 'A', pct: 94, color: 'from-blue-500 to-indigo-600',
    entries: [
      { assignment: 'Python Basics: Variables', category: 'Homework', score: 95, maxScore: 100, date: 'Apr 10', weight: 20 },
      { assignment: 'Control Flow Quiz', category: 'Quiz', score: 48, maxScore: 50, date: 'Apr 8', weight: 15 },
      { assignment: 'Functions Lab', category: 'Lab', score: 92, maxScore: 100, date: 'Apr 5', weight: 25 },
      { assignment: 'Midterm Exam', category: 'Exam', score: 88, maxScore: 100, date: 'Mar 28', weight: 40 },
    ]
  },
  {
    name: 'AP Calculus AB', code: 'MATH201', teacher: 'Mr. Richards',
    grade: 'B+', pct: 87, color: 'from-emerald-500 to-teal-600',
    entries: [
      { assignment: 'Derivatives Worksheet 1', category: 'Homework', score: 18, maxScore: 20, date: 'Apr 12', weight: 15 },
      { assignment: 'Limits Quiz', category: 'Quiz', score: 42, maxScore: 50, date: 'Apr 6', weight: 20 },
      { assignment: 'Integration Practice', category: 'Homework', score: 85, maxScore: 100, date: 'Apr 1', weight: 15 },
      { assignment: 'Midterm Exam', category: 'Exam', score: 82, maxScore: 100, date: 'Mar 25', weight: 50 },
    ]
  },
  {
    name: 'AP Physics', code: 'PHY301', teacher: 'Dr. Park',
    grade: 'A-', pct: 91, color: 'from-purple-500 to-violet-600',
    entries: [
      { assignment: 'Forces Lab Report', category: 'Lab', score: 95, maxScore: 100, date: 'Apr 11', weight: 30 },
      { assignment: 'Motion Quiz', category: 'Quiz', score: 44, maxScore: 50, date: 'Apr 7', weight: 15 },
      { assignment: 'Newton\'s Laws HW', category: 'Homework', score: 88, maxScore: 100, date: 'Apr 3', weight: 15 },
      { assignment: 'Midterm Exam', category: 'Exam', score: 90, maxScore: 100, date: 'Mar 26', weight: 40 },
    ]
  },
];

export function StudentGrades() {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(COURSES[0].code);

  const getScoreColor = (pct: number) => {
    if (pct >= 90) return 'text-emerald-600';
    if (pct >= 80) return 'text-blue-600';
    if (pct >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (pct: number) => {
    if (pct >= 90) return 'bg-emerald-50';
    if (pct >= 80) return 'bg-blue-50';
    if (pct >= 70) return 'bg-amber-50';
    return 'bg-red-50';
  };

  return (
    <div className="space-y-6 lg:space-y-8 max-w-5xl mx-auto pb-12 w-full mt-2">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Grades</h1>
          <p className="text-slate-500 text-sm mt-1">View your performance across all enrolled courses.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Cumulative GPA</p>
            <p className="text-3xl font-[800] text-slate-900">3.72</p>
          </div>
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* GPA Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {COURSES.map((course, i) => (
          <motion.div
            key={course.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                expandedCourse === course.code ? 'ring-2 ring-blue ring-offset-2' : ''
              }`}
              onClick={() => setExpandedCourse(expandedCourse === course.code ? null : course.code)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center text-white font-bold text-xs shadow-md`}>
                  {course.code.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{course.name}</p>
                  <p className="text-xs text-slate-500">{course.teacher}</p>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-[800] text-slate-900">{course.grade}</p>
                  <p className={`text-sm font-semibold ${getScoreColor(course.pct)}`}>{course.pct}%</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expandedCourse === course.code ? 'rotate-180' : ''}`} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Expanded Grade Detail */}
      {expandedCourse && (() => {
        const course = COURSES.find(c => c.code === expandedCourse)!;
        return (
          <motion.div
            key={expandedCourse}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden p-0">
              <div className={`bg-gradient-to-r ${course.color} px-6 py-4 text-white`}>
                <h2 className="text-lg font-bold">{course.name}</h2>
                <p className="text-white/80 text-sm">{course.code} • {course.teacher}</p>
              </div>
              <div className="divide-y divide-slate-100">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-2 px-6 py-3 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <div className="col-span-5">Assignment</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-2 text-center">Score</div>
                  <div className="col-span-1 text-center">%</div>
                  <div className="col-span-2 text-right">Date</div>
                </div>
                {/* Rows */}
                {course.entries.map((entry, i) => {
                  const pct = Math.round((entry.score / entry.maxScore) * 100);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="grid grid-cols-12 gap-2 px-6 py-4 items-center hover:bg-slate-50 transition-colors"
                    >
                      <div className="col-span-5">
                        <p className="text-sm font-semibold text-slate-900">{entry.assignment}</p>
                      </div>
                      <div className="col-span-2">
                        <Badge variant={
                          entry.category === 'Exam' ? 'red' :
                          entry.category === 'Quiz' ? 'blue' :
                          entry.category === 'Lab' ? 'green' : 'slate'
                        }>
                          {entry.category}
                        </Badge>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="text-sm font-bold text-slate-900">{entry.score}</span>
                        <span className="text-sm text-slate-400"> / {entry.maxScore}</span>
                      </div>
                      <div className="col-span-1 text-center">
                        <span className={`inline-flex items-center justify-center w-12 h-7 rounded-md text-xs font-bold ${getScoreBg(pct)} ${getScoreColor(pct)}`}>
                          {pct}%
                        </span>
                      </div>
                      <div className="col-span-2 text-right text-sm text-slate-500">
                        {entry.date}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        );
      })()}
    </div>
  );
}
