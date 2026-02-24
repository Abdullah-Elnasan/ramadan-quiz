<template>
  <div
    class="min-h-screen flex items-center justify-center p-6"
    style="background: linear-gradient(135deg, #1a2540 0%, #243058 50%, #1a2540 100%);"
  >
    <div class="w-full max-w-xl">

      <!-- تحميل -->
      <div v-if="pending"
        class="text-center text-sm tracking-widest"
        style="color: rgba(255,255,255,0.35);">
        جاري التحميل...
      </div>

      <!-- خارج النافذة -->
      <div v-else-if="state === 'closed'"
        class="rounded-lg p-10 text-center"
        style="background: #243058; border: 1px solid rgba(48,80,153,0.35);">
        <div class="text-4xl mb-5">🔒</div>
        <h2 class="text-white text-xl font-bold mb-3">المسابقة غير متاحة حالياً</h2>
        <div class="text-sm leading-loose" style="color: rgba(255,255,255,0.4);">
          <p>تفتح في: <span style="color: #5b7fcf;">{{ formatTime(quizData?.openAt) }}</span></p>
          <p>تغلق في: <span style="color: #5b7fcf;">{{ formatTime(quizData?.closeAt) }}</span></p>
        </div>
      </div>

      <!-- انتهى الوقت -->
      <div v-else-if="state === 'expired'"
        class="rounded-lg p-10 text-center"
        style="background: #243058; border: 1px solid rgba(220,38,38,0.2);">
        <div class="text-4xl mb-5">⌛</div>
        <h2 class="text-red-400 text-xl font-bold mb-2">انتهى وقت الإجابة</h2>
        <p class="text-sm" style="color: rgba(255,255,255,0.35);">انتهت الـ 60 ثانية المخصصة لك</p>
      </div>

      <!-- غادر الصفحة -->
      <div v-else-if="state === 'abandoned'"
        class="rounded-lg p-10 text-center"
        style="background: #243058; border: 1px solid rgba(239,68,68,0.2);">
        <div class="text-4xl mb-5">🚫</div>
        <h2 class="text-red-400 text-xl font-bold mb-2">انتهت فرصتك</h2>
        <p class="text-sm leading-loose" style="color: rgba(255,255,255,0.35);">
          غادرت صفحة السؤال قبل الإجابة،<br>
          لا يمكن المشاركة مجدداً في سؤال اليوم.
        </p>
      </div>

      <!-- أجاب مسبقاً -->
      <div v-else-if="state === 'done'"
        class="rounded-lg p-10 text-center"
        style="background: #243058; border: 1px solid rgba(48,80,153,0.4);">
        <div class="text-4xl mb-5">✅</div>
        <h2 class="text-xl font-bold mb-2" style="color: #5b7fcf;">تم استلام إجابتك</h2>
        <p class="text-sm" style="color: rgba(255,255,255,0.35);">
          شكراً {{ (quizData as any)?.participantName }}، ستُعلَن النتائج لاحقاً
        </p>
      </div>

      <!-- السؤال نشط -->
      <div v-else-if="state === 'active' && (quizData as any)?.question"
        class="rounded-lg shadow-2xl overflow-hidden"
        style="background: #243058; border: 1px solid rgba(48,80,153,0.35);">

        <!-- رأس البطاقة -->
        <div class="px-6 py-4 flex justify-between items-center"
          style="background: #1a2540; border-bottom: 1px solid rgba(48,80,153,0.2);">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full animate-pulse" style="background: #5b7fcf;" />
            <span class="text-xs tracking-widest" style="color: rgba(255,255,255,0.35);">سؤال اليوم</span>
          </div>
          <span class="text-sm" style="color: rgba(255,255,255,0.55);">
            {{ (quizData as any).participantName }}
          </span>
        </div>

        <div class="p-6">
          <!-- المؤقت -->
          <div class="mb-6">
            <CountdownTimer
              :initial-seconds="(quizData as any).remainingPersonalSeconds"
              @expired="onTimerExpired"
            />
          </div>

          <!-- نص السؤال -->
          <div class="mb-6">
            <p class="text-xs tracking-widest mb-3" style="color: rgba(255,255,255,0.35);">السؤال</p>
            <h3 class="text-white text-lg font-semibold text-right leading-loose">
              {{ (quizData as any).question.text }}
            </h3>
          </div>

          <div class="border-t mb-5" style="border-color: rgba(48,80,153,0.2);" />

          <!-- الخيارات -->
          <div class="flex flex-col gap-2.5 mb-6">
            <QuizOption
style="color: white;"
              v-for="(opt, i) in (quizData as any).question.options"
              :key="opt.id"
              :option="opt"
              :selected="selectedId === opt.id"
              :index="i"
              name="quiz"
              @select="selectedId = $event"
            />
          </div>

          <p v-if="submitError" class="text-red-400 text-xs text-center mb-4">
            ⚠ {{ submitError }}
          </p>

          <button
            :disabled="!selectedId || submitting"
            class="w-full font-bold py-4 rounded transition-all duration-200 tracking-widest text-sm text-white"
            style="background: #305099;"
            :style="{
              opacity: !selectedId || submitting ? '0.4' : '1',
              cursor:  !selectedId || submitting ? 'not-allowed' : 'pointer'
            }"
            @click="submitAnswer"
          >
            <span v-if="submitting">جاري الإرسال...</span>
            <span v-else>تأكيد الإجابة</span>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'require-join' })

// ── 1. جلب البيانات أولاً ─────────────────────────────────────────────────────
const { data: quizData, pending } = await useFetch('/api/question/today', { watch: false })

// ── 2. المتغيرات ──────────────────────────────────────────────────────────────
const selectedId    = ref<string | null>(null)
const submitting    = ref(false)
const submitError   = ref('')
const timerExpired  = ref(false)
const quizIsActive  = ref(false)          // ✅ متغير مستقل للمراقبة

// ── 3. watch بعد تعريف quizData مباشرة ───────────────────────────────────────
watch(quizData, (d: any) => {
  if (!d) return
  quizIsActive.value = (
    !d.needJoin &&
    !d.noQuestion &&
    !d.closedGlobal &&
    !d.alreadySubmitted &&
    !d.abandoned &&
    d.remainingPersonalSeconds > 0
  )
}, { immediate: true })

// ── 4. حالة الصفحة ───────────────────────────────────────────────────────────
type QuizState = 'loading' | 'closed' | 'expired' | 'abandoned' | 'done' | 'active'

const state = computed<QuizState>(() => {
  if (pending.value) return 'loading'
  const d = quizData.value as any
  if (!d || d.needJoin || d.noQuestion || d.closedGlobal) return 'closed'
  if (d.alreadySubmitted) return 'done'
  if (d.abandoned)        return 'abandoned'
  if (timerExpired.value || d.remainingPersonalSeconds <= 0) return 'expired'
  return 'active'
})

// ── 5. انتهاء المؤقت ─────────────────────────────────────────────────────────
function onTimerExpired() {
  timerExpired.value = true
  quizIsActive.value = false
}

// ── 6. مغادرة الصفحة ─────────────────────────────────────────────────────────
async function handleVisibility() {
  if (document.visibilityState === 'hidden' && quizIsActive.value) {
    quizIsActive.value = false
    try {
      navigator.sendBeacon('/api/abandon')
    } catch {
      await $fetch('/api/abandon', { method: 'POST' }).catch(() => {})
    }
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibility)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibility)
})

// ── 7. تنسيق الوقت ───────────────────────────────────────────────────────────
function formatTime(iso?: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
}

// ── 8. إرسال الإجابة ─────────────────────────────────────────────────────────
async function submitAnswer() {
  if (!selectedId.value || timerExpired.value) return
  submitError.value = ''
  submitting.value  = true

  try {
    const d = quizData.value as any
    const res = await $fetch<{ accepted: boolean; reason?: string }>('/api/answer', {
      method: 'POST',
      body: {
        questionId:       d.question.id,
        selectedOptionId: selectedId.value
      }
    })

    if (res.accepted) {
      quizIsActive.value = false
      await navigateTo(`/done?name=${encodeURIComponent(d.participantName ?? '')}`)
    } else {
      const msgs: Record<string, string> = {
        timeout_global:   'انتهت النافذة الزمنية للمسابقة',
        timeout_personal: 'انتهى وقتك الشخصي (60 ثانية)',
        duplicate:        'لقد أرسلت إجابتك مسبقاً',
        abandoned:        'انتهت فرصتك — غادرت الصفحة أثناء السؤال',
        needJoin:         'يرجى إدخال اسمك أولاً'
      }
      submitError.value = msgs[res.reason ?? ''] ?? 'حدث خطأ، يرجى المحاولة'
    }
  } catch {
    submitError.value = 'خطأ في الاتصال'
  } finally {
    submitting.value = false
  }
}
</script>
