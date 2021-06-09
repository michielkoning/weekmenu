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
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: "/recepten",
        name: "RecipesHome",
        component: RecipesHome,
        children: [
          {
            path: "toevoegen",
            name: "RecipeAdd",
            component: () =>
              import(
                /* webpackChunkName: "RecipeDetails" */ "../views/Recipes/RecipeDetails.vue"
              ),
          },
          {
            path: ":id",
            meta: {
              showModal: true,
            },
            name: "RecipeDetails",
            component: () =>
              import(
                /* webpackChunkName: "RecipeDetails" */ "../views/Recipes/RecipeDetails.vue"
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
            /* webpackChunkName: "WeekMenuHome" */ "../views/WeekMenu/WeekMenuHome.vue"
          ),
        children: [
          {
            path: ":id",
            meta: {
              showModal: true,
            },
            name: "WeekMenuSelectRecipe",
            component: () =>
              import(
                /* webpackChunkName: "WeekMenuSelectRecipe" */ "../views/WeekMenu/WeekMenuSelectRecipe.vue"
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
