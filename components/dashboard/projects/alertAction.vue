<template>
  <AlertDialog class="dialog">
    <AlertDialogTrigger as-child>
      <span>
        <Icon name="material-symbols-light:restore-from-trash" />
      </span>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          project.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="deleteProject">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const projectsStore = useMyProjectsStore();

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const deleteProject = async () => {
  const projectIndex = projectsStore.projects.indexOf(props.project);
  const response = await $fetch(
    `https://alhadaf-api.vercel.app/api/projects/${props.project.id}`,
    {
      method: "DELETE",
    }
  );
  if (response) {
    projectsStore.filteredProjects.splice(projectIndex, 1);
  }
};
</script>

<style scoped lang="scss">
.iconify {
  transform: translateY(2px);
}
</style>
