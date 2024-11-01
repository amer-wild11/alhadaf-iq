import { defineStore } from "pinia";

export const useMyCustomersStore = defineStore({
  id: "myCustomersStore",
  state: () => ({
    customers: [] as any,
    filteredCustomers: [] as any,
  }),
  actions: {
    async getCustomers() {
      const response = await $fetch<any>(
        "https://alhadaf-api.vercel.app/api/customers"
      );
      if (response) {
        this.customers = response.customers;
        this.filteredCustomers = response.customers;
      }
    },
  },
});
