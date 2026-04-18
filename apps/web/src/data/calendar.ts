import { CalendarEvent } from '../types/calendar';
import { addDays, subDays } from 'date-fns';

const today = new Date();

export const DEMO_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'cal-1',
    title: 'Science Fair Project Due',
    startDate: addDays(today, 2).toISOString(),
    endDate: addDays(today, 2).toISOString(),
    type: 'assignment',
    courseId: 'sci-101'
  },
  {
    id: 'cal-2',
    title: 'Spring Break Begins',
    startDate: addDays(today, 5).toISOString(),
    endDate: addDays(today, 12).toISOString(),
    type: 'holiday'
  },
  {
    id: 'cal-3',
    title: 'Robotics Club Meeting',
    startDate: today.toISOString(),
    endDate: today.toISOString(),
    type: 'extracurricular',
    location: 'Room B102'
  },
  {
    id: 'cal-4',
    title: 'Parent-Teacher Conferences',
    startDate: subDays(today, 2).toISOString(),
    endDate: subDays(today, 1).toISOString(),
    type: 'academic'
  }
];
