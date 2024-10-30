import { defineStore } from "pinia";

export const useMyPartnersStore = defineStore({
  id: "myPartnersStore",
  state: () => ({
    partners: [] as any,
    upload: false,
  }),
  actions: {
    async getPartners() {
      const response = await $fetch<{
        partners: any;
      }>("/api/partners");

      if (response.partners) {
        this.partners = response.partners;
      }
    },
  },
});
