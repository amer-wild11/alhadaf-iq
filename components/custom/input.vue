<template>
  <div class="input">
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      :class="[props.error ? 'error' : '']"
      :required="props.required"
      v-model="inputValue"
      @input="sentData"
      v-if="!globalStore.translate"
    />
    <input
      type="props.type"
      :placeholder="props.placeholder"
      :class="[props.error ? 'error' : '']"
      :required="props.required"
      v-model="inputValue"
      @input="sentData"
      v-else
    />
  </div>
</template>

<script setup>
const globalStore = useMyGlobalStore();
const emit = defineEmits();

const inputValue = ref("");

const sentData = () => {
  emit("data-sent", inputValue.value);
};

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
  error: {
    type: Boolean,
    required: false,
  },
  required: {
    type: Boolean,
    required: false,
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
    &.error {
      border-color: rgb(165, 18, 18);
    }
    &::placeholder {
      font-size: 13px;
      font-weight: 300;
    }
  }
}
</style>
