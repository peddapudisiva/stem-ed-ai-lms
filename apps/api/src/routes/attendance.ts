import { Router, Response } from 'express';
import { attendance, courses } from '../data/store.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// GET /api/attendance
router.get('/', (req: AuthRequest, res: Response): void => {
  let result = attendance;

  if (req.userRole === 'student') {
    result = attendance.filter(a => a.studentId === req.userId);
  } else if (req.userRole === 'teacher') {
    const teacherCourses = courses.filter(c => c.teacherId === req.userId).map(c => c.id);
    result = attendance.filter(a => teacherCourses.includes(a.courseId));
  }

  const { courseId, date, studentId } = req.query;
  if (courseId) result = result.filter(a => a.courseId === courseId);
  if (date) result = result.filter(a => a.date === date);
  if (studentId) result = result.filter(a => a.studentId === studentId);

  res.json({ attendance: result, total: result.length });
});

// POST /api/attendance — teacher marks attendance
router.post('/', (req: AuthRequest, res: Response): void => {
  if (req.userRole !== 'teacher' && req.userRole !== 'admin') {
    res.status(403).json({ error: 'Only teachers can mark attendance' });
    return;
  }

  const records: Array<{ studentId: string; courseId: string; date: string; status: string }> = req.body.records || [req.body];

  const created = records.map(r => {
    const record = {
      id: `att${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
      studentId: r.studentId,
      courseId: r.courseId,
      date: r.date || new Date().toISOString().split('T')[0],
      status: r.status as 'present' | 'absent' | 'tardy' | 'excused',
    };
    attendance.push(record);
    return record;
  });

  res.status(201).json({ created, count: created.length });
});

// PUT /api/attendance/:id
router.put('/:id', (req: AuthRequest, res: Response): void => {
  if (req.userRole !== 'teacher' && req.userRole !== 'admin') {
    res.status(403).json({ error: 'Only teachers can update attendance' });
    return;
  }

  const idx = attendance.findIndex(a => a.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Record not found' });
    return;
  }

  if (req.body.status) attendance[idx].status = req.body.status;
  res.json(attendance[idx]);
});

export default router;
