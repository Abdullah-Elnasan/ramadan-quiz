<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'مسابقة الجوهرة سمارت اليومية',
  meta: [
    { property: 'og:title',        content: 'مسابقة الجوهرة سمارت اليومية' },
    { property: 'og:description',  content: 'شارك في مسابقة رمضان اليومية واختبر معلوماتك' },
    { property: 'og:image',        content: 'https://ramadan-quiz-cs0.pages.dev/og-image.png' },
    { property: 'og:image:width',  content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:type',   content: 'image/png' },
    { property: 'og:type',         content: 'website' },
    { property: 'og:url',          content: 'https://ramadan-quiz-cs0.pages.dev' },
    { name: 'twitter:card',        content: 'summary_large_image' },
    { name: 'twitter:image',       content: 'https://ramadan-quiz-cs0.pages.dev/og-image.png' },
  ]
})
</script>
