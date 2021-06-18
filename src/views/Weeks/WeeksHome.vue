<template>
  <div>
    <input v-model="date" type="date" @change="convertDate" /><br />
    <button @click="createWeek">Create new week</button><br /><br />
    <router-link
      v-for="(week, index) in weeks"
      :key="week.id"
      :to="`/weken/${week.id}`"
    >
      <span :class="{ active: id === week.id }">Week {{ index }}</span>
      <div v-if="week.days">
        {{ week.days.map((day) => day.title).join(", ") }}
      </div>
      <br />
    </router-link>
    <br />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script lang="ts">
import { parse } from "date-fns";
import useWeek from "@/compositions/weeks";
import { useRoute } from "vue-router";
import { defineComponent, ref, onMounted, computed } from "vue";
export default defineComponent({
  setup() {
    const route = useRoute();
    const id = computed(() => route.params.id);
    const date = ref(null as string | null);
    const convertDate = () => {
      if (!date.value) {
        formData.startDate = null;
        return;
      }
      formData.startDate = parse(date.value, "yyyy-MM-dd", new Date());
    };
    const { createWeek, formData, getWeeks, weeks } = useWeek();

    onMounted(async () => {
      await getWeeks();
    });

    return {
      id,
      createWeek,
      formData,
      date,
      convertDate,
      weeks,
    };
  },
});
</script>

<style lang="postcss" scoped>
.active {
  font-weight: bold;
}
</style>
