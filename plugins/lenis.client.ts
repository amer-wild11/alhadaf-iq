import Lenis from "@studio-freight/lenis";

export default defineNuxtPlugin(() => {
  let lenis: any = null;
  const globalStore = useMyGlobalStore();

  onMounted(() => {
    lenis = new Lenis({
      duration: 1.6,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    watch(
      () => globalStore.scroll,
      (newVal) => {
        if (newVal === false) {
          lenis.stop();
        } else {
          lenis.start();
        }
      },
      { immediate: true }
    );

    lenis.start(); // تأكد من تشغيل Lenis في البداية
    requestAnimationFrame(raf);
  });
});
