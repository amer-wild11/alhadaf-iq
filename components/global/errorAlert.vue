<template>
  <div class="error">
    <Alert variant="destructive" class="alert">
      <ExclamationTriangleIcon class="w-4 h-4" />
      <AlertTitle>{{ props.title }}</AlertTitle>
      <AlertDescription>{{ props.desc }}</AlertDescription>
    </Alert>
  </div>
</template>

<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon, TriangleDownIcon } from "@radix-icons/vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

</script>

<style scoped lang="scss">
.error {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  padding: 40px 0;
  .alert {
    background-color: rgb(255, 255, 255);
  }
}
</style>
