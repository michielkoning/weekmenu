import type { IRecipe, IRecipeDetails } from "@/types/IRecipe";
import { reactive, ref, type Ref } from "vue";
import { getAll, getDetails, remove, upsert } from "@/db/recipes";

export default () => {
  const loading = ref(false);
  const error: Ref<null | string> = ref(null);

  const recipe = reactive<IRecipeDetails>({
    id: undefined,
    title: "",
    content: [],
    ingredients: [],
    preperationTime: 0,
    persons: 2,
    source: "",
  });

  const getList = async (): Promise<IRecipe[]> => {
    loading.value = true;
    error.value = null;
    try {
      return await getAll();
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      }
      return [];
    } finally {
      loading.value = false;
    }
  };

  const getRecipe = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await getDetails(id);
      if (!response) {
        throw new Error("");
      }
      recipe.id = response.id;
      recipe.title = response.title || "";
      recipe.content = response.content || [];
      recipe.ingredients = response.ingredients || [];
      recipe.preperationTime = response.preperationTime || 0;
      recipe.persons = response.persons || 2;
      recipe.source = response.source || "";
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const upsertRecipe = async (formData: IRecipeDetails) => {
    try {
      return await upsert(formData);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const deleteRecipe = async (id: string) => {
    try {
      await remove(id);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    getList,
    getRecipe,
    deleteRecipe,
    upsertRecipe,
    recipe,
  };
};
