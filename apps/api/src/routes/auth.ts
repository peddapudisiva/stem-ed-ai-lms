import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../data/store.js';
import { JWT_SECRET, authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', (req: Request, res: Response): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  const { password: _, ...safeUser } = user;

  res.json({
    token,
    user: safeUser,
  });
});

// POST /api/auth/register (admin only)
router.post('/register', authMiddleware, (req: AuthRequest, res: Response): void => {
  if (req.userRole !== 'admin') {
    res.status(403).json({ error: 'Only admins can register users' });
    return;
  }

  const { name, email, password, role, department } = req.body;

  if (users.find(u => u.email === email)) {
    res.status(409).json({ error: 'Email already exists' });
    return;
  }

  const newUser = {
    id: `u${Date.now()}`,
    name,
    email,
    password: bcrypt.hashSync(password || 'password123', 10),
    role,
    department,
    createdAt: new Date().toISOString().split('T')[0],
  };

  users.push(newUser);

  const { password: _, ...safeUser } = newUser;
  res.status(201).json(safeUser);
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req: AuthRequest, res: Response): void => {
  const user = users.find(u => u.id === req.userId);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  const { password: _, ...safeUser } = user;
  res.json(safeUser);
});

export default router;
