<template>
  <main>
    <div class="projects-list">
      <div class="header">
        <div class="title">
          <h1>Our projects</h1>
        </div>
        <div class="close">
          <NuxtLink to="/">
            <Icon name="material-symbols:close-rounded" />
          </NuxtLink>
        </div>
      </div>
      <div class="projects">
        <div
          class="project"
          v-for="project in projectsStore.projects"
          :key="project.id"
          @click="setDetails(project)"
        >
          <div class="bg">
            <img :src="project.images[0].url" alt="" />
          </div>
          <div class="content">
            <div class="link">
              <img src="/main/icons/arrow.png" alt="" />
            </div>
            <div class="info">
              <div class="name">
                <span>{{ project.name }}</span>
              </div>
              <div class="location">
                <span>{{ project.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const projectsStore = useMyProjectsStore();

onMounted(() => {
  useGsap.from(".projects-list .projects .project", {
    y: 100,
    opacity: 0,
    stagger: 0.1,
  });
});

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
main {
  .projects-list {
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
      background-color: white;
      padding: 20px 30px;
      .title {
        font-size: 30px;
        font-weight: 600;
      }
      .close {
        a {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 1px solid lightgray;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
        }
      }
    }
    .projects {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 10px;
      padding: 20px;
      .project {
        height: 300px;
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        cursor: pointer;
        .bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .content {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          height: 100%;
          padding: 10px;
          .link {
            background-color: $main-color;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            align-self: right;
            img {
              width: 14px;
            }
          }
          .info {
            color: white;
            .name {
              font-weight: 600;
              font-size: 20px;
              &::first-letter {
                text-transform: uppercase;
              }
            }
            .location {
              font-weight: 500;
              font-size: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
