<template>
  <div class="projectDetails" ref="detailsContainer">
    <div class="close" @click="close">
      <Icon name="material-symbols:close-rounded" />
    </div>
    <div class="images">
      <div class="current">
        <img
          :src="projectsStore.projectDetails.images[0].url"
          alt=""
          v-if="projectsStore.projectDetails.images[0]"
          ref="image"
        />
      </div>
      <div class="others">
        <div
          class="image"
          v-for="(image, i) in projectsStore.projectDetails.images"
          :key="i"
          v-if="projectsStore.projectDetails.images"
          @click="changeCurrentImage(image.url)"
        >
          <img :src="image.url" alt="" />
        </div>
      </div>
    </div>
    <div class="content">
      <div class="name">
        <span>{{ projectsStore.projectDetails.name }}</span>
      </div>
      <div class="location">
        <div class="icon">
          <Icon name="material-symbols:location-on-rounded" />
        </div>
        <div class="value">
          <span>{{ projectsStore.projectDetails.location }}</span>
        </div>
      </div>
      <div class="desc">
        <span
          >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis,
          amet obcaecati. Numquam rerum odit a minima dignissimos! A, error
          mollitia!</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const projectsStore = useMyProjectsStore();
const image = ref("");
const detailsContainer = ref("");

const close = () => {
  projectsStore.details = false;
};

watch(
  () => projectsStore.details,
  (newVal) => {
    if (newVal) {
      const tl = useGsap.timeline();
      tl.to(detailsContainer.value, {
        display: "flex",
      });
      tl.to(detailsContainer.value, {
        opacity: 1,
        top: "50%",
      });
    } else {
      const tl = useGsap.timeline();
      tl.to(detailsContainer.value, {
        top: "60%",
        opacity: 0,
      });
      tl.to(detailsContainer.value, {
        display: "none",
      });
    }
  }
);

const changeCurrentImage = (url) => {
  image.value.src = url;
};
</script>

<style scoped lang="scss">
.projectDetails {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 70%;
  z-index: 999;
  border-radius: 10px;
  display: flex;
  gap: 20px;
  padding: 30px;
  display: none;
  opacity: 0;
  @media (max-width: 912px) {
    flex-direction: column;
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
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 50%;
    .current {
      width: 100%;
      border-radius: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .others {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
      .image {
        cursor: pointer;
        img {
          border-radius: 10px;
          width: 100px;
        }
      }
    }
  }
  .content {
    .name {
      font-size: 20px;
      font-weight: 600;
      &::first-letter {
        text-transform: uppercase;
      }
    }
    .location {
      display: flex;
      align-items: center;
      gap: 5px;
      color: rgb(71, 71, 71);
      margin-bottom: 10px;
      .value {
        font-size: 15px;
      }
      .icon {
        font-size: 20px;
        transform: translateY(2px);
      }
    }
    .desc {
      font-size: 14px;
      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
}
</style>
