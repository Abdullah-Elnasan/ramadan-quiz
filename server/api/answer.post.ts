import { getStorage, keys } from '../utils/storage'
import { todayKey, nowUtc, isWithinWindow, secondsElapsed, PERSONAL_LIMIT_SEC } from '../utils/time'

export default defineEventHandler(async (event) => {
  const userKey = getCookie(event, 'userKey')
  if (!userKey) return { accepted: false, reason: 'needJoin' }

  const storage = getStorage(event)
  const participant = await storage.get<{ name?: string; phone?: string }>(keys.participant(userKey))

  if (!participant) return { accepted: false, reason: 'needJoin' }

  const body = await readBody<{ questionId?: string; selectedOptionId?: string }>(event)
  if (!body?.questionId || !body?.selectedOptionId) {
    throw createError({ statusCode: 400, message: 'بيانات ناقصة' })
  }

  const today = todayKey()
  if (body.questionId !== today) {
    return { accepted: false, reason: 'timeout_global' }
  }

  const raw = await storage.get<any>(keys.question(today))
  if (!raw) return { accepted: false, reason: 'timeout_global' }

  const now = nowUtc()

  if (!isWithinWindow(raw.openAt, raw.closeAt, now)) {
    return { accepted: false, reason: 'timeout_global' }
  }

  const validIds = (raw.options as { id: string }[]).map(o => o.id)
  if (!validIds.includes(body.selectedOptionId)) {
    throw createError({ statusCode: 400, message: 'خيار غير صالح' })
  }

  const attemptKey = keys.attempt(today, userKey)

  // فحص abandon
  const abandonData = await storage.get(`abandon:${today}:${userKey}`)
  if (abandonData) return { accepted: false, reason: 'abandoned' }

  // فحص تكرار
  const existing = await storage.get(attemptKey)
  if (existing) return { accepted: false, reason: 'duplicate' }

  // فحص 60 ثانية الفردية
  const startData = await storage.get<{ startedAt: number }>(keys.start(today, userKey))
  const isOnTimePersonal = !!startData && secondsElapsed(startData.startedAt, now) <= PERSONAL_LIMIT_SEC
  if (!isOnTimePersonal) {
    return { accepted: false, reason: 'timeout_personal' }
  }

  // حفظ الـ Attempt (مرة واحدة فقط — كان مكرراً في الكود الأصلي)
  await storage.set(attemptKey, {
    userKey,
    questionId: today,
    selectedOptionId: body.selectedOptionId,
    submittedAt: now,
    isOnTimeGlobal: true,
    isOnTimePersonal: true
  })

  // تحديث الفهرس
  const indexKey = `attempts-index:${today}`
  const index = await storage.get<{ keys: string[] }>(indexKey) ?? { keys: [] }
  if (!index.keys.includes(userKey)) {
    index.keys.push(userKey)
    await storage.set(indexKey, index)
  }

  return { accepted: true }
})
