<template>
  <div class="projectDetails" ref="detailsContainer">
    <div class="close" @click="close">
      <Icon name="material-symbols:close-rounded" />
    </div>
    <div class="images">
      <Swiper
        :effect="'creative'"
        :autoplay="true"
        :slides-per-view="1"
        :space-between="20"
      >
        <SwiperSlide v-for="image in propertiesStore.propertyDetails.images">
          <img :src="image.url" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="content">
      <div class="info">
        <div class="name">
          <span class="title">Property name</span>
          <span>{{ propertiesStore.propertyDetails.name }}</span>
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

const close = () => {
  propertiesStore.details = false;
};

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
  width: 70%;
  max-height: 90dvh;
  z-index: 999;
  border-radius: 10px;
  display: none;
  gap: 20px;
  opacity: 0;
  padding: 30px;
  box-shadow: 1px 1px 10px lightgray;
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
    width: 60%;
    @media (max-width: 912px) {
      width: 80%;
      margin: auto;
    }
    img {
      border-radius: 20px;
      width: 100%;
      max-height: 500px;
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
    }
  }
}
</style>
