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
    "@nuxtjs/leaflet",
    "nuxt-maplibre",
    "nuxt-mapbox",
  ],
  mapbox: {
    accessToken:
      "pk.eyJ1IjoiYW1lci13aWxkMTEiLCJhIjoiY20ydW94M2F0MDM1ajJrcXFwbWU4cDA5byJ9.30Z2vT9TyfwDKSzTcv2AmA",
  },
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
  shadcn: {
    componentDir: "./components/ui",
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
