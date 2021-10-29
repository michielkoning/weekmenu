import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Recipes from "../views/Recipes.vue";
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
        path: "/recepten/:id?",
        name: "Recipes",
        component: Recipes,
        meta: {
          authRequired: true,
        },
      },
      {
        path: "/",
        name: "Weeks",
        props: true,
        meta: {
          authRequired: true,
        },
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
