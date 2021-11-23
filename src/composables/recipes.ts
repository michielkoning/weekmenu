import { reactive, ref } from "vue";
import useApi from "@/composables/api";
import { ComponentOptions } from "vue";
import { IRecipe } from "@/types/IRecipe";

const list = ref([] as IRecipe[]);

export default (): ComponentOptions => {
  const { create, update, getAll, remove, get, unsubscribe } =
    useApi("recipes");

  const unsubscribeRecipes = () => {
    list.value = [];
    if (unsubscribe) {
      unsubscribe();
    }
  };

  const formData = reactive({
    id: "",
    title: "",
    ingredients: [],
    directions: [],
    preparationTime: 0,
  } as IRecipe);

  const createRecipe = async () => {
    return create(formData);
  };

  const updateRecipe = async () => {
    await update(formData);
  };

  const getRecipes = async () => {
    list.value = await getAll({
      orderBy: "title",
      order: "asc",
    });
  };

  const getRecipe = async (id: string) => {
    const response = await get(id);
    if (response) {
      formData.id = id;
      formData.title = response.title;
      formData.ingredients = response.ingredients || [];
      formData.directions = response.directions || [];
      formData.preparationTime = response.preparationTime || 0;
    }
  };

  const deleteRecipe = async (id: string) => {
    await remove(id);
  };

  return {
    deleteRecipe,
    getRecipe,
    formData,
    createRecipe,
    recipes: list,
    getRecipes,
    updateRecipe,
    unsubscribeRecipes,
  };
};
