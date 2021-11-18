<template>
  <div>
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
        <button @click="copy(week.id)">copy</button>
        <button @click="remove(week.id)">remove</button>
      </router-link>
    </div>
    <button @click="create">Create</button>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script lang="ts">
import useWeek from "@/composables/weeks";
import { useRouter } from "vue-router";
import { defineComponent, onMounted, onUnmounted } from "vue";
export default defineComponent({
  setup() {
    const router = useRouter();
    const { createWeek, getWeeks, weeks, unsubscribe, copyWeek, deleteWeek } =
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

    onUnmounted(() => {
      if (unsubscribe) {
        unsubscribe();
      }
    });

    return {
      // formData,
      remove,
      copy,
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
