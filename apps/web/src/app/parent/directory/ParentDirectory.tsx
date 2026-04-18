import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, Phone, MessageSquare, BookOpen, Clock, Presentation } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

interface Teacher {
  id: string;
  name: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  officeHours: string;
  courses: string[];
  avatar: string;
  color: string;
  isChildsTeacher: boolean;
}

const TEACHERS: Teacher[] = [
  {
    id: 't1', name: 'Ms. Emily Thompson', department: 'Computer Science', email: 'ethompson@stemed.edu', phone: '(555) 123-4567', office: 'Room 114', officeHours: 'Mon/Wed 3:00 - 4:30 PM', courses: ['Intro to Computer Science', 'AP Computer Science A'], avatar: 'ET', color: 'from-blue-500 to-indigo-600', isChildsTeacher: true
  },
  {
    id: 't2', name: 'Mr. David Richards', department: 'Mathematics', email: 'drichards@stemed.edu', phone: '(555) 123-4568', office: 'Room 205', officeHours: 'Tue/Thu 2:30 - 4:00 PM', courses: ['Pre-Calculus', 'AP Calculus AB', 'Statistics'], avatar: 'DR', color: 'from-emerald-500 to-teal-600', isChildsTeacher: true
  },
  {
    id: 't3', name: 'Dr. Samuel Park', department: 'Science', email: 'spark@stemed.edu', phone: '(555) 123-4569', office: 'Lab 4B', officeHours: 'Mon/Fri 1:00 - 2:30 PM', courses: ['Physics', 'AP Physics', 'Chemistry'], avatar: 'SP', color: 'from-purple-500 to-violet-600', isChildsTeacher: true
  },
  {
    id: 't4', name: 'Mrs. Sarah Chen', department: 'English', email: 'schen@stemed.edu', phone: '(555) 123-4570', office: 'Room 302', officeHours: 'Wed 12:00 - 2:00 PM', courses: ['English Literature', 'Creative Writing'], avatar: 'SC', color: 'from-amber-500 to-orange-600', isChildsTeacher: false
  },
  {
    id: 't5', name: 'Mr. James Wilson', department: 'History', email: 'jwilson@stemed.edu', phone: '(555) 123-4571', office: 'Room 310', officeHours: 'Thu 3:00 - 5:00 PM', courses: ['World History', 'AP US History'], avatar: 'JW', color: 'from-red-500 to-rose-600', isChildsTeacher: false
  },
];

export function ParentDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'All' | 'My Child’s Teachers'>('My Child’s Teachers');
  const navigate = useNavigate();

  const filteredTeachers = TEACHERS.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.courses.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === 'All' || (filter === 'My Child’s Teachers' && t.isChildsTeacher);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 lg:space-y-8 max-w-7xl mx-auto pb-12 w-full mt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Teacher Directory</h1>
          <p className="text-slate-500 text-sm mt-1">Contact and schedule meetings with your child's educators.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setFilter('My Child’s Teachers')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === 'My Child’s Teachers' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            My Child's Teachers
          </button>
          <button
            onClick={() => setFilter('All')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            All Staff
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by name, department, or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all shadow-sm"
        />
      </div>

      {/* Teacher Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher, i) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-slate-200 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md bg-gradient-to-br ${teacher.color} group-hover:scale-105 transition-transform duration-300`}>
                    {teacher.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 leading-snug">{teacher.name}</h3>
                    <p className="text-sm text-slate-500">{teacher.department}</p>
                  </div>
                </div>
                {teacher.isChildsTeacher && (
                  <Badge variant="blue">Child's Teacher</Badge>
                )}
              </div>

              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div className="flex flex-wrap gap-1">
                    {teacher.courses.map((course, j) => (
                      <span key={j} className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Presentation className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-sm text-slate-600">{teacher.office}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-sm text-slate-600">{teacher.officeHours}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                <Button 
                  variant="secondary" 
                  className="gap-2"
                  onClick={() => window.location.href = `mailto:${teacher.email}`}
                >
                  <Mail className="w-4 h-4" /> Email
                </Button>
                <Button 
                  variant="primary" 
                  className="gap-2 shrink-0"
                  onClick={() => navigate('/parent/messages')}
                >
                  <MessageSquare className="w-4 h-4" /> Message
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No teachers found matching your search.</p>
        </div>
      )}
    </div>
  );
}
