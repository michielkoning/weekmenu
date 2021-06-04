import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import RecipesHome from "../views/Recipes/RecipesHome.vue";
import { getCurrentUser } from "./../firebase";

const routes = [
  {
    path: "/inloggen",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },
  {
    path: "/registreren",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "Register" */ "../views/Register.vue"),
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    props: true,
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: "/recepten",
        name: "RecipesHome",
        component: RecipesHome,
        props: true,
        children: [
          {
            path: "toevoegen",
            name: "RecipeAdd",
            component: () =>
              import(
                /* webpackChunkName: "RecipesDetails" */ "../views/Recipes/RecipeDetails.vue"
              ),
            props: true,
          },
          {
            path: ":id",
            name: "RecipeDetails",
            component: () =>
              import(
                /* webpackChunkName: "RecipesDetails" */ "../views/Recipes/RecipeDetails.vue"
              ),
            props: true,
          },
        ],
      },
      {
        path: "/",
        name: "WeekMenuHome",
        component: () =>
          import(
            /* webpackChunkName: "WeekMenu" */ "../views/WeekMenu/WeekMenuHome.vue"
          ),
        props: true,
        children: [
          {
            path: ":id",
            name: "WeekMenuSelectRecipe",
            component: () =>
              import(
                /* webpackChunkName: "WeekMenu2" */ "../views/WeekMenu/WeekMenuSelectRecipe.vue"
              ),
            props: true,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next({
        path: "/inloggen",
      });
    }
  } else {
    next();
  }
});

export default router;
