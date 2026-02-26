<template>
  <label
    class="flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 select-none"
    :style="selected
      ? 'border: 2px solid #7a7200; background:white; color: #1a1a1a; box-shadow: 0 2px 12px rgba(220,206,0,0.3);'
      : 'border: 2px solid rgba(220,206,0,0.25); background: #F9F6EE; color: #2d2d2d;'"
  >
    <input
      type="radio"
      :name="name"
      :value="option.id"
      :checked="selected"
      class="hidden"
      @change="$emit('select', option.id)"
    />

    <!-- دائرة الاختيار -->
    <span
      class="w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all"
      :style="selected
        ? 'border-color: #1a1a1a; background: white;'
        : 'border-color: rgba(220,206,0,0.4); background: transparent;'"
    >
      <span
        v-if="selected"
        class="w-2 h-2 rounded-full"
        style="background: #1a1a1a;"
      />
    </span>

    <!-- حرف الخيار -->
    <span
      class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
      :style="selected
        ? 'background: #1a1a1a; color:white;'
        : 'background: rgba(220,206,0,0.12); color: #7a7200;'"
    >
      {{ label }}
    </span>

    <!-- نص الخيار -->
    <span
      class="text-right flex-1 text-sm leading-relaxed font-bold"
      :style="selected ? 'color: #1a1a1a;' : 'color: #2d2d2d; font-weight: 500;'"
    >
      {{ option.text }}
    </span>

    <!-- علامة ✓ عند التحديد -->
    <span v-if="selected" class="text-base font-black shrink-0" style="color: #1a1a1a;">
      ✓
    </span>
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
