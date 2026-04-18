import { Router, Response } from 'express';
import { grades, courses } from '../data/store.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// GET /api/grades — get grades (role-filtered)
router.get('/', (req: AuthRequest, res: Response): void => {
  let result = grades;

  if (req.userRole === 'student') {
    result = grades.filter(g => g.studentId === req.userId);
  } else if (req.userRole === 'teacher') {
    const teacherCourses = courses.filter(c => c.teacherId === req.userId).map(c => c.id);
    result = grades.filter(g => teacherCourses.includes(g.courseId));
  }

  // Optional filters
  const { courseId, studentId } = req.query;
  if (courseId) result = result.filter(g => g.courseId === courseId);
  if (studentId) result = result.filter(g => g.studentId === studentId);

  res.json({ grades: result, total: result.length });
});

// POST /api/grades — teacher/admin can add grades
router.post('/', (req: AuthRequest, res: Response): void => {
  if (req.userRole !== 'teacher' && req.userRole !== 'admin') {
    res.status(403).json({ error: 'Only teachers can add grades' });
    return;
  }

  const { studentId, courseId, assignment, category, score, maxScore, weight } = req.body;

  const newGrade = {
    id: `g${Date.now()}`,
    studentId,
    courseId,
    assignment,
    category,
    score,
    maxScore,
    date: new Date().toISOString().split('T')[0],
    weight: weight || 10,
  };

  grades.push(newGrade);
  res.status(201).json(newGrade);
});

// PUT /api/grades/:id — update a grade
router.put('/:id', (req: AuthRequest, res: Response): void => {
  if (req.userRole !== 'teacher' && req.userRole !== 'admin') {
    res.status(403).json({ error: 'Only teachers can update grades' });
    return;
  }

  const idx = grades.findIndex(g => g.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Grade not found' });
    return;
  }

  const { score, maxScore, weight } = req.body;
  if (score !== undefined) grades[idx].score = score;
  if (maxScore !== undefined) grades[idx].maxScore = maxScore;
  if (weight !== undefined) grades[idx].weight = weight;

  res.json(grades[idx]);
});

export default router;
