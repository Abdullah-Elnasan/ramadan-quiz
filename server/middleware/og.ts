export default defineEventHandler((event: any) => {
  const path = event.path ?? ''

  // فقط للصفحة الرئيسية
  if (path === '/' || path === '') {
    const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta property="og:title" content="مسابقة الجوهرة سمارت اليومية">
  <meta property="og:description" content="شارك في مسابقة الجوهرة سمارت اليومية واختبر معلوماتك">
  <meta property="og:image" content="https://ramadan-quiz-cs0.pages.dev/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://ramadan-quiz-cs0.pages.dev">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="https://ramadan-quiz-cs0.pages.dev/og-image.png">
  <meta http-equiv="refresh" content="0;url=/">
</head>
<body></body>
</html>`

    // فقط لبوتات المشاركة
    const ua = getRequestHeader(event, 'user-agent') ?? ''
    const isCrawler = /whatsapp|facebookexternalhit|twitterbot|linkedinbot|telegrambot/i.test(ua)

    if (isCrawler) {
      setResponseHeader(event, 'content-type', 'text/html; charset=utf-8')
      return html
    }
  }
})
