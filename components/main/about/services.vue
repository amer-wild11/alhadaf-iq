<template>
  <div class="ourServices" ref="ourServices">
    <div class="container">
      <div class="title">
        <h1><span>Our</span> <span>Services</span></h1>
      </div>
      <div class="services">
        <div class="service" v-for="(service, i) in services" :key="i">
          <div class="icon">
            <img :src="service.image" alt="" />
          </div>
          <div class="desc-title">
            <span class="title">{{ service.title }}</span>
            <span class="desc">{{ service.desc }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const services = [
  {
    image: "/main/about/services/personal_growth.png",
    title: "Real Estate Development",
    desc: "Designing and executing distinguished real estate projects that meet market and community needs.",
  },
  {
    image: "/main/about/services/money_bag.png",
    title: "Real Estate Investment",
    desc: "Providing profitable investment opportunities suitable for various categories.",
  },
  {
    image: "/main/about/services/commercial.png",
    title: "Real Estate Marketing",
    desc: "Marketing real estate projects in innovative and effective ways to ensure reaching the target clients.",
  },
];

const ourServices = ref("");

onMounted(() => {
  const tl = useGsap.timeline({
    scrollTrigger: {
      trigger: ourServices.value,
    },
  });
  tl.from(".ourServices .container > .title h1 span", {
    y: -70,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  });
  tl.from(".ourServices .container .services .service", {
    y: -70,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  });
});
</script>

<style scoped lang="scss">
.ourServices {
  margin-bottom: 60px;
  .title {
    h1 {
      font-size: 40px;
      text-transform: capitalize;
      font-weight: bold;
      margin-bottom: 100px;
      text-align: center;
      span {
        display: inline-block;
      }
    }
  }
  .services {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 50px;
    @media (max-width: 773px) {
      justify-content: center;
    }
    .service {
      width: 330px;
      display: flex;
      flex-direction: column;
      gap: 30px;
      align-items: center;
      text-align: center;
      .desc-title {
        display: flex;
        flex-direction: column;
        gap: 30px;
        .title {
          font-size: 25px;
          font-weight: 600;
        }
        .desc {
          font-size: 16px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
