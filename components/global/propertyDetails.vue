<template>
  <div class="projectDetails" ref="detailsContainer">
    <div class="close" @click="close">
      <Icon name="material-symbols:close-rounded" />
    </div>
    <div class="images">
      <div
        class="controlsContainer"
        v-if="propertiesStore.propertyDetails.images.length > 1"
      >
        <div class="controls" v-if="globalStore.translate">
          <div class="control next" @click="swiper.slideNext()">
            <Icon name="material-symbols:chevron-right" />
          </div>
          <div class="control prev" @click="swiper.slidePrev()">
            <Icon name="material-symbols:chevron-left" />
          </div>
        </div>
        <div class="controls" v-else>
          <div class="control prev" @click="swiper.slidePrev()">
            <Icon name="material-symbols:chevron-left" />
          </div>
          <div class="control next" @click="swiper.slideNext()">
            <Icon name="material-symbols:chevron-right" />
          </div>
        </div>
      </div>
      <Swiper
        :effect="'creative'"
        :autoplay="true"
        :slides-per-view="1"
        :space-between="20"
        id="propertyDetailsImagesSlider"
        :style="{ direction: globalStore.translate ? 'ltr' : '' }"
      >
        <SwiperSlide v-for="image in propertiesStore.propertyDetails.images">
          <img :src="image.url" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="content">
      <div class="info">
        <div class="name">
          <span class="title en-text" v-if="!globalStore.translate"
            >Property name</span
          >
          <span class="title ar-text" v-else>اسم الملكية</span>
          <span class="en-text" v-if="!globalStore.translate">{{
            propertiesStore.propertyDetails.name
          }}</span>
          <span class="ar-text" v-else>{{
            propertiesStore.propertyDetails.translated_name
          }}</span>
        </div>
      </div>
      <div class="date-info">
        <div class="slogan">
          <span>ALHADAF REAL ESTATE 2024</span>
        </div>
        <div class="date">
          <span>{{
            `${new Date(
              propertiesStore.propertyDetails.createdAt
            ).getFullYear()} ${new Date(
              propertiesStore.propertyDetails.createdAt
            ).toLocaleString("en", { month: "short" })} ${new Date(
              propertiesStore.propertyDetails.createdAt
            ).getDate()}`
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const propertiesStore = useMyPropertiesStore();
const detailsContainer = ref("");
const swiper = ref("");
const globalStore = useMyGlobalStore();

const close = () => {
  propertiesStore.details = false;
};

onMounted(() => {
  swiper.value = document.querySelector("#propertyDetailsImagesSlider").swiper;
});

watch(
  () => propertiesStore.details,
  (newVal) => {
    if (newVal) {
      const tl = useGsap.timeline();
      tl.to(detailsContainer.value, {
        display: "flex",
      });
      tl.to(
        detailsContainer.value,
        {
          opacity: 1,
          top: "50%",
          duration: 0.2,
        },
        0.1
      );
    } else {
      const tl = useGsap.timeline();
      tl.to(detailsContainer.value, {
        top: "60%",
        opacity: 0,
        duration: 0.2,
      });
      tl.to(
        detailsContainer.value,
        {
          display: "none",
        },
        0.01
      );
    }
  }
);
</script>

<style scoped lang="scss">
.projectDetails {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  max-height: 90dvh;
  z-index: 999;
  border-radius: 10px;
  display: none;
  gap: 20px;
  opacity: 0;
  padding: 30px;
  box-shadow: 1px 1px 10px lightgray;
  overflow: auto;
  @media (max-width: 912px) {
    flex-direction: column;
    width: 90%;
  }
  .close {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    z-index: 1;
  }
  .images {
    width: 400px;
    border-radius: 20px;
    position: relative;
    @media (max-width: 912px) {
      width: 300px;
      margin: auto;
    }
    @media (max-width: 473px) {
      width: 230px;
    }
    img {
      border-radius: 20px;
      max-height: 700px;
      width: 100%;
      object-fit: cover;
      margin: auto;
      border: 1px solid rgb(216, 215, 215);
      @media (max-width: 767px) {
        width: 100%;
        max-height: 500px;
      }
    }
    .controls {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 20;
      padding: 0 10px;
      .control {
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        color: black;
        border: 1px solid lightgray;
        font-size: 50px;
        @media (max-width: 767px) {
          width: 30px;
          height: 30px;
          font-size: 30px;
        }
        &.next {
          .iconify {
            transform: translateX(3px);
          }
        }
        &.prev {
          .iconify {
            transform: translateX(-3px);
          }
        }
      }
      @media (max-width: 767px) {
        font-size: 46px;
      }
    }
  }
  .content {
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    .info {
      flex-grow: 1;
      .title {
        display: block;
        font-size: 22px;
        color: rgb(119, 119, 119);
      }
      .name {
        margin-bottom: 10px;
        span:not(.title) {
          font-weight: 400;
          font-size: 19px;
        }
        &::first-letter {
          text-transform: uppercase;
        }
      }
      .location {
        gap: 5px;
        margin-bottom: 30px;
        .value {
          font-weight: 400;
          font-size: 19px;
        }
      }
      .desc {
        &::first-letter {
          text-transform: uppercase;
        }
      }
    }
    .date-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 15px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.568);
      @media (max-width: 436px) {
        flex-direction: column;
        align-items: start;
        justify-content: start;
      }
    }
  }
}
</style>
