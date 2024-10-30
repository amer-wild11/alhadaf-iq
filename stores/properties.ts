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
  }),
  actions: {
    async getProperties() {
      const response = await $fetch("/api/properties");
      if (response) {
        this.properties = response.properties;
      }
    },
  },
  getters: {},
});
