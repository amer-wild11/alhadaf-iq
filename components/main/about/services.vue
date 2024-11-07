<template>
  <div class="ourServices" ref="ourServices">
    <div class="container">
      <div class="title">
        <h1 class="en-text" v-if="!globalStore.translate">
          <span>Our</span> <span>Services</span>
        </h1>
        <h1 class="ar-text" v-else>خدماتنا</h1>
      </div>
      <div class="services">
        <div class="service" v-for="(service, i) in services" :key="i">
          <div class="icon">
            <img :src="service.image" alt="" />
          </div>
          <div class="desc-title">
            <span class="title en-text" v-if="!globalStore.translate">{{
              service.title
            }}</span>
            <span class="title ar-text" v-else>{{
              service.translatedTitle
            }}</span>
            <span class="desc en-text" v-if="!globalStore.translate">{{
              service.desc
            }}</span>
            <span class="desc ar-text" v-else>{{
              service.translatedDesc
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const globalStore = useMyGlobalStore();

const services = [
  {
    image: "/main/about/services/personal_growth.png",
    title: "Real Estate Development",
    translatedTitle: "تطوير العقارات",
    translatedDesc:
      "تصميم وتنفيذ مشاريع عقارية متميزة تلبي احتياجات السوق والمجتمع.",
    desc: "Designing and executing distinguished real estate projects that meet market and community needs.",
  },
  {
    image: "/main/about/services/money_bag.png",
    title: "Real Estate Investment",
    translatedTitle: "استثمار العقارات",
    translatedDesc: "توفير فرص استثمارية مربحة تناسب مختلف الفئات.",
    desc: "Providing profitable investment opportunities suitable for various categories.",
  },
  {
    image: "/main/about/services/commercial.png",
    title: "Real Estate Marketing",
    translatedTitle: "تسويق العقارات",
    translatedDesc:
      "تسويق المشاريع العقارية بطرق مبتكرة وفعالة لضمان الوصول إلى العملاء المستهدفين.",
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
