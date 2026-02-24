export default defineNuxtRouteMiddleware(async () => {
  const { data } = await useFetch('/api/question/today')
  if ((data.value as any)?.needJoin) {
    return navigateTo('/join')
  }
})
