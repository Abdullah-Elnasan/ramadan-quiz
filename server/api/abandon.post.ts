// server/api/abandon.post.ts

import { getStorage, keys } from '../utils/storage'
import { todayKey } from '../utils/time'

export default defineEventHandler(async (event) => {
  const userKey = getCookie(event, 'userKey')
  if (!userKey) return { ok: false }

  const storage = getStorage(event)
  const today = todayKey()

  // تحقق أنه لم يرسل إجابة بالفعل
  const existing = await storage.get(keys.attempt(today, userKey))
  if (existing) return { ok: false, alreadySubmitted: true }

  // ضع علامة abandon
  await storage.set(
    `abandon:${today}:${userKey}`,
    { abandonedAt: Date.now() }
  )

  return { ok: true }
})
