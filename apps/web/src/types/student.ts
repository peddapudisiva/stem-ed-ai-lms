export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  gradeLevel: number;
  dateOfBirth: string;
  gpa: number;
  attendanceRate: number;
  atRisk: boolean;
  avatarUrl?: string;
  guardians: Guardian[];
}

export interface Guardian {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  relation: string;
}
