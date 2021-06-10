import { reactive, ref } from "vue";
import { weekMenuCollection } from "@/firebase";
import useApi from "@/compositions/api";
import { IRecipe } from "@/interfaces/IRecipe";
import { ComponentOptions } from "vue";
import { IWeekMenuItem } from "@/interfaces/IWeekMenuItem";

const list = ref([] as IWeekMenuItem[]);
export default (): ComponentOptions => {
  const { create, update, getAll, remove } = useApi("weekMenu");

  const formData = reactive({
    day: "",
    recipe: null,
  } as IWeekMenuItem);

  const updateWeekMenuByRecipeChange = async (
    id: string,
    payload: IRecipe | null
  ) => {
    const weekMenuItems = await weekMenuCollection
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

  const getWeekMenu = async () => {
    list.value = await getAll({
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
