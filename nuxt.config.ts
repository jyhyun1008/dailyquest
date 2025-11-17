// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    baseURL: '/' 
  },
  content: {
    // 이 옵션이 동적 경로를 .html 파일로 생성하게 만듭니다.
    // 예: /blog/first-post -> /blog/first-post.html
    documentDriven: {
      trailingSlash: false
    }
  },
  router: {
    options: {
      strict: false
    }
  },
})
