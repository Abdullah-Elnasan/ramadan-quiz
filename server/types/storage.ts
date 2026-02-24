// ~/types/storage.ts

export interface StorageAdapter {
  /**
   * حفظ قيمة تحت مفتاح محدد
   * @param key اسم المفتاح
   * @param value القيمة المراد حفظها
   * @param ttlSeconds مدة الصلاحية بالثواني (اختياري)
   */
  set(key: string, value: any, ttlSeconds?: number): Promise<void>

  /**
   * استرجاع قيمة
   * @param key اسم المفتاح
   */
  get<T = any>(key: string): Promise<T | null>

  /**
   * حذف قيمة
   * @param key اسم المفتاح
   */
  del(key: string): Promise<void>

  /**
   * تحقق إذا المفتاح موجود
   * @param key اسم المفتاح
   */
  has(key: string): Promise<boolean>
}
