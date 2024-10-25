// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  app: {
    head: {
      title: "Alhadaf",
    },
  },
  devtools: { enabled: false },

  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/icon",
    "@hypernym/nuxt-gsap",
    "nuxt-locomotive-scroll",
    "nuxt-swiper",
    "nuxt-masonry",
    "@pinia/nuxt",
    "vue-masonry-css",
  ],
  css: ["~/assets/scss/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
           @use "~/assets/scss/vars/_colors.scss" as *;
           @use "~/assets/scss/vars/_sizes.scss" as *;
           `,
        },
      },
    },
  },
  gsap: {
    autoImport: true,
    composables: true,
    extraPlugins: {
      scrollTrigger: true,
      scrollTo: true,
    },
  },
  swiper: {
    prefix: "Swiper",
    styleLang: "css",
    modules: ["navigation", "pagination", "autoplay"],
  },
});
