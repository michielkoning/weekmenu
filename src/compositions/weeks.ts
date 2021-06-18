import { reactive, ref } from "vue";
import useApi from "./api";
import { ComponentOptions } from "vue";
import { IWeek } from "@/interfaces/IWeek";

const list = ref([] as IWeek[]);
export default (): ComponentOptions => {
  const { create, get, getAll, baseCollection, update } = useApi("a");
  const collection = baseCollection.collection("weeks");

  const formData = reactive({
    startDate: new Date(),
    days: new Array(7).fill(null),
  } as IWeek);

  const createWeek = async () => {
    return await create(collection, formData);
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

  return {
    updateWeek,
    getWeeks,
    weeks: list,
    formData,
    createWeek,
    getWeek,
  };
};
