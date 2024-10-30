import { defineStore } from "pinia";

export const useMyCustomersStore = defineStore({
  id: "myCustomersStore",
  state: () => ({
    customers: [] as any,
  }),
  actions: {
    async getCustomers() {
      const response = await $fetch("/api/customers");
      if (response) {
        this.customers = response.customers;
      }
    },
  },
});
