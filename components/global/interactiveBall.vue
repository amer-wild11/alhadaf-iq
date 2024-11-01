<template>
  <div class="ball" ref="ball"></div>
</template>

<script setup>
const ball = ref("");

onMounted(() => {
  document.addEventListener("mousemove", (e) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (ball.value) {
      useGsap.to(ball.value, {
        x: clientX,
        y: clientY,
        duration: 1,
        ease: "power2",
      });
    }
  });
});
</script>

<style scoped lang="scss">
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 999;
  pointer-events: none;
  background-color: $lightly-main-color;
  @media (max-width: 767px) {
    display: none;
  }
}
</style>
