import { computed, ComputedRef, reactive, ref, type Ref } from "vue";

import * as db from "@/db/weekmenu";
import type { Weekmenu, WeekmenuDay } from "@/interfaces/IWeekMenu";
import useRecipes from "./useRecipes";

const loading = ref(false);

const list: Ref<Weekmenu[]> = ref([]);

export default () => {
  const error: Ref<null | string> = ref(null);
  const { recipes } = useRecipes();

  const weekmenu: ComputedRef<Weekmenu | null> = computed(() => {
    const item = list.value.find((w) => !w.archived);
    if (!item) {
      return null;
    }
    return {
      id: item.id,
      days: item.days,
      archived: false,
    };
  });

  const getWeekMenu = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await db.getAll();
      if (!response) {
        return [];
      }

      list.value = response.map((w) => {
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
        return {
          id: w.id,
          days,
        };
      });
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
    if (list.value.id) {
      const data = await db.addDay(list.value.id);
      list.value.days.push({
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
      const index = list.value.days.findIndex((d) => d.id === id);
      if (list.value.days[index]) {
        if (recipe) {
          list.value.days[index].recipe = {
            id: recipe.id,
            title: recipe?.title,
          };
        } else {
          list.value.days[index].recipe = null;
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

    list.value.days = list.value.days.filter((r) => r.id !== id);
  };

  const archive = async () => {
    await db.update(weekmenu.value.id, true);
  };

  return {
    getWeekMenu,
    update,
    addDay,
    weekmenu,
    removeDay,
    archive,
  };
};
