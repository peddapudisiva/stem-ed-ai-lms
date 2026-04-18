export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  teacherId: string;
  credits: number;
  department: string;
  standards?: Standard[];
}

export interface Standard {
  id: string;
  code: string;
  description: string;
}

export interface Section {
  id: string;
  courseId: string;
  period: number;
  room: string;
  teacherId: string;
}
