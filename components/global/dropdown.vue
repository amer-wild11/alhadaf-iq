<template>
  <div :class="[
    'dropdown',
    globalStore.dropdown ? 'show' : '',
    globalStore.translate ? 'ar' : '',
  ]" ref="dropdown">
    <div class="close" @click="close">
      <span class="span1"></span>
      <span class="span2"></span>
    </div>
    <ul>
      <div class="title">
        <span class="en-text" v-if="!globalStore.translate">sections</span>
        <span class="ar-text" v-else>الأقسام</span>
      </div>
      <li @click="scroll(section.id)" v-for="(section, i) in sections" :key="i">
        <div class="icon">
          <Icon :name="section.icon" />
        </div>
        <div class="value">
          <span class="en-text" v-if="!globalStore.translate">{{
            section.name
            }}</span>
          <span class="ar-text" v-else>{{ section.translated }}</span>
        </div>
      </li>
    </ul>
    <div class="socialLinks">
      <div class="title">
        <span>Social media: </span>
      </div>
      <div class="links">
        <div class="link" v-for="link in socialLinks" :key="link.name">
          <a :href="link.link" target="_blank">
            <div class="icon">
              <Icon :name="link.icon" />
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const globalStore = useMyGlobalStore();
const dropdown = ref("");

const sections = [
  {
    id: "heroSection",
    name: "Home",
    translated: "الرئيسية",
    icon: 'material-symbols:house'
  },
  {
    id: "aboutSection",
    name: "About Us",
    translated: "عن الهدف",
    icon: 'material-symbols:user-attributes-outline'
  },
  {
    id: "projectsSection",
    name: "Our projects",
    translated: "مشاريعنا",
    icon: 'si:projects-alt-duotone'
  },
  {
    id: "investmentsSection",
    name: "smart investment",
    translated: "استثمار ذكي",
    icon: 'simple-icons:bitcoin'
  },
  {
    id: "advantagsSection",
    name: "advantages",
    translated: "المزايا",
    icon: 'streamline:interface-user-check-actions-close-checkmark-check-geometric-human-person-single-success-up-user'
  },
  {
    id: "propertiesSection",
    name: "our portfolio",
    translated: "المعرض",
    icon: 'streamline:interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard'
  },
  // {
  //   id: "partnersSection",
  //   name: "partners",
  //   translated: "الشركاء",
  // },
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

const close = () => {
  globalStore.dropdown = false;
};

watch(
  () => globalStore.dropdown,
  (newVal) => {
    if (newVal) {
      const tl = useGsap.timeline();
      if (dropdown.value) {
        tl.to(dropdown.value, {
          display: "unset",
        });
      }
      if (globalStore.translate) {
        tl.to(
          dropdown.value,
          {
            scale: 1,
            right: 0,
            opacity: 1,
            duration: 0.4,
          },
          0.1
        );
      } else {
        tl.to(
          dropdown.value,
          {
            scale: 1,
            left: 0,
            opacity: 1,
            duration: 0.4,
          },
          0.1
        );
      }
    }
    if (!newVal) {
      const tl = useGsap.timeline();
      if (globalStore.translate) {
        tl.to(dropdown.value, {
          right: "-10%",
          duration: 1,
          opacity: 0,
          duration: 0.4,
        });
      } else {
        tl.to(dropdown.value, {
          left: "-10%",
          duration: 1,
          opacity: 0,
          duration: 0.4,
        });
      }
      tl.to(
        dropdown.value,
        {
          display: "none",
        },
        0.1
      );
    }
  }
);

const scroll = (id) => {
  useGsap.to(window, {
    scrollTo: `#${id}`,
    duration: 1, // تقليل المدة
    ease: "power2.inOut", // يمكنك تجربة نوع أسهل لزيادة السلاسة
  });
};

onMounted(() => {
  document.addEventListener("click", (e) => {
    let dropdownTool = document.querySelector(".tools .dropdown-menu");
    if (
      dropdownTool &&
      dropdown.value &&
      !dropdown.value.contains(e.target) &&
      !dropdownTool.contains(e.target)
    ) {
      globalStore.dropdown = false;
    }
  });
});
</script>

<style scoped lang="scss">
.dropdown {
  position: fixed;
  top: 0;
  left: -10%;
  display: none;
  width: 50%;
  height: 100dvh;
  background-color: white;
  z-index: 9;
  opacity: 0;
  transform-origin: center;
  padding: 30px;

  &.ar {
    left: unset;
    right: -10%;

    .close {
      left: 20px;
      right: unset;
    }
  }

  @media (max-width: 1024px) {
    width: 96%;
  }

  @media (max-width: 374px) {
    width: 98%;
  }

  @media (max-width: 374px) {}

  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;

    span {
      position: absolute;
      width: 90%;
      height: 2px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: $main-color;
    }

    .span1 {
      transition: 1s;
      transform: translate(-50%, -50%) rotate(45deg);
      transform-origin: center;
    }

    .span2 {
      transition: 1s;
      transform: translate(-50%, -50%) rotate(-45deg);
      transform-origin: center;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .title {
      font-size: 20px;
      text-transform: capitalize;
      color: rgb(75, 75, 75);
      margin-bottom: 20px;
    }

    li {
      font-size: 35px;
      cursor: pointer;
      user-select: none;
      text-transform: capitalize;
      display: flex;
      align-items: center;
      gap: 10px;

      .icon {
        transform: translateY(7%);
        font-size: 30px;
        color: rgba(0, 0, 0, 0.733);
      }

      @media (max-width: 374px) {
        font-size: 25px;
      }
    }
  }

  .socialLinks {
    font-size: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 30px;
    @media (max-width: 767px) {
      flex-direction: column;
      align-items: start;
    }

    .links {
      display: flex;
      align-items: center;
      gap: 30px;

      .link {
        transform: translateY(15%);
        font-size: 40px;
      }
    }
  }
}
</style>
