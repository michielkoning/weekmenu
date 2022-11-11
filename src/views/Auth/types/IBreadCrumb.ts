import type { RouteLocationNamedRaw } from "vue-router";

export interface IBreadCrumbItem {
  title: string;
  link: string | RouteLocationNamedRaw;
}
