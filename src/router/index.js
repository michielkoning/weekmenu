import { createRouter, createWebHistory } from "vue-router";
import RecipesHome from "../views/Recipes/RecipesHome.vue";

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
