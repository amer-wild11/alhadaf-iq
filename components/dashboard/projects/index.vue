<template>
  <section class="projectsSec">
    <div class="header">
      <div class="title">
        <h1>all projects ({{ projectsStore.projects.length }})</h1>
      </div>
      <div class="tools">
        <div class="search">
          <input
            type="text"
            placeholder="Search"
            v-model="searchValue"
            @input="searchProjects"
          />
        </div>
        <div class="add-button" @click="globalStore.addMethod = true">
          <Icon name="material-symbols:add-2-rounded" />
        </div>
      </div>
    </div>
    <div class="projects">
      <div
        class="project"
        v-for="project in projectsStore.filteredProjects"
        :key="project.id"
      >
        <div class="edit-delete">
          <div class="delete tool">
            <DashboardProjectsAlertAction :project="project" />
          </div>
        </div>

        <div class="image" @click="setDetails(project)">
          <img :src="project.images[0].url" alt="" />
        </div>
        <div class="content" @click="setDetails(project)">
          <div class="info">
            <span class="name">{{ project.name }}</span>
            <span class="location">{{ project.location }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const searchValue = ref("");
const globalStore = useMyGlobalStore();
const projectsStore = useMyProjectsStore();

const searchProjects = () => {
  const lowerCaseSearchTerm = searchValue.value.toLowerCase();
  const projects = projectsStore.projects;

  const filtered = projects.filter((project) => {
    const nameMatches = project.name
      .toLowerCase()
      .includes(lowerCaseSearchTerm);
    const locationMatches = project.location
      .toLowerCase()
      .includes(lowerCaseSearchTerm);

    return nameMatches || locationMatches;
  });

  projectsStore.filteredProjects = filtered.length > 0 ? filtered : projects;
};

const setDetails = (project) => {
  projectsStore.details = true;
  const details = {
    name: project.name,
    location: project.location,
    images: project.images,
    desc: project.desc,
    createdAt: project.createdAt,
  };
  projectsStore.projectDetails = details;
};
</script>

<style scoped lang="scss">
.projectsSec {
  padding: 20px;
  .header {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      color: $dash-text-color;
      font-weight: bold;
      h1 {
        font-size: 30px;
        text-transform: capitalize;
      }
    }
    .tools {
      display: flex;
      align-items: center;
      gap: 10px;
      .add-button {
        padding: 5px;
        border-radius: 5px;
        background-color: $dash-main-color;
        color: rgb(255, 255, 255);
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
  .projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 20px;
    row-gap: 10px;
    .project {
      cursor: pointer;
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      height: 270px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
      color: white;
      &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.555), transparent);
        z-index: 2;
      }
      .image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: 20px;
        }
      }
      .edit-delete {
        position: relative;
        z-index: 3;
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: end;
        .tool {
          width: 30px;
          height: 30px;
          border-radius: 5px;
          background-color: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          transition: 0.2s;
          &:hover {
            color: white;
            &.edit {
              background-color: rgb(41, 167, 41);
            }
            &.delete {
              background-color: red;
            }
          }
        }
      }
      .content {
        z-index: 3;
        position: relative;
        .info {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
</style>
