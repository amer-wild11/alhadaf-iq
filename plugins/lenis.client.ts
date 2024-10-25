import Lenis from "@studio-freight/lenis";

export default defineNuxtPlugin(() => {
  let lenis: any = null;

  lenis = new Lenis({
    duration: 1.6,
  });

  // Update the Lenis scroll on each animation frame
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});
