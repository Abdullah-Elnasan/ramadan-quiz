<template>
  <div
    class="min-h-screen flex items-center justify-center p-6"
    style="background: #f5f0e8"
  >
    <div class="w-full max-w-xl">
      <!-- تحميل -->
      <div
        v-if="pending"
        class="text-center text-sm tracking-widest"
        style="color: #9a9a9a"
      >
        جاري التحميل...
      </div>

      <!-- خارج النافذة -->
      <div
        v-else-if="state === 'closed'"
        class="rounded-xl p-10 text-center"
        style="
          background: #fff;
          border: 1px solid rgba(220, 206, 0, 0.4);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        "
      >
        <div class="text-4xl mb-5">🔒</div>
        <h2 class="text-xl font-bold mb-3" style="color: #1a1a1a">
          المسابقة غير متاحة حالياً
        </h2>
        <div class="text-sm leading-loose" style="color: #6b6b6b">
          <p>
            تفتح في:
            <span class="font-semibold" style="color: #7a7200">{{
              formatTime(quiz?.openAt)
            }}</span>
          </p>
          <p>
            تغلق في:
            <span class="font-semibold" style="color: #7a7200">{{
              formatTime(quiz?.closeAt)
            }}</span>
          </p>
        </div>
      </div>

      <!-- انتهى الوقت -->
      <div
        v-else-if="state === 'expired'"
        class="rounded-xl p-10 text-center"
        style="
          background: #fff;
          border: 1px solid rgba(220, 38, 38, 0.25);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        "
      >
        <div class="text-4xl mb-5">⌛</div>
        <h2 class="text-xl font-bold mb-2" style="color: #dc2626">
          انتهى وقت الإجابة
        </h2>
        <p class="text-sm" style="color: #9a9a9a">
          انتهت الـ 60 ثانية المخصصة لك
        </p>
      </div>

      <!-- غادر الصفحة -->
      <div
        v-else-if="state === 'abandoned'"
        class="rounded-xl p-10 text-center"
        style="
          background: #fff;
          border: 1px solid rgba(220, 38, 38, 0.25);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        "
      >
        <div class="text-4xl mb-5">🚫</div>
        <h2 class="text-xl font-bold mb-2" style="color: #dc2626">
          انتهت فرصتك
        </h2>
        <p class="text-sm leading-loose" style="color: #9a9a9a">
          غادرت صفحة السؤال قبل الإجابة،<br />
          لا يمكن المشاركة مجدداً في سؤال اليوم.
        </p>
      </div>

      <!-- أجاب مسبقاً -->
      <div
        v-else-if="state === 'done'"
        class="rounded-xl p-10 text-center"
        style="
          background: #fff;
          border: 1px solid rgba(220, 206, 0, 0.4);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        "
      >
        <div
          class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style="
            background: rgba(220, 206, 0, 0.1);
            border: 2px solid rgba(220, 206, 0, 0.4);
          "
        >
          <span class="text-2xl" style="color: #7a7200">✓</span>
        </div>
        <h2 class="text-xl font-bold mb-2" style="color: #1a1a1a">
          تم استلام إجابتك
        </h2>
        <p class="text-sm" style="color: #9a9a9a">
          شكراً {{ quiz?.participantName }}، ستُعلَن النتائج لاحقاً
        </p>
      </div>

      <!-- السؤال نشط -->
      <div
        v-else-if="state === 'active' && quiz?.question"
        class="rounded-xl overflow-hidden"
        style="
          background: #fff;
          border: 1px solid rgba(220, 206, 0, 0.4);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
        "
      >
        <!-- رأس البطاقة -->
        <div
          class="px-6 py-4 flex justify-between items-center"
          style="
            background: #f9f6ee;
            border-bottom: 1px solid rgba(220, 206, 0, 0.25);
          "
        >
          <div class="flex items-center gap-2">
            <span
              class="w-2 h-2 rounded-full animate-pulse"
              style="background: rgb(220, 206, 0)"
            />
            <span class="text-xs tracking-widest" style="color: #9a9a9a"
              >سؤال اليوم</span
            >
          </div>
          <span class="text-sm font-medium" style="color: #1a1a1a">
            {{ quiz.participantName }}
          </span>
        </div>

        <div class="p-6">
          <!-- المؤقت -->
          <div class="mb-6">
            <CountdownTimer
              :initial-seconds="quiz.remainingPersonalSeconds"
              @expired="onTimerExpired"
            />
          </div>

          <!-- نص السؤال -->
          <div class="mb-6">
            <p class="text-xs tracking-widest mb-3" style="color: #9a9a9a">
              السؤال
            </p>
            <h3
              class="text-lg font-semibold text-right leading-loose"
              style="color: #1a1a1a"
            >
              {{ quiz.question.text }}
            </h3>
          </div>

          <div class="h-px mb-5" style="background: rgba(220, 206, 0, 0.25)" />

          <!-- الخيارات -->
          <div class="flex flex-col gap-2.5 mb-6" style="color: red">
            <QuizOption

              v-for="(opt, i) in quiz.question.options"
              :key="opt.id"
              :option="opt"
              :selected="selectedId === opt.id"
              :index="i"
              name="quiz"
              @select="selectedId = $event"
            />
          </div>

          <!-- رسالة خطأ -->
          <div
            v-if="submitError"
            class="flex items-center gap-1.5 px-4 py-2.5 rounded-lg mb-4 text-sm"
            style="
              background: rgba(220, 38, 38, 0.06);
              border: 1px solid rgba(220, 38, 38, 0.2);
              color: #dc2626;
            "
          >
            ⚠ {{ submitError }}
          </div>

          <!-- زر التأكيد -->
          <button
            :disabled="!selectedId || submitting"
            class="w-full font-bold py-4 rounded-lg transition-all duration-200 tracking-widest text-sm"
            style="background: #1a1a1a; color: #f5f0e8"
            :style="{
              opacity: !selectedId || submitting ? '0.4' : '1',
              cursor: !selectedId || submitting ? 'not-allowed' : 'pointer',
            }"
            @mouseenter="
              (e: MouseEvent) => {
                if (selectedId && !submitting) {
                  const el = e.target as HTMLElement;
                  el.style.background = 'rgb(220,206,0)';
                  el.style.color = '#1a1a1a';
                }
              }
            "
            @mouseleave="
              (e: MouseEvent) => {
                const el = e.target as HTMLElement;
                el.style.background = '#1a1a1a';
                el.style.color = '#F5F0E8';
              }
            "
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
definePageMeta({ middleware: "require-join" });

const { data: quizData, pending } = await useFetch("/api/question/today", {
  watch: false,
});
const quiz = computed(() => (quizData.value as any) ?? {});

const selectedId = ref<string | null>(null);
const submitting = ref(false);
const submitError = ref("");
const timerExpired = ref(false);
const quizIsActive = ref(false);

watch(
  quizData,
  (d: any) => {
    if (!d) return;
    quizIsActive.value =
      !d.needJoin &&
      !d.noQuestion &&
      !d.closedGlobal &&
      !d.alreadySubmitted &&
      !d.abandoned &&
      d.remainingPersonalSeconds > 0;
  },
  { immediate: true },
);

type QuizState =
  | "loading"
  | "closed"
  | "expired"
  | "abandoned"
  | "done"
  | "active";

const state = computed<QuizState>(() => {
  if (pending.value) return "loading";
  const d = quizData.value as any;
  if (!d || d.needJoin || d.noQuestion || d.closedGlobal) return "closed";
  if (d.alreadySubmitted) return "done";
  if (d.abandoned) return "abandoned";
  if (timerExpired.value || d.remainingPersonalSeconds <= 0) return "expired";
  return "active";
});

function onTimerExpired() {
  timerExpired.value = true;
  quizIsActive.value = false;
}

async function handleVisibility() {
  if (document.visibilityState === "hidden" && quizIsActive.value) {
    quizIsActive.value = false;
    try {
      navigator.sendBeacon("/api/abandon");
    } catch {
      await $fetch("/api/abandon", { method: "POST" }).catch(() => {});
    }
  }
}

onMounted(() =>
  document.addEventListener("visibilitychange", handleVisibility),
);
onUnmounted(() =>
  document.removeEventListener("visibilitychange", handleVisibility),
);

function formatTime(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("ar-SA", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function submitAnswer() {
  if (!selectedId.value || timerExpired.value) return;
  submitError.value = "";
  submitting.value = true;
  try {
    const d = quizData.value as any;
    const res = await $fetch<{ accepted: boolean; reason?: string }>(
      "/api/answer",
      {
        method: "POST",
        body: { questionId: d.question.id, selectedOptionId: selectedId.value },
      },
    );
    if (res.accepted) {
      quizIsActive.value = false;
      await navigateTo(
        `/done?name=${encodeURIComponent(d.participantName ?? "")}`,
      );
    } else {
      const msgs: Record<string, string> = {
        timeout_global: "انتهت النافذة الزمنية للمسابقة",
        timeout_personal: "انتهى وقتك الشخصي",
        duplicate: "لقد أرسلت إجابتك مسبقاً",
        abandoned: "انتهت فرصتك — غادرت الصفحة أثناء السؤال",
        needJoin: "يرجى إدخال اسمك أولاً",
      };
      submitError.value = msgs[res.reason ?? ""] ?? "حدث خطأ، يرجى المحاولة";
    }
  } catch {
    submitError.value = "خطأ في الاتصال";
  } finally {
    submitting.value = false;
  }
}
</script>
