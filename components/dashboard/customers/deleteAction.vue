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
          customer.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="deleteCustomer">Continue</AlertDialogAction>
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

const customersStore = useMyCustomersStore();

const props = defineProps({
  customer: {
    type: Object,
    required: true,
  },
});

const deleteCustomer = async () => {
  const customerIndex = customersStore.customers.indexOf(props.customer);
  const response = await $fetch(
    `https://alhadaf-api.vercel.app/api/customers/${props.customer.id}`,
    {
      method: "DELETE",
    }
  );
  if (response) {
    customersStore.filteredCustomers.splice(customerIndex, 1);
  }
};
</script>

<style scoped lang="scss">
.iconify {
  transform: translateY(2px);
}
</style>
