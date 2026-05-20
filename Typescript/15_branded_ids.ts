type Brand<T, B extends string> = T & { readonly __brand: B };

type UserId = Brand<string, 'UserId'>;
type RoomId = Brand<string, 'RoomId'>;

const toUserId = (value: string): UserId => value as UserId;
const toRoomId = (value: string): RoomId => value as RoomId;

type Membership = {
  userId: UserId;
  roomId: RoomId;
};

const membership: Membership = {
  userId: toUserId('user-1'),
  roomId: toRoomId('room-7'),
};

const describeMembership = (item: Membership): string =>
  `${item.userId} joined ${item.roomId}`;

console.log(describeMembership(membership));
