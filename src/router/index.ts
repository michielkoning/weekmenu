import { createRouter, createWebHistory } from "vue-router";
import Recipes from "../views/Recipes.vue";
import Dashboard from "../views/Dashboard.vue";
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
        path: "/weekmenu",
        name: "Weeks",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "WeeksHome" */ "../views/Weeks/WeeksHome.vue"
          ),
        children: [
          {
            path: ":id/:day?",
            name: "WeeksDetails",
            component: () =>
              import(
                /* webpackChunkName: "WeeksDetails" */ "../views/Weeks/WeeksDetails.vue"
              ),
            props: true,
          },
        ],
      },
      {
        path: "",
        name: "Recipes",
        component: Recipes,
        children: [
          {
            path: "add",
            name: "RecipeAdd",
            component: () =>
              import(
                /* webpackChunkName: "RecipeEdit" */ "../views/Recipes/RecipeEdit.vue"
              ),
          },

          {
            path: ":id/edit",
            name: "RecipeEdit",
            component: () =>
              import(
                /* webpackChunkName: "RecipeEdit" */ "../views/Recipes/RecipeEdit.vue"
              ),
            props: true,
          },
          {
            path: ":id",
            name: "RecipeDetails",
            component: () =>
              import(
                /* webpackChunkName: "RecipeDetails" */ "../views/Recipes/RecipeDetails.vue"
              ),
            props: true,
          },
          {
            path: "",
            name: "RecipeHome",
            component: () =>
              import(
                /* webpackChunkName: "RecipeDetails" */ "../views/Recipes/RecipeHome.vue"
              ),
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
