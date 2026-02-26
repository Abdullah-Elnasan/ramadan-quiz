<template>
  <div class="min-h-screen flex items-center justify-center p-2"
    style="background: linear-gradient(135deg, #1a2540 0%, #243058 50%, #1a2540 100%);">

    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <div class="absolute top-0 left-0 w-full h-1"
        style="background: linear-gradient(to right, transparent, #5b7fcf, transparent)" />
      <div class="absolute bottom-0 left-0 w-full h-1"
        style="background: linear-gradient(to right, transparent, #5b7fcf, transparent)" />
    </div>

    <div class="relative z-10 w-full max-w-lg">
      <div class="text-center mb-5">
        <div class="flex justify-center">
          <div class="flex flex-col items-center">
            <img
              src="/logo-me.png"
              alt="شعار الجوهرة سمارت"
              class="w-55 h-55 mb-2"
              loading="eager"
              fetchpriority="high"
            />
            <div class="text-center">
              <p class="text-sm font-semibold tracking-widest uppercase" style="color: #5b7fcf;">
                Aljawhra Smart
              </p>
              <p class="text-xs tracking-wider" style="color: rgba(255,255,255,0.5);">
                الجوهرة سمارت
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 mb-5">
          <div class="flex-1 h-px" style="background: rgba(48,80,153,0.4);" />
          <span class="text-xs" style="color: rgba(91,127,207,0.6);">◆</span>
          <div class="flex-1 h-px" style="background: rgba(48,80,153,0.4);" />
        </div>

        <h1 class="text-3xl font-bold text-white tracking-wide mb-2">
          مسابقة رمضان اليومية
        </h1>
        <p class="text-sm tracking-widest" style="color: rgba(255,255,255,0.4);">
          {{ todayFormatted }}
        </p>
      </div>

      <div class="rounded-lg p-8 shadow-2xl"
        style="background: #243058; border: 1px solid rgba(48,80,153,0.4);">
        <div class="text-center mb-4">
          <div class="inline-flex items-center gap-2 rounded px-4 py-2 mb-5"
            style="background: rgba(48,80,153,0.15); border: 1px solid rgba(48,80,153,0.4);">
            <span class="text-xs tracking-widest font-semibold" style="color: #5b7fcf;">تنبيه</span>
          </div>
          <p class="text-base leading-loose" style="color: rgba(255,255,255,0.75);">
            يُتاح سؤال واحد يومياً خلال نافذة زمنية محددة.<br>
            مدة الإجابة
            <span class="font-bold" style="color: #5b7fcf;">أقل من 60 ثانية</span>
            تبدأ فور دخولك.
          </p>
          <p class="text-base leading-loose" style="color: rgba(255,255,255,0.75);">
            عند <span class="font-bold" style="color: #5b7fcf;">مغادرة</span> صفحة السؤال لن تستطيع الإجابة بعدها.
          </p>
        </div>

        <button
          class="w-full font-bold text-base py-4 rounded transition-all duration-200 tracking-widest text-white"
          style="background: #305099;"
          @mouseenter="(e: MouseEvent) => ((e.target as HTMLElement).style.background = '#3d63bf')"
          @mouseleave="(e: MouseEvent) => ((e.target as HTMLElement).style.background = '#305099')"
          @click="navigateTo('/join')"
        >
          دخول للإجابة عن سؤال اليوم
        </button>
      </div>

      <p class="text-center text-xs mt-6 tracking-wider" style="color: white;">
        © {{ year }} الجوهرة سمارت — جميع الحقوق محفوظة
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">


// // ── preload الصورة الرئيسية لتحسين LCP ────────────────────────────────────
// useHead({
//   link: [
//     { rel: 'preload', as: 'image', href: '/dev-2.png' },
//     { rel: 'preconnect', href: 'https://ramadan-quiz-cs0.pages.dev' }
//   ]
// })

const year = new Date().getFullYear()
const todayFormatted = computed(() =>
  new Date().toLocaleDateString('ar-SA', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
)
</script>
