import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import courseRoutes from './routes/courses.js';
import gradeRoutes from './routes/grades.js';
import attendanceRoutes from './routes/attendance.js';
import notificationRoutes from './routes/notifications.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// ── Request Logger ──
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
  next();
});

// ── Routes ──
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/notifications', notificationRoutes);

// ── Health Check ──
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// ── 404 Handler ──
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Start ──
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║   STEM-ED AI  •  API Server v1.0.0      ║
  ║   http://localhost:${PORT}/api/health       ║
  ╚══════════════════════════════════════════╝
  `);
  console.log('  Available endpoints:');
  console.log('    POST   /api/auth/login');
  console.log('    POST   /api/auth/register');
  console.log('    GET    /api/auth/me');
  console.log('    GET    /api/users');
  console.log('    GET    /api/courses');
  console.log('    GET    /api/grades');
  console.log('    GET    /api/attendance');
  console.log('    GET    /api/notifications');
  console.log('    GET    /api/health');
  console.log('');
  console.log('  Demo accounts (password: password123):');
  console.log('    admin@stemed.edu   | teacher@stemed.edu');
  console.log('    student@stemed.edu | parent@stemed.edu');
  console.log('');
});

export default app;
