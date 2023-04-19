import { reactive, ref, type Ref } from "vue";
import useRecipes from "@/composables/useRecipes";

import * as db from "@/db/weekmenu";
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
      const response = await db.getAll();
      id.value = response.id;
      weekmenu.id = response.id;
      weekmenu.recipes = response.weekmenu_recipes;
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

  const addDay = async () => {
    if (weekmenu.id) {
      const data = await db.addDay(weekmenu.id);
      weekmenu.recipes.push(data);
    }
  };

  const update = async (id: string, recipeId: string | null) => {
    loading.value = true;
    try {
      await db.updateDay(id, recipeId);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const removeDay = async (id: string) => {
    await db.removeDay(id);

    weekmenu.recipes = weekmenu.recipes.filter((r) => r.id !== id);
  };

  return {
    getWeekMenu,
    update,
    addDay,
    weekmenu,
    removeDay,
  };
};
