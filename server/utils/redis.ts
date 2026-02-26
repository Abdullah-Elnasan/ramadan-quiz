// server/utils/redis.ts
import { Redis } from '@upstash/redis'

export const redis = Redis.fromEnv()
