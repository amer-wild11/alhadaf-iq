<template>
  <div
    class="propertiesSection container"
    ref="propertiesSection"
    id="propertiesSection"
  >
    <div class="title" ref="title">
      <MainTitle
        :title="`Find Your Perfect Property Match`"
        v-if="!globalStore.translate"
        class="en-text"
      ></MainTitle>
      <MainTitle
        :title="`ابحث عن العقار المناسب لك`"
        class="ar-text"
        v-else
      ></MainTitle>
    </div>
    <div class="properties">
      <MasonryContainer :cols="7" :item-width="214">
        <MasonryItem v-for="(property, i) in properties" :key="i" :col-span="1">
          <div class="property">
            <div class="image">
              <img :src="property.image" alt="" />
            </div>
            <div class="name">
              <span>{{ property.name }}</span>
            </div>
            <div class="icon">
              <Icon name="material-symbols:arrow-outward" />
            </div>
          </div>
        </MasonryItem>
      </MasonryContainer>
    </div>
  </div>
</template>

<script setup>
const title = ref("");
const propertiesSection = ref("");
const globalStore = useMyGlobalStore();
const properties = [
  {
    id: "01",
    name: "Queen Residence",
    image: "/main/properties/1.png",
  },
  {
    id: "02",
    name: "Queen Residence",
    image: "/main/properties/2.png",
  },
  {
    id: "02",
    name: "Queen Residence",
    image: "/main/properties/2.png",
  },
  {
    id: "02",
    name: "Queen Residence",
    image: "/main/properties/2.png",
  },
  {
    id: "01",
    name: "Queen Residence",
    image: "/main/properties/1.png",
  },
  {
    id: "02",
    name: "Queen Residence",
    image: "/main/properties/2.png",
  },
  {
    id: "02",
    name: "Queen Residence",
    image: "/main/properties/2.png",
  },
  {
    id: "01",
    name: "Queen Residence",
    image: "/main/properties/1.png",
  },
  {
    id: "01",
    name: "Queen Residence",
    image: "/main/properties/1.png",
  },
  {
    id: "01",
    name: "Queen Residence",
    image: "/main/properties/1.png",
  },
  {
    id: "02",
    name: "Queen Residence",
    image: "/main/properties/2.png",
  },
  {
    id: "01",
    name: "Queen Residence",
    image: "/main/properties/1.png",
  },
  {
    id: "01",
    name: "Queen Residence",
    image: "/main/properties/1.png",
  },
  {
    id: "02",
    name: "Queen Residence",
    image: "/main/properties/2.png",
  },
  {
    id: "01",
    name: "Queen Residence",
    image: "/main/properties/1.png",
  },
  {
    id: "02",
    name: "Queen Residence",
    image: "/main/properties/2.png",
  },
  {
    id: "01",
    name: "Queen Residence",
    image: "/main/properties/1.png",
  },
  {
    id: "02",
    name: "Queen Residence",
    image: "/main/properties/2.png",
  },
  {
    id: "02",
    name: "Queen Residence",
    image: "/main/properties/2.png",
  },
];
onMounted(() => {
  const tl = useGsap.timeline({
    scrollTrigger: {
      trigger: propertiesSection.value,
      end: "bottom bottom",
      scrub: true,
    },
  });

  tl.from(title.value, {
    y: 60,
    opacity: 0,
    duration: 1,
  });
  tl.from(
    ".propertiesSection .properties .property",
    {
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
    },
    0.1
  );
});
</script>

<style scoped lang="scss">
.propertiesSection {
  margin-top: 153px;
  margin-bottom: 30px;

  .title {
    margin-bottom: 40px;
    @media (max-width: 767px) {
      margin-bottom: 70px;
    }
  }

  .properties {
    @media (max-width: 492px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .property {
      position: relative;
      cursor: pointer;
      border-radius: 30px;
      width: 214px;
      img {
        width: 100%;
        object-fit: cover;
        height: auto;
        border-radius: 30px;
      }

      .name,
      .icon {
        position: absolute;
      }

      .name {
        bottom: 20px;
        left: 15px;
        color: white;
        font-weight: 300;
        font-size: 15px;
      }

      .icon {
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $main-color;
        color: white;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
