<template>
  <div
    class="investments-outer"
    ref="investmentContainer"
    id="investmentsSection"
  >
    <div class="title" ref="title">
      <MainTitle
        title="Path to Smart Investment"
        class="en-text"
        v-if="!globalStore.translate"
      />
      <MainTitle title="الطريق إلى الاستثمار الذكي" class="ar-text" v-else />
    </div>
    <div class="investments container">
      <div :class="['mainText', globalStore.translate ? 'ar' : '']">
        <div class="en-text" v-if="!globalStore.translate">
          <p>Smart</p>
          <p>Ownership</p>
        </div>
        <div class="ar-text" v-else>
          <p>ملكية</p>
          <p>ذكية</p>
        </div>
      </div>
      <div
        class="investment"
        :id="`investment-${i}`"
        v-for="(investment, i) in investments"
        :key="i"
        :class="`circle${i}`"
      >
        <pre :class="`circle${i}content`">
          <pre class="en-text" v-if="!globalStore.translate">{{ investment.content }}</pre>
          <pre class="ar-text" v-else>{{ investment.translated }}</pre>
        </pre>
      </div>
    </div>
    <div class="catalog-downloader">
      <div class="button" ref="catalogButton">
        <div class="icon">
          <img src="/main/icons/download.png" alt="" />
        </div>
        <span ref="catalogContent">
          <p class="en-text" v-if="!globalStore.translate">Catalog Download</p>
          <p class="ar-text" v-else>تحميل الكاتالوج</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const title = ref("");
const catalogButton = ref("");
const catalogContent = ref("");
const globalStore = useMyGlobalStore();

const investmentContainer = ref("");

const investments = [
  {
    content: `10% Initial
Investment`,
    translated: `10% استثمار أولي`,
  },
  {
    content: `Flexible Payment
Plans
(up to 5 years)`,
    translated: `خطط سداد مرنة
(تصل إلى 5 سنوات)`,
  },
  {
    content: `Projected Rental
Income ~ 15%`,
    translated: `الدخل الإيجاري
المتوقع ~ 15%`,
  },
];

onMounted(() => {
  if (window.innerWidth > 767) {
    const tl = useGsap.timeline({
      scrollTrigger: {
        trigger: investmentContainer.value,
        scrub: 1,
        pin: true,
        end: "+=3000",
      },
    });
    tl.from(title.value, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: investmentContainer.value,
        scrub: 1,
      },
    });
    tl.to(
      ".circle0",
      {
        left: "44%",
        top: "50%",
        duration: 1,
        ease: "power1.in-out",
      },
      0
    );
    tl.to(
      ".circle1",
      {
        left: " 50%",
        top: "30%",
        duration: 1,
        ease: "power1.in-out",
      },
      0
    );
    tl.to(
      ".circle2",
      {
        left: "56%",
        top: "50%",
        duration: 1,
        ease: "power1.in-out",
      },
      0
    );
    tl.to(
      ".circle0content",
      {
        opacity: 0,
        duration: 0.4,
      },
      1
    );
    tl.to(
      ".circle1content",
      {
        opacity: 0,
        duration: 0.4,
      },
      1
    );
    tl.to(
      ".circle2content",
      {
        opacity: 0,
        duration: 0.4,
      },
      1
    );
    tl.from(".investments-outer .investments .mainText", {
      opacity: 0,
      y: 30,
      duration: 1,
    });
    tl.to([".circle0", ".circle1", ".circle2"], {
      top: "50%",
      left: "50%",
      duration: 0.5,
    });
    tl.to(catalogButton.value, {
      width: 200,
      borderRadius: "10px",
    });
    tl.from(catalogContent.value, {
      display: "none",
      opacity: 0,
      duration: 1,
    });
  } else {
    const tl = useGsap.timeline({
      scrollTrigger: {
        trigger: investmentContainer.value,
        scrub: 1,
      },
    });
    tl.to(catalogButton.value, {
      width: 200,
      borderRadius: "10px",
    });
    tl.from(catalogContent.value, {
      display: "none",
      opacity: 0,
      duration: 1,
    });
  }
});
</script>

<style scoped lang="scss">
.investments-outer {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 100px 0;
  .investments {
    position: relative;
    display: flex;
    width: 100%;
    flex-grow: 1;
    .mainText {
      display: none;
    }
    @media (max-width: 767px) {
      flex-direction: column;
      height: 700px;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }
    @media (min-width: 768px) {
      .mainText {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        display: unset;
        &.ar {
          left: 51.5%;
        }
      }
    }
    .investment {
      text-align: center;
      position: relative;
      font-size: 20px;
      font-weight: 500;

      @media (min-width: 768px) {
        position: absolute;
        transform: translate(-50%, -50%);

        &#investment-0 {
          left: 33%;
          top: 50%;
        }
        &#investment-1 {
          left: 50%;
          top: 50%;
        }
        &#investment-2 {
          left: 67%;
          top: 50%;
        }

        @media (max-width: 1230px) {
          &#investment-0 {
            left: 27%;
            top: 50%;
          }
          &#investment-1 {
            left: 50%;
            top: 50%;
          }
          &#investment-2 {
            left: 73%;
            top: 50%;
          }
        }
        @media (max-width: 1023px) {
          &#investment-0 {
            left: 22%;
            top: 50%;
          }
          &#investment-1 {
            left: 50%;
            top: 50%;
          }
          &#investment-2 {
            left: 78%;
            top: 50%;
          }
        }
      }
      pre {
        z-index: 1;
        position: relative;
        text-align: center;
      }
      &::before {
        content: "";
        width: 300px;
        height: 300px;
        border-radius: 50%;
        border: 2px solid $main-color;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
        @media (max-width: 1023px) {
          width: 250px;
          height: 250px;
        }
      }
    }
  }
  .catalog-downloader {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .button {
      margin: auto;
      display: flex;
      align-items: center;
      gap: 10px;
      background: $main-color;
      color: white;
      border-radius: 50%;
      cursor: pointer;
      padding: 0 5px;
      height: 40px;
      border-radius: 10px;
      @media (min-width: 768px) {
        width: 40px;
      }
      span {
        font-size: 15px;
        font-weight: 500;
      }
      .icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        color: $main-color;
      }
    }
  }
}
</style>
