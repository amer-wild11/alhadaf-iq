import { defineStore } from "pinia";

export const useMyPropertiesStore = defineStore({
  id: "myPropertiesStore",
  state: () => ({
    properties: [] as any,
    propertyDetails: {
      name: "",
      images: [],
      createdAt: "",
    },
    details: false,
    upload: false,
    filteredProperties: [] as any,
  }),
  actions: {
    async getProperties() {
      const response = await $fetch<any>(
        "https://alhadaf-api.vercel.app/api/properties"
      );
      if (response) {
        this.properties = response.properties;
        this.filteredProperties = response.properties;
      }
    },
  },
  getters: {},
});
