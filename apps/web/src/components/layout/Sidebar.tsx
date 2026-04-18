import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useUiStore } from '../../stores/uiStore';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut,
  GraduationCap,
  Award,
  CheckSquare,
  FileBox,
  X,
  FileText,
  CreditCard
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const getRoleLinks = (role: string | null): NavItem[] => {
  const commonLinks: NavItem[] = [
    { id: 'messages', label: 'Messages', href: `/${role}/messages`, icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'calendar', label: 'Calendar', href: `/${role}/calendar`, icon: <Calendar className="w-5 h-5" /> },
  ];

  switch (role) {
    case 'admin':
      return [
        { id: 'admin-dash', label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'admin-users', label: 'Users', href: '/admin/users', icon: <Users className="w-5 h-5" /> },
        { id: 'admin-analytics', label: 'Analytics', href: '/admin/analytics', icon: <FileBox className="w-5 h-5" /> },
        ...commonLinks
      ];
    case 'teacher':
      return [
        { id: 'teacher-dash', label: 'Dashboard', href: '/teacher/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'teacher-gradebook', label: 'Gradebook', href: '/teacher/gradebook', icon: <BookOpen className="w-5 h-5" /> },
        { id: 'teacher-attendance', label: 'Attendance', href: '/teacher/attendance', icon: <CheckSquare className="w-5 h-5" /> },
        { id: 'teacher-assignments', label: 'Assignments', href: '/teacher/assignments', icon: <FileBox className="w-5 h-5" /> },
        ...commonLinks
      ];
    case 'student':
      return [
        { id: 'student-dash', label: 'Dashboard', href: '/student/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'student-grades', label: 'Grades', href: '/student/grades', icon: <GraduationCap className="w-5 h-5" /> },
        { id: 'student-tutor', label: 'AI Tutor', href: '/student/ai-tutor', icon: <MessageSquare className="w-5 h-5" /> },
        { id: 'student-achievements', label: 'Achievements', href: '/student/achievements', icon: <Award className="w-5 h-5" /> },
        ...commonLinks
      ];
    case 'parent':
      return [
        { id: 'parent-dash', label: 'Dashboard', href: '/parent/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'parent-reports', label: 'Progress Reports', href: '/parent/reports', icon: <FileText className="w-5 h-5" /> },
        { id: 'parent-fees', label: 'Fee Payments', href: '/parent/fees', icon: <CreditCard className="w-5 h-5" /> },
        { id: 'parent-directory', label: 'Teacher Directory', href: '/parent/directory', icon: <Users className="w-5 h-5" /> },
        ...commonLinks
      ];
    default:
      return [];
  }
};

export function Sidebar() {
  const { user, role, logout } = useAuthStore();
  const { isSidebarOpen, setSidebarOpen } = useUiStore();
  
  const links = getRoleLinks(role);

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="STEM-ED AI Logo" className="w-8 h-8 rounded-lg" />
          <span className="brand text-[20px] font-bold text-slate-900 leading-none mt-1">STEM-ED AI</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto py-4 pr-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            onClick={() => setSidebarOpen(false)} // close mobile sidebar on click
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-r-xl text-[14px] font-[500] transition-all duration-200 mb-1 border-l-[3px]",
              isActive 
                ? "bg-gradient-to-r from-blue-50/80 to-transparent text-blue-dk font-[600] border-blue shadow-[inset_1px_0_0_rgba(255,255,255,1)]" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border-transparent relative after:absolute after:inset-y-2 after:-left-[3px] after:w-[3px] after:rounded-r-md after:bg-slate-200 hover:after:bg-slate-300 after:opacity-0 hover:after:opacity-100 after:transition-opacity"
            )}
          >
            {({ isActive }) => (
              <>
                <div className={cn(
                  "transition-colors",
                  isActive ? "text-blue" : "text-slate-400 group-hover:text-slate-600"
                )}>
                  {link.icon}
                </div>
                {link.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Profile & Logout */}
      <div className="mt-auto mx-4 mb-4 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.02)] relative overflow-hidden group">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />
        
        {user && (
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-[700] text-[14px] shadow-sm border-2 border-white shrink-0">
              {user.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-[700] text-slate-800 truncate leading-tight">{user.name}</span>
              <span className="text-[11px] text-slate-500 truncate capitalize font-[500] mt-0.5">{user.role} Account</span>
            </div>
          </div>
        )}

        <div className="space-y-1 relative z-10 border-t border-slate-200/60 pt-3">
          <NavLink
            to="/shared/settings"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center justify-between rounded-xl px-3 py-2 text-[13px] font-[600] transition-all group/btn",
                isActive ? "bg-white text-blue-dk shadow-[0_2px_6px_rgba(0,0,0,0.04)] border border-slate-200/60" : "text-slate-600 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200/60 hover:shadow-[0_2px_6px_rgba(0,0,0,0.03)]"
              )
            }
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-slate-400 group-hover/btn:text-blue transition-colors" />
              Settings
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover/btn:bg-blue transition-colors" />
          </NavLink>
          
          <button
            onClick={() => {
              logout();
              setSidebarOpen(false);
            }}
            className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-[13px] font-[600] text-slate-600 transition-all hover:bg-red-50 hover:text-red-dk hover:shadow-[0_2px_6px_rgba(239,68,68,0.05)] border border-transparent hover:border-red-100 group/btn"
          >
            <div className="flex items-center gap-2.5">
              <LogOut className="w-4 h-4 text-slate-400 group-hover/btn:text-red-dk transition-colors" />
              Sign Out
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 bg-white border-r border-slate-100 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-surface shadow-xl lg:hidden flex flex-col"
            >
              <SidebarContent />
              
              {/* Close Button Mobile */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
