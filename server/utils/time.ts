export function nowUtc(): number {
  return Date.now()
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10) // "YYYY-MM-DD"
}

export function isWithinWindow(openAt: string, closeAt: string, now = nowUtc()): boolean {
  return now >= new Date(openAt).getTime() && now <= new Date(closeAt).getTime()
}

export function secondsElapsed(startedAt: number, now = nowUtc()): number {
  return Math.floor((now - startedAt) / 1000)
}

export const PERSONAL_LIMIT_SEC = 60
