<template>
  <label
    class="flex items-center gap-4 p-4 rounded cursor-pointer transition-all duration-200 select-none"
    :style="selected
      ? 'border: 1px solid rgba(91,127,207,0.7); background: rgba(48,80,153,0.2); color: white;'
      : 'border: 1px solid rgba(48,80,153,0.2); background: rgba(255,255,255,0.02); color: rgba(255,255,255,0.65);'"
  >
    <input type="radio" :name="name" :value="option.id" :checked="selected"
      class="hidden" @change="$emit('select', option.id)" />

    <span class="w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all"
      :style="selected ? 'border-color: #5b7fcf;' : 'border-color: rgba(255,255,255,0.2);'">
      <span v-if="selected" class="w-2 h-2 rounded-full" style="background: #5b7fcf;" />
    </span>

    <span class="w-6 text-center text-xs font-bold shrink-0"
      :style="selected ? 'color: #5b7fcf;' : 'color: rgba(255,255,255,0.25);'">
      {{ label }}
    </span>

    <span class="text-right flex-1 text-sm leading-relaxed">{{ option.text }}</span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  option: { id: string; text: string }
  selected: boolean
  name: string
  index: number
}>()
defineEmits<{ select: [id: string] }>()
const labels = ['أ', 'ب', 'ج', 'د', 'هـ']
const label = computed(() => labels[props.index] ?? props.index + 1)
</script>
