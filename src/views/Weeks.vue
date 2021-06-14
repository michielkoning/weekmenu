<template>
  <div>
    <input v-model="date" type="date" @change="convertDate" />
    {{ formData.startDate }}
  </div>
  <button @click="createWeek">Create new week</button>
</template>

<script lang="ts">
import { parse } from "date-fns";
import useWeek from "@/compositions/weeks";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const date = ref(null as string | null);
    const convertDate = () => {
      if (!date.value) {
        formData.startDate = null;
        return;
      }
      formData.startDate = parse(date.value, "yyyy-MM-dd", new Date());
    };
    const { createWeek, formData } = useWeek();
    return { createWeek, formData, date, convertDate };
  },
});
</script>
