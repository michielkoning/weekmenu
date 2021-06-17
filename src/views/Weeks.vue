<template>
  <div>
    <router-link v-for="week in weeks" :key="week.id" :to="`/weken/${week.id}`">
      {{ week.id }}<br />
    </router-link>
    <input v-model="date" type="date" @change="convertDate" />

    <div v-if="test">
      {{ test.day6 }}
    </div>
  </div>
  <button @click="createWeek">Create new week</button>
</template>

<script lang="ts">
import { parse } from "date-fns";
import useWeek from "@/compositions/weeks";
import { defineComponent, ref, onMounted, watch, computed } from "vue";
export default defineComponent({
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const date = ref(null as string | null);
    const convertDate = () => {
      if (!date.value) {
        formData.startDate = null;
        return;
      }
      formData.startDate = parse(date.value, "yyyy-MM-dd", new Date());
    };
    const { createWeek, formData, getWeek, getWeeks, weeks } = useWeek();
    const test = ref(null);

    const id = computed(() => props.id);

    watch(id, async () => {
      test.value = await getWeek(id.value);
    });

    onMounted(async () => {
      await getWeeks();
      if (props.id) {
        test.value = await getWeek(props.id);
      }
    });
    return { createWeek, formData, date, convertDate, test, weeks };
  },
});
</script>
