import { computed, ComputedRef, reactive, ref, type Ref } from "vue";

import * as db from "@/db/weekmenu";
import type { Weekmenu, WeekmenuDay } from "@/interfaces/IWeekMenu";
import useRecipes from "./useRecipes";

const loading = ref(false);

const list: Weekmenu = reactive({
  id: undefined,
  days: [],
});

export default () => {
  const error: Ref<null | string> = ref(null);
  const { recipes } = useRecipes();

  const weekmenu: ComputedRef<Weekmenu> = computed(() => {
    return {
      id: list.id,
      days: list.days,
    };
  });

  const getWeekMenu = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await db.getAll();
      if (!response) {
        return;
      }

      let days: WeekmenuDay[] = [];
      if (Array.isArray(response.weekmenu_days)) {
        days = response.weekmenu_days.map((w) => {
          if (!w.recipes || Array.isArray(w.recipes)) {
            return {
              id: w.id,
              recipe: null,
            };
          }

          return {
            id: w.id,
            recipe: {
              id: w.recipes.id,
              title: w.recipes.title,
            },
          };
        });
      }

      list.id = response.id;
      list.days = days;
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
    if (list.id) {
      const data = await db.addDay(list.id);
      list.days.push({
        id: data.id,
        recipe: null,
      });
    }
  };

  const update = async (id: string, recipeId: string | null) => {
    loading.value = true;
    try {
      await db.updateDay(id, recipeId);
      const recipe = recipes.value.find((r) => r.id === recipeId);
      const index = list.days.findIndex((d) => d.id === id);
      if (list.days[index]) {
        if (recipe) {
          list.days[index].recipe = {
            id: recipe.id,
            title: recipe?.title,
          };
        } else {
          list.days[index].recipe = null;
        }
      }
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

    list.days = list.days.filter((r) => r.id !== id);
  };

  return {
    getWeekMenu,
    update,
    addDay,
    weekmenu,
    removeDay,
  };
};
