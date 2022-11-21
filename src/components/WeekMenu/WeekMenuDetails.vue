<script setup lang="ts">
import useWeekmenu from "@/composables/useWeekmenu";
import { computed } from "vue";

const { weekmenu } = useWeekmenu();

const filledWeekmenu = computed(() => {
  return weekmenu.recipes.flatMap((r) => (r ? [r.title] : [])).join(", ");
});
</script>

<template>
  <ul class="list">
    {{
      filledWeekmenu
    }}
  </ul>
</template>
