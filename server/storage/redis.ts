// ~/server/storage/redis.ts
import Redis from 'ioredis'
import type { StorageAdapter } from '../types/storage' // المسار حسب مشروعك

export class RedisStorageAdapter implements StorageAdapter {
  private client: Redis

  constructor(redisUrl: string) {
    this.client = new Redis(redisUrl)
  }

  // حفظ قيمة
  async set(key: string, value: any, ttlSeconds?: number) {
    const data = JSON.stringify(value)
    if (ttlSeconds) {
      await this.client.set(key, data, 'EX', ttlSeconds)
    } else {
      await this.client.set(key, data)
    }
  }

  // استرجاع قيمة
  async get<T = any>(key: string): Promise<T | null> {
    const data = await this.client.get(key)
    if (!data) return null
    try {
      return JSON.parse(data) as T
    } catch (e) {
      console.error('Error parsing Redis data', e)
      return null
    }
  }

  // حذف قيمة (مطابق لواجهة StorageAdapter)
  async del(key: string) {
    await this.client.del(key)
  }

  // تحقق إذا المفتاح موجود
  async has(key: string): Promise<boolean> {
    const exists = await this.client.exists(key)
    return exists > 0
  }
}
