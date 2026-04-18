export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  sectionId: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
}

export interface DailyAttendance {
  studentId: string;
  date: string;
  status: AttendanceStatus;
}
