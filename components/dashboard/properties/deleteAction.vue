<template>
  <AlertDialog class="dialog">
    <AlertDialogTrigger as-child>
      <span>
        <Icon name="material-symbols-light:restore-from-trash" />
      </span>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          property.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="deleteProperty">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const propertiesStore = useMyPropertiesStore();

const props = defineProps({
  property: {
    type: Object,
    required: true,
  },
});

const deleteProperty = async () => {
  const propertyIndex = propertiesStore.properties.indexOf(props.property);
  const response = await $fetch(`/api/properties/${props.property.id}`, {
    method: "DELETE",
  });
  if (response) {
    propertiesStore.properties.splice(propertyIndex, 1);
  }
};
</script>

<style scoped lang="scss">
.iconify {
  transform: translateY(2px);
}
</style>
