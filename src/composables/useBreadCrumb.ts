import type { IBreadCrumbItem } from "@/types/IBreadCrumb";
import { ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import type { RouteLocationNamedRaw } from "vue-router";

const breadcrumb: Ref<IBreadCrumbItem[]> = ref([
  {
    title: "Home",
    link: "/",
  },
]);

export default () => {
  const route = useRoute();
  const add = (title: string, link?: RouteLocationNamedRaw) => {
    const isAlreadyInBreadCrumb = breadcrumb.value.find(
      (item) => item.title === title
    );
    if (isAlreadyInBreadCrumb) {
      return;
    }
    breadcrumb.value.push({
      title,
      link: link || route.fullPath,
    });
  };

  const remove = (title: string) => {
    breadcrumb.value = breadcrumb.value.filter((item) => item.title !== title);
  };
  return {
    remove,
    add,
    breadcrumb,
  };
};
