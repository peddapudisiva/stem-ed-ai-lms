import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, X } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { useAuthStore } from '../../../stores/authStore';

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  location: string;
  color: string;
  type: string;
}

const DEMO_EVENTS: Record<string, CalendarEvent[]> = {
  '2026-04-13': [
    { id: 'e1', title: 'Faculty Meeting', time: '08:00 - 09:00', location: 'Room 101', color: 'bg-blue-500', type: 'Meeting' },
  ],
  '2026-04-14': [
    { id: 'e2', title: 'Parent-Teacher Conference', time: '14:00 - 16:00', location: 'Main Hall', color: 'bg-purple-500', type: 'Conference' },
  ],
  '2026-04-15': [
    { id: 'e3', title: 'CS101 Midterm Exam', time: '10:00 - 12:00', location: 'Room 302', color: 'bg-red-500', type: 'Exam' },
    { id: 'e4', title: 'Department Sync', time: '15:00 - 16:00', location: 'Virtual', color: 'bg-emerald-500', type: 'Meeting' },
  ],
  '2026-04-16': [
    { id: 'e5', title: 'Office Hours', time: '12:00 - 14:00', location: 'Faculty Lounge', color: 'bg-amber-500', type: 'Office Hours' },
  ],
  '2026-04-17': [
    { id: 'e6', title: 'Curriculum Review', time: '09:00 - 11:00', location: 'Board Room', color: 'bg-indigo-500', type: 'Meeting' },
  ],
  '2026-04-18': [
    { id: 'e7', title: 'Calculus 101', time: '08:00 - 09:30', location: 'Room 302', color: 'bg-blue-500', type: 'Class' },
    { id: 'e8', title: 'AP Physics', time: '10:00 - 11:30', location: 'Lab 4B', color: 'bg-emerald-500', type: 'Class' },
    { id: 'e9', title: 'Office Hours', time: '12:30 - 14:00', location: 'Faculty Lounge', color: 'bg-amber-500', type: 'Office Hours' },
  ],
  '2026-04-20': [
    { id: 'e10', title: 'Python Basics Due', time: 'All Day', location: '', color: 'bg-red-500', type: 'Deadline' },
  ],
  '2026-04-22': [
    { id: 'e11', title: 'Science Fair Prep', time: '13:00 - 15:00', location: 'Gymnasium', color: 'bg-purple-500', type: 'Event' },
  ],
  '2026-04-25': [
    { id: 'e12', title: 'Staff Development Day', time: 'All Day', location: 'Auditorium', color: 'bg-indigo-500', type: 'Event' },
  ],
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function SharedCalendar() {
  const { role } = useAuthStore();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(today.toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Record<string, CalendarEvent[]>>(DEMO_EVENTS);

  // New event form state
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newType, setNewType] = useState('Meeting');

  const TYPE_COLORS: Record<string, string> = {
    'Meeting': 'bg-blue-500',
    'Class': 'bg-emerald-500',
    'Exam': 'bg-red-500',
    'Deadline': 'bg-red-500',
    'Event': 'bg-purple-500',
    'Office Hours': 'bg-amber-500',
    'Conference': 'bg-indigo-500',
  };

  const openAddModal = () => {
    setNewTitle('');
    setNewDate(selectedDate || today.toISOString().split('T')[0]);
    setNewTime('09:00');
    setNewEndTime('10:00');
    setNewLocation('');
    setNewType('Meeting');
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    if (!newTitle.trim() || !newDate) return;
    const newEvent: CalendarEvent = {
      id: `e${Date.now()}`,
      title: newTitle,
      time: newTime && newEndTime ? `${newTime} - ${newEndTime}` : 'All Day',
      location: newLocation,
      color: TYPE_COLORS[newType] || 'bg-blue-500',
      type: newType,
    };
    setEvents(prev => ({
      ...prev,
      [newDate]: [...(prev[newDate] || []), newEvent],
    }));
    setSelectedDate(newDate);
    setIsModalOpen(false);
  };

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today.toISOString().split('T')[0]);
  };

  const formatDate = (day: number) => {
    const m = String(currentMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${currentYear}-${m}-${d}`;
  };

  const todayStr = today.toISOString().split('T')[0];
  const selectedEvents = selectedDate ? (events[selectedDate] || []) : [];

  // Upcoming events (next 14 days from today)
  const upcomingEvents: { date: string; events: CalendarEvent[] }[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().split('T')[0];
    if (events[key]) {
      upcomingEvents.push({ date: key, events: events[key] });
    }
  }

  return (
    <div className="space-y-6 lg:space-y-8 max-w-7xl mx-auto pb-12 w-full mt-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Calendar</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your schedule, deadlines, and events.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={goToToday}>Today</Button>
          <Button variant="primary" className="gap-2" onClick={openAddModal}>
            <Plus className="w-4 h-4" /> Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Calendar Grid */}
        <div className="xl:col-span-2">
          <Card className="border-slate-200 p-0 overflow-hidden">
            {/* Month Navigation */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
              <h2 className="text-lg font-bold text-slate-900">
                {MONTHS[currentMonth]} {currentYear}
              </h2>
              <div className="flex items-center gap-1">
                <button onClick={prevMonth} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextMonth} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
              {DAYS.map(day => (
                <div key={day} className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {/* Empty cells before first day */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[90px] p-2 border-b border-r border-slate-50 bg-slate-50/30" />
              ))}

              {/* Days of month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = formatDate(day);
                const isToday = dateStr === todayStr;
                const isSelected = dateStr === selectedDate;
                const dayEvents = events[dateStr] || [];

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`min-h-[90px] p-2 border-b border-r border-slate-50 text-left transition-all duration-150 hover:bg-blue-50/50 ${
                      isSelected ? 'bg-blue-50 ring-1 ring-inset ring-blue-200' : ''
                    }`}
                  >
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold ${
                      isToday ? 'bg-blue text-white' : 'text-slate-700'
                    }`}>
                      {day}
                    </span>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 2).map(ev => (
                        <div key={ev.id} className={`${ev.color} text-white text-[10px] font-medium px-1.5 py-0.5 rounded truncate`}>
                          {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[10px] text-slate-500 font-medium pl-1">+{dayEvents.length - 2} more</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Sidebar: Selected Day + Upcoming */}
        <div className="xl:col-span-1 space-y-6">
          {/* Selected Date Events */}
          <Card className="border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              {selectedDate
                ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                : 'Select a date'
              }
            </h3>
            {selectedEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedEvents.map((ev, i) => (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    <div className={`w-1 rounded-full shrink-0 ${ev.color}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900">{ev.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <Clock className="w-3 h-3" />
                        {ev.time}
                      </div>
                      {ev.location && (
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {ev.location}
                        </div>
                      )}
                    </div>
                    <Badge variant={
                      ev.type === 'Exam' || ev.type === 'Deadline' ? 'red' :
                      ev.type === 'Meeting' ? 'blue' :
                      ev.type === 'Class' ? 'green' : 'amber'
                    }>
                      {ev.type}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-sm text-slate-400">
                No events scheduled for this day.
              </div>
            )}
          </Card>

          {/* Upcoming Events */}
          <Card className="border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-4">Upcoming Events</h3>
            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.slice(0, 5).map(group => (
                  <div key={group.date}>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      {new Date(group.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <div className="space-y-2">
                      {group.events.map(ev => (
                        <div key={ev.id} className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${ev.color}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{ev.title}</p>
                            <p className="text-[11px] text-slate-500">{ev.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 text-center py-4">No upcoming events.</p>
            )}
          </Card>
        </div>
      </div>

      {/* Add Event Modal */}
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
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Add New Event</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Event Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Staff Meeting"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Start Time</label>
                    <input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">End Time</label>
                    <input
                      type="time"
                      value={newEndTime}
                      onChange={(e) => setNewEndTime(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Room 302"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Event Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all appearance-none bg-white"
                  >
                    <option>Meeting</option>
                    <option>Class</option>
                    <option>Exam</option>
                    <option>Deadline</option>
                    <option>Event</option>
                    <option>Office Hours</option>
                    <option>Conference</option>
                  </select>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-2xl">
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleAddEvent} disabled={!newTitle.trim()}>Add Event</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
