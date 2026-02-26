// server/api/admin/question.put.ts
import { getStorage, keys } from '../../utils/storage'
import { todayKey } from '../../utils/time'

export default defineEventHandler(async (event: any) => {
  const body = await readBody<{
    text: string
    options: { id: string; text: string }[]
    correctOptionId: string
    openAt: string
    closeAt: string
    personalSeconds: number   // ✅ جديد
  }>(event)

  if (!body?.text || !body.options || body.options.length !== 5 || !body.correctOptionId) {
    throw createError({ statusCode: 400, message: 'بيانات السؤال غير مكتملة' })
  }

  // افتراضي 60 ثانية إذا لم يُحدد
  if (!body.personalSeconds || body.personalSeconds < 10) {
    body.personalSeconds = 60
  }

  const storage = getStorage(event)
  const today = todayKey()
  await storage.set(keys.question(today), body)

  return { ok: true, savedFor: today }
})
