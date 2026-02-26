export interface StorageAdapter {
  set(key: string, value: any, ttlSeconds?: number): Promise<void>
  get<T = any>(key: string): Promise<T | null>
  del(key: string): Promise<void>
  has(key: string): Promise<boolean>
}
