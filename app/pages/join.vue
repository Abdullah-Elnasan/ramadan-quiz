<template>
  <div class="min-h-screen flex items-center justify-center p-6"
    style="background: linear-gradient(135deg, #1a2540 0%, #243058 50%, #1a2540 100%);">
    <div class="w-full max-w-sm">

      <div class="text-center mb-8">
        <!-- <div class="w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-3"
          style="border: 1px solid rgba(91,127,207,0.4); background: white;">
          <img src="/logo.png" alt="Logo" class="w-full h-full" />
        </div>
        <p class="text-xs tracking-widest uppercase mb-1" style="color: #5b7fcf;">Aljawhra Smart</p> -->
        <h2 class="text-xl font-bold text-white">تسجيل الدخول</h2>
        <p class="text-sm mt-1" style="color: rgba(255,255,255,0.35);">أدخل اسمك للمشاركة</p>
      </div>

      <div class="rounded-lg p-7 shadow-xl"
        style="background: #243058; border: 1px solid rgba(48,80,153,0.35);">
        <form @submit.prevent="submit">
          <div class="mb-6">
            <label class="block text-xs tracking-widest uppercase mb-2"
              style="color: rgba(255,255,255,0.45);">الاسم الكامل</label>
            <input
              v-model="name"
              type="text"
              placeholder="أدخل اسمك الكريم"
              maxlength="30"
              class="w-full rounded px-4 py-3 text-white text-right text-sm focus:outline-none transition-all duration-200"
              style="background: #1a2540; border: 1px solid rgba(48,80,153,0.3);"
              :disabled="loading"
              @focus="e => (e.target as HTMLElement).style.borderColor = 'rgba(91,127,207,0.7)'"
              @blur="e => (e.target as HTMLElement).style.borderColor = 'rgba(48,80,153,0.3)'"
            />
            <p v-if="error" class="text-red-400 text-xs mt-2 text-right">⚠ {{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="!name.trim() || loading"
            class="w-full font-bold py-3.5 rounded transition-all duration-200 tracking-widest text-sm text-white"
            style="background: #305099;"
            :style="{ opacity: (!name.trim() || loading) ? '0.4' : '1', cursor: (!name.trim() || loading) ? 'not-allowed' : 'pointer' }"
          >
            <span v-if="loading">جاري التحقق...</span>
            <span v-else>دخول</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const name = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  const trimmed = name.value.trim()
  if (trimmed.length < 2) { error.value = 'الاسم قصير جداً (2 أحرف على الأقل)'; return }
  if (trimmed.length > 30) { error.value = 'الاسم طويل جداً (30 حرفاً كحد أقصى)'; return }
  loading.value = true
  try {
    await $fetch('/api/join', { method: 'POST', body: { name: trimmed } })
    await navigateTo('/quiz')
  } catch (e: any) {
    error.value = e?.data?.message ?? 'حدث خطأ، يرجى المحاولة مجدداً'
  } finally {
    loading.value = false
  }
}
</script>
