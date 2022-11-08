import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Recipes/RecipesListView.vue";
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
      component: () => import("../views/Recipes/RecipesEditView.vue"),
    },

    {
      path: "/:id",
      name: ROUTES.details,
      props: true,
      component: () => import("../views/Recipes/RecipeDetailsView.vue"),
    },
    {
      path: "/:id/edit",
      name: ROUTES.edit,
      props: true,
      component: () => import("../views/Recipes/RecipesEditView.vue"),
    },
    {
      path: "/login",
      name: ROUTES.login,
      component: () => import("../views/User/LoginView.vue"),
    },
    {
      path: "/register",
      name: ROUTES.register,
      component: () => import("../views/User/RegisterView.vue"),
    },
  ],
});

router.beforeEach(async (to, _, next) => {
  const publicRoutes = [ROUTES.login.toString(), ROUTES.register.toString()];
  const toName = to.name ? to.name.toString() : "";
  if (!publicRoutes.includes(toName) && !(await getUser())) {
    next({ name: ROUTES.login });
  } else if (publicRoutes.includes(toName) && (await getUser())) {
    next({ name: ROUTES.home });
  } else {
    next();
  }
});

export default router;
