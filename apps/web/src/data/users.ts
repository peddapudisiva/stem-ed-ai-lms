import type { User } from '../types/auth';

export const DEMO_USERS: Record<string, User> = {
  admin: {
    id: 'usr_admin_001',
    name: 'Principal Rivera',
    email: 'rivera@cpehs.edu',
    role: 'admin',
    schoolId: 'sch_cphs_001',
  },
  teacher: {
    id: 'usr_teacher_001',
    name: 'Ms. Thompson',
    email: 'thompson@cpehs.edu',
    role: 'teacher',
    schoolId: 'sch_cphs_001',
  },
  student: {
    id: 'usr_student_001',
    name: 'Marcus Johnson',
    email: 'mjohnson@student.cpehs.edu',
    role: 'student',
    schoolId: 'sch_cphs_001',
  },
  parent: {
    id: 'usr_parent_001',
    name: 'Mrs. Johnson',
    email: 'cjohnson@gmail.com',
    role: 'parent',
    schoolId: 'sch_cphs_001',
  },
};
