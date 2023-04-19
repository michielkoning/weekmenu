import { reactive, ref, type Ref } from "vue";
import useRecipes from "@/composables/useRecipes";

import { getAll, upsert } from "@/db/weekmenu";
import type { IWeekMenu, IWeekMenuResponse } from "@/interfaces/IWeekMenu";

const hasFetched = ref(false);
const loading = ref(false);
const id: Ref<undefined | string> = ref(undefined);

const weekmenu: IWeekMenu = reactive({
  id: undefined,
  recipes: [],
});

export default () => {
  const { recipes } = useRecipes();
  const error: Ref<null | string> = ref(null);

  const getWeekMenu = async () => {
    if (hasFetched.value) {
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      const response = await getAll();
      console.log(response);
      id.value = response.id;
      weekmenu.recipes = response.recipes.map((r) => {
        if (!r) {
          return null;
        }
        const recipe = getRecipe(r);
        if (!recipe) {
          return null;
        }
        return recipe;
      });
      hasFetched.value = true;
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      }
      return [];
    } finally {
      loading.value = false;
    }
  };

  const add = () => {
    weekmenu.recipes.push(null);
  };

  const getRecipe = (id: string) => {
    return recipes.value.find((r) => r.id === id);
  };

  const update = async (index: number, recipeId: string) => {
    if (recipeId) {
      weekmenu.recipes[index] = getRecipe(recipeId) || null;
    } else {
      weekmenu.recipes[index] = null;
    }

    const recipes = weekmenu.recipes.map((r) => {
      if (!r?.id) {
        return null;
      }
      return r.id;
    });
    const formData: IWeekMenuResponse = {
      id: id.value,
      recipes,
    };

    loading.value = true;
    try {
      await upsert(formData);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    getWeekMenu,
    update,
    add,
    weekmenu,
  };
};
