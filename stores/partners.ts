import { defineStore } from "pinia";

export const useMyPartnersStore = defineStore({
  id: "myPartnersStore",
  state: () => ({
    partners: [] as any,
    filteredPartners: [] as any,
    upload: false,
  }),
  actions: {
    async getPartners() {
      const response = await $fetch<{
        partners: any;
      }>("https://alhadaf-api.vercel.app/api/partners");

      if (response.partners) {
        this.partners = response.partners;
        this.filteredPartners = response.partners;
      }
    },
  },
});
