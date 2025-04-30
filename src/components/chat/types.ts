
export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  role: 'brand' | 'kol';
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  attachments?: Attachment[];
  isDeleted?: boolean;
  isTyping?: boolean;
  isKOLSpecific?: boolean;
}

export interface Conversation {
  id: string;
  participants: ChatUser[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  updatedAt: string;
  messages?: ChatMessage[]; // Adding messages array property
}

export interface Attachment {
  id: string;
  type: 'image' | 'document' | 'video' | 'audio';
  url: string;
  name: string;
  size: number;
  thumbnailUrl?: string;
}
