import { reactive, ref } from "vue";
import useApi from "./api";
import { ComponentOptions } from "vue";
import { IRecipe, Categories } from "@/interfaces/IRecipe";

const list = ref([] as IRecipe[]);

export default (): ComponentOptions => {
  const { create, update, getAll, remove, get, baseCollection } = useApi();
  const collection = baseCollection.collection("recipes");

  const formData = reactive({
    title: "",
    category: Categories.vegetarian,
  } as IRecipe);

  const createRecipe = async () => {
    return create(collection, formData);
  };

  const updateRecipe = async (id: string) => {
    await update(collection, id, formData);
  };

  const getRecipes = async () => {
    list.value = await getAll(collection, {
      orderBy: "title",
      order: "asc",
    });
  };

  const getRecipe = async (id: string) => {
    const response = await get(collection, id);
    if (response) {
      formData.title = response.title;
      formData.category = response.category;
    }
  };

  const deleteRecipe = async (id: string) => {
    try {
      await remove(collection, id);

      return true;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    deleteRecipe,
    getRecipe,
    formData,
    createRecipe,
    recipes: list,
    getRecipes,
    updateRecipe,
  };
};
