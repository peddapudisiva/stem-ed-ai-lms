import { Notification } from '../types/notification';

export const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'usr_student_001',
    title: 'Assignment Graded',
    message: 'Your Python Basics quiz has been graded.',
    type: 'success',
    isRead: false,
    createdAt: new Date().toISOString(),
    link: '/student/grades'
  },
  {
    id: 'notif-2',
    userId: 'usr_student_001',
    title: 'New Assignment',
    message: 'Derivatives Worksheet 1 is due tomorrow.',
    type: 'warning',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    link: '/student/dashboard'
  },
  {
    id: 'notif-3',
    userId: 'usr_teacher_001',
    title: 'Attendance required',
    message: 'Please submit attendance for CS101 Section 1.',
    type: 'info',
    isRead: true,
    createdAt: new Date(Date.now() - 86000000).toISOString()
  }
];
