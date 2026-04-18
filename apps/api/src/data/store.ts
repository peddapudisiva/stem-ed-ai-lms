// In-memory mock data store for the STEM-ED AI LMS
// This replaces a real database during development

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // bcrypt hashed
  role: 'admin' | 'teacher' | 'student' | 'parent';
  department?: string;
  avatar?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  teacherId: string;
  department: string;
  students: string[];
  schedule: string;
  room: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  assignment: string;
  category: 'Homework' | 'Quiz' | 'Exam' | 'Lab' | 'Project';
  score: number;
  maxScore: number;
  date: string;
  weight: number;
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'tardy' | 'excused';
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  type: 'Homework' | 'Quiz' | 'Exam' | 'Lab' | 'Project';
  status: 'active' | 'draft' | 'closed';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'grade' | 'attendance' | 'message' | 'assignment' | 'system';
  read: boolean;
  createdAt: string;
}

// ── Pre-seeded Users (passwords are "password123" hashed) ──
// Hash generated with bcryptjs: bcrypt.hashSync('password123', 10)
const HASHED_PW = '$2a$10$kpoyMlgINzlMzwD9OM4fZOUvhxg4dHcYziRnyA11NcD8hpR.9/bJ2';

export const users: User[] = [
  { id: 'u1', name: 'Dr. Admin', email: 'admin@stemed.edu', password: HASHED_PW, role: 'admin', department: 'Administration', createdAt: '2025-08-01' },
  { id: 'u2', name: 'Ms. Thompson', email: 'teacher@stemed.edu', password: HASHED_PW, role: 'teacher', department: 'Computer Science', createdAt: '2025-08-15' },
  { id: 'u3', name: 'Mr. Richards', email: 'richards@stemed.edu', password: HASHED_PW, role: 'teacher', department: 'Mathematics', createdAt: '2025-08-15' },
  { id: 'u4', name: 'Dr. Park', email: 'park@stemed.edu', password: HASHED_PW, role: 'teacher', department: 'Science', createdAt: '2025-08-15' },
  { id: 'u5', name: 'Marcus Johnson', email: 'student@stemed.edu', password: HASHED_PW, role: 'student', department: 'Grade 10', createdAt: '2025-09-01' },
  { id: 'u6', name: 'Emily Davis', email: 'emily@stemed.edu', password: HASHED_PW, role: 'student', department: 'Grade 10', createdAt: '2025-09-01' },
  { id: 'u7', name: 'Mrs. Johnson', email: 'parent@stemed.edu', password: HASHED_PW, role: 'parent', createdAt: '2025-09-01' },
];

export const courses: Course[] = [
  { id: 'c1', code: 'CS101', name: 'Intro to Computer Science', teacherId: 'u2', department: 'Computer Science', students: ['u5', 'u6'], schedule: 'Mon/Wed/Fri 1:00-2:30 PM', room: 'Room 114' },
  { id: 'c2', code: 'MATH201', name: 'AP Calculus AB', teacherId: 'u3', department: 'Mathematics', students: ['u5', 'u6'], schedule: 'Tue/Thu 8:00-9:30 AM', room: 'Room 302' },
  { id: 'c3', code: 'PHY301', name: 'AP Physics', teacherId: 'u4', department: 'Science', students: ['u5'], schedule: 'Mon/Wed 10:00-11:30 AM', room: 'Lab 4B' },
];

export const grades: Grade[] = [
  { id: 'g1', studentId: 'u5', courseId: 'c1', assignment: 'Python Basics: Variables', category: 'Homework', score: 95, maxScore: 100, date: '2026-04-10', weight: 20 },
  { id: 'g2', studentId: 'u5', courseId: 'c1', assignment: 'Control Flow Quiz', category: 'Quiz', score: 48, maxScore: 50, date: '2026-04-08', weight: 15 },
  { id: 'g3', studentId: 'u5', courseId: 'c1', assignment: 'Functions Lab', category: 'Lab', score: 92, maxScore: 100, date: '2026-04-05', weight: 25 },
  { id: 'g4', studentId: 'u5', courseId: 'c1', assignment: 'Midterm Exam', category: 'Exam', score: 88, maxScore: 100, date: '2026-03-28', weight: 40 },
  { id: 'g5', studentId: 'u5', courseId: 'c2', assignment: 'Derivatives Worksheet 1', category: 'Homework', score: 18, maxScore: 20, date: '2026-04-12', weight: 15 },
  { id: 'g6', studentId: 'u5', courseId: 'c2', assignment: 'Limits Quiz', category: 'Quiz', score: 42, maxScore: 50, date: '2026-04-06', weight: 20 },
  { id: 'g7', studentId: 'u5', courseId: 'c2', assignment: 'Midterm Exam', category: 'Exam', score: 82, maxScore: 100, date: '2026-03-25', weight: 50 },
  { id: 'g8', studentId: 'u5', courseId: 'c3', assignment: 'Forces Lab Report', category: 'Lab', score: 95, maxScore: 100, date: '2026-04-11', weight: 30 },
  { id: 'g9', studentId: 'u5', courseId: 'c3', assignment: 'Motion Quiz', category: 'Quiz', score: 44, maxScore: 50, date: '2026-04-07', weight: 15 },
  { id: 'g10', studentId: 'u5', courseId: 'c3', assignment: 'Midterm Exam', category: 'Exam', score: 90, maxScore: 100, date: '2026-03-26', weight: 40 },
];

export const assignments: Assignment[] = [
  { id: 'a1', courseId: 'c1', title: 'Python Basics: Variables', description: 'Complete exercises on variable types and assignments', dueDate: '2026-04-18', maxScore: 100, type: 'Homework', status: 'active' },
  { id: 'a2', courseId: 'c2', title: 'Derivatives Worksheet 3', description: 'Practice problems on chain rule and product rule', dueDate: '2026-04-22', maxScore: 100, type: 'Homework', status: 'active' },
  { id: 'a3', courseId: 'c3', title: 'Lab Report: Forces', description: 'Write up results from the forces experiment', dueDate: '2026-04-25', maxScore: 100, type: 'Lab', status: 'active' },
  { id: 'a4', courseId: 'c1', title: 'OOP Concepts Quiz', description: 'Quiz covering classes, objects, and inheritance', dueDate: '2026-04-30', maxScore: 50, type: 'Quiz', status: 'draft' },
];

export const attendance: Attendance[] = [
  { id: 'att1', studentId: 'u5', courseId: 'c1', date: '2026-04-15', status: 'present' },
  { id: 'att2', studentId: 'u5', courseId: 'c2', date: '2026-04-15', status: 'present' },
  { id: 'att3', studentId: 'u5', courseId: 'c3', date: '2026-04-15', status: 'present' },
  { id: 'att4', studentId: 'u5', courseId: 'c1', date: '2026-04-14', status: 'present' },
  { id: 'att5', studentId: 'u5', courseId: 'c2', date: '2026-04-14', status: 'tardy' },
  { id: 'att6', studentId: 'u6', courseId: 'c1', date: '2026-04-15', status: 'absent' },
  { id: 'att7', studentId: 'u6', courseId: 'c2', date: '2026-04-15', status: 'present' },
];

export const notifications: Notification[] = [
  { id: 'n1', userId: 'u5', title: 'New Course Material', description: 'Dr. Park uploaded "Chapter 4 Notes"', type: 'system', read: false, createdAt: '2026-04-15T10:00:00Z' },
  { id: 'n2', userId: 'u5', title: 'Grade Updated', description: 'Your Midterm was graded: 94%', type: 'grade', read: false, createdAt: '2026-04-15T08:00:00Z' },
  { id: 'n3', userId: 'u5', title: 'New Message', description: 'Ms. Thompson sent you a message', type: 'message', read: true, createdAt: '2026-04-14T15:00:00Z' },
];
