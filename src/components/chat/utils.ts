/**
 * Format a timestamp into a readable time format
 */
export const formatMessageTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // If within the last week, show day name
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  if (date > oneWeekAgo) {
    return date.toLocaleDateString([], { weekday: 'short' }) + ' ' + 
           date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Otherwise show date
  return date.toLocaleDateString();
};

/**
 * Group messages by date for better UI presentation
 */
export const groupMessagesByDate = (messages: any[]) => {
  const groupedMessages: { [key: string]: any[] } = {};
  
  messages.forEach(message => {
    const date = new Date(message.timestamp).toDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });
  
  return Object.entries(groupedMessages).map(([date, messages]) => ({
    date,
    messages
  }));
};
