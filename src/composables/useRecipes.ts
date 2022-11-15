import type { IRecipe, IRecipeDetails } from "@/types/IRecipe";
import { reactive, ref, type Ref } from "vue";
import { getAll, getDetails, remove, upsert } from "@/db/recipes";

const recipes: Ref<IRecipeDetails[]> = ref([]);
const hasFetched = ref(false);

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

  const getList = async () => {
    if (hasFetched.value) {
      return;
    }

    loading.value = true;
    error.value = null;
    try {
      recipes.value = await getAll();
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      }
      return [];
    } finally {
      hasFetched.value = true;
      loading.value = false;
    }
  };

  const getRecipe = async (id: string) => {
    if (!hasFetched.value) {
      await getList();
    }

    try {
      const response = recipes.value.find((r) => {
        return r.id?.toString() === id;
      });
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
    recipes,
    loading,
    error,
    getList,
    getRecipe,
    deleteRecipe,
    upsertRecipe,
    recipe,
  };
};
