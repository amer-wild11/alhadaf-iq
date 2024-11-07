<template>
  <div class="estate-outer" ref="estateSection">
    <div class="background" ref="bg">
      <img src="/main/estate.webp" alt="" loading="lazy" />
    </div>
    <div :class="['content container', globalStore.translate ? 'ar' : '']">
      <h1 class="title">
        <span class="en-text" v-if="!globalStore.translate">
          <p>Build Your Future</p>
          <p>in Real Estate</p>
          <p>with Us</p>
        </span>
        <span class="ar-text" v-else>
          <p>ابني مستقبلك</p>
          <p>في العقارات</p>
          <p>معنا</p>
        </span>
      </h1>
      <div
        class="button contactMenuButton"
        ref="button"
        @click="globalStore.contactMenu = true"
      >
        <span ref="buttonContent">
          <span class="en-text" v-if="!globalStore.translate">
            Start Your Journey</span
          >
          <span class="ar-text" v-else>ابدأ رحلتك</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const estateSection = ref("");
const bg = ref("");
const button = ref("");
const buttonContent = ref("");
const globalStore = useMyGlobalStore();
onMounted(() => {
  const tl = useGsap.timeline();
  tl.from(bg.value, {
    y: "50%",
    scale: 0.9,
    duration: 1,
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    scrollTrigger: {
      trigger: estateSection.value,
      scrub: 1,
      end: "top top",
    },
  });
  tl.from(
    ".estate-outer .content h1 p",
    {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: estateSection.value,
        scrub: 1,
        end: "bottom bottom",
      },
    },
    1
  );
  tl.from(
    button.value,
    {
      y: -40,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: estateSection.value,
        scrub: 1,
        end: "bottom bottom",
      },
    },
    1
  );
  tl.from(
    buttonContent.value,
    {
      y: -10,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: estateSection.value,
        scrub: 1,
        end: "bottom bottom",
      },
    },
    1
  );
});
</script>

<style scoped lang="scss">
.estate-outer {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 50px;
  overflow: hidden;
  position: relative;
  .background {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 40px;
    color: white;
    position: absolute;
    top: 95px;
    left: 78px;
    &.ar {
      right: 30px;
      left: 0;
    }
    @media (max-width: 767px) {
      left: 30px;
      &.ar {
        right: 30px;
        left: 0;
      }
      h1 {
        font-size: 30px !important;
      }
    }
    h1 {
      font-size: 40px;
      font-weight: 300;
    }
    .button {
      font-size: 15px;
      padding: 12px 32px;
      background-color: $light-main-color;
      border-radius: 15px;
      width: fit-content;
    }
  }
}
</style>
