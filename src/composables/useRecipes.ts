import type { IRecipe } from "@/interfaces/IRecipe";
import { ref, type Ref } from "vue";
import { getAll, remove, upsert } from "@/db/recipes";

const recipes: Ref<IRecipe[]> = ref([]);
const hasFetched = ref(false);
const loading = ref(false);

export default () => {
  const error: Ref<null | string> = ref(null);

  const recipe: Ref<IRecipe | null> = ref(null);

  const reset = () => {
    recipes.value = [];
    hasFetched.value = false;
  };

  const getList = async () => {
    if (hasFetched.value) {
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      recipes.value = await getAll();
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

  const getRecipe = async (id: string | number) => {
    if (!hasFetched.value) {
      await getList();
    }

    try {
      const response = recipes.value.find((r) => {
        return r.id === Number(id);
      });
      if (!response) {
        throw new Error("");
      }
      recipe.value = response;
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    }
  };

  const upsertRecipe = async (formData: IRecipe) => {
    loading.value = true;
    try {
      const response = await upsert(formData);
      recipe.value = response;
      const index = recipes.value.findIndex((r) => response.id === r.id);
      if (index > -1) {
        recipes.value[index] = response;
      } else {
        recipes.value.push(response);
      }
      return response.id;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const deleteRecipe = async (id: string) => {
    loading.value = true;
    try {
      await remove(id);
      recipes.value = recipes.value.filter((r) => r.id !== Number(id));
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    recipes,
    loading,
    error,
    reset,
    getList,
    getRecipe,
    deleteRecipe,
    upsertRecipe,
    recipe,
  };
};
