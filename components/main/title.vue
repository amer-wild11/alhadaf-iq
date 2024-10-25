<template>
  <div class="title container">
    <h1>{{ props.title }}</h1>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.title {
  width: 100%;
  text-align: center;
  font-size: 40px;
  font-weight: 500;
}
</style>
