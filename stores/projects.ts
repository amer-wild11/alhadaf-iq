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
    filteredProjects: [] as any[],
  }),
  actions: {
    async getProjects() {
      const response = await $fetch<{ projects: any[] }>(
        "https://alhadaf-api.vercel.app/api/projects"
      );

      if (response) {
        this.projects = response.projects;
        this.filteredProjects = response.projects;
      }
    },
  },
});
