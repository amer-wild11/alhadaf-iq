<template>
  <div
    class="loading"
    :style="{ display: globalStore.loadingValue >= 100 ? 'none' : '' }"
  >
    <span>{{ globalStore.loadingValue }}%</span>
  </div>
</template>

<script setup>
const globalStore = useMyGlobalStore();
onNuxtReady(() => {
  globalStore.loading();
});
onMounted(() => {
  globalStore.completeLoading = true;
});
</script>

<style scoped lang="scss">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
}
</style>
