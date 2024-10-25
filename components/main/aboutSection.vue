<template>
  <div class="about" ref="aboutSection">
    <div class="background" ref="bgImage">
      <video
        ref="bgVideo"
        src="/main/about-background.mp4"
        autoplay
        loop
        muted
      ></video>
    </div>
    <div class="text">
      <div ref="textWrapper" class="text-wrapper container">
        <p ref="text" class="scrolling-text">
          <span class="en-text" v-if="!globalStore.translate">
            We aim to lead in real estate by delivering unique, value-adding
            projects.
          </span>
          <span class="ar-text" v-else>
            نهدف إلى الريادة في مجال العقارات من خلال تقديم مشاريع فريدة ذات
            قيمة مضافة.
          </span>
        </p>
        <p ref="textClone" class="scrolling-text">
          <span class="en-text" v-if="!globalStore.translate">
            We aim to lead in real estate by delivering unique, value-adding
            projects.
          </span>
          <span class="ar-text" v-else>
            نهدف إلى الريادة في مجال العقارات من خلال تقديم مشاريع فريدة ذات
            قيمة مضافة.
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const textWrapper = ref(null);
const text = ref(null);
const textClone = ref(null);
const bgImage = ref("");
const bgVideo = ref("");
const aboutSection = ref("");
const globalStore = useMyGlobalStore();

onMounted(() => {
  const textWidth = text.value.offsetWidth; // عرض النص
  const wrapperWidth = textWrapper.value.offsetWidth; // عرض منطقة النص

  useGsap.to(bgVideo.value, {
    currentTime: 20, // تعيين الفيديو ليبدأ من الثانية 20
    duration: 0, // لا نحتاج مدة هنا لأننا نريد فقط ضبط الوقت فوراً
    onComplete: () => {
      bgVideo.value.play(); // تشغيل الفيديو إذا كان متوقفاً بعد التعديل
    },
  });

  useGsap.to([text.value, textClone.value], {
    x: `+=${textWidth}`, // تحريك النص إلى الجهة اليسرى بمقدار عرضه
    duration: 14, // مدة الحركة
    ease: "none", // الحركة يجب أن تكون ثابتة ومستقرة
    repeat: -1, // تكرار لانهائي
    modifiers: {
      x: (x) => {
        // في حال خروج النص من الجهة اليسرى، يرجع النص من الجهة اليمنى
        return (
          "-" +
          useGsap.utils.wrap(-textWidth, wrapperWidth, parseFloat(x)) +
          "px"
        );
      },
    },
  });

  const tl = useGsap.timeline();
  tl.to(bgImage.value, {
    y: 0,
    scale: 1,
    borderRadius: 0,
    scrollTrigger: {
      trigger: aboutSection.value,
      scrub: 1,
      end: "bottom bottom",
    },
  });

  tl.to(bgVideo.value, {
    borderRadius: 0,
    scrollTrigger: {
      trigger: aboutSection.value,
      scrub: 1,
      end: "bottom bottom",
    },
  });

  tl.to(bgVideo.value, {
    width: "90%",
    duration: 1,
    delay: 0.2,
    scrollTrigger: {
      trigger: aboutSection.value,
      scrub: 1,
      start: "90% 50%",
    },
  });
});
</script>

<style scoped lang="scss">
.about {
  height: 100dvh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  direction: ltr;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    transform: translateY(50%);
    scale: 0.4;
    img,
    video {
      border-radius: 100px;
      width: 100%;
      margin: auto;
      height: 100%;
      object-fit: cover;
    }
  }

  .text {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    font-size: 50px;
    color: white;
    font-weight: bold;
    text-align: center;
    .text-wrapper {
      display: flex;
      white-space: nowrap;
      overflow: hidden;
      position: relative;
    }

    .scrolling-text {
      padding-right: 100px;
    }

    @media (max-width: 767px) {
      font-size: 30px;
    }
  }
}
</style>
