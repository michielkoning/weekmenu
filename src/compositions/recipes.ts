import { reactive, ref } from "vue";
import useApi from "./api";
import useWeekMenu from "./weekMenu";
import { ComponentOptions } from "vue";
import { IRecipe, Categories } from "@/interfaces/IRecipe";

const list = ref([] as IRecipe[]);

export default (): ComponentOptions => {
  const { create, update, getAll, remove, get, baseCollection } =
    useApi("recipes");
  const collection = baseCollection.collection("recipes");

  const { updateWeekMenuByRecipeChange } = useWeekMenu();

  const formData = reactive({
    title: "",
    category: Categories.vegetarian,
  } as IRecipe);

  const createPost = async () => {
    return create(formData);
  };

  const updatePost = async (id: string) => {
    await update(collection, id, formData);
    await updateWeekMenuByRecipeChange(id, {
      id,
      title: formData.title,
      category: formData.category,
    });
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
      await updateWeekMenuByRecipeChange(id, null);

      return true;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    deleteRecipe,
    getRecipe,
    formData,
    createPost,
    recipes: list,
    getRecipes,
    updatePost,
  };
};
