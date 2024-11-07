<template>
  <div class="ourMission container" ref="missionContainer">
    <div class="text">
      <div class="first text-content">
        <span v-if="!globalStore.translate" class="en-text">
          <p>
            At Al-Hadaf Company, we believe that innovation and excellence are
          </p>
          <p>the foundations of success in the real estate world. Since our</p>
          <p>
            establishment in 2017, we have focused on one goal: to provide the
          </p>
          <p>best real estate solutions that combine modern design with high</p>
          <p>
            quality, fulfilling our clients' dreams of owning the perfect
            properties.
          </p>
        </span>
        <span v-else class="ar-text">
          <p>
            في شركة الهدف، نؤمن أن الابتكار والتميز هما أساس النجاح في عالم
            العقارات.
          </p>
          <p>منذ تأسيسنا في عام 2017، ركزنا على هدف واحد:</p>
          <p>
            تقديم أفضل الحلول العقارية التي تجمع بين التصميم العصري والجودة
            العالية،
          </p>
          <p>لتحقيق أحلام عملائنا بامتلاك العقار المثالي.</p>
        </span>
      </div>
      <div class="second text-content haveTitle">
        <div class="title">
          <h1 class="en-text" v-if="!globalStore.translate">our vision</h1>
          <h1 class="ar-text" v-else>رؤيتنا</h1>
        </div>
        <div class="content">
          <span class="en-text" v-if="!globalStore.translate">
            <p>
              We aspire to be the leading company in real estate development,
            </p>
            <p>
              investment, and marketing by offering unique projects that add
              real
            </p>
            <p>value to the communities we serve.</p>
          </span>
          <span class="ar-text" v-else>
            <p>
              نسعى لأن نكون الشركة الرائدة في تطوير وتسويق واستثمار العقارات،
            </p>
            <p>
              من خلال تقديم مشاريع فريدة تضيف قيمة حقيقية للمجتمعات التي نخدمها.
            </p>
          </span>
        </div>
      </div>
      <div class="third text-content haveTitle">
        <div class="title">
          <h1 class="en-text" v-if="!globalStore.translate">our mission</h1>
          <h1 class="ar-text" v-else>مهمتنا</h1>
        </div>
        <div class="content">
          <span class="en-text" v-if="!globalStore.translate">
            <p>
              We strive to provide innovative and diverse real estate solutions
            </p>
            <p>
              that meet our clients' needs and exceed their expectations,
              through
            </p>
            <p>
              a commitment to the highest standards of quality and transparency
              at all stages of work.
            </p>
          </span>
          <span class="ar-text" v-else>
            <p>نسعى لتقديم حلول عقارية مبتكرة ومتنوعة تلبي احتياجات عملائنا</p>
            <p>وتفوق توقعاتهم، عبر الالتزام بأعلى معايير الجودة والشفافية</p>
            <p>في جميع مراحل العمل.</p>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const globalStore = useMyGlobalStore();
const missionContainer = ref("");
onMounted(() => {
  const tl = useGsap.timeline({
    scrollTrigger: {
      trigger: missionContainer.value,
      start: "top 60%",
      end: "bottom bottom",
    },
  });

  tl.from(".ourMission .first p", {
    x: -40,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
  });
  tl.from(
    ".ourMission .haveTitle p",
    {
      y: -50,
      duration: 1,
      stagger: 0.1,
      opacity: 0,
    },
    0.3
  );
  tl.from(
    ".ourMission .haveTitle .title",
    {
      y: -50,
      duration: 1,
      stagger: 0.1,
      opacity: 0,
    },
    0.7
  );
});
</script>

<style scoped lang="scss">
.ourMission {
  margin-top: 100px;
  .text {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    flex-wrap: wrap;
    @media (max-width: 893px) {
      justify-content: center;
    }
    .first {
      font-size: 20px;
    }
    .second,
    .third {
      text-align: center;
    }
    .text-content {
      width: 400px;
      .title {
        font-size: 40px;
        margin-bottom: 30px;
        font-weight: bold;
        text-transform: capitalize;
      }
    }
  }
}
</style>
