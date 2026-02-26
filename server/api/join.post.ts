import { defineEventHandler, readBody, setCookie, createError } from 'h3'
import { getStorage, keys } from '../utils/storage'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ phone: string; uk?: string }>(event)

  const phone = body?.phone?.trim().replace(/\s+/g, '')

  if (!phone) {
    throw createError({ statusCode: 400, message: 'رقم الهاتف مطلوب' })
  }

  // تحقق من الصيغة — أرقام فقط، 7 إلى 15 خانة
  if (!/^\+?\d{7,15}$/.test(phone)) {
    throw createError({ statusCode: 400, message: 'رقم الهاتف غير صالح' })
  }

  const uk = body.uk || uuidv4()
  const storage = getStorage()
  const participantKey = keys.participant(uk)
  const existing = await storage.get<any>(participantKey)

  if (existing) {
    setCookie(event, 'userKey', uk, { httpOnly: true, path: '/' })
    return { ok: true, name: existing.phone }
  }

  await storage.set(participantKey, { phone })
  setCookie(event, 'userKey', uk, { httpOnly: true, path: '/' })

  return { ok: true, name: phone }
})
