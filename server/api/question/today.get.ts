// server/api/question/today.get.ts
import { getStorage, keys } from '../../utils/storage'
import { todayKey, nowUtc, isWithinWindow, secondsElapsed, PERSONAL_LIMIT_SEC } from '../../utils/time'

export interface QuestionPublic {
  id: string
  text: string
  options: { id: string; text: string }[]
  openAt: string
  closeAt: string
}

export default defineEventHandler(async (event) => {
  const userKey = getCookie(event, 'userKey')
  if (!userKey) return { needJoin: true }

  const storage = getStorage(event)
  const participant = await storage.get<{ name?: string; phone?: string }>(keys.participant(userKey))
  if (!participant) return { needJoin: true }

  const today = todayKey()
  const raw = await storage.get<any>(keys.question(today))

  if (!raw) {
    return { noQuestion: true, serverTime: nowUtc() }
  }

  const now = nowUtc()
  const isOpen = isWithinWindow(raw.openAt, raw.closeAt, now)

  if (!isOpen) {
    return {
      closedGlobal: true,
      openAt: raw.openAt,
      closeAt: raw.closeAt,
      serverTime: now
    }
  }

  const questionId = today
  // سجّل startedAt عند أول دخول فعلي
  const startKey = keys.start(questionId, userKey)
  let startData = await storage.get<{ startedAt: number }>(startKey)
  if (!startData) {
    startData = { startedAt: now }
    // TTL = وقت بقاء النافذة + هامش
    const windowTTL = Math.ceil((new Date(raw.closeAt).getTime() - now) / 1000) + 120
    await storage.set(startKey, startData, Math.max(windowTTL, 120))
  }

  const alreadyAttempt = await storage.get(keys.attempt(questionId, userKey))
    // بعد سطر: const alreadyAttempt = await storage.get(...)
  const abandonData = await storage.get(`abandon:${today}:${userKey}`)

  // أضفها في الـ return


  const elapsed = secondsElapsed(startData.startedAt, now)
  const remainingPersonalSeconds : number = raw.personalSeconds ?? 60

  // أعد السؤال بدون correctOptionId
  const question: QuestionPublic = {
    id: questionId,
    text: raw.text,
    options: raw.options, // [{ id, text }]
    openAt: raw.openAt,
    closeAt: raw.closeAt
  }

  return {
    question,
    serverTime: now,
    remainingPersonalSeconds,
    alreadySubmitted: !!alreadyAttempt,
    abandoned: !!abandonData,          // ✅ جديد
    closeAt: raw.closeAt,
    participantName: participant.phone
  }
})
