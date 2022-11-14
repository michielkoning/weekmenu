<script lang="ts" setup>
import type { IRecipe } from "@/types/IRecipe";
import FormSelect from "@/components/Forms/Elements/FormSelect.vue";
import { computed, type ComputedRef } from "vue";
import type { IOption } from "@/types/IOption";

const props = defineProps<{
  modelValue: string | null;
  recipes: IRecipe[];
}>();

const options: ComputedRef<IOption[]> = computed(() => {
  const defaultOption: IOption = {
    value: "",
    title: "Geen keuze",
  };
  const recipeOptions = props.recipes.map((recipe) => {
    return {
      title: recipe.title,
      value: recipe.id || recipe.title,
    };
  });

  return [defaultOption, ...recipeOptions];
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <form-select
    id="test"
    title="title"
    :model-value="modelValue"
    :options="options"
    @change="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>
