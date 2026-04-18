import { Router, Response } from 'express';
import { users } from '../data/store.js';
import { authMiddleware, requireRole, AuthRequest } from '../middleware/auth.js';

const router = Router();

// All user routes require authentication
router.use(authMiddleware);

// GET /api/users — list all users (admin) or filtered by role
router.get('/', requireRole('admin'), (req: AuthRequest, res: Response): void => {
  const { role, search } = req.query;

  let filtered = users.map(({ password, ...u }) => u);

  if (role && typeof role === 'string') {
    filtered = filtered.filter(u => u.role === role);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    filtered = filtered.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.department && u.department.toLowerCase().includes(q))
    );
  }

  res.json({
    users: filtered,
    total: filtered.length,
  });
});

// GET /api/users/:id
router.get('/:id', (req: AuthRequest, res: Response): void => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  const { password, ...safeUser } = user;
  res.json(safeUser);
});

// PUT /api/users/:id — update user
router.put('/:id', (req: AuthRequest, res: Response): void => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  // Only admins or the user themselves can update
  if (req.userRole !== 'admin' && req.userId !== req.params.id) {
    res.status(403).json({ error: 'Insufficient permissions' });
    return;
  }

  const { name, email, department } = req.body;
  if (name) users[idx].name = name;
  if (email) users[idx].email = email;
  if (department) users[idx].department = department;

  const { password, ...safeUser } = users[idx];
  res.json(safeUser);
});

// DELETE /api/users/:id — admin only
router.delete('/:id', requireRole('admin'), (req: AuthRequest, res: Response): void => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  users.splice(idx, 1);
  res.status(204).send();
});

export default router;
