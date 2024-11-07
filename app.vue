<template>
  <div id="app" :class="globalStore.translate ? 'ar' : ''">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
      <Dropdown />
      <ContactMenu />
      <Loading />
      <DashboardSidebar
        v-if="
          route.fullPath != '/' &&
          route.fullPath != '/login' &&
          route.fullPath != '/projects'
        "
      />
      <MainProjectDetails />
      <PropertyDetails />
      <DashboardGlobalAddMethod />
      <ErrorAlert
        :title="globalStore.error.title"
        :desc="globalStore.error.desc"
        v-if="globalStore.error.show"
      />
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute();
const globalStore = useMyGlobalStore();

watch(
  () => globalStore.translate,
  (newVal) => {
    if (newVal) {
      document.body.style.direction = "rtl";
    } else {
      document.body.style.direction = "ltr";
    }
  }
);

const customersStore = useMyCustomersStore();
const projectsStore = useMyProjectsStore();
const partnersStore = useMyPartnersStore();
const propertiesStore = useMyPropertiesStore();

projectsStore.getProjects();
partnersStore.getPartners();
customersStore.getCustomers();
propertiesStore.getProperties();
</script>

<style lang="scss"></style>
