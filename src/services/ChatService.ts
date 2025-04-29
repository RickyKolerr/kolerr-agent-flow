
// This simulates a WebSocket service for demo purposes
// In production, this would connect to a real WebSocket server

type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  status: MessageStatus;
  attachments?: string[];
  isTyping?: boolean;
}

export interface ChatConversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    role: 'brand' | 'kol' | 'admin';
    isOnline: boolean;
  }[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  updatedAt: Date;
  campaignId?: string;
  campaignTitle?: string;
}

class ChatService {
  private static instance: ChatService;
  private listeners: { [event: string]: ((data: any) => void)[] } = {};
  private conversations: ChatConversation[] = [];
  private messages: { [conversationId: string]: ChatMessage[] } = {};
  private connected = false;
  private userId: string | null = null;
  private userRole: 'brand' | 'kol' | 'admin' | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  // Mock data for demonstration
  private mockBrandUsers = [
    { id: 'b1', name: 'Nike', avatar: 'https://ui-avatars.com/api/?name=Nike&background=0D8ABC&color=fff', role: 'brand' as const, isOnline: true },
    { id: 'b2', name: 'Adidas', avatar: 'https://ui-avatars.com/api/?name=Adidas&background=FF3366&color=fff', role: 'brand' as const, isOnline: false },
    { id: 'b3', name: 'Puma', avatar: 'https://ui-avatars.com/api/?name=Puma&background=4CAF50&color=fff', role: 'brand' as const, isOnline: true }
  ];

  private mockKolUsers = [
    { id: 'k1', name: 'Alex Thompson', avatar: 'https://ui-avatars.com/api/?name=Alex+Thompson&background=random', role: 'kol' as const, isOnline: true },
    { id: 'k2', name: 'Maria Rodriguez', avatar: 'https://ui-avatars.com/api/?name=Maria+Rodriguez&background=random', role: 'kol' as const, isOnline: true },
    { id: 'k3', name: 'David Kim', avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=random', role: 'kol' as const, isOnline: false }
  ];

  private constructor() {
    // Private constructor to enforce singleton pattern
  }

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  // Initialize chat service with user information
  public init(userId: string, userRole: 'brand' | 'kol' | 'admin'): void {
    this.userId = userId;
    this.userRole = userRole;
    this.connect();
  }

  // Simulate connecting to WebSocket server
  public connect(): void {
    console.log('Connecting to chat server...');
    
    // Simulate connection delay
    setTimeout(() => {
      this.connected = true;
      this.reconnectAttempts = 0;
      console.log('Connected to chat server');
      this.emit('connected', null);
      
      // Load initial data
      this.loadMockData();
    }, 1000);
  }

  // Simulate disconnecting
  public disconnect(): void {
    this.connected = false;
    this.emit('disconnected', null);
    console.log('Disconnected from chat server');
  }

  // Simulate reconnection logic
  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
      }
      
      this.reconnectTimeout = setTimeout(() => {
        this.connect();
      }, Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000)); // Exponential backoff
    } else {
      console.error('Max reconnection attempts reached');
      this.emit('error', { message: 'Unable to connect after multiple attempts' });
    }
  }

  // Load mock conversation data
  private loadMockData(): void {
    if (!this.userId || !this.userRole) return;

    // Create mock conversations based on user role
    if (this.userRole === 'brand') {
      this.mockKolUsers.forEach(kol => {
        const conversationId = `conv-${this.userId}-${kol.id}`;
        const conversation: ChatConversation = {
          id: conversationId,
          participants: [
            this.mockBrandUsers.find(b => b.id === this.userId) || this.mockBrandUsers[0],
            kol
          ],
          unreadCount: Math.floor(Math.random() * 3),
          updatedAt: new Date(Date.now() - Math.random() * 86400000),
          campaignId: `camp-${Math.floor(Math.random() * 1000)}`,
          campaignTitle: ['Summer Collection', 'Winter Launch', 'Spring Campaign'][Math.floor(Math.random() * 3)]
        };
        this.conversations.push(conversation);
        this.messages[conversationId] = this.generateMockMessages(conversationId, this.userId, kol.id, 
          this.mockBrandUsers.find(b => b.id === this.userId)?.name || 'Brand', 
          kol.name);
      });
    } else if (this.userRole === 'kol') {
      this.mockBrandUsers.forEach(brand => {
        const conversationId = `conv-${brand.id}-${this.userId}`;
        const conversation: ChatConversation = {
          id: conversationId,
          participants: [
            brand,
            this.mockKolUsers.find(k => k.id === this.userId) || this.mockKolUsers[0]
          ],
          unreadCount: Math.floor(Math.random() * 3),
          updatedAt: new Date(Date.now() - Math.random() * 86400000),
          campaignId: `camp-${Math.floor(Math.random() * 1000)}`,
          campaignTitle: ['Summer Collection', 'Winter Launch', 'Spring Campaign'][Math.floor(Math.random() * 3)]
        };
        this.conversations.push(conversation);
        this.messages[conversationId] = this.generateMockMessages(conversationId, brand.id, this.userId,
          brand.name, 
          this.mockKolUsers.find(k => k.id === this.userId)?.name || 'Creator');
      });
    }

    // Sort conversations by last updated
    this.conversations.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    
    // Set last messages
    this.conversations.forEach(conv => {
      const msgs = this.messages[conv.id] || [];
      if (msgs.length > 0) {
        conv.lastMessage = msgs[msgs.length - 1];
      }
    });

    // Emit loaded event
    this.emit('conversations_loaded', this.conversations);
  }

  // Generate random mock messages for a conversation
  private generateMockMessages(
    conversationId: string, 
    brandId: string, 
    kolId: string, 
    brandName: string,
    kolName: string
  ): ChatMessage[] {
    const messages: ChatMessage[] = [];
    const messageCount = 5 + Math.floor(Math.random() * 10);
    const now = new Date();
    
    // Generate mock messages over the last 24 hours
    for (let i = 0; i < messageCount; i++) {
      const isBrandSender = Math.random() > 0.5;
      const senderId = isBrandSender ? brandId : kolId;
      const receiverId = isBrandSender ? kolId : brandId;
      const timestamp = new Date(now.getTime() - (messageCount - i) * 1000 * 60 * 10);
      
      messages.push({
        id: `msg-${conversationId}-${i}`,
        conversationId,
        senderId,
        senderName: isBrandSender ? brandName : kolName,
        senderAvatar: isBrandSender 
          ? `https://ui-avatars.com/api/?name=${brandName}&background=0D8ABC&color=fff` 
          : `https://ui-avatars.com/api/?name=${kolName}&background=random`,
        receiverId,
        content: this.getRandomMessage(isBrandSender),
        timestamp,
        status: 'read'
      });
    }
    
    return messages;
  }

  // Get a random message based on sender type
  private getRandomMessage(isBrand: boolean): string {
    const brandMessages = [
      "We love your content and would like to collaborate with you.",
      "Are you available for a campaign next month?",
      "Could you share your media kit with us?",
      "What are your rates for Instagram posts?",
      "We'd like to send you some products for review.",
      "When would be a good time to discuss the details?",
      "Would you be interested in a long-term partnership?",
      "We're launching a new product and would love your input.",
      "Our team was impressed by your recent content."
    ];
    
    const kolMessages = [
      "Thank you for reaching out! I'd be interested in collaborating.",
      "Could you provide more details about the campaign?",
      "Here's a link to my media kit.",
      "My schedule is open for the next two weeks.",
      "I'm excited about the opportunity to work with your brand.",
      "What kind of content are you looking for?",
      "I'd love to hear more about your vision for this collaboration.",
      "Do you have any specific goals for this campaign?",
      "That sounds perfect! When do we start?"
    ];
    
    return isBrand 
      ? brandMessages[Math.floor(Math.random() * brandMessages.length)]
      : kolMessages[Math.floor(Math.random() * kolMessages.length)];
  }

  // Get all conversations for the current user
  public getConversations(): ChatConversation[] {
    return [...this.conversations];
  }

  // Get messages for a specific conversation
  public getMessages(conversationId: string): ChatMessage[] {
    return this.messages[conversationId] ? [...this.messages[conversationId]] : [];
  }

  // Send a new message
  public sendMessage(content: string, conversationId: string): Promise<ChatMessage> {
    return new Promise((resolve, reject) => {
      if (!this.connected || !this.userId) {
        reject(new Error('Not connected to chat server'));
        return;
      }

      const conversation = this.conversations.find(c => c.id === conversationId);
      if (!conversation) {
        reject(new Error('Conversation not found'));
        return;
      }

      const receiver = conversation.participants.find(p => p.id !== this.userId);
      if (!receiver) {
        reject(new Error('Receiver not found'));
        return;
      }

      const sender = conversation.participants.find(p => p.id === this.userId);
      if (!sender) {
        reject(new Error('Sender information not found'));
        return;
      }

      // Create new message
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        conversationId,
        senderId: this.userId,
        senderName: sender.name,
        senderAvatar: sender.avatar,
        receiverId: receiver.id,
        content,
        timestamp: new Date(),
        status: 'sent'
      };

      // Simulate network delay
      setTimeout(() => {
        // Add to messages
        if (!this.messages[conversationId]) {
          this.messages[conversationId] = [];
        }
        this.messages[conversationId].push(newMessage);

        // Update conversation last message
        const conversationIndex = this.conversations.findIndex(c => c.id === conversationId);
        if (conversationIndex !== -1) {
          this.conversations[conversationIndex].lastMessage = newMessage;
          this.conversations[conversationIndex].updatedAt = new Date();
          
          // Move conversation to top
          const [conv] = this.conversations.splice(conversationIndex, 1);
          this.conversations.unshift(conv);
        }

        // Emit events
        this.emit('message_sent', newMessage);
        this.emit('conversations_updated', this.conversations);

        // Update message status to delivered after a delay
        setTimeout(() => {
          newMessage.status = 'delivered';
          this.emit('message_status_updated', newMessage);

          // Simulate reply after a delay for demo purposes
          if (Math.random() > 0.3) {
            this.simulateReply(conversationId, receiver);
          }
        }, 1000);

        resolve(newMessage);
      }, 300);
    });
  }

  // Simulate a reply from the other participant
  private simulateReply(conversationId: string, sender: ChatConversation['participants'][0]): void {
    if (!this.userId) return;
    
    // Find the conversation
    const conversation = this.conversations.find(c => c.id === conversationId);
    if (!conversation) return;
    
    // Create typing indicator
    const typingMessage: ChatMessage = {
      id: `typing-${Date.now()}`,
      conversationId,
      senderId: sender.id,
      senderName: sender.name,
      senderAvatar: sender.avatar,
      receiverId: this.userId,
      content: '',
      timestamp: new Date(),
      status: 'sent',
      isTyping: true
    };
    
    // Emit typing event
    this.emit('typing_started', typingMessage);
    
    // Simulate typing time and then send message
    const typingTime = 1000 + Math.random() * 2000;
    
    setTimeout(() => {
      // Stop typing
      this.emit('typing_stopped', { conversationId, userId: sender.id });
      
      // Create response message
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        conversationId,
        senderId: sender.id,
        senderName: sender.name,
        senderAvatar: sender.avatar,
        receiverId: this.userId!,
        content: this.getRandomMessage(sender.role === 'brand'),
        timestamp: new Date(),
        status: 'sent'
      };
      
      // Add to messages
      if (!this.messages[conversationId]) {
        this.messages[conversationId] = [];
      }
      this.messages[conversationId].push(newMessage);

      // Update conversation
      const conversationIndex = this.conversations.findIndex(c => c.id === conversationId);
      if (conversationIndex !== -1) {
        this.conversations[conversationIndex].lastMessage = newMessage;
        this.conversations[conversationIndex].updatedAt = new Date();
        this.conversations[conversationIndex].unreadCount += 1;
        
        // Move conversation to top
        const [conv] = this.conversations.splice(conversationIndex, 1);
        this.conversations.unshift(conv);
      }

      // Emit events
      this.emit('message_received', newMessage);
      this.emit('conversations_updated', this.conversations);
    }, typingTime);
  }

  // Mark messages as read
  public markAsRead(conversationId: string): void {
    if (!this.userId) return;
    
    const conversation = this.conversations.find(c => c.id === conversationId);
    if (!conversation) return;
    
    // Update unread count
    const conversationIndex = this.conversations.findIndex(c => c.id === conversationId);
    if (conversationIndex !== -1) {
      this.conversations[conversationIndex].unreadCount = 0;
    }
    
    // Update message status
    if (this.messages[conversationId]) {
      this.messages[conversationId].forEach(msg => {
        if (msg.receiverId === this.userId && msg.status !== 'read') {
          msg.status = 'read';
        }
      });
    }
    
    // Emit events
    this.emit('messages_read', { conversationId });
    this.emit('conversations_updated', this.conversations);
  }

  // Get total unread message count across all conversations
  public getTotalUnreadCount(): number {
    return this.conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  }

  // Search conversations
  public searchConversations(query: string): ChatConversation[] {
    if (!query) return this.conversations;
    
    const lowerQuery = query.toLowerCase();
    return this.conversations.filter(conv => {
      // Search by participant name
      const participantMatch = conv.participants.some(p => 
        p.name.toLowerCase().includes(lowerQuery)
      );
      
      // Search by campaign title
      const campaignMatch = conv.campaignTitle ? 
        conv.campaignTitle.toLowerCase().includes(lowerQuery) : 
        false;
      
      // Search in last message
      const messageMatch = conv.lastMessage ? 
        conv.lastMessage.content.toLowerCase().includes(lowerQuery) : 
        false;
      
      return participantMatch || campaignMatch || messageMatch;
    });
  }
  
  // Search messages within a conversation
  public searchMessages(conversationId: string, query: string): ChatMessage[] {
    if (!query || !this.messages[conversationId]) return [];
    
    const lowerQuery = query.toLowerCase();
    return this.messages[conversationId].filter(msg => 
      msg.content.toLowerCase().includes(lowerQuery)
    );
  }

  // Event subscription system
  public on(event: string, callback: (data: any) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  public off(event: string, callback: (data: any) => void): void {
    if (!this.listeners[event]) return;
    
    const index = this.listeners[event].indexOf(callback);
    if (index !== -1) {
      this.listeners[event].splice(index, 1);
    }
  }

  private emit(event: string, data: any): void {
    if (!this.listeners[event]) return;
    
    this.listeners[event].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in ${event} listener:`, error);
      }
    });
  }
}

export default ChatService;
