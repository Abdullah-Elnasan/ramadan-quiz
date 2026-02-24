import { v4 as uuidv4 } from 'uuid'
import { getStorage, keys } from '../utils/storage'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name?: string }>(event)

  if (!body?.name || body.name.trim().length < 2 || body.name.trim().length > 30) {
    throw createError({ statusCode: 400, message: 'الاسم يجب أن يكون بين 2 و30 حرفاً' })
  }

  const name = body.name.trim()
  const storage = getStorage(event)

  // أنشئ userKey جديد إذا لم يوجد Cookie
  let userKey = getCookie(event, 'userKey')
  if (!userKey) {
    userKey = uuidv4()
    setCookie(event, 'userKey', userKey, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 90, // 90 يوم
      path: '/'
    })
  }

  await storage.set(keys.participant(userKey), { name })
  return { ok: true }
})
