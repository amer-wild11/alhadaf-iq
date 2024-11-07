<template>
  <div
    class="partners-outer container"
    ref="partnersSection"
    id="partnersSection"
  >
    <div class="title" ref="title">
      <MainTitle
        title="Partners of Success"
        class="en-text"
        v-if="!globalStore.translate"
      />
      <MainTitle title="شركاء النجاح" class="ar-text" v-else />
    </div>
    <div class="partners">
      <div class="prev button" @click="slidePrev">
        <Icon name="material-symbols:arrow-back-ios" />
      </div>
      <div class="next button" @click="slideNext">
        <Icon name="material-symbols:arrow-forward-ios-rounded" />
      </div>
      <Swiper
        :effect="'creative'"
        :breakpoints="breakpoints"
        :creative-effect="{
          prev: {
            shadow: false,
            translate: ['-20%', 0, -1],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }"
        id="partners-slider"
      >
        <SwiperSlide
          class="partner"
          v-for="partner in partnersStore.partners"
          :key="partner.id"
        >
          <img :src="partner.logo.url" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
const title = ref("");
const partnersSection = ref("");
const globalStore = useMyGlobalStore();
const partnersStore = useMyPartnersStore();
const breakpoints = {
  0: {
    slidesPerView: 1,
  },
  500: {
    slidesPerView: 2,
  },
  700: {
    slidesPerView: 3,
  },
  1000: {
    slidesPerView: 4,
  },
  1300: {
    slidesPerView: 5,
  },
  1500: {
    slidesPerView: 6,
  },
};

const swiper = ref(null);

const slideNext = () => {
  swiper.value.slideNext();
};

const slidePrev = () => {
  swiper.value.slidePrev();
};

onMounted(() => {
  swiper.value = document.querySelector("#partners-slider").swiper;
  const tl = useGsap.timeline({
    scrollTrigger: {
      trigger: partnersSection.value,
      start: "top 60%",
    },
  });
  tl.from(title.value, {
    y: 40,
    opacity: 0,
    duration: 1,
  });
  tl.from(".partners-outer .partners .partner", {
    y: 50,
    opacity: 0,
    stagger: 0.1,
  });
});
</script>

<style scoped lang="scss">
.partners-outer {
  margin-bottom: 230px;
  display: none;
  .title {
    margin: 160px auto;
  }
  .partners {
    position: relative;
    width: 90%;
    margin: auto;
    .button {
      position: absolute;
      top: 50%;
      transform: translateY(-20%);
      font-size: 30px;
      cursor: pointer;
      display: flex;
    }
    .prev {
      left: -40px;
    }
    .next {
      right: -40px;
    }
  }
}
</style>
