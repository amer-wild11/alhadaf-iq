<template>
  <div
    :class="[
      'dropdown',
      globalStore.dropdown ? 'show' : '',
      globalStore.translate ? 'ar' : '',
    ]"
    ref="dropdown"
  >
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
        <span class="en-text" v-if="!globalStore.translate">{{
          section.name
        }}</span>
        <span class="ar-text" v-else>{{ section.translated }}</span>
      </li>
    </ul>
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
  },
  {
    id: "aboutSection",
    name: "About Us",
    translated: "عن الهدف",
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
    name: "our portfolio",
    translated: "المعرض",
  },
  // {
  //   id: "partnersSection",
  //   name: "partners",
  //   translated: "الشركاء",
  // },
];

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
    width: 80%;
  }
  @media (max-width: 374px) {
    width: 90%;
  }
  @media (max-width: 374px) {
  }
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
      font-size: 40px;
      cursor: pointer;
      user-select: none;
      text-transform: capitalize;
      @media (max-width: 374px) {
        font-size: 25px;
      }
    }
  }
}
</style>
