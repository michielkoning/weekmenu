import { createRouter, createWebHistory } from "vue-router";
import RecipesHome from "../views/Recipes/RecipesHome.vue";
import { firebase } from "@firebase/app";

const routes = [
  {
    path: "/",
    name: "WeekMenuHome",
    meta: {
      authRequired: true,
    },
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
    path: "/recepten",
    name: "RecipesHome",
    component: RecipesHome,
    props: true,
    meta: {
      authRequired: true,
    },
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (firebase.auth().currentUser) {
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
