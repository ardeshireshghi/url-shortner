export interface Storage<T> {
  exists(key: string): boolean;
  set(key: string, value: T): void;
  get(key: string): T | undefined;
  keys(): string[];
}
