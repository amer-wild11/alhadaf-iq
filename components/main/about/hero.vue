<template>
  <div class="main" ref="mainSection">
    <div class="container">
      <div class="title">
        <h1 class="en-text" v-if="!globalStore.translate">
          <span>about</span> <span>us</span>
        </h1>
        <h1 class="ar-text" v-else><span>من</span> <span>نحن</span></h1>
      </div>
      <div class="text">
        <h1 class="en-text" v-if="!globalStore.translate">
          <span>A</span>
          <span>L</span>
          <span>H</span>
          <span>A</span>
          <span>D</span>
          <span>A</span>
          <span>F</span>
        </h1>
        <h1 class="ar-text" v-else>
          <span>الهدف</span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
const mainSection = ref("");
const globalStore = useMyGlobalStore();
onMounted(() => {
  const tl = useGsap.timeline({
    scrollTrigger: {
      trigger: mainSection.value,
      scrub: 1,
      end: "bottom bottom",
    },
  });
  tl.from(".main .container .title h1 span", {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  });
  tl.from(".main .container .text", {
    y: 100,
    opacity: 0,
    duration: 1,
  });
});
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 0;
  color: white;
  .title {
    font-size: 50px;
    text-align: center;
    text-transform: capitalize;
    font-weight: 300;
    span {
      display: inline-block;
    }
    @media (max-width: 767px) {
      font-size: 40px;
    }
  }
  .text {
    font-size: 274px;
    text-align: center;
    font-weight: bold;
    background-image: url("/main/about/background.webp");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    @media (max-width: 1399px) {
      font-size: 17dvw;
    }
  }
}
</style>
