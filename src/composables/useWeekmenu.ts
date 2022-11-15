import type { IRecipe } from "@/types/IRecipe";
import { ref, type Ref } from "vue";
import useRecipes from "@/composables/useRecipes";

const weekmenu: Ref<(null | IRecipe)[]> = ref([]);

export default () => {
  const { recipes } = useRecipes();

  const add = () => {
    weekmenu.value.push(null);
  };

  const getRecipe = (id: Number) => {
    return recipes.value.find((r) => r.id === id);
  };

  const update = (index: number, id: string) => {
    if (id) {
      weekmenu.value[index] = getRecipe(Number(id)) || null;
    } else {
      weekmenu.value[index] = null;
    }
  };

  return {
    update,
    add,
    weekmenu,
  };
};
