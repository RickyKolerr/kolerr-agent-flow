
// Mock data for development
import { Conversation, ChatMessage, ChatUser } from "./types";

export const mockUsers: ChatUser[] = [
  {
    id: "current-user",
    name: "You",
    avatar: "https://ui-avatars.com/api/?name=You&background=9B87F5&color=fff",
    role: "brand",
    status: "online"
  },
  {
    id: "user-1",
    name: "Jane Smith",
    avatar: "https://ui-avatars.com/api/?name=JS&background=F97316&color=fff",
    role: "kol",
    status: "online"
  },
  {
    id: "user-2",
    name: "Michael Johnson",
    avatar: "https://ui-avatars.com/api/?name=MJ&background=0EA5E9&color=fff",
    role: "kol",
    status: "offline",
    lastSeen: "2023-04-29T15:30:45.000Z"
  },
  {
    id: "user-3",
    name: "Sarah Williams",
    avatar: "https://ui-avatars.com/api/?name=SW&background=8B5CF6&color=fff",
    role: "kol",
    status: "away",
    lastSeen: "2023-04-30T08:15:22.000Z"
  },
  {
    id: "user-4",
    name: "David Brown",
    avatar: "https://ui-avatars.com/api/?name=DB&background=D946EF&color=fff",
    role: "brand",
    status: "online"
  },
  {
    id: "user-5",
    name: "Lisa Taylor",
    avatar: "https://ui-avatars.com/api/?name=LT&background=4CAF50&color=fff",
    role: "kol",
    status: "offline",
    lastSeen: "2023-04-28T11:42:18.000Z"
  }
];

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    participants: [
      mockUsers.find(u => u.id === "current-user")!,
      mockUsers.find(u => u.id === "user-1")!
    ],
    unreadCount: 2,
    updatedAt: "2023-04-30T09:45:00.000Z"
  },
  {
    id: "conv-2",
    participants: [
      mockUsers.find(u => u.id === "current-user")!,
      mockUsers.find(u => u.id === "user-2")!
    ],
    unreadCount: 0,
    updatedAt: "2023-04-29T16:20:00.000Z"
  },
  {
    id: "conv-3",
    participants: [
      mockUsers.find(u => u.id === "current-user")!,
      mockUsers.find(u => u.id === "user-3")!
    ],
    unreadCount: 1,
    updatedAt: "2023-04-30T08:15:00.000Z"
  },
  {
    id: "conv-4",
    participants: [
      mockUsers.find(u => u.id === "current-user")!,
      mockUsers.find(u => u.id === "user-4")!
    ],
    unreadCount: 0,
    updatedAt: "2023-04-28T14:30:00.000Z"
  },
  {
    id: "conv-5",
    participants: [
      mockUsers.find(u => u.id === "current-user")!,
      mockUsers.find(u => u.id === "user-5")!
    ],
    unreadCount: 0,
    updatedAt: "2023-04-27T11:10:00.000Z"
  }
];

export const mockMessages: ChatMessage[] = [
  // Conversation 1
  {
    id: "msg-1-1",
    conversationId: "conv-1",
    senderId: "user-1",
    content: "Hi there! I'm interested in collaborating on your brand campaign.",
    timestamp: "2023-04-30T09:40:00.000Z",
    status: "read"
  },
  {
    id: "msg-1-2",
    conversationId: "conv-1",
    senderId: "current-user",
    content: "Hello Jane! Thanks for reaching out. I'd love to discuss potential collaboration opportunities.",
    timestamp: "2023-04-30T09:42:00.000Z",
    status: "read"
  },
  {
    id: "msg-1-3",
    conversationId: "conv-1",
    senderId: "user-1",
    content: "Great! I've reviewed your campaign details and I think my audience would be a perfect match for your products.",
    timestamp: "2023-04-30T09:44:00.000Z",
    status: "read"
  },
  {
    id: "msg-1-4",
    conversationId: "conv-1",
    senderId: "user-1",
    content: "Here's a link to my portfolio with previous brand collaborations: https://example.com/portfolio",
    timestamp: "2023-04-30T09:45:00.000Z",
    status: "sent"
  },

  // Conversation 2
  {
    id: "msg-2-1",
    conversationId: "conv-2",
    senderId: "current-user",
    content: "Hi Michael, I noticed your work with similar products in our industry. Would you be interested in discussing our upcoming campaign?",
    timestamp: "2023-04-29T15:30:00.000Z",
    status: "read"
  },
  {
    id: "msg-2-2",
    conversationId: "conv-2",
    senderId: "user-2",
    content: "Hello! Yes, I'd definitely be interested in learning more about your campaign.",
    timestamp: "2023-04-29T16:15:00.000Z",
    status: "read"
  },
  {
    id: "msg-2-3",
    conversationId: "conv-2",
    senderId: "current-user",
    content: "Great! Do you have time for a call tomorrow to discuss the details?",
    timestamp: "2023-04-29T16:20:00.000Z",
    status: "delivered"
  },

  // Conversation 3
  {
    id: "msg-3-1",
    conversationId: "conv-3",
    senderId: "user-3",
    content: "Hi there! I saw your campaign for summer products and I think I could create some great content for it.",
    timestamp: "2023-04-30T08:10:00.000Z",
    status: "read"
  },
  {
    id: "msg-3-2",
    conversationId: "conv-3",
    senderId: "user-3",
    content: "I specialize in outdoor and adventure content, which seems like a perfect fit.",
    timestamp: "2023-04-30T08:11:00.000Z",
    status: "read"
  },
  {
    id: "msg-3-3",
    conversationId: "conv-3",
    senderId: "user-3",
    content: "Here are some examples of my previous work:",
    timestamp: "2023-04-30T08:15:00.000Z",
    status: "read",
    attachments: [
      {
        id: "attach-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
        name: "outdoor-campaign-1.jpg",
        size: 1500000
      },
      {
        id: "attach-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1587502537104-aac10f5fb6f7",
        name: "adventure-content.jpg",
        size: 1200000
      }
    ]
  },

  // Conversation 4
  {
    id: "msg-4-1",
    conversationId: "conv-4",
    senderId: "current-user",
    content: "Hi David, do you have any recommendations for KOLs in the tech space?",
    timestamp: "2023-04-28T14:20:00.000Z",
    status: "read"
  },
  {
    id: "msg-4-2",
    conversationId: "conv-4",
    senderId: "user-4",
    content: "Hey there! Absolutely, I work with several talented tech reviewers. What kind of products are you looking to promote?",
    timestamp: "2023-04-28T14:25:00.000Z", 
    status: "read"
  },
  {
    id: "msg-4-3",
    conversationId: "conv-4",
    senderId: "current-user",
    content: "We're launching a new line of smart home devices next month and looking for tech influencers with engaged audiences.",
    timestamp: "2023-04-28T14:30:00.000Z",
    status: "read"
  },

  // Conversation 5
  {
    id: "msg-5-1",
    conversationId: "conv-5",
    senderId: "user-5",
    content: "Hello, I received your invitation to collaborate on the fitness campaign. Thank you!",
    timestamp: "2023-04-27T11:00:00.000Z",
    status: "read"
  },
  {
    id: "msg-5-2",
    conversationId: "conv-5",
    senderId: "current-user",
    content: "Hi Lisa, you're welcome! Your fitness content is exactly what we're looking for. Would you like to schedule a call to discuss details?",
    timestamp: "2023-04-27T11:05:00.000Z",
    status: "read"
  },
  {
    id: "msg-5-3",
    conversationId: "conv-5",
    senderId: "user-5",
    content: "Yes, that would be great. I'm available tomorrow afternoon or Thursday morning. Which works best for you?",
    timestamp: "2023-04-27T11:10:00.000Z",
    status: "read"
  }
];

// Update each conversation's lastMessage based on the mock messages
mockConversations.forEach(conversation => {
  const conversationMessages = mockMessages.filter(
    message => message.conversationId === conversation.id
  );
  
  if (conversationMessages.length > 0) {
    // Sort by timestamp and get the latest
    const latestMessage = conversationMessages.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0];
    
    conversation.lastMessage = latestMessage;
  }
});
