import { createRouter, createWebHistory } from "vue-router";
import { getSession } from "@/db/user";
import DashboardView from "@/views/DashboardView.vue";
import { ROUTES } from "@/enums/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      component: DashboardView,
      children: [
        {
          path: "",
          name: ROUTES.recipes_home,
          component: () => import("../views/Recipes/RecipesListView.vue"),
        },
        {
          path: "add/",
          name: ROUTES.recipes_add,
          component: () => import("../views/Recipes/RecipesUpsertView.vue"),
        },

        {
          path: ":id",
          name: ROUTES.recipes_details,
          props: true,
          component: () => import("../views/Recipes/RecipeDetailsView.vue"),
        },
        {
          path: ":id/edit",
          name: ROUTES.recipes_edit,
          props: true,
          component: () => import("../views/Recipes/RecipesUpsertView.vue"),
        },
        {
          path: "weekmenu",
          name: ROUTES.weekmenu_home,
          component: () => import("../views/WeekMenu/WeekMenuHome.vue"),
        },
      ],
    },

    {
      path: "/login",
      name: ROUTES.auth_login,
      component: () => import("../views/Auth/LoginView.vue"),
    },
    {
      path: "/register",
      name: ROUTES.auth_register,
      component: () => import("../views/Auth/RegisterView.vue"),
    },
    {
      path: "/reset-password",
      name: ROUTES.auth_resetPassword,
      component: () => import("../views/Auth/ResetPasswordView.vue"),
    },
    {
      path: "/update-password",
      name: ROUTES.auth_updatePassword,
      component: () => import("../views/Auth/UpdatePasswordView.vue"),
    },
  ],
});

router.beforeEach(async (to, _, next) => {
  const publicRoutes = [
    ROUTES.auth_login.toString(),
    ROUTES.auth_register.toString(),
    ROUTES.auth_resetPassword.toString(),
  ];
  const toName = to.name ? to.name.toString() : "";
  if (!publicRoutes.includes(toName) && !(await getSession())) {
    next({ name: ROUTES.auth_login });
  } else if (publicRoutes.includes(toName) && (await getSession())) {
    next({ name: ROUTES.recipes_home });
  } else {
    next();
  }
});

export default router;
