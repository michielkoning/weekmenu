import { reactive } from "vue";
import * as fb from "@/firebase";
import useApi from "@/compositions/api";
import { IRecipe } from "@/interfaces/IRecipe";
import { IWeekMenuItem } from "@/interfaces/IWeekMenuItem";
import { ComponentOptions } from "vue";

export default (): ComponentOptions => {
  const { create, update, getAll, list, remove } = useApi(
    fb.weekMenuCollection
  );

  const formData = reactive({
    day: "",
    recipe: null,
  });

  const updateWeekMenuByRecipeChange = async (
    id: string,
    payload: IRecipe | null
  ) => {
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

  const updateWeekMenuItem = async (id: string, payload: IWeekMenuItem) => {
    update(id, payload);
  };

  const getWeekMenu = () => {
    getAll({
      orderBy: "day",
      order: "asc",
    });
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
    updateWeekMenuItem,
    updateWeekMenuByRecipeChange,
  };
};
