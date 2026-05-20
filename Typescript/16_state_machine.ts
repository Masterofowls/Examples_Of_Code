type ChatSyncState =
  | { state: 'idle' }
  | { state: 'connecting' }
  | { state: 'connected'; roomId: string }
  | { state: 'error'; reason: string };

type ChatEvent =
  | { type: 'CONNECT' }
  | { type: 'CONNECTED'; roomId: string }
  | { type: 'FAIL'; reason: string }
  | { type: 'RESET' };

const transition = (current: ChatSyncState, event: ChatEvent): ChatSyncState => {
  switch (current.state) {
    case 'idle':
      if (event.type === 'CONNECT') {
        return { state: 'connecting' };
      }
      return current;
    case 'connecting':
      if (event.type === 'CONNECTED') {
        return { state: 'connected', roomId: event.roomId };
      }
      if (event.type === 'FAIL') {
        return { state: 'error', reason: event.reason };
      }
      return current;
    case 'connected':
      if (event.type === 'RESET') {
        return { state: 'idle' };
      }
      return current;
    case 'error':
      if (event.type === 'RESET') {
        return { state: 'idle' };
      }
      return current;
    default: {
      const neverState: never = current;
      return neverState;
    }
  }
};

let state: ChatSyncState = { state: 'idle' };
state = transition(state, { type: 'CONNECT' });
state = transition(state, { type: 'CONNECTED', roomId: 'room-1' });
state = transition(state, { type: 'RESET' });

console.log(state);
