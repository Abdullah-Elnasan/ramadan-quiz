import { checkAdminAuth } from '../utils/auth'

export default defineEventHandler((event: any) => {
  const path = getRequestPath(event)   // ✅ بدلاً من getRequestURL
  if (path.startsWith('/api/admin')) {
    checkAdminAuth(event)
  }
})
