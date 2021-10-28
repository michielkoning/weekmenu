import { reactive, ref } from "vue";
import useApi from "@/composables/api";
import { ComponentOptions } from "vue";
import { IRecipe, Categories } from "@/types/IRecipe";

const list = ref([] as IRecipe[]);

export default (): ComponentOptions => {
  const { create, update, getAll, remove, get } = useApi("recipes");

  const formData = reactive({
    title: "",
    category: Categories.vegetarian,
  } as IRecipe);

  const createRecipe = async () => {
    return create(formData);
  };

  const updateRecipe = async (id: string) => {
    await update(id, formData);
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
      formData.title = response.title;
      formData.category = response.category;
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
  };
};
