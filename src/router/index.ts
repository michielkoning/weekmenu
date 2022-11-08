import { createRouter, createWebHistory } from "vue-router";
import { getSession } from "@/db/user";
import HomeView from "@/views/Recipes/RecipesListView.vue";
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
    {
      path: "/reset-password",
      name: ROUTES.resetPassword,
      component: () => import("../views/User/ResetPasswordView.vue"),
    },
    {
      path: "/update-password",
      name: ROUTES.updatePassword,
      component: () => import("../views/User/UpdatePasswordView.vue"),
    },
  ],
});

router.beforeEach(async (to, _, next) => {
  const publicRoutes = [
    ROUTES.login.toString(),
    ROUTES.register.toString(),
    ROUTES.resetPassword.toString(),
  ];
  const toName = to.name ? to.name.toString() : "";
  if (!publicRoutes.includes(toName) && !(await getSession())) {
    next({ name: ROUTES.login });
  } else if (publicRoutes.includes(toName) && (await getSession())) {
    next({ name: ROUTES.home });
  } else {
    next();
  }
});

export default router;
