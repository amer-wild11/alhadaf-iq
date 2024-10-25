<template>
  <aside>
    <div class="logo">
      <img src="/dashboard/malamihLogo.png" alt="" />
    </div>
    <ul class="links">
      <li v-for="(link, i) in links">
        <NuxtLink :to="link.path">
          <div class="icon">
            <Icon :name="link.icon" />
          </div>
          <div class="name">
            <span>{{ link.name }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<script setup>
const links = [
  {
    icon: "pixelarticons:briefcase",
    name: "Projects",
    path: "/dashboard",
  },
  {
    icon: "hugeicons:property-new",
    name: "properties",
    path: "/properties",
  },
  {
    icon: "carbon:partnership",
    name: "partners",
    path: "/partners",
  },
  {
    icon: "ri:customer-service-2-fill",
    name: "customers",
    path: "/customers",
  },
];
</script>

<style scoped lang="scss">
aside {
  position: fixed;
  top: 0;
  left: 0;
  width: $sidebar-width;
  height: 100dvh;
  padding: 20px;
  border-right: 1px solid $light-dash;
  color: $dash-text-color;
  .logo {
    width: 150px;
    margin: auto;
    margin-bottom: 30px;
    img {
      filter: grayscale(100%) brightness(0%);
    }
  }
  .links {
    display: flex;
    flex-direction: column;
    gap: 10px;
    li {
      a {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 4px 7px;
        border-radius: 7px;
        user-select: none;
        cursor: pointer;
        position: relative;
        transition: 0.2s ease-out;
        &.router-link-active {
          color: white;
          background-color: $light-main-color;
          &::before {
            height: 80% !important;
          }
        }
        &::before {
          content: "";
          width: 2%;
          height: 0%;
          position: absolute;
          top: 50%;
          right: 0;
          background-color: $main-color;
          border-radius: 50px;
          transform: translateY(-50%);
          transition: 0.2s ease-out;
        }
        .icon {
          font-size: 19px;
          transform: translateY(10%);
        }
        .name {
          text-transform: capitalize;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
