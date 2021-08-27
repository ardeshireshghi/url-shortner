import { Storage } from '../domain/Storage';

export enum StorageType {
  Memory
}

interface StoreBase {
  ttlSeconds: number;
}

type StoreValue<T> = { data: T; createdAt: string };

export class MemoryStorage<TStore extends StoreBase>
  implements Storage<TStore>
{
  constructor(
    private name: string,
    private store: Map<string, StoreValue<TStore>> = new Map()
  ) {}

  exists(key: string): boolean {
    return this.store.has(key);
  }

  set(key: string, value: TStore): void {
    this.store.set(key, {
      createdAt: new Date().toISOString(),
      data: value
    });
  }

  get(key: string): TStore | undefined {
    const value = this.store.get(key);

    if (value && this.isExpired(value)) {
      this.store.delete(key);
      return undefined;
    }

    return value?.data;
  }

  keys() {
    return Array.from(this.store.keys());
  }

  private isExpired(value: StoreValue<TStore>) {
    return (
      Math.floor(Date.parse(value.createdAt) / 1000) + value.data.ttlSeconds >
      Date.now()
    );
  }
}

export function createStore<TStore extends StoreBase>(
  storeType: StorageType,
  name: string
): Storage<TStore> {
  if (storeType === StorageType.Memory) {
    return new MemoryStorage<TStore>(name);
  }

  throw new Error(`Invalid storeType ${storeType}`);
}
