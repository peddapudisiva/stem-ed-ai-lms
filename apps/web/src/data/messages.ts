import { MessageThread } from '../types/message';

export const DEMO_THREADS: MessageThread[] = [
  {
    id: 'thread-1',
    participantIds: ['usr_student_001', 'usr_teacher_001'],
    subject: 'Question regarding Python assignment',
    updatedAt: new Date().toISOString(),
    lastMessage: {
      id: 'msg-1',
      threadId: 'thread-1',
      senderId: 'usr_teacher_001',
      content: 'Yes, you can use a while loop for that question. Let me know if you need more help.',
      createdAt: new Date().toISOString(),
      isRead: false
    }
  },
  {
    id: 'thread-2',
    participantIds: ['usr_parent_001', 'usr_teacher_001'],
    subject: 'Marcus Progress',
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    lastMessage: {
      id: 'msg-2',
      threadId: 'thread-2',
      senderId: 'usr_teacher_001',
      content: 'Marcus is doing great in Calculus. He participated very well today.',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      isRead: true
    }
  }
];
