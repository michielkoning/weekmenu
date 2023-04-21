<script lang="ts" setup>
import FormSelect from "@/components/Forms/Elements/FormSelect.vue";
import { computed, type ComputedRef } from "vue";
import type { IOption } from "@/interfaces/IOption";
import useWeekmenu from "@/composables/useWeekmenu";
import useRecipes from "@/composables/useRecipes";

defineProps<{
  id: string;
  index: number;
  recipeId: string | null;
}>();

const { update, removeDay } = useWeekmenu();
const { recipes } = useRecipes();

const options: ComputedRef<IOption[]> = computed(() => {
  const defaultOption: IOption = {
    value: null,
    title: "Geen keuze",
  };
  const recipeOptions = recipes.value.map((recipe) => {
    return {
      title: `${recipe.title}`,
      value: recipe.id,
    };
  });

  return [defaultOption, ...recipeOptions];
});

</script>

<template>
  <div>
    <form-select
      id="test"
      :title="`Dag ${index + 1}`"
      :model-value="recipeId || ''"
      :options="options"
      @change="update(id, $event.target.value)"
    />
    <button @click="removeDay(id)">Remove</button>
  </div>
</template>
