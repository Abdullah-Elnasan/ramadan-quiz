// Admin auth يتم عبر Basic Auth في المتصفح تلقائياً
// لا نحتاج middleware client-side لأن السيرفر يحمي المسار
export default defineNuxtRouteMiddleware(() => {})
