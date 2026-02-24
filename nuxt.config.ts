export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'cloudflare-pages',
    storage: {
      kv: { driver: 'memory' }
    }
  },

  runtimeConfig: {
    adminUser: process.env.ADMIN_USER || 'admin',
    adminPass: process.env.ADMIN_PASS || 'changeme',
    public: {}
  },

  fonts: {
    providers: {
      fontshare: false
    }
  },

  app: {
    head: {
      title: 'مسابقة الجوهرة سمارت اليومية',
      htmlAttrs: { lang: 'ar', dir: 'rtl' },
     meta: [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },

  // مهم جداً
  { name: 'description', content: 'شارك في مسابقة الجوهرة سمارت اليومية واختبر معلوماتك واربح جوائز مميزة' },

  { property: 'og:title', content: 'مسابقة الجوهرة سمارت اليومية' },
  { property: 'og:description', content: 'شارك الآن في المسابقة اليومية واختبر معلوماتك' },
  { property: 'og:image', content: 'https://ramadan-quiz-cs0.pages.dev/og-image.png' },
  { property: 'og:image:secure_url', content: 'https://ramadan-quiz-cs0.pages.dev/og-image.png' },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: 'https://ramadan-quiz-cs0.pages.dev/' },
  { property: 'og:site_name', content: 'الجوهرة سمارت' },

  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'مسابقة الجوهرة سمارت اليومية' },
  { name: 'twitter:description', content: 'شارك الآن في المسابقة اليومية واختبر معلوماتك' },
  { name: 'twitter:image', content: 'https://ramadan-quiz-cs0.pages.dev/og-image.png' },
]
    }
  }
})
