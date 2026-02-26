// server/api/admin/question.get.ts
import { getStorage, keys } from '../../utils/storage'
import { todayKey } from '../../utils/time'

export default defineEventHandler(async (event) => {
  // Auth handled by server/middleware/admin-auth.ts
  const storage = getStorage(event)
  const today = todayKey()
  const question = await storage.get(keys.question(today))
  return { question: question ?? null, today }
})
