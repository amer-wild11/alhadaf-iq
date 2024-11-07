export default defineNuxtRouteMiddleware((to, from) => {
  const loginCookie = useCookie("login").value; // الحصول على قيمة الكوكي login

  const isAuthenticated = !!loginCookie;

  if (isAuthenticated && to.fullPath == "/login") {
    return navigateTo("/dashboard");
  }

  if (
    !isAuthenticated &&
    to.fullPath != "/" &&
    to.fullPath != "/projects" &&
    to.fullPath != "/login"
  ) {
    return navigateTo("/login");
  }
});
