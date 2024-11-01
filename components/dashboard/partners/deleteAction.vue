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
          partner.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="deletePartner">Continue</AlertDialogAction>
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

const partnersStore = useMyPartnersStore();

const props = defineProps({
  partner: {
    type: Object,
    required: true,
  },
});

const deletePartner = async () => {
  const partnerIndex = partnersStore.partners.indexOf(props.partner);
  const response = await $fetch(
    `https://alhadaf-api.vercel.app/api/partners/${props.partner.id}`,
    {
      method: "DELETE",
    }
  );
  if (response) {
    partnersStore.filteredPartners.splice(partnerIndex, 1);
  }
};
</script>

<style scoped lang="scss">
.iconify {
  transform: translateY(2px);
}
</style>
