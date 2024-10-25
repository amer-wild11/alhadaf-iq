import { defineStore } from "pinia";

export const useMyGlobalStore = defineStore({
  id: "myGlobalStore",
  state: () => ({
    addMethod: false,
    addMethodContent: {
      image: '',
      location: ''
    }
  }),
  actions: {},
});
