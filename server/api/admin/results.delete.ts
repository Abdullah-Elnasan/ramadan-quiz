// server/api/admin/results.delete.ts
import { defineEventHandler, getQuery } from 'h3'
import { getStorage, keys } from '../../utils/storage'
import { todayKey } from '../../utils/time'

export default defineEventHandler(async (event) => {
  const storage = getStorage(event)

  const query = getQuery(event)
  const date = (query.date as string) || todayKey()

  const indexRaw = await storage.get<{ keys: string[] }>(`attempts-index:${date}`)
  const userKeys = indexRaw?.keys ?? []

  for (const uk of userKeys) {
    await storage.del(keys.attempt(date, uk))
    await storage.del(keys.start(date, uk))
    await storage.del(`abandon:${date}:${uk}`)
  }

  await storage.del(`attempts-index:${date}`)

  return { ok: true, deletedCount: userKeys.length, date }
})
