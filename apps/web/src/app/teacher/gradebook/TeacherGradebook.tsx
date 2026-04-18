import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Search, Filter, Download } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { DEMO_STUDENTS } from '../../../data/students';
import { DEMO_ASSIGNMENTS } from '../../../data/assignments';

// We'll generate a grid of grades based on students and assignments
export function TeacherGradebook() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Create a flattened map for grades
  // In a real app, this would come from a submissions API
  const [grades, setGrades] = useState<Record<string, number>>({
    'usr_student_001-asg-001': 95,
    'usr_student_001-asg-002': 48, // out of 50
    'stu-002-asg-001': 100,
    'stu-002-asg-002': 50,
    'stu-003-asg-001': 75,
    'stu-003-asg-002': 32,
  });

  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Filter Active Assignments
  const activeAssignments = DEMO_ASSIGNMENTS.filter(a => a.courseId === 'cs-101');

  // Filter students based on search
  const filteredStudents = DEMO_STUDENTS.filter(s => 
    s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.studentId.includes(searchTerm)
  );

  const handleCellClick = (studentId: string, assignmentId: string) => {
    const key = `${studentId}-${assignmentId}`;
    setEditingCell(key);
    setEditValue(grades[key]?.toString() || '');
  };

  const handleCellSave = (studentId: string, assignmentId: string) => {
    const key = `${studentId}-${assignmentId}`;
    if (editValue.trim() !== '') {
      setGrades(prev => ({ ...prev, [key]: Number(editValue) }));
    }
    setEditingCell(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, studentId: string, assignmentId: string) => {
    if (e.key === 'Enter') {
      handleCellSave(studentId, assignmentId);
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  const getPercentage = (score: number, maxScore: number) => {
    return Math.round((score / maxScore) * 100);
  };

  return (
    <div className="space-y-6 lg:space-y-8 max-w-[1600px] mx-auto pb-12 w-full mt-2">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gradebook</h1>
          <p className="text-slate-500 text-sm mt-1">CS101: Introduction to Computer Science • Section 001</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all w-full sm:w-64"
            />
          </div>
          <Button variant="secondary" className="gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button variant="secondary" className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Gradebook Grid */}
      <Card className="overflow-hidden p-0 border-slate-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                {/* Fixed Student Column Headers */}
                <th className="sticky left-0 z-20 bg-white p-4 border-b border-r border-slate-200 min-w-[250px] shadow-[4px_0_12px_rgba(0,0,0,0.02)]">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Student</div>
                </th>
                <th className="p-4 border-b border-r border-slate-200 min-w-[120px] bg-slate-50/50">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Course Avg</div>
                </th>
                
                {/* Dynamic Assignment Headers */}
                {activeAssignments.map(assignment => (
                  <th key={assignment.id} className="p-4 border-b border-r border-slate-200 min-w-[150px] bg-white group hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-slate-900 truncate" title={assignment.title}>{assignment.title}</span>
                      <span className="text-xs font-medium text-slate-500">{assignment.category} • {assignment.maxPoints} pts</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => {
                // Calculate average for this specific student
                let totalPoints = 0;
                let earnedPoints = 0;
                activeAssignments.forEach(a => {
                  const score = grades[`${student.id}-${a.id}`];
                  if (score !== undefined) {
                    totalPoints += a.maxPoints;
                    earnedPoints += score;
                  }
                });
                const avg = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
                
                return (
                  <motion.tr 
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Student Info */}
                    <td className="sticky left-0 z-10 bg-white hover:bg-slate-50 p-4 border-r border-slate-200 shadow-[4px_0_12px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}&background=random`} 
                          alt={student.firstName} 
                          className="w-8 h-8 rounded-full border border-slate-200"
                        />
                        <div>
                          <div className="font-semibold text-slate-900 text-sm whitespace-nowrap">
                            {student.lastName}, {student.firstName}
                          </div>
                          <div className="text-xs text-slate-500">ID: {student.studentId}</div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Course Avg */}
                    <td className="p-4 border-r border-slate-200 text-center bg-slate-50/50">
                      {totalPoints > 0 ? (
                        <Badge variant={avg >= 90 ? 'green' : avg >= 80 ? 'blue' : avg >= 70 ? 'amber' : 'red'}>
                          {avg}%
                        </Badge>
                      ) : (
                        <span className="text-slate-400 text-sm">—</span>
                      )}
                    </td>

                    {/* Assignment Cells */}
                    {activeAssignments.map(assignment => {
                      const key = `${student.id}-${assignment.id}`;
                      const score = grades[key];
                      const isEditing = editingCell === key;
                      
                      let cellStyle = "";
                      if (score !== undefined) {
                         const pct = getPercentage(score, assignment.maxPoints);
                         if (pct >= 90) cellStyle = "text-emerald-700 bg-emerald-50/50";
                         else if (pct < 70) cellStyle = "text-red-700 bg-red-50/50";
                         else cellStyle = "text-slate-700";
                      }
                      
                      return (
                        <td 
                          key={key} 
                          className={`border-r border-slate-200 relative transition-all duration-200 ${isEditing ? 'bg-blue-50 ring-2 ring-blue ring-inset z-10' : 'hover:bg-slate-100 cursor-cell'} ${cellStyle}`}
                          onClick={() => !isEditing && handleCellClick(student.id, assignment.id)}
                        >
                          <div className="w-full h-full min-h-[50px] flex items-center justify-center p-2">
                            {isEditing ? (
                              <div className="flex items-center w-full max-w-[100px]">
                                <input
                                  autoFocus
                                  type="number"
                                  className="w-full px-2 py-1 text-center font-semibold border-b-2 border-blue bg-transparent focus:outline-none"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  onKeyDown={(e) => handleKeyDown(e, student.id, assignment.id)}
                                  onBlur={() => handleCellSave(student.id, assignment.id)}
                                />
                              </div>
                            ) : (
                              <div className="text-sm font-semibold flex flex-col items-center">
                                {score !== undefined ? (
                                  <>
                                    <span>{score}</span>
                                    {/* <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 absolute bottom-1">/ {assignment.maxPoints}</span> */}
                                  </>
                                ) : (
                                  <span className="text-slate-300 group-hover:text-amber-500">—</span>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredStudents.length === 0 && (
             <div className="p-12 text-center text-slate-500">
               No students found matching your search.
             </div>
          )}
        </div>
      </Card>
      
      {/* Help text */}
      <p className="text-center text-slate-500 text-sm">
        💡 Tip: Click on any grid cell to instantly update grades. Press <kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded-md text-xs font-mono">Enter</kbd> to save.
      </p>
    </div>
  );
}
