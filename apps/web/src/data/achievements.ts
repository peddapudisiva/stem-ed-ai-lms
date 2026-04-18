// No specific types yet, creating basic mock logic
export const DEMO_ACHIEVEMENTS = [
  {
    id: 'ach-1',
    title: 'Fast Learner',
    description: 'Complete 5 assignments in a row ahead of the due date.',
    icon: 'Zap',
    isEarned: true,
    earnedAt: '2026-03-15T10:00:00Z',
    score: 50
  },
  {
    id: 'ach-2',
    title: 'Perfect Attendance',
    description: 'No absences for 30 consecutive days.',
    icon: 'Calendar',
    isEarned: true,
    earnedAt: '2026-04-01T15:00:00Z',
    score: 100
  },
  {
    id: 'ach-3',
    title: 'Math Wizard',
    description: 'Score 100% on 3 consecutive Math quizzes.',
    icon: 'Award',
    isEarned: false,
    score: 150
  }
];

export const DEMO_XP = {
  total: 450,
  level: 4,
  nextLevelXp: 500
};
