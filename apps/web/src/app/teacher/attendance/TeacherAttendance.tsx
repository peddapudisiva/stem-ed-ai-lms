import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Clock, Calendar as CalendarIcon, Users, Settings2, Download } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { DEMO_STUDENTS } from '../../../data/students';

type AttendanceStatus = 'present' | 'absent' | 'tardy' | 'unmarked';

export function TeacherAttendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('cs-101');
  
  // Initialize all students as unmarked
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(
    DEMO_STUDENTS.reduce((acc, student) => ({ ...acc, [student.id]: 'unmarked' }), {})
  );

  const stats = {
    present: Object.values(attendance).filter(v => v === 'present').length,
    absent: Object.values(attendance).filter(v => v === 'absent').length,
    tardy: Object.values(attendance).filter(v => v === 'tardy').length,
    unmarked: Object.values(attendance).filter(v => v === 'unmarked').length,
  };

  const markAll = (status: AttendanceStatus) => {
    const newAttendance = { ...attendance };
    DEMO_STUDENTS.forEach(student => {
      newAttendance[student.id] = status;
    });
    setAttendance(newAttendance);
  };

  const toggleStatus = (studentId: string, currentStatus: AttendanceStatus) => {
    // Rotation logic: unmarked -> present -> absent -> tardy -> present...
    const nextStatusMap: Record<AttendanceStatus, AttendanceStatus> = {
      unmarked: 'present',
      present: 'absent',
      absent: 'tardy',
      tardy: 'present'
    };
    setAttendance(prev => ({ ...prev, [studentId]: nextStatusMap[currentStatus] }));
  };

  const setStatus = (studentId: string, status: AttendanceStatus) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  return (
    <div className="space-y-6 lg:space-y-8 max-w-7xl mx-auto pb-12 w-full mt-2">
      
      {/* Header Controls */}
      <Card className="p-1 sm:p-0 border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance Roster</h1>
            <p className="text-slate-500 text-sm mt-1">Manage daily attendance records efficiently.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
             <div className="relative">
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium pl-4 pr-10 py-2.5 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 cursor-pointer shadow-sm transition-all hover:bg-slate-100"
              >
                <option value="cs-101">CS101: Introduction to Computer Science (Sec 001)</option>
                <option value="math-201">MATH201: AP Calculus AB (Sec 002)</option>
              </select>
            </div>
            
            <div className="relative">
              <CalendarIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-9 pr-4 py-2.5 border border-slate-200 bg-slate-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all"
              />
            </div>
          </div>
        </div>
        
        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-emerald-600 flex items-center gap-2">
              <Check className="w-4 h-4" /> Present
            </span>
            <span className="text-xl font-bold text-emerald-700">{stats.present}</span>
          </div>
          <div className="p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-red-600 flex items-center gap-2">
              <X className="w-4 h-4" /> Absent
            </span>
            <span className="text-xl font-bold text-red-700">{stats.absent}</span>
          </div>
          <div className="p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-amber-600 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Tardy
            </span>
            <span className="text-xl font-bold text-amber-700">{stats.tardy}</span>
          </div>
          <div className="p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <Users className="w-4 h-4" /> Unmarked
            </span>
            <span className="text-xl font-bold text-slate-700">{stats.unmarked}</span>
          </div>
        </div>
      </Card>

      {/* Main Roster List */}
      <Card className="overflow-hidden border-slate-200">
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white">
          <h2 className="text-base font-bold text-slate-900">Student List ({DEMO_STUDENTS.length})</h2>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 mr-2 hidden sm:inline">Bulk Actions:</span>
            <Button variant="ghost" className="text-emerald-600 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-700 h-8 px-3 rounded-lg flex items-center gap-1.5" onClick={() => markAll('present')}>
              <Check className="w-3.5 h-3.5" /> Mark All Present
            </Button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {DEMO_STUDENTS.map((student, index) => {
            const status = attendance[student.id];
            
            return (
              <motion.div 
                key={student.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-6 transition-colors duration-200 ${status === 'unmarked' ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/30'}`}
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                   <img 
                    src={`https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}&background=random`} 
                    alt={student.firstName} 
                    className="w-12 h-12 rounded-full border border-slate-200 shadow-sm"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900">{student.lastName}, {student.firstName}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>ID: {student.studentId}</span>
                      <span>•</span>
                      <span>Grade {student.gradeLevel}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner mr-2">
                    <button
                      onClick={() => setStatus(student.id, 'present')}
                      className={`flex items-center justify-center h-10 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        status === 'present' 
                          ? 'bg-white text-emerald-600 shadow-[0_2px_8px_rgba(16,185,129,0.2)]' 
                          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                      }`}
                    >
                      <Check className={`w-4 h-4 mr-1.5 ${status === 'present' ? 'block' : 'hidden md:block'}`} />
                      <span className="hidden sm:inline">Present</span>
                      <span className="sm:hidden">P</span>
                    </button>
                    <button
                      onClick={() => setStatus(student.id, 'absent')}
                      className={`flex items-center justify-center h-10 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        status === 'absent' 
                          ? 'bg-white text-red-600 shadow-[0_2px_8px_rgba(239,68,68,0.2)]' 
                          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                      }`}
                    >
                      <X className={`w-4 h-4 mr-1.5 ${status === 'absent' ? 'block' : 'hidden md:block'}`} />
                      <span className="hidden sm:inline">Absent</span>
                      <span className="sm:hidden">A</span>
                    </button>
                    <button
                      onClick={() => setStatus(student.id, 'tardy')}
                      className={`flex items-center justify-center h-10 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        status === 'tardy' 
                          ? 'bg-white text-amber-600 shadow-[0_2px_8px_rgba(245,158,11,0.2)]' 
                          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                      }`}
                    >
                      <Clock className={`w-4 h-4 mr-1.5 ${status === 'tardy' ? 'block' : 'hidden md:block'}`} />
                      <span className="hidden sm:inline">Tardy</span>
                      <span className="sm:hidden">T</span>
                    </button>
                  </div>
                  
                  <Button variant="ghost" className="h-10 w-10 p-0 shrink-0 text-slate-400 hover:text-blue">
                    <Settings2 className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Footer Actions */}
        <div className="bg-slate-50 p-6 flex items-center justify-between border-t border-slate-200 rounded-b-2xl">
          <p className="text-sm text-slate-500">
            {stats.unmarked} students remaining to be marked.
          </p>
          <div className="flex gap-3">
             <Button variant="secondary">Cancel</Button>
             <Button variant="primary" disabled={stats.unmarked > 0}>Save Attendance</Button>
          </div>
        </div>
      </Card>
      
    </div>
  );
}
