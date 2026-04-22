import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/find",
    name: "FindFavorite",
    component: () => import("../views/FindFavorite.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const protectedRoutes = ["Home", "FindFavorite"];
  const isLoggedIn = !!localStorage.getItem("access_token");
  if (!isLoggedIn && protectedRoutes.includes(to.name)) {
    next({ name: "Login" });
  } else if (isLoggedIn && (to.name === "Login" || to.name === "Register")) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
