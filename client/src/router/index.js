import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

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

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("access_token") && to.name === "Home") {
    next({ name: "Login" });
  } else {
    next();
  }

  if (localStorage.getItem("access_token") && to.name === "Login") {
    next({ name: "Home" });
  } else if (localStorage.getItem("access_token") && to.name === "Register") {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
