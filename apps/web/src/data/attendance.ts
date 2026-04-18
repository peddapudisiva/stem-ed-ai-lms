import { AttendanceRecord } from '../types/attendance';
import { format, subDays } from 'date-fns';

const today = new Date();

export const DEMO_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    studentId: 'usr_student_001',
    sectionId: 'sec-001',
    date: format(today, 'yyyy-MM-dd'),
    status: 'present'
  },
  {
    id: 'att-2',
    studentId: 'stu-003',
    sectionId: 'sec-001',
    date: format(today, 'yyyy-MM-dd'),
    status: 'absent',
    notes: 'Unexcused'
  },
  {
    id: 'att-3',
    studentId: 'stu-005',
    sectionId: 'sec-001',
    date: format(today, 'yyyy-MM-dd'),
    status: 'late',
    notes: 'Arrived 15 mins late'
  },
  {
    id: 'att-4',
    studentId: 'usr_student_001',
    sectionId: 'sec-001',
    date: format(subDays(today, 1), 'yyyy-MM-dd'),
    status: 'present'
  }
];
