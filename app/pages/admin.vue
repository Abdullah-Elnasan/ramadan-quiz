<template>
  <div class="min-h-screen text-white p-6" style="background: #1a2540">
    <div class="max-w-2xl mx-auto">
      <!-- رأس الصفحة -->
      <div
        class="pb-5 mb-8"
        style="border-bottom: 1px solid rgba(48, 80, 153, 0.3)"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded flex items-center justify-center"
            style="
              border: 1px solid rgba(91, 127, 207, 0.3);
              background: rgba(48, 80, 153, 0.15);
            "
          >
            <span class="text-sm" style="color: #5b7fcf">◆</span>
          </div>
          <div>
            <h1 class="text-lg font-bold text-white tracking-wide">
              لوحة تحكم المسابقة
            </h1>
            <p
              class="text-xs tracking-widest"
              style="color: rgba(255, 255, 255, 0.25)"
            >
              شركة الميثاق — {{ today }}
            </p>
          </div>
        </div>

        <!-- تبويبات -->
        <div class="flex gap-1 mt-5">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-5 py-2 text-xs tracking-widest rounded transition-all"
            :style="
              activeTab === tab.id
                ? 'background: #305099; color: white; font-weight: 700;'
                : 'color: rgba(255,255,255,0.35); border: 1px solid rgba(48,80,153,0.25);'
            "
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- ══ تبويب: إدارة السؤال ══ -->
      <div v-if="activeTab === 'question'">
        <div
          class="rounded-lg p-7"
          style="background: #243058; border: 1px solid rgba(48, 80, 153, 0.3)"
        >
          <div class="mb-6">
            <label
              class="block text-xs tracking-widest uppercase mb-2"
              style="color: rgba(255, 255, 255, 0.35)"
              >نص السؤال</label
            >
            <textarea
              v-model="form.text"
              rows="3"
              placeholder="اكتب نص السؤال هنا..."
              class="w-full rounded px-4 py-3 text-white text-right resize-none focus:outline-none transition text-sm"
              style="
                background: #1a2540;
                border: 1px solid rgba(48, 80, 153, 0.25);
              "
            />
          </div>

          <div class="mb-6">
            <label
              class="block text-xs tracking-widest uppercase mb-3"
              style="color: rgba(255, 255, 255, 0.35)"
            >
              الخيارات — اختر الإجابة الصحيحة
            </label>
            <div class="flex flex-col gap-2">
              <div
                v-for="(opt, i) in form.options"
                :key="opt.id"
                class="flex gap-3 items-center"
              >
                <input
                  type="radio"
                  :value="opt.id"
                  v-model="form.correctOptionId"
                  class="w-4 h-4 shrink-0"
                  style="accent-color: #5b7fcf"
                />
                <span
                  class="text-xs w-5 text-center"
                  style="color: rgba(255, 255, 255, 0.25)"
                >
                  {{ labels[i] }}
                </span>
                <input
                  v-model="form.options[i].text"
                  :placeholder="`الخيار ${labels[i]}`"
                  class="flex-1 rounded px-3 py-2.5 text-white text-right text-sm focus:outline-none transition"
                  style="
                    background: #1a2540;
                    border: 1px solid rgba(48, 80, 153, 0.25);
                  "
                />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-7">
            <div>
              <label
                class="block text-xs tracking-widest uppercase mb-2"
                style="color: rgba(255, 255, 255, 0.35)"
                >وقت الفتح</label
              >
              <input
                v-model="form.openAt"
                type="datetime-local"
                class="w-full rounded px-3 py-2.5 text-white text-sm focus:outline-none transition"
                style="
                  background: #1a2540;
                  border: 1px solid rgba(48, 80, 153, 0.25);
                "
              />
            </div>
            <div>
              <label
                class="block text-xs tracking-widest uppercase mb-2"
                style="color: rgba(255, 255, 255, 0.35)"
                >وقت الإغلاق</label
              >
              <input
                v-model="form.closeAt"
                type="datetime-local"
                class="w-full rounded px-3 py-2.5 text-white text-sm focus:outline-none transition"
                style="
                  background: #1a2540;
                  border: 1px solid rgba(48, 80, 153, 0.25);
                "
              />
            </div>
          </div>
          <!-- مدة الإجابة الشخصية -->
          <div class="mb-7">
            <label
              class="block text-xs tracking-widest uppercase mb-2"
              style="color: rgba(255, 255, 255, 0.35)"
            >
              مدة الإجابة المسموحة (ثانية)
            </label>
            <div class="flex items-center gap-3">
              <input
                v-model.number="form.personalSeconds"
                type="number"
                min="10"
                max="300"
                class="w-32 rounded px-3 py-2.5 text-white text-sm text-center focus:outline-none transition"
                style="
                  background: #1a2540;
                  border: 1px solid rgba(48, 80, 153, 0.25);
                "
              />
              <span class="text-xs" style="color: rgba(255, 255, 255, 0.35)">
                ثانية — الحد الأدنى 10، الأقصى 300
              </span>
              <!-- اختصارات سريعة -->
              <div class="flex gap-1 mr-auto">
                <button
                  v-for="s in [30, 60, 90, 120]"
                  :key="s"
                  @click="form.personalSeconds = s"
                  class="text-xs px-2 py-1 rounded transition"
                  :style="
                    form.personalSeconds === s
                      ? 'background: #305099; color: white;'
                      : 'color: rgba(255,255,255,0.35); border: 1px solid rgba(48,80,153,0.2);'
                  "
                >
                  {{ s }}s
                </button>
              </div>
            </div>
          </div>

          <p v-if="saveError" class="text-red-400 text-sm mb-4 text-center">
            ⚠ {{ saveError }}
          </p>
          <p v-if="saveSuccess" class="text-green-400 text-sm mb-4 text-center">
            ✓ تم حفظ السؤال بنجاح
          </p>

          <button
            :disabled="saving"
            @click="save"
            class="w-full font-bold py-4 rounded transition tracking-widest text-sm text-white"
            style="background: #305099"
            :style="{ opacity: saving ? '0.6' : '1' }"
          >
            {{ saving ? "جاري الحفظ..." : "حفظ سؤال اليوم" }}
          </button>
        </div>
      </div>

      <!-- ══ تبويب: النتائج ══ -->
      <div v-if="activeTab === 'results'">
        <!-- شريط التحكم -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div class="flex items-center gap-2">
            <label
              class="text-xs tracking-widest"
              style="color: rgba(255, 255, 255, 0.35)"
              >اليوم</label
            >
            <select
              v-model="selectedDate"
              @change="loadResults"
              class="rounded px-3 py-2 text-white text-sm focus:outline-none"
              style="
                background: #243058;
                border: 1px solid rgba(48, 80, 153, 0.35);
                min-width: 150px;
              "
            >
              <option v-for="d in availableDates" :key="d" :value="d">
                {{ d === today ? `${d} (اليوم)` : d }}
              </option>
              <option v-if="availableDates.length === 0" :value="today">
                {{ today }} (اليوم)
              </option>
            </select>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="loadResults"
              class="text-xs px-4 py-2 rounded transition tracking-widest"
              style="color: #5b7fcf; border: 1px solid rgba(48, 80, 153, 0.35)"
            >
              ↻ تحديث
            </button>
            <button
              v-if="results?.attempts?.length > 0"
              @click="confirmDelete"
              :disabled="deleting"
              class="text-xs px-4 py-2 rounded transition tracking-widest"
              style="color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3)"
              :style="{ opacity: deleting ? '0.5' : '1' }"
            >
              {{ deleting ? "جاري الحذف..." : "🗑 حذف نتائج هذا اليوم" }}
            </button>
          </div>
        </div>

        <!-- تأكيد الحذف -->
        <div
          v-if="showDeleteConfirm"
          class="rounded-lg p-5 mb-5 text-center"
          style="
            background: rgba(239, 68, 68, 0.08);
            border: 1px solid rgba(239, 68, 68, 0.3);
          "
        >
          <p class="text-white text-sm mb-4 leading-loose">
            هل أنت متأكد من حذف جميع نتائج يوم
            <span class="text-red-400 font-bold">{{ selectedDate }}</span
            >؟<br />
            <span class="text-xs" style="color: rgba(255, 255, 255, 0.4)"
              >لا يمكن التراجع عن هذا الإجراء</span
            >
          </p>
          <div class="flex justify-center gap-3">
            <button
              @click="executeDelete"
              class="px-6 py-2 rounded text-sm font-bold text-white"
              style="background: #dc2626"
            >
              نعم، احذف
            </button>
            <button
              @click="showDeleteConfirm = false"
              class="px-6 py-2 rounded text-sm"
              style="
                color: rgba(255, 255, 255, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
              "
            >
              إلغاء
            </button>
          </div>
        </div>

        <!-- تحميل -->
        <div
          v-if="!results"
          class="text-center py-16 text-sm"
          style="color: rgba(255, 255, 255, 0.25)"
        >
          جاري التحميل...
        </div>
        <div
          v-else-if="!results.question"
          class="text-center py-16 text-sm"
          style="color: rgba(255, 255, 255, 0.25)"
        >
          لا توجد نتائج لهذا اليوم
        </div>

        <div v-else>
          <!-- السؤال -->
          <div
            class="rounded-lg p-5 mb-4"
            style="
              background: #243058;
              border: 1px solid rgba(48, 80, 153, 0.3);
            "
          >
            <div class="flex justify-between items-start mb-2">
              <p
                class="text-xs tracking-widest"
                style="color: rgba(255, 255, 255, 0.35)"
              >
                سؤال اليوم
              </p>
              <span
                class="text-xs px-2 py-0.5 rounded"
                style="background: rgba(48, 80, 153, 0.2); color: #5b7fcf"
              >
                {{ selectedDate }}
              </span>
            </div>
            <p class="text-white text-base font-semibold mb-3">
              {{ results.question.text }}
            </p>
            <div class="flex items-center gap-2">
              <span class="text-xs" style="color: rgba(255, 255, 255, 0.25)"
                >الإجابة الصحيحة:</span
              >
              <span class="text-green-400 text-sm font-bold">{{
                results.question.correctOptionText
              }}</span>
            </div>
          </div>

          <!-- إحصائيات -->
          <div class="grid grid-cols-3 gap-3 mb-4">
            <div
              class="rounded-lg p-4 text-center"
              style="
                background: #243058;
                border: 1px solid rgba(48, 80, 153, 0.3);
              "
            >
              <p class="text-2xl font-bold text-white">
                {{ results.stats.total }}
              </p>
              <p class="text-xs mt-1" style="color: rgba(255, 255, 255, 0.3)">
                إجمالي المشاركين
              </p>
            </div>
            <div
              class="rounded-lg p-4 text-center"
              style="
                background: #243058;
                border: 1px solid rgba(34, 197, 94, 0.2);
              "
            >
              <p class="text-2xl font-bold text-green-400">
                {{ results.stats.correct }}
              </p>
              <p class="text-xs mt-1" style="color: rgba(255, 255, 255, 0.3)">
                إجابات صحيحة
              </p>
            </div>
            <div
              class="rounded-lg p-4 text-center"
              style="
                background: #243058;
                border: 1px solid rgba(239, 68, 68, 0.2);
              "
            >
              <p class="text-2xl font-bold text-red-400">
                {{ results.stats.wrong }}
              </p>
              <p class="text-xs mt-1" style="color: rgba(255, 255, 255, 0.3)">
                إجابات خاطئة
              </p>
            </div>
          </div>

          <!-- توزيع الإجابات -->
          <div
            class="rounded-lg p-5 mb-4"
            style="
              background: #243058;
              border: 1px solid rgba(48, 80, 153, 0.3);
            "
          >
            <p
              class="text-xs tracking-widest mb-4"
              style="color: rgba(255, 255, 255, 0.35)"
            >
              توزيع الإجابات
            </p>
            <div class="flex flex-col gap-3">
              <div v-for="opt in results.stats.optionStats" :key="opt.id">
                <div class="flex justify-between items-center mb-1">
                  <span
                    class="text-xs"
                    :class="opt.isCorrect ? 'text-green-400 font-bold' : ''"
                    :style="
                      !opt.isCorrect ? 'color: rgba(255,255,255,0.45)' : ''
                    "
                  >
                    {{ opt.isCorrect ? "✓ " : "" }}{{ opt.text }}
                  </span>
                  <span
                    class="text-xs"
                    style="color: rgba(255, 255, 255, 0.35)"
                  >
                    {{ opt.count }} ({{
                      results.stats.total
                        ? Math.round((opt.count / results.stats.total) * 100)
                        : 0
                    }}%)
                  </span>
                </div>
                <div
                  class="h-1.5 rounded overflow-hidden"
                  style="background: rgba(255, 255, 255, 0.05)"
                >
                  <div
                    class="h-full rounded transition-all duration-500"
                    :style="{
                      width: results.stats.total
                        ? `${(opt.count / results.stats.total) * 100}%`
                        : '0%',
                      background: opt.isCorrect
                        ? '#305099'
                        : 'rgba(255,255,255,0.15)',
                    }"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- جدول المشاركين -->
          <div
            class="rounded-lg overflow-hidden"
            style="
              background: #243058;
              border: 1px solid rgba(48, 80, 153, 0.3);
            "
          >
            <div
              class="px-5 py-3 flex justify-between items-center"
              style="border-bottom: 1px solid rgba(48, 80, 153, 0.2)"
            >
              <p
                class="text-xs tracking-widest"
                style="color: rgba(255, 255, 255, 0.35)"
              >
                قائمة المشاركين
              </p>
              <span class="text-xs" style="color: #5b7fcf"
                >{{ results.attempts.length }} مشارك</span
              >
            </div>

            <div
              class="grid grid-cols-12 px-5 py-2"
              style="
                border-bottom: 1px solid rgba(48, 80, 153, 0.15);
                background: rgba(255, 255, 255, 0.02);
              "
            >
              <span
                class="col-span-1 text-xs"
                style="color: rgba(255, 255, 255, 0.2)"
                >#</span
              >
              <span
                class="col-span-3 text-xs"
                style="color: rgba(255, 255, 255, 0.2)"
                >الاسم</span
              >
              <span
                class="col-span-4 text-xs text-right"
                style="color: rgba(255, 255, 255, 0.2)"
                >الإجابة</span
              >
              <span
                class="col-span-2 text-xs text-center"
                style="color: rgba(255, 255, 255, 0.2)"
                >النتيجة</span
              >
              <span
                class="col-span-2 text-xs text-left"
                style="color: rgba(255, 255, 255, 0.2)"
                >الوقت</span
              >
            </div>

            <div
              v-if="results.attempts.length === 0"
              class="text-center py-12 text-sm"
              style="color: rgba(255, 255, 255, 0.2)"
            >
              لا توجد مشاركات
            </div>

            <div
              v-else
              class="divide-y"
              style="border-color: rgba(48, 80, 153, 0.15)"
            >
              <div
                v-for="(a, i) in results.attempts"
                :key="i"
                class="grid grid-cols-12 items-center px-5 py-3.5"
                :style="
                  a.isCorrect
                    ? 'border-right: 2px solid rgba(48,80,153,0.7);'
                    : 'border-right: 2px solid rgba(239,68,68,0.3);'
                "
              >
                <span
                  class="col-span-1 text-xs"
                  style="color: rgba(255, 255, 255, 0.2)"
                  >{{ i + 1 }}</span
                >
                <span
                  class="col-span-3 text-white text-sm font-medium truncate"
                  >{{ a.name }}</span
                >
                <div class="col-span-4 text-right">
                  <span
                    class="text-xs"
                    style="color: rgba(255, 255, 255, 0.55)"
                    >{{ a.selectedOptionText }}</span
                  >
                </div>
                <div class="col-span-2 flex justify-center">
                  <span
                    class="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-semibold"
                    :class="
                      a.isCorrect
                        ? 'text-green-400 border border-green-500/25 bg-green-500/10'
                        : 'text-red-400 border border-red-500/25 bg-red-500/10'
                    "
                  >
                    {{ a.isCorrect ? "✓ صحيحة" : "✗ خاطئة" }}
                  </span>
                </div>
                <span
                  class="col-span-2 text-xs text-left"
                  style="color: rgba(255, 255, 255, 0.2)"
                >
                  {{ a.submittedAt }}
                </span>
              </div>
            </div>

            <div
              v-if="results.attempts.length > 0"
              class="px-5 py-3 flex justify-between items-center"
              style="
                border-top: 1px solid rgba(48, 80, 153, 0.2);
                background: rgba(255, 255, 255, 0.02);
              "
            >
              <span class="text-xs" style="color: rgba(255, 255, 255, 0.3)">
                الإجابة الصحيحة:
                <span class="text-green-400 font-semibold mr-1">{{
                  results.question.correctOptionText
                }}</span>
              </span>
              <span class="text-xs" style="color: rgba(255, 255, 255, 0.3)">
                نسبة النجاح:
                <span class="font-bold mr-1" style="color: #5b7fcf">
                  {{
                    results.stats.total
                      ? Math.round(
                          (results.stats.correct / results.stats.total) * 100,
                        )
                      : 0
                  }}%
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const today = new Date().toISOString().slice(0, 10);
const labels = ["أ", "ب", "ج", "د", "هـ"];

// ── حالة النموذج ──────────────────────────────────────────────────────────────
const saving = ref(false);
const saveError = ref("");
const saveSuccess = ref(false);
const activeTab = ref<"question" | "results">("question");
const results = ref<any>(null);
const selectedDate = ref(today);
const availableDates = ref<string[]>([]);
const deleting = ref(false);
const showDeleteConfirm = ref(false);

const tabs = [
  { id: "question", label: "إدارة السؤال" },
  { id: "results", label: "النتائج والمشاركون" },
];

const form = reactive({
  text: "",
  options: [
    { id: "a", text: "" },
    { id: "b", text: "" },
    { id: "c", text: "" },
    { id: "d", text: "" },
    { id: "e", text: "" },
  ],
  correctOptionId: "a",
  openAt: new Date().toISOString().slice(0, 16),
  closeAt: (() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + 30);
    return d.toISOString().slice(0, 16);
  })(),
  personalSeconds: 60, // ✅ جديد — افتراضي 60 ثانية
});

// ── جلب قائمة الأيام ──────────────────────────────────────────────────────────
async function loadDates() {
  try {
    const res = await $fetch<{ dates: string[] }>("/api/admin/dates");
    availableDates.value = res.dates;
    if (!availableDates.value.includes(today)) {
      availableDates.value.unshift(today);
    }
  } catch {}
}

// ── جلب النتائج ───────────────────────────────────────────────────────────────
async function loadResults() {
  results.value = null;
  try {
    results.value = await $fetch(
      `/api/admin/results?date=${selectedDate.value}`,
    );
  } catch {}
}

// ── حفظ السؤال ────────────────────────────────────────────────────────────────
async function save() {
  saveError.value = "";
  saveSuccess.value = false;
  if (!form.text.trim()) {
    saveError.value = "أدخل نص السؤال";
    return;
  }
  if (form.options.some((o) => !o.text.trim())) {
    saveError.value = "أدخل جميع الخيارات الخمسة";
    return;
  }
  saving.value = true;
  try {
    await $fetch("/api/admin/question", {
      method: "PUT",
      body: {
        ...form,
        openAt: new Date(form.openAt).toISOString(),
        closeAt: new Date(form.closeAt).toISOString(),
      },
    });
    saveSuccess.value = true;
  } catch (e: any) {
    saveError.value = e?.data?.message ?? "حدث خطأ";
  } finally {
    saving.value = false;
  }
}

// ── حذف النتائج ───────────────────────────────────────────────────────────────
function confirmDelete() {
  showDeleteConfirm.value = true;
}

async function executeDelete() {
  deleting.value = true;
  showDeleteConfirm.value = false;
  try {
    await $fetch(`/api/admin/results?date=${selectedDate.value}`, {
      method: "DELETE",
    });
    await loadResults();
    await loadDates();
  } catch {
  } finally {
    deleting.value = false;
  }
}




watch(activeTab, (tab) => {
  if (tab === "results") {
    loadDates();
    loadResults();
  }
});


// ── التهيئة ───────────────────────────────────────────────────────────────────
onMounted(async () => {
  try {
    const res = await $fetch<{ question: any }>("/api/admin/question");
    if (res.question) {
      form.text = res.question.text;
      form.options = res.question.options;
      form.correctOptionId = res.question.correctOptionId;
      form.openAt = res.question.openAt?.slice(0, 16);
      form.closeAt = res.question.closeAt?.slice(0, 16);
      form.personalSeconds = res.question.personalSeconds ?? 60; // ✅ جديد
    }
  } catch {}

  await loadDates();
  await loadResults();
});
</script>
