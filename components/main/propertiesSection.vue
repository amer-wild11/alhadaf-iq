<template>
  <div
    class="propertiesSection container"
    ref="propertiesSection"
    id="propertiesSection"
  >
    <div class="title" ref="title">
      <MainTitle
        :title="`Our Portfolio`"
        v-if="!globalStore.translate"
        class="en-text"
      ></MainTitle>
      <MainTitle
        :title="`أعمال الهدف العقارية`"
        class="ar-text"
        :ar="true"
        v-else
      ></MainTitle>
    </div>
    <div class="properties">
      <MasonryContainer :cols="7" :item-width="214">
        <MasonryItem
          v-for="(property, i) in propertiesStore.properties"
          :key="i"
          :col-span="1"
          @click="setDetails(property)"
        >
          <div class="property">
            <div class="image">
              <img :src="property.images[0].url" alt="" loading="lazy" />
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
const propertiesStore = useMyPropertiesStore();

const setDetails = (property) => {
  propertiesStore.details = true;
  const details = {
    name: property.name,
    translated_name: property.translated_name,
    images: property.images,
    createdAt: property.createdAt,
  };
  propertiesStore.propertyDetails = details;
};

onMounted(() => {
  const tl = useGsap.timeline({
    scrollTrigger: {
      trigger: propertiesSection.value,
      end: "bottom bottom",
      scrub: true,
    },
  });

  if (title.value) {
    tl.from(title.value, {
      y: 60,
      opacity: 0,
      duration: 1,
    });
  }
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
  min-height: 100vh;
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
      border-radius: 10px;
      overflow: hidden;
      width: 214px;
      &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.555), transparent);
        z-index: 2;
      }
      img {
        width: 100%;
        object-fit: cover;
        height: auto;
        border-radius: 10px;
      }

      .name,
      .icon {
        position: absolute;
        z-index: 3;
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
