type EventMap = {
  'chat.message': { roomId: string; text: string; senderId: string };
  'chat.typing': { roomId: string; userId: string };
};

class EventBus<TEvents extends Record<string, unknown>> {
  private handlers = new Map<keyof TEvents, Array<(payload: unknown) => void>>();

  on<TKey extends keyof TEvents>(
    event: TKey,
    handler: (payload: TEvents[TKey]) => void,
  ): void {
    const list = this.handlers.get(event) ?? [];
    list.push(handler as (payload: unknown) => void);
    this.handlers.set(event, list);
  }

  emit<TKey extends keyof TEvents>(event: TKey, payload: TEvents[TKey]): void {
    const list = this.handlers.get(event) ?? [];
    list.forEach((handler) => {
      handler(payload);
    });
  }
}

const bus = new EventBus<EventMap>();

bus.on('chat.message', (payload) => {
  console.log(`[${payload.roomId}] ${payload.senderId}: ${payload.text}`);
});

bus.on('chat.typing', (payload) => {
  console.log(`Typing: ${payload.userId} in ${payload.roomId}`);
});

bus.emit('chat.message', {
  roomId: 'room-1',
  text: 'Hello from TypeScript',
  senderId: 'u1',
});

bus.emit('chat.typing', {
  roomId: 'room-1',
  userId: 'u2',
});
