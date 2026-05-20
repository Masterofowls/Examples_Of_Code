type UserId = string;
type RoomId = string;
type MessageId = string;

type ChatRoom = {
  id: RoomId;
  name: string;
  memberIds: UserId[];
};

type ChatMessage = {
  id: MessageId;
  roomId: RoomId;
  senderId: UserId;
  text: string;
  sentAt: Date;
};

type MessageReceipt = {
  messageId: MessageId;
  userId: UserId;
  deliveredAt?: Date;
  readAt?: Date;
};

type Presence = {
  userId: UserId;
  status: 'online' | 'away' | 'offline';
  lastSeenAt: Date;
};

const unreadCount = (
  messages: ChatMessage[],
  receipts: MessageReceipt[],
  userId: UserId,
): number => {
  const readSet = new Set(
    receipts
      .filter((receipt) => receipt.userId === userId && receipt.readAt)
      .map((receipt) => receipt.messageId),
  );

  return messages.filter((message) => !readSet.has(message.id)).length;
};

const room: ChatRoom = {
  id: 'r1',
  name: 'backend-team',
  memberIds: ['u1', 'u2', 'u3'],
};

const messages: ChatMessage[] = [
  {
    id: 'm1',
    roomId: room.id,
    senderId: 'u1',
    text: 'Standup starts now.',
    sentAt: new Date(),
  },
  {
    id: 'm2',
    roomId: room.id,
    senderId: 'u2',
    text: 'On my way.',
    sentAt: new Date(),
  },
];

const receipts: MessageReceipt[] = [
  { messageId: 'm1', userId: 'u3', readAt: new Date() },
];

const presence: Presence[] = [
  { userId: 'u1', status: 'online', lastSeenAt: new Date() },
  { userId: 'u2', status: 'away', lastSeenAt: new Date() },
  { userId: 'u3', status: 'online', lastSeenAt: new Date() },
];

console.log({
  room,
  unreadForU3: unreadCount(messages, receipts, 'u3'),
  onlineUsers: presence.filter((item) => item.status === 'online').length,
});
