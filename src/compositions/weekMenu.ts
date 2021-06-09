import { reactive } from "vue";
import * as fb from "../firebase";
import useApi from "./api";

export default () => {
  const { create, update, getAll, list, remove, get } = useApi(
    fb.weekMenuCollection
  );

  const formData = reactive({
    day: "",
    recipe: null,
    icon: "vegetarian",
    recipeId: null,
  });

  const updateWeekMenuByRecipeChange = async (id: string, payload: any) => {
    const weekMenuItems = await fb.weekMenuCollection
      .where("recipe.id", "==", id)
      .get();
    weekMenuItems.forEach((doc) => {
      updateWeekMenuItem(doc.id, {
        recipe: payload,
      });
    });
  };

  const createWeekMenuItem = async () => {
    return create(formData);
  };

  const updateWeekMenuItem = async (id: string, payload: any) => {
    update(id, payload);
  };

  const getWeekMenu = () => {
    getAll({
      orderBy: "day",
      order: "asc",
    });
  };

  const getWeekMenuItem = async (id: string) => {
    const response = await get(id);

    if (response) {
      formData.day = response.day;
      formData.recipeId = response.recipeId;
      formData.icon = response.icon;
    }
  };

  const deleteWeekMenuItem = async (id: string) => {
    try {
      await remove(id);
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    deleteWeekMenuItem,
    getWeekMenu,
    formData,
    createWeekMenuItem,
    weekMenu: list,
    getWeekMenuItem,
    updateWeekMenuItem,
    updateWeekMenuByRecipeChange,
  };
};
