<template>
  <div
    class="advantages-outer container"
    ref="advantagesSection"
    id="advantagsSection"
  >
    <header>
      <ul>
        <li ref="dotTitle" :class="globalStore.translate ? 'ar' : ''">
          <span class="en-text" v-if="!globalStore.translate"
            >Explore Our Advantages</span
          >
          <span class="ar-text" v-else>تصفح مميزاتنا</span>
        </li>
      </ul>
    </header>
    <div class="title">
      <div class="intro">
        <h1 ref="title">
          <div class="en-text" v-if="!globalStore.translate">
            <p>Why Our Company</p>
            <p>Stands Out?</p>
          </div>
          <div class="ar-text" v-else>
            <p>ماهي مميزات الهدف؟</p>
          </div>
        </h1>
      </div>
      <div class="contact-button contactMenuButton" ref="contactButton">
        <div class="icon">
          <img src="/main/icons/phone.png" alt="" />
        </div>
        <span ref="contactButtonContent" @click="openContactMenu">
          <div class="en-text" v-if="!globalStore.translate">
            Contact Us Now
          </div>
          <div class="ar-text" v-else>تواصل معنا الأن</div>
        </span>
      </div>
    </div>
    <div class="advantages">
      <div class="advantage" v-for="(advantage, i) in advantages" :key="i">
        <div class="icon">
          <img :src="advantage.image" alt="" />
        </div>
        <div class="title-desc">
          <span class="title">
            <span class="en-text" v-if="!globalStore.translate">{{
              advantage.title
            }}</span>
            <span class="ar-text" v-else>{{ advantage.translatedTitle }}</span>
          </span>
          <span class="desc">
            <span class="en-text" v-if="!globalStore.translate">{{
              advantage.desc
            }}</span>
            <span class="ar-text" v-else>{{ advantage.translatedDesc }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const globalStore = useMyGlobalStore();

const openContactMenu = () => {
  globalStore.contactMenu = true;
};

const advantages = [
  {
    image: "/main/advantages/1.png",
    title: "Diversity",
    translatedTitle: "تنوع",
    desc: `Our projects cater to a wide range of preferences, appealing to a global clientele`,
    translatedDesc:
      "تلبي مشاريعنا مجموعة واسعة من التفضيلات، وتجذب عملاء عالميين",
  },
  {
    image: "/main/advantages/2.png",
    title: "Safety",
    translatedTitle: "أمان",
    desc: `We prioritize secure investments, ensuring peace of mind for our clients`,
    translatedDesc:
      "نحن نعطي الأولوية للاستثمارات الآمنة، ونضمن راحة البال لعملائنا",
  },
  {
    image: "/main/advantages/3.png",
    title: "Market Stability",
    translatedTitle: "استقرار السوق",
    translatedDesc:
      "تقع عقاراتنا في مناطق رئيسية، مما يضمن ارتفاع قيمتها على المدى الطويل",
    desc: `Our properties are located in prime areas, ensuring long-term value appreciation`,
  },
  {
    image: "/main/advantages/4.png",
    title: "Low Financing Rates",
    translatedTitle: "أسعار تمويل منخفضة",
    translatedDesc:
      "تتوفر أسعار رهن عقاري تنافسية، مما يجعل شراء العقارات في متناول الجميع",
    desc: `Competitive mortgage rates available, making property acquisition accessible for everyone`,
  },
  {
    image: "/main/advantages/5.png",
    title: "Streamlined Acquisition Process",
    translatedTitle: "عملية الاستحواذ المبسطة",
    translatedDesc:
      "نحن نتولى جميع تفاصيل المعاملات، مما يجعل تجربة شراء العقارات أسهل لعملائنا",
    desc: `We handle all transaction details, simplifying the property buying experience for our clients`,
  },
  {
    image: "/main/advantages/6.png",
    title: "Residency Opportunities",
    translatedTitle: "فرص الإقامة",
    translatedDesc:
      "الاستثمار في مشاريعنا يمكن أن يؤدي إلى فوائد الإقامة المحتملة",
    desc: `Investing in our projects can lead to potential residency benefits`,
  },
];

const contactButton = ref("");
const contactButtonContent = ref("");
const advantagesSection = ref("");
const title = ref("");
const dotTitle = ref("");

onMounted(() => {
  const tl = useGsap.timeline({
    scrollTrigger: {
      trigger: advantagesSection.value,
      end: "bottom bottom",
    },
  });

  tl.to(
    contactButton.value,
    {
      width: 170,
      borderRadius: "50px",
      ease: "power3.inOut",
      duration: 1,
    },
    0
  );

  tl.to(contactButtonContent.value, {
    display: "unset",
    opacity: 1,
    duration: 1,
  });

  tl.from(
    ".advantages-outer .title h1 p",
    {
      y: 50,
      opacity: 0,
      stagger: 0.8,
      duration: 1,
    },
    0
  );

  tl.from(
    dotTitle.value,
    {
      y: 40,
      opacity: 0,
      duration: 1,
    },
    0
  );

  tl.from(".advantages-outer .advantages .advantage", {
    y: 60,
    opacity: 0,
    duration: 0.5,
    stagger: 0.2,
  });
});
</script>

<style scoped lang="scss">
.advantages-outer {
  header {
    ul {
      width: 100%;
      margin-bottom: 52px;
      li {
        position: relative;
        color: $main-color;
        font-size: 23px;
        font-weight: bold;
        @media (max-width: 767px) {
          font-size: 15px;
        }
        &.ar {
          &::before {
            right: -20px;
          }
        }
        &::before {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: -20px;
          transform: translateY(-50%);
          background-color: $main-color;
        }
      }
    }
  }
  > .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 140px;
    h1 {
      font-size: 50px;
      font-weight: 300;
      line-height: 70px;
      @media (max-width: 767px) {
        font-size: 30px;
        line-height: 40px;
      }
      @media (max-width: 476px) {
        font-size: 20px;
        line-height: 30px;
      }
    }
    .contact-button {
      display: flex;
      align-items: center;
      gap: 6px;
      background-color: $main-color;
      color: white;
      cursor: pointer;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      padding: 5px;
      .icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        @media (max-width: 767px) {
          width: 25px;
          height: 25px;
        }
      }
      span {
        font-size: 14px;
        display: none;
        opacity: 0;
        @media (max-width: 767px) {
          font-size: 12px;
        }
      }
    }
  }
  .advantages {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
    row-gap: 70px;
    .advantage {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 406px;
      .icon {
        img {
          width: 35px;
        }
      }
      .title-desc {
        display: flex;
        flex-direction: column;
        .title {
          margin-bottom: 40px;
          font-weight: 700;
          font-size: 20px;
        }
        .desc {
          line-height: 24px;
        }
      }
    }
  }
}
</style>
