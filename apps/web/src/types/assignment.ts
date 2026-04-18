export interface Assignment {
  id: string;
  courseId: string;
  sectionId: string;
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  category: 'Homework' | 'Quiz' | 'Test' | 'Project' | 'Participation';
  status: 'draft' | 'published' | 'closed';
  standards?: string[];
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt?: string;
  status: 'missing' | 'submitted' | 'graded' | 'late';
  score?: number;
  feedback?: string;
  attachments?: string[];
}
