import { GradebookEntry } from '../types/gradebook';

// Keyed by section/course ID
export const DEMO_GRADEBOOK: Record<string, GradebookEntry[]> = {
  'cs-101': [
    { studentId: 'usr_student_001', 'asg-001': '', 'asg-002': 48 },
    { studentId: 'stu-002', 'asg-001': 95, 'asg-002': 50 },
    { studentId: 'stu-003', 'asg-001': 0, 'asg-002': 32 },
    { studentId: 'stu-004', 'asg-001': 88, 'asg-002': 45 },
    { studentId: 'stu-005', 'asg-001': 70, 'asg-002': 38 },
  ],
  'math-201': [
    { studentId: 'usr_student_001', 'asg-003': '' },
    { studentId: 'stu-002', 'asg-003': '' },
  ]
};
