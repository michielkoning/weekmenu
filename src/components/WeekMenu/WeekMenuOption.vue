<script lang="ts" setup>
import FormSelect from "@/components/Forms/Elements/FormSelect.vue";
import { computed, type ComputedRef } from "vue";
import type { IOption } from "@/interfaces/IOption";
import useWeekmenu from "@/composables/useWeekmenu";
import useRecipes from "@/composables/useRecipes";
import type { WeekmenuRecipe } from "@/interfaces/IWeekMenu";

const props = defineProps<{
  weekmenuRecipe: WeekmenuRecipe;
  index: number;
}>();

const { update, removeDay } = useWeekmenu();
const { recipes } = useRecipes();

const options: ComputedRef<IOption[]> = computed(() => {
  const defaultOption: IOption = {
    value: "",
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

const set = (value: string) => {
  if (!value) {
    update(props.weekmenuRecipe.id, null);
  }
  update(props.weekmenuRecipe.id, value);
};
</script>

<template>
  <div>
    <form-select
      id="test"
      :title="`Dag ${index + 1}`"
      :model-value="weekmenuRecipe.recipe?.id || ''"
      :options="options"
      @change="set($event.target.value)"
    />
    <button @click="removeDay(weekmenuRecipe.id)">Remove</button>
  </div>
</template>
