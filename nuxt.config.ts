export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'node-server',   // ✅ بدلاً من cloudflare-pages
    storage: {
      kv: {
        driver: 'redis',
        url: process.env.REDIS_URL   // ✅ من متغيرات البيئة
      }
    }
  },

  runtimeConfig: {
    adminUser: process.env.ADMIN_USER || 'admin',
    adminPass: process.env.ADMIN_PASS || 'changeme',
    public: {}
  },

  fonts: {
    providers: { fontshare: false }
  },

  routeRules: {
    '/': { prerender: true }
  },

  app: {
    head: {
      title: 'مسابقة الجوهرة سمارت اليومية',
      htmlAttrs: { lang: 'ar', dir: 'rtl' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title',        content: 'مسابقة الجوهرة سمارت اليومية' },
        { property: 'og:description',  content: 'شارك في مسابقة الجوهرة سمارت اليومية واختبر معلوماتك' },
        { property: 'og:image',        content: 'https://your-app.onrender.com/og-image.png' },
        { property: 'og:image:width',  content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:type',         content: 'website' },
        { property: 'og:url',          content: 'https://your-app.onrender.com' },
        { name: 'twitter:card',        content: 'summary_large_image' },
        { name: 'twitter:image',       content: 'https://your-app.onrender.com/og-image.png' },
      ]
    }
  }
})
