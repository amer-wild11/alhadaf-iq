export default defineNuxtRouteMiddleware((to, from) => {
  const loginCookie = useCookie("login").value; // الحصول على قيمة الكوكي login

  const isAuthenticated = !!loginCookie;

  if (isAuthenticated && to.fullPath == "/login") {
    return navigateTo("/dashboard");
  }

  const protectedRoutes = [
    "/dashboard",
    "/customers",
    "/partners",
    "/properties",
  ];

  // إذا لم يكن المستخدم موثقاً وحاول الوصول إلى صفحة تتطلب تسجيل دخول
  if (!isAuthenticated && protectedRoutes.includes(to.fullPath)) {
    return navigateTo("/login");
  }
});
