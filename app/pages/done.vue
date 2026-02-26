<template>
  <div
    class="min-h-screen flex items-center justify-center p-6"
    style="background: #F5F0E8;"
  >
    <div class="w-full max-w-md">
      <div
        class="rounded-xl overflow-hidden"
        style="
          background: #FFFFFF;
          border: 1px solid rgba(220,206,0,0.5);
          box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(220,206,0,0.15);
        "
      >
        <!-- شريط علوي ذهبي -->
        <div class="h-1" style="background: rgb(220,206,0);" />

        <div class="p-10 text-center">

          <!-- أيقونة النجاح -->
          <div
            class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style="
              border: 2px solid rgba(220,206,0,0.6);
              background: rgba(220,206,0,0.08);
            "
          >
            <span class="text-4xl" style="color: #7a7200;">✓</span>
          </div>

          <h1 class="text-2xl font-bold tracking-wide mb-2" style="color: #1a1a1a;">
            تم استلام إجابتك
          </h1>

          <p class="text-sm mb-8 leading-loose" style="color: #5a5a5a;">
            شكراً
            <span class="font-semibold" style="color: #7a7200;">{{ name }}</span>،<br />
            تمت المشاركة في سؤال اليوم بنجاح.<br />
            ستُعلَن النتائج في نهاية اليوم.
          </p>

          <!-- فاصل ذهبي -->
          <div class="flex items-center gap-3 mb-8">
            <div class="flex-1 h-px" style="background: rgba(220,206,0,0.4);" />
            <span style="color: rgba(180,168,0,0.6);">◆</span>
            <div class="flex-1 h-px" style="background: rgba(220,206,0,0.4);" />
          </div>

          <!-- تنبيه -->
          <div
            class="rounded-lg px-5 py-4 text-right mb-8"
            style="
              background: #F9F6EE;
              border: 1px solid rgba(220,206,0,0.3);
              border-right: 3px solid rgb(220,206,0);
            "
          >
            <p class="text-xs leading-loose" style="color: #6b6b6b;">
              لا يمكن تعديل الإجابة أو المشاركة مجدداً في نفس اليوم.
            </p>
          </div>

          <!-- الفوتر -->
          <div class="flex items-center justify-center gap-2">
            <span style="color: rgba(180,168,0,0.5); font-size: 10px;">◆</span>
            <span class="text-xs tracking-widest" style="color: #9a9a9a;">شركة الميثاق</span>
            <span style="color: rgba(180,168,0,0.5); font-size: 10px;">◆</span>
          </div>
        </div>

        <!-- شريط سفلي ذهبي -->
        <div class="h-1" style="background: rgb(220,206,0);" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const name = computed(() => (route.query.name as string) || 'المشارك')
onMounted(() => { history.replaceState(null, '', '/done') })
</script>
