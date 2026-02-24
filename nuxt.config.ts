export default defineNuxtConfig({
  ssr: true,

  devtools: { enabled: false },

  modules: ['@nuxt/ui'],

  css: ['~/assets/css/main.css'],

  // nitro: {
  //   preset: 'cloudflare-pages',
  //   storage: {
  //     kv: { driver: 'memory' }
  //   }
  // },

  nitro: {
    storage: {
      kv: {
        driver: 'redis',
        url: process.env.REDIS_URL
      }
    }
  },

  runtimeConfig: {
    adminUser: process.env.ADMIN_USER || 'admin',
    adminPass: process.env.ADMIN_PASS || 'changeme',
    public: {}
  },

  app: {
    head: {
      title: 'مسابقة الجوهرة سمارت اليومية',
      htmlAttrs: { lang: 'ar', dir: 'rtl' },

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // مهم جداً لواتساب
        { name: 'description', content: 'شارك في مسابقة الجوهرة سمارت اليومية واختبر معلوماتك واربح جوائز مميزة كل يوم' },

        // Open Graph
        { property: 'og:title', content: 'مسابقة الجوهرة سمارت اليومية' },
        { property: 'og:description', content: 'اختبر معلوماتك يومياً في مسابقة الجوهرة سمارت واربح جوائز مميزة' },
        { property: 'og:image', content: 'https://ramadan-quiz-cs0.pages.dev/og-image-2.png' },
        { property: 'og:image:secure_url', content: 'https://ramadan-quiz-cs0.pages.dev/og-image-2.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://ramadan-quiz-cs0.pages.dev/' },
        { property: 'og:site_name', content: 'الجوهرة سمارت' },
        { property: 'og:locale', content: 'ar_SA' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'مسابقة الجوهرة سمارت اليومية' },
        { name: 'twitter:description', content: 'اختبر معلوماتك يومياً وشارك في المسابقة' },
        { name: 'twitter:image', content: 'https://ramadan-quiz-cs0.pages.dev/og-image-2.png' },
      ],

      link: [
        { rel: 'canonical', href: 'https://ramadan-quiz-cs0.pages.dev/' }
      ]
    }
  }
})
