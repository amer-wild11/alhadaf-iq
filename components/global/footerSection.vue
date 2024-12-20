<template>
  <footer>
    <div class="container">
      <div class="logo-slogan">
        <div class="logo">
          <img src="/logo-black.png" alt="" />
        </div>
        <p class="slogan en-text" v-if="!globalStore.translate">
          Building Your Dreams in Real Estate
        </p>
        <p class="slogan ar-text" v-else>بناء أحلامك في مجال العقارات</p>
      </div>
      <ul class="navigation">
        <span class="title en-text" v-if="!globalStore.translate">Quick Navigation</span>
        <span class="title ar-text" v-else>تنقل سريع</span>
        <li @click="scroll(section.id)" v-for="(section, i) in sections" :key="i">
          <span class="en-text" v-if="!globalStore.translate">{{
            section.name
            }}</span>
          <span class="ar-text" v-else>{{ section.translated }}</span>
        </li>
      </ul>
      <div class="contact-info">
        <div class="title">
          <span class="en-text" v-if="!globalStore.translate">
            We are here to change <br />
            your future.
          </span>
          <span class="ar-text" v-else>
            نحن هنا . <br />
            لتغيير مستقبلك
          </span>
        </div>
        <div class="button contactMenuButton" @click="openContactMenu">
          <div class="icon">
            <img src="/main/icons/phone.png" alt="" />
          </div>
          <span class="en-text" v-if="!globalStore.translate">Contact Us Now</span>
          <span class="ar-text" v-else>تواصل معنا الأن</span>
        </div>
        <div class="email-web">
          <span class="email">info@alhadaf.com.iq</span>
          <span class="web">alhadaf.com.iq</span>
        </div>
        <div class="socialLinks">
          <div class="link" v-for="link in socialLinks" :key="link.name">
            <a :href="link.link" target="_blank">
              <div class="icon">
                <Icon :name="link.icon" />
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="location">
        <div class="image">
          <CustomMap />
        </div>
        <pre class="location en-text" v-if="!globalStore.translate">
Iraq, Baghdad
Turkey, Istanbul
</pre>
        <pre class="location ar-text" v-else>
العراق، بغداد
تركيا، اسطنبول
</pre>
      </div>
    </div>
  </footer>
</template>

<script setup>
const globalStore = useMyGlobalStore();

const openContactMenu = () => {
  globalStore.contactMenu = !globalStore.contactMenu;
};

const sections = [
  {
    id: "heroSection",
    name: "Home",
    translated: "الرئيسية",
  },
  {
    id: "aboutSection",
    name: "About Us",
    translated: "عنا",
  },
  {
    id: "projectsSection",
    name: "Our projects",
    translated: "مشاريعنا",
  },
  {
    id: "investmentsSection",
    name: "smart investment",
    translated: "استثمار ذكي",
  },
  {
    id: "advantagsSection",
    name: "advantages",
    translated: "المزايا",
  },
  {
    id: "propertiesSection",
    name: "properties",
    translated: "الملكيات",
  },
  {
    id: "partnersSection",
    name: "partners",
    translated: "الشركاء",
  },
];

const socialLinks = [
  {
    icon: 'ic:baseline-facebook',
    link: 'https://www.facebook.com/alhadaf.estate/',
    name: 'facebook'
  },
  {
    icon: 'uil:instagram-alt',
    link: 'https://www.instagram.com/alhadaf.estate/',
    name: 'instagram'
  },
  {
    icon: 'uil:linkedin',
    link: 'https://www.linkedin.com/company/alhadafestate/',
    name: 'linkedin'
  },
  {
    icon: 'uil:youtube',
    link: 'https://www.youtube.com/@Alhadaf.estate',
    name: 'youtube'
  },
]

const scroll = (id) => {
  useGsap.to(window, {
    scrollTo: `#${id}`,
    duration: 1, // تقليل المدة
    ease: "power2.inOut", // يمكنك تجربة نوع أسهل لزيادة السلاسة
  });
};
</script>

<style scoped lang="scss">
footer {
  // padding: 61px 46px 60px 20px;
  padding: 40px;

  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 50px;
    row-gap: 40px;
  }

  .logo-slogan {
    display: flex;
    flex-direction: column;
    gap: 35px;

    .slogan {
      font-size: 15px;
      font-weight: 300;
      color: rgba(0, 0, 0, 0.795);
    }
  }

  .navigation {
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 766px) {
      align-items: center;
    }

    .title {
      font-size: 21px;
    }

    li {
      font-weight: 700;
      cursor: pointer;
    }
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 23px;

    .title {
      font-size: 20px;
      font-weight: 300;
    }

    .button {
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: $main-color;
      border-radius: 30px;
      color: white;
      padding: 5px;
      width: fit-content;
      cursor: pointer;

      * {
        pointer-events: none;
        user-select: none;
      }

      .icon {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      span {
        font-size: 15px;
        padding: 5px;
      }
    }

    .email-web {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .socialLinks {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 30px;
    }
  }

  .subscribtion {
    h1 {
      font-size: 30px;
      font-weight: 500;
      margin-bottom: 20px;
    }

    p {
      font-size: 17px;
      color: #00000080;
      margin-bottom: 30px;
    }

    .input {
      input {
        width: 100%;
        padding: 5px 10px;
        border: none;
        border-bottom: 2px solid #00000080;
        background: none;
        margin-bottom: 20px;
      }

      button {
        background-color: $main-color;
        padding: 10px 20px;
        border-radius: 50px;
        color: white;
      }
    }
  }

  .location {
    .image {
      width: 100%;
      height: 200px;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid white;
    }
  }
}
</style>
