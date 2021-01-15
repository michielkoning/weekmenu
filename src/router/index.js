import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Recipes.vue";

const routes = [
  {
    path: "/:id?",
    name: "Recipes",
    component: Home,
    props: true,
  },
  {
    path: "/weekmenu",
    name: "WeekMenu",
    component: () =>
      import(/* webpackChunkName: "WeekMenu" */ "../views/WeekMenu.vue"),
    props: true,
    children: [
      {
        path: ":id",
        name: "WeekMenu2",
        component: () =>
          import(/* webpackChunkName: "WeekMenu2" */ "../views/WeekMenu2.vue"),
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
