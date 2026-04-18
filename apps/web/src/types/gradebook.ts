export interface GradebookColumn {
  id: string;
  title: string;
  category: string;
  maxPoints: number;
  date: string;
}

export interface GradebookEntry {
  studentId: string;
  [assignmentId: string]: string | number; // allow dynamic keys for scores
}
