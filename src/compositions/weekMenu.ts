import { reactive, ref } from "vue";
import useApi from "@/compositions/api";
import { IRecipe } from "@/interfaces/IRecipe";
import { ComponentOptions } from "vue";
import { IWeekMenuItem } from "@/interfaces/IWeekMenuItem";

const list = ref([] as IWeekMenuItem[]);
export default (): ComponentOptions => {
  const { create, update, getAll, remove, baseCollection } = useApi("weekMenu");
  const collection = baseCollection.collection("weekMenu");

  const formData = reactive({
    day: null,
    recipe: null,
  } as IWeekMenuItem);

  const updateWeekMenuByRecipeChange = async (
    id: string,
    payload: IRecipe | null
  ) => {
    const weekMenuItems = await collection.where("recipe.id", "==", id).get();

    weekMenuItems.forEach((doc: any) => {
      updateWeekMenuItem(doc.id, {
        recipe: payload,
      });
    });
  };

  const createWeekMenuItem = async () => {
    return create(collection, formData);
  };

  const updateWeekMenuItem = async (id: string, payload: IWeekMenuItem) => {
    update(collection, id, payload);
  };

  const getWeekMenu = async () => {
    list.value = await getAll(collection, {
      orderBy: "day",
      order: "asc",
    });
  };

  const deleteWeekMenuItem = async (id: string) => {
    try {
      await remove(collection, id);
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
