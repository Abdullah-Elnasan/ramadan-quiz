// server/api/admin/results.get.ts

import { getStorage, keys } from '../../utils/storage'
import { todayKey } from '../../utils/time'

export default defineEventHandler(async (event) => {
  const storage = getStorage(event)
  const query = getQuery(event)
  const date = (query.date as string) || todayKey()   // ✅ يدعم أي يوم

  const question = await storage.get<any>(keys.question(date))
  if (!question) return { attempts: [], question: null, stats: null, date }

  const correctOptionId: string = question.correctOptionId
  const indexRaw = await storage.get<{ keys: string[] }>(`attempts-index:${date}`)
  const userKeys = indexRaw?.keys ?? []

  const attempts: any[] = []
  for (const uk of userKeys) {
    const attempt = await storage.get<any>(keys.attempt(date, uk))
    const participant = await storage.get<any>(keys.participant(uk))
    if (!attempt) continue

    const selectedId = attempt.selectedOptionId
    const selectedText = question.options.find((o: any) => o.id === selectedId)?.text ?? '—'
    const isCorrect = selectedId === correctOptionId

    attempts.push({
      name: participant?.phone ?? participant?.name ?? 'مجهول',
      selectedOptionId: selectedId,
      selectedOptionText: selectedText,
      isCorrect,
      submittedAt: new Date(attempt.submittedAt).toLocaleTimeString('ar-SA', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      })
    })
  }

  attempts.sort((a, b) => Number(b.isCorrect) - Number(a.isCorrect))

  const total = attempts.length
  const correct = attempts.filter(a => a.isCorrect).length
  const optionStats = question.options.map((o: any) => ({
    id: o.id,
    text: o.text,
    count: attempts.filter(a => a.selectedOptionId === o.id).length,
    isCorrect: o.id === correctOptionId
  }))

  return {
    date,
    question: {
      text: question.text,
      correctOptionId,
      correctOptionText: question.options.find((o: any) => o.id === correctOptionId)?.text ?? '—'
    },
    attempts,
    stats: { total, correct, wrong: total - correct, optionStats }
  }
})
