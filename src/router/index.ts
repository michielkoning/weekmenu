import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { getSession } from "@/db/user";
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
    {
      path: "/reset-password",
      name: ROUTES.resetPassword,
      component: () => import("../views/ResetPasswordView.vue"),
    },
    {
      path: "/update-password",
      name: ROUTES.updatePassword,
      component: () => import("../views/UpdatePasswordView.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const publicRoutes = [
    ROUTES.login.toString(),
    ROUTES.register.toString(),
    ROUTES.resetPassword.toString(),
  ];
  const toName = to.name ? to.name.toString() : "";
  if (!publicRoutes.includes(toName) && !(await getSession())) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
