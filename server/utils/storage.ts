// ✅ استيراد النوع الصحيح من nitro/h3
import type { H3Event } from 'h3'
// ✅ تعريف النوع يدوياً بدون استيراد خارجي
type StorageValue = string | number | boolean | object | null

// ── Storage Adapter Interface ─────────────────────────────────────────────────
export interface StorageAdapter {
  get<T>(key: string): Promise<T | null>
  set(key: string, value: StorageValue, ttlSeconds?: number): Promise<void>
  del(key: string): Promise<void>
}

// ── Local Dev: يستخدم nitro's built-in storage ───────────────────────────────
class NitroStorageAdapter implements StorageAdapter {
  async get<T>(key: string): Promise<T | null> {
    return useStorage('kv').getItem<T>(key)
  }
  // ✅ القيمة الآن StorageValue بدلاً من unknown
  async set(key: string, value: StorageValue, _ttl?: number): Promise<void> {
    await useStorage('kv').setItem(key, value)
  }
  async del(key: string): Promise<void> {
    await useStorage('kv').removeItem(key)
  }
}

// ── Cloudflare KV Adapter ────────────────────────────────────────────────────
// ✅ تعريف النوع يدوياً بدلاً من الاعتماد على @cloudflare/workers-types
interface KVNamespace {
  get(key: string, type: 'json'): Promise<unknown>
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
  delete(key: string): Promise<void>
}

class CloudflareKVAdapter implements StorageAdapter {
  private kv: KVNamespace
  constructor(kv: KVNamespace) { this.kv = kv }

  async get<T>(key: string): Promise<T | null> {
    const val = await this.kv.get(key, 'json')
    return val as T | null
  }
  async set(key: string, value: StorageValue, ttlSeconds?: number): Promise<void> {
    const opts = ttlSeconds ? { expirationTtl: ttlSeconds } : undefined
    await this.kv.put(key, JSON.stringify(value), opts)
  }
  async del(key: string): Promise<void> {
    await this.kv.delete(key)
  }
}

// ── Cloudflare env type ───────────────────────────────────────────────────────
interface CloudflareEnv {
  QUIZ_KV?: KVNamespace
}

// ── Factory ───────────────────────────────────────────────────────────────────
// ✅ استخدام H3Event المستورد بدلاً من ReturnType<typeof defineEventHandler>
export function getStorage(event?: H3Event): StorageAdapter {
  const cfEnv = (event?.context?.cloudflare?.env as CloudflareEnv | undefined)
  if (cfEnv?.QUIZ_KV) return new CloudflareKVAdapter(cfEnv.QUIZ_KV)
  return new NitroStorageAdapter()
}

// ── Key Helpers ───────────────────────────────────────────────────────────────
export const keys = {
  question:    (date: string)                          => `question:${date}`,
  participant: (userKey: string)                       => `participant:${userKey}`,
  start:       (questionId: string, userKey: string)   => `start:${questionId}:${userKey}`,
  attempt:     (questionId: string, userKey: string)   => `attempt:${questionId}:${userKey}`
}
