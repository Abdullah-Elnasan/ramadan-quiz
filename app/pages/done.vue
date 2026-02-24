<template>
  <div class="min-h-screen flex items-center justify-center p-6"
    style="background: linear-gradient(135deg, #1a2540 0%, #243058 50%, #1a2540 100%);">
    <div class="w-full max-w-md">
      <div class="rounded-lg overflow-hidden shadow-2xl"
        style="background: #243058; border: 1px solid rgba(48,80,153,0.4);">

        <div class="h-1" style="background: linear-gradient(to right, transparent, #305099, transparent);" />

        <div class="p-10 text-center">
          <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style="border: 2px solid rgba(91,127,207,0.4); background: rgba(48,80,153,0.15);">
            <span class="text-4xl" style="color: #5b7fcf;">✓</span>
          </div>

          <h1 class="text-white text-2xl font-bold tracking-wide mb-2">تم استلام إجابتك</h1>
          <p class="text-sm mb-8 leading-loose" style="color: rgba(255,255,255,0.45);">
            شكراً <span class="font-semibold" style="color: #5b7fcf;">{{ name }}</span>،<br>
            تمت المشاركة في سؤال اليوم بنجاح.<br>
            ستُعلَن النتائج في نهاية اليوم.
          </p>

          <div class="flex items-center gap-3 mb-8">
            <div class="flex-1 h-px" style="background: rgba(48,80,153,0.3);" />
            <span class="text-xs" style="color: rgba(91,127,207,0.4);">◆</span>
            <div class="flex-1 h-px" style="background: rgba(48,80,153,0.3);" />
          </div>

          <div class="rounded px-5 py-4 text-right mb-8"
            style="background: #1a2540; border: 1px solid rgba(48,80,153,0.2);">
            <p class="text-xs leading-loose" style="color: rgba(255,255,255,0.25);">
              لا يمكن تعديل الإجابة أو المشاركة مجدداً في نفس اليوم.
            </p>
          </div>

          <div class="flex items-center justify-center gap-2">
            <span class="text-xs" style="color: rgba(48,80,153,0.6);">◆</span>
            <span class="text-xs tracking-widest" style="color: rgba(255,255,255,0.15);">الجوهرة سمارت</span>
            <span class="text-xs" style="color: rgba(48,80,153,0.6);">◆</span>
          </div>
        </div>

        <div class="h-1" style="background: linear-gradient(to right, transparent, #305099, transparent);" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const name = computed(() => (route.query.name as string) || 'المشارك')
onMounted(() => { history.replaceState(null, '', '/done') })
</script>
