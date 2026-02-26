// server/api/join.post.ts
import { defineEventHandler, readBody, setCookie, createError } from 'h3'
import { getStorage, keys } from '../utils/storage'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name: string; uk?: string }>(event)

  if (!body?.name?.trim()) {
    throw createError({ statusCode: 400, message: 'الاسم مطلوب' })
  }

  // ✅ إذا لم يُرسل uk، ولّد واحداً جديداً
  const uk = body.uk || uuidv4()

  const storage = getStorage()
  const participantKey = keys.participant(uk)
  const existing = await storage.get<any>(participantKey)

  if (existing) {
    setCookie(event, 'userKey', uk, { httpOnly: true, path: '/' })
    return { ok: true, name: existing.name }
  }

  await storage.set(participantKey, { name: body.name.trim() })
  setCookie(event, 'userKey', uk, { httpOnly: true, path: '/' })

  return { ok: true, name: body.name.trim() }
})
