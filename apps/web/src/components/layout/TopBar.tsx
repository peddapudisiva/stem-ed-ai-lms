import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, X, CheckCircle, FileText, User, MessageSquare } from 'lucide-react';
import { useUiStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { useNotificationStore } from '../../stores/notificationStore';
import { Avatar } from '../ui/Avatar';
import { Dropdown } from '../ui/Dropdown';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'New Course Material', desc: 'Dr. Park uploaded "Chapter 4 Notes"', time: '10 min ago', icon: <FileText className="w-4 h-4 text-blue-500" /> },
  { id: 2, title: 'Grade Updated', desc: 'Your Midterm was graded: 94%', time: '1 hour ago', icon: <CheckCircle className="w-4 h-4 text-emerald-500" /> },
  { id: 3, title: 'New Message', desc: 'Ms. Thompson sent you a message', time: '3 hours ago', icon: <MessageSquare className="w-4 h-4 text-violet-500" /> },
];

const MOCK_SEARCH_RESULTS = [
  { type: 'Course', text: 'Introduction to Computer Science' },
  { type: 'Student', text: 'Marcus Johnson' },
  { type: 'Assignment', text: 'Python Basics: Variables' },
];

export function TopBar() {
  const navigate = useNavigate();
  const { toggleSidebar } = useUiStore();
  const { user, logout } = useAuthStore();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userDropdownItems = [
    { id: 'profile', label: 'My Profile', onClick: () => navigate('/shared/settings') },
    { id: 'settings', label: 'Account Settings', onClick: () => navigate('/shared/settings') },
    { id: 'logout', label: 'Sign out', danger: true, onClick: () => logout() }
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-white/80 px-4 shadow-sm backdrop-blur-md sm:gap-x-6 sm:px-6 lg:px-8 transition-all">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={toggleSidebar}
          className="-m-2.5 p-2.5 text-slate-700 lg:hidden hover:bg-slate-100 rounded-md transition-colors"
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator for mobile */}
        <div className="h-6 w-px bg-slate-200 lg:hidden" aria-hidden="true" />

        {/* Search Engine */}
        <div className="relative flex flex-1 max-w-2xl" ref={searchRef}>
          <form className="relative flex flex-1 items-center" onSubmit={(e) => e.preventDefault()}>
            <Search className="absolute left-3 w-4 h-4 text-slate-400" aria-hidden="true" />
            <input
              id="search-field"
              className="block w-full border border-slate-200 py-2 pl-9 pr-4 text-sm text-slate-900 rounded-full focus:ring-2 focus:ring-blue/20 bg-slate-50 outline-none transition-all focus:bg-white focus:border-blue-300"
              placeholder="Search students, courses, assignments..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearch(true);
              }}
              onFocus={() => setShowSearch(true)}
            />
          </form>

          {/* Search Dropdown */}
          <AnimatePresence>
            {showSearch && searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 py-2"
              >
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Results for "{searchQuery}"</div>
                {MOCK_SEARCH_RESULTS.map((res, i) => (
                  <button key={i} className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <Search className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{res.text}</p>
                      <p className="text-xs text-slate-400">{res.type}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-x-4 lg:gap-x-6 shrink-0">
        
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            type="button" 
            className="p-2.5 text-slate-500 hover:text-slate-700 bg-slate-50 rounded-full hover:bg-slate-100 transition-all focus:outline-none relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-bold text-slate-800">Notifications</h3>
                  <button className="text-xs text-blue-600 font-medium hover:text-blue-700">Mark all read</button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {MOCK_NOTIFICATIONS.map(notif => (
                    <div key={notif.id} className="px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-3 cursor-pointer">
                      <div className="shrink-0 mt-1">{notif.icon}</div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 leading-tight">{notif.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{notif.desc}</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-medium">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 text-center text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors bg-white">
                  View all notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Separator */}
        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200" aria-hidden="true" />

        {/* Profile dropdown */}
        <Dropdown
          align="right"
          trigger={
            <div className="flex items-center gap-x-2 p-1.5 hover:bg-slate-50 rounded-full cursor-pointer transition-colors border border-transparent hover:border-slate-200">
              <Avatar initials={user?.name || 'U'} role={user?.role} size="sm" />
              <span className="hidden lg:flex lg:items-center">
                <span className="text-[14px] font-[600] leading-6 text-slate-900 px-2" aria-hidden="true">
                  {user?.name}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-2 bg-slate-100 px-2 py-0.5 rounded-full">
                  {user?.role}
                </span>
              </span>
            </div>
          }
          items={userDropdownItems}
        />
      </div>
    </header>
  );
}
