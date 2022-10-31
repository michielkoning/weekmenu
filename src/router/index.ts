import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { getUser } from "@/db/user";
import { ROUTES } from "@/enums/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: ROUTES.home,
      component: HomeView,
    },
    {
      path: "/add/",
      name: ROUTES.add,
      component: () => import("../views/FormRecipesView.vue"),
    },

    {
      path: "/:id",
      name: ROUTES.details,
      props: true,
      component: () => import("../views/RecipeDetailsView.vue"),
    },
    {
      path: "/:id/edit",
      name: ROUTES.edit,
      props: true,
      component: () => import("../views/FormRecipesView.vue"),
    },
    {
      path: "/login",
      name: ROUTES.login,
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: ROUTES.register,
      component: () => import("../views/RegisterView.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const guardRouters = [ROUTES.login, ROUTES.register];
  if (!guardRouters.includes(to.name) && !(await getUser())) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
