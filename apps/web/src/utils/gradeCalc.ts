export function calculateGrade(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
}

export function calculateGPA(grades: string[]): number {
  if (!grades.length) return 0;
  
  const points: Record<string, number> = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 };
  const totalPoints = grades.reduce((sum, grade) => sum + (points[grade] || 0), 0);
  
  return Number((totalPoints / grades.length).toFixed(2));
}
