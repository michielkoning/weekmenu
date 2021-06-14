import { reactive } from "vue";
import useApi from "./api";
import { ComponentOptions } from "vue";
import { IWeek } from "@/interfaces/IWeek";

export default (): ComponentOptions => {
  const { create } = useApi("weeks");

  const formData = reactive({
    startDate: new Date(),
    endDate: new Date(),
  } as IWeek);

  const createWeek = async () => {
    return await create(formData);
  };

  return {
    formData,
    createWeek,
  };
};
