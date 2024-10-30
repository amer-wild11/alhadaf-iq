import { defineStore } from "pinia";

export const useMyProjectsStore = defineStore({
  id: "myProjectsStore",
  state: () => ({
    projectDetails: {
      name: "",
      location: "",
      desc: "",
      images: [],
      createdAt: "",
    },
    details: false,
    projects: [] as any[],
  }),
  actions: {
    async getProjects() {
      const response = await $fetch<{ projects: any[] }>("/api/projects");

      if (response) {
        this.projects = response.projects;
      }
    },
  },
});
