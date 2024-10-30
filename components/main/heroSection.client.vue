<template>
  <div class="hero" id="heroSection">
    <div class="sides">
      <div class="hero-text">
        <div class="background">
          <img src="/main/hero-image.png" alt="" />
        </div>
        <div class="header container">
          <div class="logo" ref="logo">
            <NuxtLink to="/">
              <img src="/logo.png" alt="" />
            </NuxtLink>
          </div>
          <div class="tools">
            <div
              class="translate tool"
              ref="translator"
              :class="[globalStore.translate ? 'ar' : '']"
            >
              <ul class="selector">
                <li class="selected" @click="showSelector">
                  <div class="icon">
                    <Icon :name="selectedLanguage.icon" />
                  </div>
                  <div class="langName">
                    <span v-if="!globalStore.translate">{{
                      selectedLanguage.name
                    }}</span>
                    <span v-else>{{ selectedLanguage.translatedName }}</span>
                  </div>
                </li>
                <ul
                  :class="['languages', globalStore.translate ? 'ar' : '']"
                  v-if="globalStore.languages"
                >
                  <li
                    v-for="(language, i) in languages"
                    :key="i"
                    @click="selectLang(language)"
                  >
                    <div class="icon">
                      <Icon :name="language.icon" />
                    </div>
                    <div class="name">
                      <span v-if="!globalStore.translate">{{
                        language.name
                      }}</span>
                      <span v-else="!globalStore.translate">{{
                        language.translatedName
                      }}</span>
                    </div>
                  </li>
                </ul>
              </ul>
            </div>
            <div class="map contactMenuButton tool" @click="openContactMenu">
              <img src="/main/icons/map.png" alt="" />
            </div>
            <div class="tool dropdown-menu" @click="openDropdown">
              <img src="/main/icons/menu.png" alt="" />
            </div>
          </div>
        </div>
        <div class="text hero-container">
          <p ref="heroTitle" class="en-text" v-if="!globalStore.translate">
            Turning Visions into Reality
          </p>
          <p ref="heroTitle" class="ar-text" v-if="globalStore.translate">
            تحويل الرؤى إلى واقع
          </p>
          <h1
            ref="heroSubTitle"
            class="en-text"
            v-if="!globalStore.translate"
            id="heroSubTitle"
          >
            <p>Expert Marketing</p>
            <p>for Iraq Premier</p>
            <p>Real Estate Market</p>
          </h1>
          <h1
            ref="heroSubTitle"
            class="ar-text"
            v-if="globalStore.translate"
            id="heroSubTitle"
          >
            <p>خبراء التسويق</p>
            <p>لسوق العقارات العراقي</p>
            <p>الرائد</p>
          </h1>
        </div>
        <div class="footer hero-container">
          <div class="contact" ref="contactButton" @click="openContactMenu">
            <div class="icon flex items-center justify-center">
              <Icon name="material-symbols:phone-in-talk-sharp" />
            </div>
            <div class="text" ref="contactButtonText">
              <span class="en-text" v-if="!globalStore.translate"
                >Contact Us Now</span
              >
              <span class="ar-text" v-if="globalStore.translate"
                >تواصل معنا الأن</span
              >
            </div>
          </div>
          <div class="projects-explorer" @click="scroll('projectsSection')">
            <div class="text en-text" v-if="!globalStore.translate">
              <p>Explore all</p>
              <p>Our Projects</p>
            </div>
            <div class="text ar-text" v-else>
              <p>تصفح كل</p>
              <p>مشاريعنا</p>
            </div>
            <div class="img" ref="explorerImage">
              <div class="icon flex items-center justify-center">
                <Icon name="material-symbols:arrow-right-alt" />
              </div>
              <img src="/main/projects-explorer.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="hero-image">
        <div class="background">
          <div class="white-bg"></div>
          <img src="/main/hero-image.png" alt="" ref="rightImage" />
        </div>
        <div class="content">
          <div class="header">
            <div class="left-text en-text" v-if="!globalStore.translate">
              <p>Serving our clients</p>
              <p>aspirations since 2017</p>
            </div>
            <div class="left-text ar-text" v-else>
              <p>خدمة تطلعات عملائنا</p>
              <p>منذ عام 2017</p>
            </div>
            <div class="right-text en-text" v-if="!globalStore.translate">
              <p>Delivering the highest</p>
              <p>quality, always</p>
            </div>
            <div class="right-text ar-text" v-else>
              <p>تقديم أعلى</p>
              <p>جودة ,دائمًا</p>
            </div>
          </div>
          <div class="footer">
            <div class="catalog-downloader" ref="catalogDownloader">
              <p class="en-text" v-if="!globalStore.translate">
                catalog download
              </p>
              <p class="ar-text" v-else>تحميل الكاتالوج</p>
              <div class="icon">
                <img src="/main/icons/download.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const rightImage = ref("");
const catalogDownloader = ref("");
const heroTitle = ref("");
const heroSubTitle = ref("");
const logo = ref("");
const explorerImage = ref("");
const contactButton = ref("");
const contactButtonText = ref("");
const globalStore = useMyGlobalStore();

const languages = [
  {
    icon: "flag:sa-4x3",
    name: "Arabic",
    translatedName: "العربية",
    selected: false,
    language: "ar",
    id: 1,
  },
  {
    icon: "flag:us-4x3",
    name: "English",
    selected: true,
    language: "en",
    translatedName: "الأنجليزية",
    id: 2,
  },
];

const selectedLanguage = ref(null);
selectedLanguage.value = languages.find((lang) => lang.selected);

const showSelector = () => {
  globalStore.languages = !globalStore.languages;
};

const selectLang = (lang) => {
  languages.forEach((lng) => {
    lng.selected = false;
  });
  selectedLanguage.value = languages.find((lng) => lng.id == lang.id);
  globalStore.languages = false;
  if (lang.language == "en") {
    globalStore.translate = false;
  } else if (lang.language == "ar") {
    globalStore.translate = true;
  }
};

const openDropdown = () => {
  globalStore.dropdown = !globalStore.dropdown;
};

const openContactMenu = () => {
  globalStore.contactMenu = !globalStore.contactMenu;
};

const translator = ref("");

const scroll = (id) => {
  useGsap.to(window, {
    scrollTo: `#${id}`,
    duration: 1, // تقليل المدة
    ease: "power2.inOut", // يمكنك تجربة نوع أسهل لزيادة السلاسة
  });
};

onMounted(() => {
  const tl = useGsap.timeline();
  document.addEventListener("click", (e) => {
    if (translator.value && !translator.value.contains(e.target)) {
      globalStore.languages = false;
    }
  });
  // for white bg in right hero image section
  tl.to(".hero .hero-image .white-bg", {
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
  // right hero image
  tl.from(
    rightImage.value,
    {
      scale: 2,
      opacity: 0,
      duration: 2,
      ease: "power3.out",
    },
    0.1
  );
  // all P in right hero section
  tl.from(
    ".hero .hero-image .content .header p",
    {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.in-out",
      stagger: 0.2,
    },
    0.4
  );
  // catalog downloader
  tl.from(
    catalogDownloader.value,
    {
      scale: 0,
      opacity: 0,
      duration: 1,
    },
    0.6
  );
  // the title on the left
  tl.from(
    heroTitle.value,
    {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "power3.in-out",
    },
    0.4
  );
  // the subtitle on the left
  tl.from(
    "#heroSubTitle p",
    {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.3,
      ease: "power3.in-out",
    },
    0.4
  );
  // the logo
  tl.from(
    logo.value,
    {
      y: 30,
      opacity: 0,
      duration: 2,
      ease: "power3.out",
    },
    0.6
  );
  // the tools in the header
  tl.from(
    ".hero .sides .tools .tool",
    {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
    },
    0.7
  );
  // projects explorer text
  tl.from(
    ".hero .hero-text .footer .projects-explorer .text p",
    {
      x: -30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
    },
    0.8
  );
  // explorer image
  tl.from(
    explorerImage.value,
    {
      scale: 0,
      opacity: 0,
      duration: 1,
    },
    0.8
  );
  // contact button
  tl.from(
    contactButton.value,
    {
      width: 40,
      duration: 1,
    },
    0.9
  );
  // the text in the contact button
  tl.from(
    contactButtonText.value,
    {
      display: "none",
      opacity: 0,
      duration: 1,
    },
    2
  );
});
</script>

<style scoped lang="scss">
.hero {
  .sides {
    display: grid;
    grid-template-columns: calc(45% - 10px) calc(45% - 10px);
    column-gap: 20px;
    justify-content: center;
    @media (max-width: 1024px) {
      grid-template-columns: 100%;
    }
    .hero-container {
      width: 90%;
      margin: auto;
    }
    .hero-text {
      display: flex;
      flex-direction: column;
      gap: 10px;
      height: calc(100dvh - 10px);
      max-height: 830px;
      .logo {
        position: relative;
        z-index: 99;
        width: 140px;
      }
      .background {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        padding: 10px;
        display: none;
        @media (max-width: 1024px) {
          display: unset;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 30px;
        }
      }
      @media (max-width: 1024px) {
        .header {
          background-color: rgb(238, 238, 238);
        }
      }
      .header,
      .text,
      .footer {
        z-index: 1;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 8;
        padding: 30px 20px;
        @media (max-width: 767px) {
          padding: 10px 20px;
        }
        .tools {
          display: flex;
          align-items: center;
          gap: 19px;
          .tool:not(.translate) {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: $main-color;
            background-color: white;
            cursor: pointer;
            color: $main-color;
            font-size: 24px;
          }
          .translate {
            width: unset;
            height: unset;
            border-radius: 4px;
            font-size: 15px;
            color: $main-color;
            background-color: white;
            position: relative;
            cursor: pointer;
            &.ar {
              .selected {
                flex-direction: row-reverse;
              }
              .languages {
                li {
                  flex-direction: row-reverse;
                }
              }
            }
            .selector {
              position: relative;

              .selected {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                user-select: none;
                width: 100px;
                padding: 5px 10px;
                .iconify {
                  transform: translateY(2.5px);
                }
              }
              .languages {
                position: absolute;
                background-color: white;
                top: calc(100% + 10px);
                &::before {
                  content: "";
                  border-width: 10px 10px 10px 10px;
                  border-color: transparent transparent rgb(255, 255, 255)
                    transparent;
                  position: absolute;
                  top: -20px;
                  left: 50%;
                  transform: translateX(-50%);
                }
                li {
                  width: 100px;
                  padding: 5px 10px;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 10px;
                  cursor: pointer;
                  user-select: none;
                  transition: 0.2s;
                  &:hover {
                    background-color: rgb(240, 240, 240);
                  }
                  .iconify {
                    transform: translateY(2.5px);
                  }
                }
              }
            }
          }
        }
      }
      > .text {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        flex-grow: 1;
        @media (max-width: 425px) {
          h1 {
            p {
              font-size: 35px !important;
            }
          }
        }
        @media (max-width: 1024px) {
          flex-grow: 0.6;
          p {
            color: rgb(230, 230, 230);
          }
          h1 {
            color: white;
          }
        }
        p {
          font-size: 16px;
        }
        h1 {
          font-weight: bold;
          p {
            font-size: 53px;
            @media (max-width: 1440px) {
              font-size: 43px;
            }
          }
        }
      }
      .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .contact {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px;
          border-radius: 50px;
          background-color: $main-color;
          color: white;
          width: 180px;
          height: 40px;
          cursor: pointer;
          @media (max-width: 424px) {
            width: 160px;
          }
          .icon {
            width: 28px;
            height: 28px;
            background-color: white;
            border-radius: 50%;
            color: $main-color;
          }
          .text {
            font-size: 14px;
            font-weight: 500;
            margin-right: 10px;
            @media (max-width: 424px) {
              font-size: 12px;
            }
          }
        }
        .projects-explorer {
          display: flex;
          align-items: center;
          gap: 32px;
          cursor: pointer;
          @media (max-width: 767px) {
            gap: 5px;
          }

          @media (max-width: 1024px) {
            background-color: rgb(255, 255, 255);
            padding: 5px 10px;
            border-radius: 10px;
          }

          .text {
            text-align: start;

            @media (max-width: 767px) {
              font-size: 14px;
            }
          }
          .img {
            position: relative;
            .icon {
              position: absolute;
              top: 0;
              right: 0;
              width: 25px;
              height: 25px;
              background-color: $main-color;
              border-radius: 50%;
              color: white;
              font-size: 20px;
              transform: rotate(-40deg);
              transform-origin: center;
              transition: 0.2s;
            }
            img {
              width: 76px;
              height: 76px;
              border-radius: 50%;

              @media (max-width: 767px) {
                width: 60px;
                height: 60px;
              }
            }
          }
        }
      }
    }
    .hero-image {
      position: relative;
      border-radius: 30px;
      padding: 40px;
      margin-top: 20px;
      @media (max-width: 1024px) {
        display: none;
      }
      .background {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 30px;
        .white-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: white;
          z-index: 10;
        }
        img {
          object-fit: cover;
          border-radius: 30px;
          width: 100%;
          height: 100%;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 1;
        position: relative;
        color: white;
        height: 100%;
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 500;
        }
        .footer {
          display: flex;
          width: 100%;
          justify-content: end;
          .catalog-downloader {
            background-color: rgba(255, 255, 255, 0.795);
            color: black;
            padding: 13px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            user-select: none;
            p {
              font-size: 14px;
              font-weight: 500;
              line-height: 16px;
            }
            .icon {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: white;
            }
          }
        }
      }
    }
  }
}
</style>
