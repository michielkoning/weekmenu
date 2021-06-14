<template>
  <div>
    <input v-model="date" type="date" />
    {{ date }}
    {{ date2 }}
    {{ formData.startDate }}
  </div>
  <button @click="createWeek">Create new week</button>
</template>

<script lang="ts">
import { parse } from "date-fns";
import useWeek from "@/compositions/weeks";
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  setup() {
    const date = ref("");
    const date2 = computed(() => {
      if (date.value) {
        return parse(date.value, "yyyy-MM-dd", new Date());
      }
      return null;
    });
    const { createWeek, formData } = useWeek();
    return { createWeek, formData, date, date2 };
  },
});
</script>
