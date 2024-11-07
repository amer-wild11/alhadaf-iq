<template>
  <div
    :class="['projectDetails', globalStore.translate ? 'ar' : '']"
    ref="detailsContainer"
  >
    <div class="close" @click="close">
      <Icon name="material-symbols:close-rounded" />
    </div>
    <div class="images">
      <div
        class="controlsContainer"
        v-if="projectsStore.projectDetails.images.length > 1"
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
        :style="{ direction: globalStore.translate ? 'ltr' : '' }"
        id="projectDetailsImagesSlider"
      >
        <SwiperSlide v-for="image in projectsStore.projectDetails.images">
          <img :src="image.url" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="content">
      <div class="info">
        <div class="name">
          <span class="title en-text" v-if="!globalStore.translate"
            >Project name</span
          >
          <span class="title ar-text" v-else>أسم المشروع</span>
          <span class="en-text" v-if="!globalStore.translate">{{
            projectsStore.projectDetails.name
          }}</span>
          <span class="ar-text" v-else>{{
            projectsStore.projectDetails.translated_name
          }}</span>
        </div>
        <div class="location">
          <div class="title">
            <span class="en-text" v-if="!globalStore.translate">Location</span>
            <span class="ar-text" v-else>الموقع</span>
          </div>
          <div class="value">
            <span class="en-text" v-if="!globalStore.translate">{{
              projectsStore.projectDetails.location
            }}</span>
            <span class="ar-text" v-else>{{
              projectsStore.projectDetails.translated_location
            }}</span>
          </div>
        </div>
        <div class="desc">
          <span class="title en-text" v-if="!globalStore.translate"
            >Description</span
          >
          <span class="title ar-text" v-else>الوصف</span>
          <span class="en-text" v-if="!globalStore.translate">{{
            projectsStore.projectDetails.desc
          }}</span>
          <span class="ar-text" v-else>{{
            projectsStore.projectDetails.translated_desc
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
              projectsStore.projectDetails.createdAt
            ).getFullYear()} ${new Date(
              projectsStore.projectDetails.createdAt
            ).toLocaleString("en", { month: "short" })} ${new Date(
              projectsStore.projectDetails.createdAt
            ).getDate()}`
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const projectsStore = useMyProjectsStore();
const detailsContainer = ref("");
const globalStore = useMyGlobalStore();
const swiper = ref("");

const close = () => {
  projectsStore.details = false;
};

onMounted(() => {
  swiper.value = document.querySelector("#projectDetailsImagesSlider").swiper;
});

watch(
  () => projectsStore.details,
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
  width: 97%;
  max-height: 90vh;
  border-radius: 10px;
  gap: 20px;
  padding: 35px;
  opacity: 0;
  box-shadow: 1px 1px 10px lightgray;
  display: none;
  z-index: 999;
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
  }
  .images {
    width: 100%;
    max-width: 60%;
    min-height: 300px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    border-radius: 20px;
    #projectDetailsImagesSlider {
      .swiper-slide {
        align-self: center;
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
    @media (max-width: 912px) {
      max-width: 80%;
      margin: auto;
    }
    @media (max-width: 600px) {
      margin: auto;
      max-width: 100%;
    }
    img {
      border-radius: 20px;
      width: 100%;
      background-color: red;
      object-fit: cover;
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
        word-break: break-all;
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
      gap: 1px;
    }
  }
}
</style>
