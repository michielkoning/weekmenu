import { reactive, ref } from "vue";
import useApi from "./api";
import { ComponentOptions } from "vue";
import { IWeek } from "@/interfaces/IWeek";
import firebase from "firebase/app";
import { IWeekMenuItem } from "@/interfaces/IWeekMenuItem";

const list = ref([] as IWeek[]);
export default (): ComponentOptions => {
  const { create, get, getAll, baseCollection, update } = useApi("a");
  const collection = baseCollection.collection("weeks");

  const formData = reactive({
    startDate: new Date(),
    days: [],
  } as IWeek);

  const createWeek = async () => {
    return await create(collection, formData);
  };

  const getWeeks = async () => {
    list.value = await getAll(collection);
    console.log(list.value);
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
