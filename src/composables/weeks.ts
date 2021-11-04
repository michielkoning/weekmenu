import { ref, reactive } from "vue";
import { ComponentOptions } from "vue";
import { IWeek } from "@/types/IWeek";

import useApi from "@/composables/api";

const list = ref([] as IWeek[]);
export default (): ComponentOptions => {
  const { getAll, unsubscribe, get, create, copy, remove } = useApi("weeks");

  const formData = reactive({
    startDate: new Date(),
    days: new Array(7).fill(null),
  } as IWeek);

  const createWeek = async () => {
    return await create(formData);
  };

  const getWeeks = async () => {
    list.value = await getAll();
  };

  const getWeek = async (id: string) => {
    const response = await get(id);
    formData.startDate = response.startDate;
    formData.days = response.days;
  };

  const copyWeek = async (id: string) => {
    return await copy(id);
  };

  const deleteWeek = async (id: string) => {
    await remove(id);
  };

  return {
    formData,
    unsubscribe,
    copyWeek,
    getWeeks,
    getWeek,
    weeks: list,
    createWeek,
    deleteWeek,
  };
};