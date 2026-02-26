// server/api/admin/dates.get.ts
import { getStorage } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  const storage = getStorage(event)

  // نجلب آخر 30 يوم ونتحقق من وجود نتائج لكل يوم
  const dates: string[] = []
  const today = new Date()

  for (let i = 0; i < 30; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().slice(0, 10)

    const index = await storage.get<{ keys: string[] }>(`attempts-index:${dateStr}`)
    if (index && index.keys.length > 0) {
      dates.push(dateStr)
    }
  }

  return { dates }
})
