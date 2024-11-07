<template>
  <div class="partners" ref="partnersSection">
    <div class="container">
      <div class="text">
        <div class="header">
          <div class="button">
            <span class="en-text" v-if="!globalStore.translate">about us</span>
            <span class="ar-text" v-else>من نحن</span>
          </div>
        </div>
        <div class="content">
          <h1 class="en-text" v-if="!globalStore.translate">
            <p>Partners in</p>
            <p>Realizing Your</p>
            <p>Real Estate</p>
            <p>Dreams</p>
          </h1>
          <h1 class="ar-text" v-else>
            <p>شركاء</p>
            <p>بتحقيق</p>
            <p>احلامكم</p>
            <p>العقارية</p>
          </h1>
        </div>
      </div>
      <div class="image">
        <img src="/main/about/partners.webp" alt="" loading="lazy" />
      </div>
    </div>
  </div>
</template>

<script setup>
const globalStore = useMyGlobalStore();
const partnersSection = ref("");
onMounted(() => {
  const tl = useGsap.timeline({
    scrollTrigger: {
      trigger: partnersSection.value,
      scrub: 2,
      end: "top 10%",
    },
  });
  tl.from(".partners .container .content p", {
    x: 60,
    duration: 2,
    opacity: 0,
    stagger: 0.3,
  });
  tl.from(
    ".partners .container .header .button",
    {
      scale: 0,
      opacity: 0,
      duration: 1,
    },
    0.5
  );
  tl.from(
    ".partners .container .image",
    {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      duration: 1,
    },
    0.9
  );
});
</script>

<style scoped lang="scss">
.partners {
  .container {
    background-color: white;
    border-radius: 10px;
    padding: 40px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 40px;
    color: black;
    @media (max-width: 1002px) {
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .text {
      display: flex;
      flex-direction: column;
      gap: 10px;
      @media (max-width: 1002px) {
        align-items: center;
      }
      .header {
        .button {
          font-size: 13px;
          padding: 5px 10px;
          border: 1px solid lightgray;
          border-radius: 3px;
          text-align: center;
          text-transform: capitalize;
          margin-bottom: 20px;
          width: fit-content;
        }
      }
      .content {
        font-size: 40px;
        font-weight: 800;
        @media (max-width: 626px) {
          font-size: 30px;
        }
      }
    }
    .image {
      clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%);
      img {
        width: 600px;
      }
    }
  }
}
</style>
