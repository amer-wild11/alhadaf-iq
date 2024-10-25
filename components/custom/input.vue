<template>
  <div class="input">
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      v-if="!globalStore.translate"
    />
    <input
      :type="props.type"
      :placeholder="props.translatedPlaceholder"
      v-else
    />
  </div>
</template>

<script setup>
const globalStore = useMyGlobalStore();
const props = defineProps({
  type: {
    required: true,
    type: String,
  },
  placeholder: {
    required: true,
    type: String,
  },
  translatedPlaceholder: {
    required: true,
    type: String,
  },
});
</script>

<style scoped lang="scss">
.input {
  display: flex;
  flex-direction: column;
  gap: 5px;
  label {
    text-transform: capitalize;
  }
  input {
    border: 1px solid lightgray;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 13px;
    font-weight: 300;
    &::placeholder {
      font-size: 13px;
      font-weight: 300;
    }
  }
}
</style>
