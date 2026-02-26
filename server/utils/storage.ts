import { redis } from './redis'

export const keys = {
  question:    (date: string)             => `question:${date}`,
  attempt:     (date: string, uk: string) => `attempt:${date}:${uk}`,
  participant: (uk: string)               => `participant:${uk}`,
  start:       (date: string, uk: string) => `start:${date}:${uk}`,
}

export function getStorage(_event?: any) {
  return {
    async get<T>(key: string): Promise<T | null> {
      const value = await redis.get<T>(key)
      return value ?? null
    },
    async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
      if (ttlSeconds && ttlSeconds > 0) {
        await redis.set(key, value, { ex: ttlSeconds })
      } else {
        await redis.set(key, value)
      }
    },
    async del(key: string): Promise<void> {
      await redis.del(key)
    },
    async has(key: string): Promise<boolean> {
      const exists = await redis.exists(key)
      return exists > 0
    }
  }
}
