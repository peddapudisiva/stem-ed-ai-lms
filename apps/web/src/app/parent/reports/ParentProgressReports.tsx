import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, TrendingUp, TrendingDown, Minus, ChevronDown, Award, BarChart3 } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { useAuthStore } from '../../../stores/authStore';

interface ReportCard {
  term: string;
  year: string;
  gpa: number;
  status: 'Published' | 'Pending';
  courses: { name: string; code: string; grade: string; pct: number; teacher: string; comments: string }[];
}

const REPORTS: ReportCard[] = [
  {
    term: 'Spring 2026 - Midterm', year: '2025-26', gpa: 3.72, status: 'Published',
    courses: [
      { name: 'Intro to Computer Science', code: 'CS101', grade: 'A', pct: 94, teacher: 'Ms. Thompson', comments: 'Excellent problem-solving skills. Marcus is a natural programmer and consistently helps peers.' },
      { name: 'AP Calculus AB', code: 'MATH201', grade: 'B+', pct: 87, teacher: 'Mr. Richards', comments: 'Strong analytical thinking. Could improve by completing more practice problems on integration.' },
      { name: 'AP Physics', code: 'PHY301', grade: 'A-', pct: 91, teacher: 'Dr. Park', comments: 'Impressive lab work and clear understanding of core concepts. Excellent effort this term.' },
    ]
  },
  {
    term: 'Fall 2025 - Final', year: '2025-26', gpa: 3.57, status: 'Published',
    courses: [
      { name: 'Intro to Computer Science', code: 'CS101', grade: 'A-', pct: 91, teacher: 'Ms. Thompson', comments: 'Great start to the year. Marcus showed strong interest in programming fundamentals.' },
      { name: 'Pre-Calculus', code: 'MATH101', grade: 'B', pct: 84, teacher: 'Mr. Richards', comments: 'Solid foundation. Needs to focus more on trigonometric identities.' },
      { name: 'Biology', code: 'BIO201', grade: 'B+', pct: 88, teacher: 'Dr. Lewis', comments: 'Active participant in lab sessions. Good understanding of cellular biology.' },
    ]
  },
  {
    term: 'Spring 2026 - Final', year: '2025-26', gpa: 0, status: 'Pending',
    courses: []
  },
];

export function ParentProgressReports() {
  const [expandedReport, setExpandedReport] = useState<string | null>(REPORTS[0].term);
  const [downloadToast, setDownloadToast] = useState(false);

  const handleDownload = (term: string) => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 2500);
  };

  return (
    <div className="space-y-6 lg:space-y-8 max-w-5xl mx-auto pb-12 w-full mt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Progress Reports</h1>
          <p className="text-slate-500 text-sm mt-1">View and download Marcus's academic report cards.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Current GPA</p>
            <p className="text-3xl font-[800] text-slate-900">3.72</p>
          </div>
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* GPA Trend */}
      <Card className="border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">GPA Trend</h2>
          <Badge variant="green">Improving ↑</Badge>
        </div>
        <div className="flex items-end gap-4 h-32">
          {REPORTS.filter(r => r.status === 'Published').reverse().map((r, i) => (
            <motion.div
              key={r.term}
              initial={{ height: 0 }}
              animate={{ height: `${(r.gpa / 4) * 100}%` }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="flex-1 bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-lg relative group cursor-pointer min-h-[20px]"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                {r.gpa}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-full rounded-t-lg bg-white/0 group-hover:bg-white/20 transition-colors" />
            </motion.div>
          ))}
        </div>
        <div className="flex gap-4 mt-2">
          {REPORTS.filter(r => r.status === 'Published').reverse().map(r => (
            <div key={r.term} className="flex-1 text-center">
              <p className="text-[11px] text-slate-500 font-medium truncate">{r.term.split(' - ')[0]}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Report Cards */}
      <div className="space-y-4">
        {REPORTS.map((report, i) => (
          <motion.div
            key={report.term}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-0 overflow-hidden border-slate-200">
              {/* Report Header */}
              <button
                onClick={() => setExpandedReport(expandedReport === report.term ? null : report.term)}
                className="w-full flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                    report.status === 'Published'
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-[15px] font-bold text-slate-900">{report.term}</h3>
                    <p className="text-sm text-slate-500">Academic Year {report.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {report.status === 'Published' ? (
                    <div className="text-right hidden sm:block">
                      <p className="text-xl font-[800] text-slate-900">{report.gpa}</p>
                      <p className="text-xs text-slate-500">GPA</p>
                    </div>
                  ) : null}
                  <Badge variant={report.status === 'Published' ? 'green' : 'amber'}>{report.status}</Badge>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expandedReport === report.term ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Expanded Detail */}
              {expandedReport === report.term && report.status === 'Published' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t border-slate-100"
                >
                  <div className="divide-y divide-slate-100">
                    {report.courses.map((course, j) => (
                      <div key={j} className="px-6 py-4 hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{course.name}</h4>
                            <p className="text-xs text-slate-500">{course.code} • {course.teacher}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-lg font-[800] ${
                              course.pct >= 90 ? 'text-emerald-600' : course.pct >= 80 ? 'text-blue-600' : 'text-amber-600'
                            }`}>{course.grade}</span>
                            <span className={`inline-flex items-center justify-center w-14 h-8 rounded-lg text-sm font-bold ${
                              course.pct >= 90 ? 'bg-emerald-50 text-emerald-600' : course.pct >= 80 ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                            }`}>{course.pct}%</span>
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3 mt-2 border border-slate-100">
                          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Teacher Comments</p>
                          <p className="text-sm text-slate-700 italic leading-relaxed">"{course.comments}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                    <Button variant="primary" className="gap-2" onClick={() => handleDownload(report.term)}>
                      <Download className="w-4 h-4" /> Download PDF
                    </Button>
                  </div>
                </motion.div>
              )}

              {expandedReport === report.term && report.status === 'Pending' && (
                <div className="px-6 py-8 text-center border-t border-slate-100">
                  <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Report Not Yet Available</h3>
                  <p className="text-sm text-slate-500 mt-1">This report card will be published at the end of the term.</p>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Download Toast */}
      {downloadToast && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3"
        >
          <Download className="w-5 h-5" />
          <span className="font-semibold text-sm">Report card downloaded successfully!</span>
        </motion.div>
      )}
    </div>
  );
}
