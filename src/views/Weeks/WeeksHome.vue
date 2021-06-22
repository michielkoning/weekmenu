<template>
  <div>
    <button @click="create">Create new week</button><br /><br />
    <div v-for="(week, index) in weeks" :key="week.id">
      <router-link
        :to="{
          name: 'WeeksDetails',
          params: {
            id: week.id,
          },
        }"
      >
        <span>Week {{ index }}</span>
      </router-link>
      - <button @click="copy(week.id)">Copy</button> -
      <button @click="remove(week.id)">Delete</button>
      <div v-if="week.days">
        {{
          week.days
            .filter((day) => day !== null)
            .map((day) => day.title)
            .join(", ")
        }}
      </div>
      <br />
    </div>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script lang="ts">
import useWeek from "@/compositions/weeks";
import { useRouter } from "vue-router";
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  setup() {
    const router = useRouter();

    const { createWeek, formData, getWeeks, weeks, copyWeek, deleteWeek } =
      useWeek();

    const goToWeek = (id: string) => {
      router.push({
        name: "WeeksDetails",
        params: {
          id,
        },
      });
    };

    const copy = async (id: string) => {
      const response = await copyWeek(id);
      if (response) {
        goToWeek(response);
      }
    };

    const create = async () => {
      const response = await createWeek();
      if (response) {
        goToWeek(response);
      }
    };

    const remove = async (id: string) => {
      await deleteWeek(id);
      router.push({
        name: "Weeks",
      });
    };

    onMounted(async () => {
      await getWeeks();
    });

    return {
      copy,
      formData,
      remove,
      weeks,
      create,
    };
  },
});
</script>

<style lang="postcss" scoped>
.router-link-active {
  font-weight: bold;
}
</style>
