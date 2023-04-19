<script lang="ts" setup>
import FormSelect from "@/components/Forms/Elements/FormSelect.vue";
import { computed, type ComputedRef } from "vue";
import type { IOption } from "@/interfaces/IOption";
import useWeekmenu from "@/composables/useWeekmenu";
import useRecipes from "@/composables/useRecipes";

const props = defineProps<{
  index: number;
}>();

const { update, weekmenu } = useWeekmenu();
const { recipes } = useRecipes();

const options: ComputedRef<IOption[]> = computed(() => {
  const defaultOption: IOption = {
    value: "",
    title: "Geen keuze",
  };
  const recipeOptions = recipes.value.map((recipe) => {
    return {
      title: `${recipe.title}`,
      value: recipe.id || "",
    };
  });

  return [defaultOption, ...recipeOptions];
});

const value = computed(() => {
  if (weekmenu.recipes.length && weekmenu.recipes[props.index]) {
    // @ts-ignore
    return weekmenu.recipes[props.index].id || "";
  }
  return "";
});
</script>

<template>
  <form-select
    id="test"
    :title="`Dag ${index + 1}`"
    :model-value="value"
    :options="options"
    @change="update($event.target.value)"
  />
</template>
