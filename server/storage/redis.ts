// ~/server/storage/redis.ts
import Redis, { type Redis as RedisClient } from 'ioredis'
import type { StorageAdapter } from '../types/storage'

export class RedisStorageAdapter implements StorageAdapter {
  private client: RedisClient | null = null
  private readonly redisUrl: string

  constructor(redisUrl: string) {
    this.redisUrl = redisUrl
  }

  private getClient() {
    if (!this.client) {
      this.client = new Redis(this.redisUrl, {
        maxRetriesPerRequest: 3,
        retryStrategy(times) {
          if (times > 3) return null
          return Math.min(times * 200, 2000)
        }
      })
      this.client.on('error', (err) => {
        console.error('Redis error:', err.message)
      })
    }
    return this.client
  }

  async set(key: string, value: any, ttlSeconds?: number) {
    const client = this.getClient()
    const data = JSON.stringify(value)
    if (ttlSeconds) {
      await client.set(key, data, 'EX', ttlSeconds)
    } else {
      await client.set(key, data)
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    const client = this.getClient()
    const data = await client.get(key)
    if (!data) return null
    try {
      return JSON.parse(data) as T
    } catch (e) {
      console.error('Error parsing Redis data', e)
      return null
    }
  }

  async del(key: string) {
    const client = this.getClient()
    await client.del(key)
  }

  async has(key: string): Promise<boolean> {
    const client = this.getClient()
    const exists = await client.exists(key)
    return exists > 0
  }
}
