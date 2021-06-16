import { reactive, ref } from "vue";
import useApi from "./api";
import { ComponentOptions } from "vue";
import { IWeek } from "@/interfaces/IWeek";

const list = ref([] as IWeek[]);
export default (): ComponentOptions => {
  const { create, get, getAll, baseCollection } = useApi("a");
  const collection = baseCollection.collection("weeks");

  const formData = reactive({
    startDate: new Date(),
    endDate: new Date(),
  } as IWeek);

  const createWeek = async () => {
    return await create(collection, formData);
  };

  const getWeeks = async () => {
    list.value = await getAll(collection);
    console.log(list.value);
  };

  const getWeek = async (id: string) => {
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
