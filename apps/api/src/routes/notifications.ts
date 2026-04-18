import { Router, Response } from 'express';
import { notifications } from '../data/store.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// GET /api/notifications
router.get('/', (req: AuthRequest, res: Response): void => {
  const userNotifs = notifications.filter(n => n.userId === req.userId);
  res.json({ notifications: userNotifs, unread: userNotifs.filter(n => !n.read).length });
});

// PUT /api/notifications/:id/read
router.put('/:id/read', (req: AuthRequest, res: Response): void => {
  const notif = notifications.find(n => n.id === req.params.id && n.userId === req.userId);
  if (!notif) {
    res.status(404).json({ error: 'Notification not found' });
    return;
  }
  notif.read = true;
  res.json(notif);
});

// PUT /api/notifications/read-all
router.put('/read-all', (req: AuthRequest, res: Response): void => {
  notifications.filter(n => n.userId === req.userId).forEach(n => n.read = true);
  res.json({ success: true });
});

export default router;
