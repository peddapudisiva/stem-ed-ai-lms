import type { Student } from '../types/student';

export const DEMO_STUDENTS: Student[] = [
  {
    id: 'usr_student_001',
    studentId: '100452',
    firstName: 'Marcus',
    lastName: 'Johnson',
    email: 'mjohnson@student.cpehs.edu',
    gradeLevel: 10,
    dateOfBirth: '2010-05-14',
    gpa: 3.8,
    attendanceRate: 98.5,
    atRisk: false,
    guardians: [
      {
        id: 'g-001',
        firstName: 'Carol',
        lastName: 'Johnson',
        email: 'cjohnson@gmail.com',
        phone: '555-0102',
        relation: 'Mother'
      }
    ]
  },
  {
    id: 'stu-002',
    studentId: '100453',
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'schen@student.cpehs.edu',
    gradeLevel: 10,
    dateOfBirth: '2010-08-22',
    gpa: 4.0,
    attendanceRate: 100,
    atRisk: false,
    guardians: []
  },
  {
    id: 'stu-003',
    studentId: '100454',
    firstName: 'David',
    lastName: 'Smith',
    email: 'dsmith@student.cpehs.edu',
    gradeLevel: 10,
    dateOfBirth: '2009-11-05',
    gpa: 2.1,
    attendanceRate: 82.0,
    atRisk: true,
    guardians: []
  },
  {
    id: 'stu-004',
    studentId: '100455',
    firstName: 'Emma',
    lastName: 'Rodriguez',
    email: 'erodriguez@student.cpehs.edu',
    gradeLevel: 10,
    dateOfBirth: '2010-02-17',
    gpa: 3.5,
    attendanceRate: 95.0,
    atRisk: false,
    guardians: []
  },
  {
    id: 'stu-005',
    studentId: '100456',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'jwilson@student.cpehs.edu',
    gradeLevel: 10,
    dateOfBirth: '2010-06-30',
    gpa: 2.8,
    attendanceRate: 88.5,
    atRisk: true,
    guardians: []
  }
];
