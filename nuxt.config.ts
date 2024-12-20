// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  app: {
    head: {
      title: "Alhadaf Real Estate | شركة الهدف للتطوير والاستثمار والتسويق العقاري",
      meta: [
        {
          name: "description",
          content:
            "شركة الهدف للتطوير والاستثمار والتسويق العقاري هي إحدى الشركات الرائدة في العراق المتخصصة في تقديم خدمات شاملة ومتكاملة في مجال العقارات. تشمل خدماتنا التطوير العقاري للمشاريع السكنية والتجارية الحديثة، الاستثمار العقاري في أفضل الفرص المتاحة، والتسويق العقاري الذي يضمن وصول العقارات إلى العملاء المناسبين بأعلى كفاءة. نحن نوفر عقارات مميزة تلبي احتياجات الأفراد والمستثمرين في بيئات متكاملة تجمع بين الراحة والفخامة.",
        },
        {
          name: "keywords",
          content:
            "شركة الهدف للتطوير العقاري، شركة تطوير العقارات في العراق، الهدف، تطوير عقاري في العراق، استثمار عقاري، تسويق عقاري في العراق، عقارات سكنية، عقارات تجارية، مشاريع عقارية، فرص استثمار عقاري في العراق، تسويق عقاري احترافي، بغداد، العراق",
        },
        {
          name: "author",
          content: "شركة ملامح الإبداعية ذ.م.م",
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
            name: "شركة الهدف للتطوير والاستثمار والتسويق العقاري",
            description:
              "شركة متخصصة في التطوير العقاري، الاستثمار العقاري، والتسويق العقاري الاحترافي للمشاريع السكنية والتجارية في العراق",
            address: {
              "@type": "PostalAddress",
              addressLocality: "بغداد",
              addressCountry: "العراق",
            },
            areaServed: "العراق",
            serviceType: [
              "التطوير العقاري",
              "الاستثمار العقاري",
              "التسويق العقاري",
            ],
            additionalType: "https://schema.org/RealEstateDeveloper",
            offers: {
              "@type": "Offer",
              name: "خدمات التطوير العقاري",
              description:
                "نقوم بتطوير مشاريع عقارية متكاملة تلبي احتياجات السوق العراقي الحديث",
            },
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
