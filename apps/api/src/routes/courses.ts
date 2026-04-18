import { Router, Response } from 'express';
import { courses, users } from '../data/store.js';
import { authMiddleware, requireRole, AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// GET /api/courses — list courses (filtered by role)
router.get('/', (req: AuthRequest, res: Response): void => {
  let result = courses;

  if (req.userRole === 'teacher') {
    result = courses.filter(c => c.teacherId === req.userId);
  } else if (req.userRole === 'student') {
    result = courses.filter(c => c.students.includes(req.userId!));
  }

  // Enrich with teacher name
  const enriched = result.map(c => {
    const teacher = users.find(u => u.id === c.teacherId);
    return { ...c, teacherName: teacher?.name || 'Unknown' };
  });

  res.json({ courses: enriched, total: enriched.length });
});

// GET /api/courses/:id
router.get('/:id', (req: AuthRequest, res: Response): void => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) {
    res.status(404).json({ error: 'Course not found' });
    return;
  }

  const teacher = users.find(u => u.id === course.teacherId);
  const studentList = course.students.map(sid => {
    const s = users.find(u => u.id === sid);
    return s ? { id: s.id, name: s.name, email: s.email } : null;
  }).filter(Boolean);

  res.json({
    ...course,
    teacherName: teacher?.name || 'Unknown',
    studentList,
  });
});

// POST /api/courses — admin/teacher can create
router.post('/', requireRole('admin', 'teacher'), (req: AuthRequest, res: Response): void => {
  const { code, name, department, schedule, room } = req.body;

  const newCourse = {
    id: `c${Date.now()}`,
    code,
    name,
    teacherId: req.userRole === 'teacher' ? req.userId! : req.body.teacherId,
    department,
    students: req.body.students || [],
    schedule: schedule || 'TBD',
    room: room || 'TBD',
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
});

export default router;
