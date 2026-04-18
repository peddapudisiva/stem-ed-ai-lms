import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, FileText, Calendar as CalendarIcon, Target, Activity, X } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { DEMO_ASSIGNMENTS } from '../../../data/assignments';

export function TeacherAssignments() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<any>(null);

  const handleCreate = () => {
    setEditingAssignment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (assignment: any) => {
    setEditingAssignment(assignment);
    setIsModalOpen(true);
  };

  const filteredAssignments = DEMO_ASSIGNMENTS.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || a.courseId === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-6 lg:space-y-8 max-w-7xl mx-auto pb-12 w-full mt-2">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Assignment Management</h1>
          <p className="text-slate-500 text-sm mt-1">Create, edit, and track student assignments across all sections.</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-5 h-5" /> Create Assignment
        </Button>
      </div>

      <Card className="p-4 border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search assignments..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all"
            />
          </div>
          <div className="flex gap-3">
             <select 
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium pl-4 pr-10 py-2 focus:outline-none focus:border-blue transition-all hover:bg-slate-100 min-w-[160px]"
              >
                <option value="all">All Courses</option>
                <option value="cs-101">CS101: Intro to CS</option>
                <option value="math-201">MATH201: Calculus</option>
              </select>
            <Button variant="secondary" className="gap-2 shrink-0">
              <Filter className="w-4 h-4" /> Filter
            </Button>
          </div>
        </div>
      </Card>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col group border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-5 h-5" />
                  </div>
                  <Badge variant={
                    assignment.status === 'published' ? 'green' : 
                    assignment.status === 'closed' ? 'slate' : 'amber'
                  }>
                    {assignment.status}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue transition-colors line-clamp-2">
                  {assignment.title}
                </h3>
                <p className="text-sm text-slate-500 mb-6 line-clamp-3 flex-1 flex-grow">
                  {assignment.description}
                </p>

                <div className="space-y-3 mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center text-sm text-slate-600">
                    <CalendarIcon className="w-4 h-4 mr-2 text-slate-400" />
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Target className="w-4 h-4 mr-2 text-slate-400" />
                    {assignment.maxPoints} Points Max
                  </div>
                  {assignment.standards && assignment.standards.length > 0 && (
                     <div className="flex items-center text-sm text-slate-600">
                      <Activity className="w-4 h-4 mr-2 text-slate-400" />
                      {assignment.standards.length} Standards Aligned
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2 rounded-b-2xl">
                <Button 
                  variant="secondary" 
                  className="flex-1 bg-white border-slate-200 text-slate-700 hover:text-blue"
                  onClick={() => handleEdit(assignment)}
                >
                  Edit
                </Button>
                <Button 
                  variant="secondary" 
                  className="flex-1 bg-white border-slate-200 text-slate-700 hover:text-emerald-600"
                  onClick={() => navigate('/teacher/gradebook')}
                >
                  Submissions
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

       {filteredAssignments.length === 0 && (
         <div className="py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No assignments found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query.</p>
         </div>
       )}

      {/* Creation/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  {editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Assignment Title</label>
                  <input 
                    type="text" 
                    defaultValue={editingAssignment?.title || ''}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue/20 outline-none" 
                    placeholder="e.g. Chapter 4 Quiz" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Due Date</label>
                    <input 
                      type="datetime-local" 
                      defaultValue={editingAssignment?.dueDate ? editingAssignment.dueDate.slice(0, 16) : ''}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue/20 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Max Points</label>
                    <input 
                      type="number" 
                      defaultValue={editingAssignment?.maxPoints || 100} 
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue/20 outline-none" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Instructions</label>
                  <textarea 
                    rows={4} 
                    defaultValue={editingAssignment?.description || ''}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue/20 outline-none resize-none" 
                    placeholder="Provide detailed instructions for the students..."
                  ></textarea>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-2xl">
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                  {editingAssignment ? 'Save Changes' : 'Publish Assignment'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
