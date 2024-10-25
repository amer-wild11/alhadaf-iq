<template>
  <div :class="['dropdown', globalStore.dropdown ? 'show' : '']" ref="dropdown">
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

const close = () => {
  globalStore.dropdown = false;
};

watch(
  () => globalStore.dropdown,
  (newVal) => {
    if (newVal) {
      useGsap.to(dropdown.value, {
        rotate: 0,
        scale: 1,
        left: 0,
        duration: 1,
        ease: "power3.inOut",
      });
    }
    if (!newVal) {
      const tl = useGsap.timeline();
      tl.to(dropdown.value, {
        left: "-115dvh",
        duration: 1,
        ease: "power3.inOut",
      });
      tl.to(dropdown.value, {
        rotate: -10,
      });
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
  left: -115dvh;
  width: 50%;
  height: 100dvh;
  background-color: white;
  z-index: 9;
  transform-origin: center;
  transform: rotate(-10deg);
  padding: 30px;
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
