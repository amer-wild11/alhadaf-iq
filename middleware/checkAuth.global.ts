export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = true;
  if (to.path != "/" && !isAuthenticated && to.path != "/login") {
    return navigateTo("/");
  }
  if (to.path == "/login" && isAuthenticated) {
    return navigateTo("/dashboard");
  }
});
