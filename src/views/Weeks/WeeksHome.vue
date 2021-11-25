<template>
  <div class="page">
    <div>
      <ul>
        <li
          v-for="(recipe, index) in formData.recipes"
          :key="index"
          :class="{ active: index === selectedDay }"
        >
          <span @click="selectDay(index)">
            dag {{ index + 1 }}:
            <span v-if="recipe">
              {{ recipe.title }}
            </span>
          </span>
        </li>
      </ul>
      <add-remove
        :show-remove="formData.recipes.length > -1"
        @add="addRecipe"
        @remove="removeRecipe"
      />
    </div>
    <ul v-if="recipes.length">
      <li v-for="recipe in recipes" :key="recipe" @click="selectRecipe(recipe)">
        {{ recipe.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import useWeek from "@/composables/weeks";
import { defineComponent, ref } from "vue";
import useRecipes from "@/composables/recipes";
import { IRecipe } from "@/types/IRecipe";
import AddRemove from "@/components/AddRemove.vue";

export default defineComponent({
  components: {
    AddRemove,
  },
  setup() {
    const { weeks, formData, addRecipeToWeek } = useWeek();
    const { recipes } = useRecipes();
    const selectedDay = ref(0);

    const selectDay = (index: number) => {
      selectedDay.value = index;
    };

    const selectRecipe = (recipe: IRecipe) => {
      formData.recipes[selectedDay.value] = recipe;
      if (selectedDay.value < formData.recipes.length - 1) {
        selectedDay.value = selectedDay.value + 1;
      } else {
        selectedDay.value = 0;
      }
    };

    const addRecipe = () => {
      formData.recipes.push(null);
    };

    const removeRecipe = () => {
      formData.recipes.pop();
    };

    return {
      addRecipe,
      removeRecipe,
      selectedDay,
      addRecipeToWeek,
      recipes,
      formData,
      weeks,
      selectDay,
      selectRecipe,
    };
  },
});
</script>

<style lang="postcss" scoped>
ul {
  @mixin list-reset;
}

.page {
  position: relative;
  padding-bottom: 2em;
  padding: 0 var(--gutter);
  grid-gap: var(--gutter);
  display: grid;

  @media (--viewport-md) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.active {
  font-weight: bold;
}
</style>
