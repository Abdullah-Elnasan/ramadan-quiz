<template>
  <div class="flex items-center justify-between rounded px-5 py-3"
    style="background: #1a2540; border: 1px solid rgba(48,80,153,0.25);">
    <span class="text-xs tracking-widest" style="color: rgba(255,255,255,0.35);">الوقت المتبقي</span>
    <div class="font-mono text-xl font-bold tracking-widest transition-colors duration-500"
      :style="{ color: remaining > 30 ? 'white' : remaining > 10 ? '#f59e0b' : '#f87171' }">
      {{ display }}
    </div>
    <div class="w-24 h-1 rounded overflow-hidden" style="background: rgba(255,255,255,0.05);">
      <div class="h-full rounded transition-all duration-1000"
        :style="{
          width: `${Math.max(0, (remaining / total) * 100)}%`,
          background: remaining > 30 ? '#305099' : remaining > 10 ? '#f59e0b' : '#f87171'
        }" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ initialSeconds: number }>()
const emit = defineEmits<{ expired: [] }>()
const remaining = ref(props.initialSeconds)
const total = props.initialSeconds
let interval: ReturnType<typeof setInterval> | null = null
const display = computed(() => {
  const m = Math.floor(remaining.value / 60).toString().padStart(2, '0')
  const s = (remaining.value % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})
onMounted(() => {
  if (remaining.value <= 0) { emit('expired'); return }
  interval = setInterval(() => {
    remaining.value--
    if (remaining.value <= 0) { clearInterval(interval!); emit('expired') }
  }, 1000)
})
onUnmounted(() => { if (interval) clearInterval(interval) })
</script>
