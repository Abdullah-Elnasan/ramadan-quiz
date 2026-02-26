// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],

  css: ['~/assets/css/main.css'],


  nitro: {
    preset: 'vercel',
  },

  runtimeConfig: {
    adminUser: process.env.ADMIN_USER || 'admin',
    adminPass: process.env.ADMIN_PASS || 'changeme',
    public: {}
  }

  // app: {
  //   head: {
  //     title: 'مسابقة رمضان اليومية - شركة الميثاق',
  //     htmlAttrs: { lang: 'ar', dir: 'rtl' },
  //     meta: [
  //       { charset: 'utf-8' },
  //       { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //       { property: 'og:title',        content: 'مسابقة رمضان اليومية - شركة الميثاق' },
  //       { property: 'og:description',  content: "مسابقة رمضان اليومية -  شركة الميثاق اليومية، المصممة لتعزيز ثقافتكم العامة واختبار معارفكم في بيئة مهنية محفّزة." },
  //       { property: 'og:image',        content: 'https://ramadan-quiz-lv9o.onrender.com/og-image-2.png' },
  //       { property: 'og:image:width',  content: '1200' },
  //       { property: 'og:image:height', content: '630' },
  //       { property: 'og:type',         content: 'website' },
  //       { property: 'og:url',          content: 'https://ramadan-quiz-lv9o.onrender.com' },
  //       { name: 'twitter:card',        content: 'summary_large_image' },
  //       { name: 'twitter:image',       content: 'https://ramadan-quiz-lv9o.onrender.com/og-image-2.png' },
  //     ]
  //   }
  // }
})

