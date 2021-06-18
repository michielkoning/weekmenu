<template>
  <div>
    <input v-model="date" type="date" @change="convertDate" /><br />
    <button @click="createWeek">Create new week</button><br /><br />
    <router-link
      v-for="(week, index) in weeks"
      :key="week.id"
      :to="`/weken/${week.id}`"
    >
      Week {{ index }}<br />
    </router-link>
    <br />
    <div v-if="formData && formData.days">
      <router-link
        v-for="(weekDay, index) in formData.days"
        :key="index"
        :to="`/weken/${id}/${index}`"
      >
        {{ index }} {{ weekDay }}<br />
      </router-link>
    </div>
  </div>
  <br /><br />
  <div v-if="day">
    <button @click="selectRecipe">test</button>
  </div>
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
    day: {
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
    const { createWeek, formData, getWeek, getWeeks, weeks, updateWeek } =
      useWeek();

    const id = computed(() => props.id);

    watch(id, async () => {
      await getWeek(id.value);
    });

    onMounted(async () => {
      await getWeeks();
      if (props.id) {
        await getWeek(props.id);
      }
    });

    const selectRecipe = () => {
      formData.days[props.day] = "test";
      updateWeek(props.id);
    };

    return {
      createWeek,
      formData,
      date,
      convertDate,
      weeks,
      selectRecipe,
    };
  },
});
</script>

<style lang="postcss" scoped>
.router-link-active {
  font-weight: bold;
}
</style>
