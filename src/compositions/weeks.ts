import { reactive, ref } from "vue";
import useApi from "./api";
import { ComponentOptions } from "vue";
import { IWeek } from "@/types/IWeek";

const list = ref([] as IWeek[]);
export default (): ComponentOptions => {
  const { create, get, getAll, baseCollection, update, copy, remove } =
    useApi();
  const collection = baseCollection.collection("weeks");

  const formData = reactive({
    startDate: new Date(),
    days: new Array(7).fill(null),
  } as IWeek);

  const createWeek = async () => {
    return await create(collection, formData);
  };

  const copyWeek = async (id: string) => {
    return await copy(collection, id);
  };

  const getWeeks = async () => {
    list.value = await getAll(collection);
  };

  const updateWeek = async (id: string) => {
    await update(collection, id, formData);
  };

  const getWeek = async (id: string) => {
    const response = await get(collection, id);
    formData.startDate = response.startDate;
    formData.days = response.days;
  };

  const addDay = async (id: string) => {
    formData.days[formData.days.length] = null;
    return await updateWeek(id);
  };

  const removeDay = async (id: string) => {
    formData.days.pop();
    return await updateWeek(id);
  };

  const deleteWeek = async (id: string) => {
    try {
      await remove(collection, id);

      return true;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    updateWeek,
    getWeeks,
    weeks: list,
    formData,
    createWeek,
    getWeek,
    addDay,
    removeDay,
    copyWeek,
    deleteWeek,
  };
};
