export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  attachments?: string[];
}

export interface MessageThread {
  id: string;
  participantIds: string[];
  lastMessage?: Message;
  updatedAt: string;
  subject?: string;
}
