
// server/utils/auth.ts
import { H3Event, createError } from 'h3'

export function checkAdminAuth(event: H3Event): void {
  const config = useRuntimeConfig()
  const header = getRequestHeader(event, 'authorization') ?? ''

  if (!header.startsWith('Basic ')) {
    setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Admin"')
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const decoded = Buffer.from(header.slice(6), 'base64').toString('utf-8')
  const [user, pass] = decoded.split(':')

  if (user !== config.adminUser || pass !== config.adminPass) {
    setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Admin"')
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }
}
