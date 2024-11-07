<template>
  <div class="about" ref="aboutSection">
    <div class="background" ref="bgImage">
      <video
        ref="bgVideo"
        src="~/public/main/about-background.mp4"
        autoplay
        loop
        muted
      ></video>
    </div>
    <div class="text">
      <div ref="textWrapper" class="text-wrapper">
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

  const animateText = () => {
    // تحريك النص إلى الجهة اليسرى بمقدار عرضه
    if (text.value) {
      useGsap.to(text.value, {
        x: `-=${textWidth}`, // تحريك النص خارج الشاشة
        duration: 14, // مدة الحركة
        ease: "none",
        onComplete: () => {
          // عند انتهاء الحركة، نعيد النص إلى موضعه الأصلي
          useGsap.set(text.value, { x: wrapperWidth });
          animateText(); // إعادة تنفيذ الحركة
        },
      });
    }
  };

  // بدء الحركة
  animateText();

  // إضافة نص آخر للتحريك (النص المكرر)
  const animateTextClone = () => {
    // تحريك النص المستنسخ
    if (textClone.value) {
      useGsap.to(textClone.value, {
        x: `-=${textWidth}`, // تحريك النص المستنسخ
        duration: 14,
        ease: "none",
        onComplete: () => {
          useGsap.set(textClone.value, { x: wrapperWidth });
          animateTextClone(); // إعادة تنفيذ الحركة
        },
      });
    }
  };

  // بدء حركة النص المستنسخ
  animateTextClone();

  const tl = useGsap.timeline();
  if (bgImage.value && bgVideo.value) {
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
  }
});
</script>

<style scoped lang="scss">
.about {
  height: 100vh;
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
