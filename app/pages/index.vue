<template>
  <div
    class="min-h-screen flex items-center justify-center p-4"
    style="background: #F5F0E8;"
  >
    <div class="relative z-10 w-full max-w-lg">

      <!-- الرأس -->
      <div class="text-center mb-6">
        <div class="flex justify-center mb-4">
          <img
            src="/logo-me2.png"
            alt="شعار شركة الميثاق"
            class="w-40 h-40 object-contain"
            loading="eager"
            fetchpriority="high"
          />
        </div>

        <!-- فاصل ذهبي -->
        <div class="flex items-center gap-3 mb-5">
          <div class="flex-1 h-px" style="background: rgba(220,206,0,0.5);" />
          <span style="color: rgb(180,168,0);">◆</span>
          <div class="flex-1 h-px" style="background: rgba(220,206,0,0.5);" />
        </div>

        <h1 class="text-3xl font-bold tracking-wide mb-2" style="color: #1a1a1a;">
          مسابقة رمضان اليومية
        </h1>
        <p class="text-sm tracking-widest" style="color: #6b6b6b;">
          {{ todayFormatted }}
        </p>
      </div>

      <!-- البطاقة -->
      <div
        class="rounded-xl p-8"
        style="
          background: #FFFFFF;
          border: 1px solid rgba(220,206,0,0.5);
          box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(220,206,0,0.15);
        "
      >
        <!-- شريط تنبيه -->
        <div
          class="flex items-center gap-2 rounded-md px-4 py-2 mb-6"
          style="background: rgba(220,206,0,0.1); border-right: 3px solid rgb(220,206,0);"
        >
          <span class="text-sm font-bold" style="color: #7a7200;">تنبيه</span>
        </div>

        <p class="text-base leading-loose text-center mb-2" style="color: #2d2d2d;">
          يُتاح سؤال واحد يومياً عند الساعة الخامسة مساء .<br />
          مدة الإجابة
          <span class="font-bold" style="color: #7a7200;">أقل من 60 ثانية</span>
          تبدأ فور دخولك.
        </p>
        <p class="text-base leading-loose text-center mb-6" style="color: #2d2d2d;">
          عند
          <span class="font-bold" style="color: #7a7200;">مغادرة</span>
          صفحة السؤال لن تستطيع الإجابة بعدها.
        </p>

        <!-- فاصل -->
        <div class="h-px mb-6" style="background: rgba(220,206,0,0.3);" />

        <!-- زر الدخول -->
        <button
          class="w-full font-bold text-base py-4 rounded-lg transition-all duration-200 tracking-widest"
          style="background: #1a1a1a; color: #F5F0E8;"
          @mouseenter="(e: MouseEvent) => {
            const el = e.target as HTMLElement
            el.style.background = 'rgb(220,206,0)'
            el.style.color = '#1a1a1a'
          }"
          @mouseleave="(e: MouseEvent) => {
            const el = e.target as HTMLElement
            el.style.background = '#1a1a1a'
            el.style.color = '#F5F0E8'
          }"
          @click="navigateTo('/join')"
        >
          دخول للإجابة عن سؤال اليوم
        </button>
      </div>

      <!-- الفوتر -->
      <p class="text-center text-xs mt-6 tracking-wider" style="color: #9a9a9a;">
        © {{ year }} شركة الميثاق — جميع الحقوق محفوظة
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
const todayFormatted = computed(() =>
  new Date().toLocaleDateString('ar-SA', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
)
</script>
