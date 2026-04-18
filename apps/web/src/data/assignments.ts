import type { Assignment, Submission } from '../types/assignment';

export const DEMO_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-001',
    courseId: 'cs-101',
    sectionId: 'sec-001',
    title: 'Python Basics: Variables and Data Types',
    description: 'Complete all exercises in Chapter 2 regarding variable declarations, integers, floats, and strings. Submit your .py file.',
    dueDate: '2026-04-20T23:59:00Z',
    maxPoints: 100,
    category: 'Homework',
    status: 'published',
    standards: ['std-cs-2']
  },
  {
    id: 'asg-002',
    courseId: 'cs-101',
    sectionId: 'sec-001',
    title: 'Control Flow Quiz',
    description: 'In-class quiz covering if, elif, else statements and basic while loops.',
    dueDate: '2026-04-15T15:00:00Z',
    maxPoints: 50,
    category: 'Quiz',
    status: 'closed',
    standards: ['std-cs-3']
  },
  {
    id: 'asg-003',
    courseId: 'math-201',
    sectionId: 'sec-002',
    title: 'Derivatives Worksheet 1',
    description: 'Power rule and basic chain rule problems. Show all work.',
    dueDate: '2026-04-18T23:59:00Z',
    maxPoints: 20,
    category: 'Homework',
    status: 'published',
    standards: ['std-ma-2']
  }
];

export const DEMO_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-001',
    assignmentId: 'asg-002',
    studentId: 'usr_student_001',
    submittedAt: '2026-04-15T14:45:00Z',
    status: 'graded',
    score: 48,
    feedback: 'Great job! Just missed one edge case on question 4.'
  },
  {
    id: 'sub-002',
    assignmentId: 'asg-002',
    studentId: 'stu-003',
    submittedAt: '2026-04-15T14:55:00Z',
    status: 'graded',
    score: 32,
    feedback: 'Please review the difference between = and ==.'
  },
  {
    id: 'sub-003',
    assignmentId: 'asg-003',
    studentId: 'usr_student_001',
    status: 'submitted',
    submittedAt: '2026-04-17T18:20:00Z',
    attachments: ['derivatives_wk1_marcus.pdf']
  }
];
