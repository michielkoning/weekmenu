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
  });

  const updateWeekMenuByRecipeChange = async (id, payload) => {
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

  const updateWeekMenuItem = async (id, payload) => {
    update(id, payload);
  };

  const getWeekMenu = () => {
    getAll({
      orderBy: "day",
      order: "asc",
    });
  };

  const getWeekMenuItem = async (id) => {
    const response = await get(id);
    if (response) {
      formData.day = response.day;
      formData.recipeId = response.recipeId;
    }
  };

  const deleteWeekMenuItem = async (id) => {
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
