<script lang="ts" setup>
import type { ITab } from "@/types/ITab";

defineProps<{
  tabs: ITab[];
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue", "blur"]);

const updateTab = (item: ITab) => {
  emit("update:modelValue", item.key);
};
</script>

<template>
  <ul
    v-if="tabs.length > 1"
    class="list"
    :style="{ 'grid-template-columns': `repeat(2, 1fr)` }"
  >
    <li v-for="item in tabs" :key="item.key">
      <button
        :class="{ active: modelValue === item.key }"
        @click="updateTab(item)"
      >
        {{ item.title }}
      </button>
    </li>
  </ul>
</template>

<style lang="postcss" scoped>
.list {
  display: grid;
  list-style: none outside;
  margin: 0 0 1em;
  padding: 0;
  margin: 0 0 2em;
}

.active {
  border-bottom: 1px solid var(--color-primary);
}

button {
  font-size: 1.25em;
  width: 100%;
  padding: 0.25em 0;
}
</style>
