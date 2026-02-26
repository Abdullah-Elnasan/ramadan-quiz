<template>
  <div
    class="min-h-screen flex items-center justify-center p-6"
    style="background: #F5F0E8;"
  >
    <div class="w-full max-w-sm">

      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <img
            src="/logo-me2.png"
            alt="شعار شركة الميثاق"
            class="w-32 h-32 object-contain"
            loading="eager"
          />
        </div>
        <div class="flex items-center gap-3 mb-5">
          <div class="flex-1 h-px" style="background: rgba(220,206,0,0.4);" />
          <span style="color: rgba(180,168,0,0.6);">◆</span>
          <div class="flex-1 h-px" style="background: rgba(220,206,0,0.4);" />
        </div>
        <h2 class="text-xl font-bold" style="color: #1a1a1a;">تسجيل الدخول</h2>
        <p class="text-sm mt-1" style="color: #9a9a9a;">أدخل رقم هاتفك للمشاركة</p>
      </div>

      <div
        class="rounded-xl p-7"
        style="
          background: #FFFFFF;
          border: 1px solid rgba(220,206,0,0.45);
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
        "
      >
        <!-- بادج وقت الفتح -->
        <div
          v-if="openLabel"
          class="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 mb-6"
          style="background: rgba(220,206,0,0.08); border: 1px solid rgba(220,206,0,0.3);"
        >
          <span style="color: #7a7200; font-size: 13px;">🕐</span>
          <span class="text-xs font-semibold tracking-wide" style="color: #7a7200;">
            يفتح السؤال {{ openLabel }} الساعة {{ openTime }}
          </span>
        </div>

        <form @submit.prevent="submit">
          <div class="mb-6">
            <label class="block text-xs tracking-widest uppercase mb-2" style="color: #6b6b6b;">
              رقم الهاتف
            </label>
            <input
              v-model="phone"
              type="tel"
              placeholder="09XXXXXXXX"
              maxlength="15"
              dir="ltr"
              class="w-full rounded-lg px-4 py-3 text-left text-sm focus:outline-none transition-all duration-200 tracking-widest"
              style="background: #F9F6EE; border: 1px solid rgba(220,206,0,0.35); color: #1a1a1a;"
              :disabled="loading"
              @focus="(e: FocusEvent) => ((e.target as HTMLElement).style.borderColor = 'rgba(180,168,0,0.8)')"
              @blur="(e: FocusEvent)  => ((e.target as HTMLElement).style.borderColor = 'rgba(220,206,0,0.35)')"
            />
            <div
              v-if="error"
              class="flex items-center gap-1.5 mt-2 px-3 py-2 rounded-lg"
              style="background: rgba(220,38,38,0.06); border: 1px solid rgba(220,38,38,0.2);"
            >
              <span style="color: #dc2626; font-size: 11px;">⚠ {{ error }}</span>
            </div>
          </div>

          <div class="h-px mb-5" style="background: rgba(220,206,0,0.2);" />

          <button
            type="submit"
            :disabled="!phone.trim() || loading"
            class="w-full font-bold py-3.5 rounded-lg transition-all duration-200 tracking-widest text-sm"
            style="background: #1a1a1a; color: #F5F0E8;"
            :style="{
              opacity: (!phone.trim() || loading) ? '0.4' : '1',
              cursor:  (!phone.trim() || loading) ? 'not-allowed' : 'pointer'
            }"
            @mouseenter="(e: MouseEvent) => {
              if (phone.trim() && !loading) {
                const el = e.target as HTMLElement
                el.style.background = 'rgb(220,206,0)'
                el.style.color = '#1a1a1a'
              }
            }"
            @mouseleave="(e: MouseEvent) => {
              const el = e.target as HTMLElement
              el.style.background = '#1a1a1a'
              el.style.color = '#F5F0E8'
            }"
          >
            <span v-if="loading">جاري التحقق...</span>
            <span v-else>دخول</span>
          </button>
        </form>
      </div>

      <p class="text-center text-xs mt-6 tracking-wider" style="color: #9a9a9a;">
        © {{ new Date().getFullYear() }} شركة الميثاق — جميع الحقوق محفوظة
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const phone   = ref('')
const error   = ref('')
const loading = ref(false)

// ── جلب بيانات السؤال لمعرفة وقت الفتح ──────────────────────────────────────
const { data: questionData } = await useFetch('/api/question/today', { watch: false })

const openLabel = computed(() => {
  const d = questionData.value as any
  if (!d?.openAt) return null

  const openDate = new Date(d.openAt)
  const now      = new Date()

  const openDay = openDate.toDateString()
  const today   = now.toDateString()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (openDay === today)                    return 'اليوم'
  if (openDay === tomorrow.toDateString())  return 'غداً'

  // إذا كان بعد غد أو أبعد — أعرض اسم اليوم
  return openDate.toLocaleDateString('ar-SA', { weekday: 'long' })
})

const openTime = computed(() => {
  const d = questionData.value as any
  if (!d?.openAt) return ''
  return new Date(d.openAt).toLocaleTimeString('ar-SA', {
    hour: '2-digit',
    minute: '2-digit'
  })
})

// ── التحقق من الرقم ───────────────────────────────────────────────────────────
function validatePhone(val: string): string {
  const cleaned = val.trim().replace(/\s+/g, '')
  if (!cleaned) return 'رقم الهاتف مطلوب'
  if (!/^\+?\d{7,15}$/.test(cleaned)) return 'أدخل رقماً صحيحاً (أرقام فقط، 7-15 خانة)'
  return ''
}

async function submit() {
  error.value = ''
  const validationError = validatePhone(phone.value)
  if (validationError) { error.value = validationError; return }

  loading.value = true
  try {
    await $fetch('/api/join', { method: 'POST', body: { phone: phone.value.trim() } })
    await navigateTo('/quiz')
  } catch (e: any) {
    error.value = e?.data?.message ?? 'حدث خطأ، يرجى المحاولة مجدداً'
  } finally {
    loading.value = false
  }
}
</script>
