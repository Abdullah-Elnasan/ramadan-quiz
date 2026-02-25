// server/api/redis-test.get.ts
import { redis } from '../utils/redis'  // عدّل المسار حسب مشروعك

export default defineEventHandler(async () => {
  const value = await redis.ping()
  return { ok: true, value }

  
})
