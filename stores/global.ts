import { defineStore } from "pinia";

export const useMyGlobalStore = defineStore({
  id: "myGlobalStore",
  state: () => ({
    dropdown: false,
    contactMenu: false,
    translate: false,
    loadingValue: 0,
    isLoading: true,
    completeLoading: false,
    languages: false,
    scroll: true,
    error: {
      title: "",
      desc: "",
      show: false,
    },
  }),
  actions: {
    loading() {
      if (this.isLoading) {
        let int = setInterval(() => {
          if (this.completeLoading) {
            let int2 = setInterval(() => {
              if (this.loadingValue >= 100) {
                clearInterval(int);
                clearInterval(int2);
              } else {
                this.loadingValue++;
              }
            }, 10);
          } else {
            let int3 = setInterval(() => {
              if (this.loadingValue >= 78) {
                clearInterval(int3);
              } else {
                this.loadingValue++;
              }
            }, 10);
          }
        }, 10);
      }
    },
    callError(errorInfo: any) {
      this.error.show = true;
      this.error.title = errorInfo.title;
      this.error.desc = errorInfo.desc;
      setTimeout(() => {
        this.error.show = false;
        this.error.title = "";
        this.error.desc = "";
      }, 3000);
    },
  },
  getters: {
    direction: (state) => {
      return state.translate ? 1 : -1;
    },
  },
});
