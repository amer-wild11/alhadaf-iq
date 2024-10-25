<template>
  <div @mousemove="onMouseMove" class="container">
    <div ref="follower" class="follower"></div>
    <button ref="menuButton" class="menu-button">Dropdown Menu</button>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      ballX: 0,
      ballY: 0,
      isNearButton: false,
      requestId: null,
    };
  },
  mounted() {
    // Start the animation loop
    this.animateFollower();
  },
  methods: {
    onMouseMove(e) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      // Check if the ball is near the button
      this.checkProximity();
    },
    checkProximity() {
      const button = this.$refs.menuButton.getBoundingClientRect();
      const distX = Math.abs(this.mouseX - (button.left + button.width / 2));
      const distY = Math.abs(this.mouseY - (button.top + button.height / 2));

      const threshold = 100; // المسافة التي تبدأ فيها الكرة بالتأثر بالزر

      if (distX < threshold && distY < threshold) {
        this.isNearButton = true;
      } else {
        this.isNearButton = false;
      }
    },
    animateFollower() {
      // Implementing "lerp" for smooth following effect
      const lerp = (start, end, factor) => start + (end - start) * factor;

      // Smoothly move the ball towards the mouse position
      this.ballX = lerp(
        this.ballX,
        this.mouseX,
        this.isNearButton ? 0.05 : 0.15
      );
      this.ballY = lerp(
        this.ballY,
        this.mouseY,
        this.isNearButton ? 0.05 : 0.15
      );

      // Apply the GSAP animation to move the ball
      gsap.set(this.$refs.follower, {
        x: this.ballX,
        y: this.ballY,
        scale: this.isNearButton ? 1.5 : 1, // Make the ball grow near the button
      });

      // Continue the animation loop
      this.requestId = requestAnimationFrame(this.animateFollower);
    },
  },
  beforeDestroy() {
    // Cancel the animation loop when the component is destroyed
    cancelAnimationFrame(this.requestId);
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.follower {
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1000;
  transition: transform 0.1s ease;
}

.menu-button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
