type EntityWithId = { id: string };

interface Repository<T extends EntityWithId> {
  findById(id: string): T | undefined;
  findAll(): T[];
  save(entity: T): void;
  remove(id: string): void;
}

class InMemoryRepository<T extends EntityWithId>
  implements Repository<T>
{
  private storage = new Map<string, T>();

  findById(id: string): T | undefined {
    return this.storage.get(id);
  }

  findAll(): T[] {
    return [...this.storage.values()];
  }

  save(entity: T): void {
    this.storage.set(entity.id, entity);
  }

  remove(id: string): void {
    this.storage.delete(id);
  }
}

type ChatRoom = {
  id: string;
  name: string;
  isPrivate: boolean;
};

const roomRepository = new InMemoryRepository<ChatRoom>();
roomRepository.save({ id: 'room-1', name: 'general', isPrivate: false });
roomRepository.save({ id: 'room-2', name: 'mods', isPrivate: true });

console.log(roomRepository.findById('room-2'));
console.log(roomRepository.findAll());
