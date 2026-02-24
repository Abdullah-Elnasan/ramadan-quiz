import { useStorage } from '#imports'

export function getStorage(_event?: any) {
  const storage = useStorage('kv')
  return {
    async get<T>(key: string): Promise<T | null> {
      return await storage.getItem<T>(key)
    },
    async set(key: string, value: any): Promise<void> {
      await storage.setItem(key, value)
    },
    async del(key: string): Promise<void> {
      await storage.removeItem(key)
    }
  }
}

export const keys = {
  question:    (date: string)              => `question:${date}`,
  attempt:     (date: string, uk: string)  => `attempt:${date}:${uk}`,
  participant: (uk: string)                => `participant:${uk}`,
  start:       (date: string, uk: string)  => `start:${date}:${uk}`,
}
