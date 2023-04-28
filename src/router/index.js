import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/components/Login";
import StudentsTable from "@/components/StudentsTable";
import store from "@/store";
import NotFound from "@/components/NotFound";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/students",
    name: "App",
    component: StudentsTable,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isLoggedIn = store.getters.isLoggedIn;

  if (requiresAuth && !isLoggedIn) {
    next("/");
  } else if (!requiresAuth && isLoggedIn) {
    next("/students");
  } else {
    next();
  }
});

export default router
