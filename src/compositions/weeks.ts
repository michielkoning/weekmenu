import { reactive, ref } from "vue";
import useApi from "./api";
import { ComponentOptions } from "vue";
import { IWeek } from "@/interfaces/IWeek";
import firebase from "firebase/app";
import { IWeekMenuItem } from "@/interfaces/IWeekMenuItem";

const list = ref([] as IWeek[]);
export default (): ComponentOptions => {
  const { create, get, getAll, baseCollection } = useApi("a");
  const collection = baseCollection.collection("weeks");

  const formData = reactive({
    startDate: new Date(),
    day1: null,
    day2: null,
    day3: null,
    day4: null,
    day5: null,
    day6: null,
    day7: null,
  } as IWeek);

  const createWeek = async () => {
    return await create(collection, formData);
  };

  const getWeeks = async () => {
    list.value = await getAll(collection);
    console.log(list.value);
  };

  const getWeek = async (id: string): Promise<IWeek> => {
    return await get(collection, id);
  };

  return {
    getWeeks,
    weeks: list,
    formData,
    createWeek,
    getWeek,
  };
};
