<template>
  <div class="projectsSection container" id="projectsSection">
    <div class="header">
      <div class="title" ref="title">
        <h1 class="en-text" v-if="!globalStore.translate">
          <span>explore</span> <span>our</span> <span>portfolio</span>
        </h1>
        <h1 class="ar-text" v-else><span>استكشف</span> <span>محفظتنا</span></h1>
      </div>
      <NuxtLink to="projects">
        <div class="button" ref="button">
          <span class="en-text" v-if="!globalStore.translate"
            >all projects</span
          >
          <span class="ar-text" v-else>كل المشاريع</span>
        </div>
      </NuxtLink>
    </div>
    <div class="projects">
      <div
        class="project"
        v-for="(project, i) in data.projects.slice(0, 6)"
        :key="i"
        v-if="data.projects.length > 0"
        @click="setDetails(project)"
      >
        <div class="background">
          <img :src="project.images[0].url" alt="" />
        </div>
        <div class="content">
          <div class="link">
            <div class="icon">
              <img src="/main/icons/arrow.png" alt="" />
            </div>
          </div>
          <div class="info">
            <span class="name">{{ project.name }}</span>
            <span class="location">{{ project.location }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data } = await useFetch("/api/projects");

const globalStore = useMyGlobalStore();
const projectsStore = useMyProjectsStore();

const title = ref("");
const button = ref("");

const setDetails = (project) => {
  projectsStore.details = true;
  const details = {
    name: project.name,
    location: project.location,
    images: project.images,
  };
  projectsStore.projectDetails = details;
};

onMounted(() => {
  const tl = useGsap.timeline({
    scrollTrigger: {
      trigger: ".projectsSection",
      scrub: 1,
      end: "top top",
    },
  });
  tl.from(".projectsSection .header .title h1 span", {
    y: 60,
    opacity: 0,
    stagger: 0.1,
    duration: 1,
  });
  tl.from(
    ".projectsSection .header .button",
    {
      x: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
    },
    0
  );
  tl.from(".projectsSection .projects .project", {
    y: 60,
    opacity: 0,
    stagger: 0.1,
    duration: 1.6,
  });
});
</script>

<style scoped lang="scss">
.projectsSection {
  margin: 50px auto;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    margin-bottom: 50px;
    text-transform: capitalize;
    @media (max-width: 503px) {
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      text-align: center;
    }
    .title {
      h1 {
        font-size: 50px;
        font-weight: 500;
        span {
          display: inline-block;
        }
        @media (max-width: 767px) {
          font-size: 40px;
        }
      }
    }
    .button {
      padding: 10px 20px;
      border-radius: 10px;
      background-color: $main-color;
      color: white;
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
    }
  }
  .projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 30px;
    @media (max-width: 399px) {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
    .project {
      border-radius: 30px;
      height: 300px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        .icon {
          scale: 1 !important;
        }
        .name,
        .location {
          transform: translateY(0) !important;
          opacity: 1 !important;
        }
      }
      .background {
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
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        padding: 10px 20px;
        .icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          float: right;
          background-color: $main-color;
          display: flex;
          align-items: center;
          justify-content: center;
          scale: 0;
          transition: 0.3s ease-out;
          img {
            width: 20px;
          }
        }
        .info {
          display: flex;
          flex-direction: column;
          gap: 5px;
          color: white;
          .name {
            font-size: 25px;
            font-weight: 700;
            opacity: 0;
            transform: translateY(-30px);
            transition: 0.3s;
          }
          .location {
            font-size: 13px;
            opacity: 0;
            transition: 0.4s;
            transform: translateY(40px);
          }
        }
      }
    }
  }
}
</style>
