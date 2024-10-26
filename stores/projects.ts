import { defineStore } from "pinia";

export const useMyProjectsStore = defineStore({
  id: "myProjectsStore",
  state: () => ({
    projectDetails: {
      name: "",
      location: "",
      desc: "",
      images: [],
    },
    details: false,
  }),
  actions: {},
});
