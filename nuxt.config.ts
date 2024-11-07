// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  app: {
    head: {
      title:
        "Al Hadaf for Real Estate Development, Investment & Marketing – Official Website",
      meta: [
        {
          name: "description",
          content:
            "Al Hadaf specializes in offering comprehensive real estate solutions, from developing modern real estate projects and investing in residential and commercial properties to providing integrated real estate marketing services. Al Hadaf offers a range of high-specification properties, including diverse spaces that meet the needs of individuals and investors in fully integrated residential and commercial environments.",
        },
        {
          name: "keywords",
          content:
            "Al Hadaf Real Estate Development, Al Hadaf, real estate development, real estate investment, real estate marketing, residential properties, commercial properties, Iraq, Baghdad, real estate projects, real estate investment in Iraq, real estate marketing",
        },
        {
          name: "author",
          content: "Malamih Creative L.L.C",
        },
        {
          name: "robots",
          content: "index, follow",
        },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://alhadaf.com.iq",
        },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "Al Hadaf Real Estate Development, Investment & Marketing",
            description:
              "Specialized in real estate project development, investment, and marketing of residential and commercial properties",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Baghdad",
              addressCountry: "Iraq",
            },
            areaServed: "Iraq",
            serviceType: [
              "Real Estate Development",
              "Real Estate Investment",
              "Real Estate Marketing",
            ],
          }),
          "data-hid": "ld-json",
        },
      ],
    },
  },
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/icon",
    "@hypernym/nuxt-gsap",
    "nuxt-swiper",
    "nuxt-masonry",
    "@pinia/nuxt",
    "vue-masonry-css",
    "nuxt-maplibre",
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
