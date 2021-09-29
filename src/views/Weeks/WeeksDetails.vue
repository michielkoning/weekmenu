<template>
  <div v-if="formData">
    <strong>Recepten voor dag {{ formData }}</strong>
    <br />
    <br />
  </div>
</template>

<script lang="ts">
import useWeek from "@/compositions/weeks";
import { defineComponent, onMounted, watch, computed } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const { getWeek, formData } = useWeek();

    const id = computed(() => props.id);

    watch(id, async () => {
      await getWeek(id.value);
    });

    onMounted(async () => {
      if (props.id) {
        await getWeek(props.id);
      }
    });

    return {
      formData,
    };
  },
});
</script>

<style lang="postcss" scoped>
.router-link-active {
  font-weight: bold;
}
</style>
