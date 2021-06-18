<template>
  <div>
    <strong>Dagen</strong><br />
    <div v-if="formData && formData.days">
      <router-link
        v-for="(weekDay, index) in formData.days"
        :key="index"
        :to="`/weken/${id}/${index}`"
      >
        {{ index }}
        <template v-if="weekDay">{{ weekDay.title }}</template>
        <template v-else>Selecteer een gerecht</template>
        <br />
      </router-link>
    </div>
  </div>
  <br /><br />
  <div v-if="day">
    <strong>Recepten voor dag {{ day }}</strong
    ><br />
    <div v-for="recipe in recipes" :key="recipe.id">
      <button @click="selectRecipe(recipe)">{{ recipe.title }}</button>
    </div>
    <br />
    <button @click="selectRecipe(null)">Reset</button>
  </div>
</template>

<script lang="ts">
import useWeek from "@/compositions/weeks";
import useRecipe from "@/compositions/recipes";
import { defineComponent, onMounted, watch, computed } from "vue";
import { IRecipe } from "@/interfaces/IRecipe";
export default defineComponent({
  props: {
    id: {
      type: String,
      default: null,
    },
    day: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const { formData, getWeek, updateWeek } = useWeek();
    const { recipes, getRecipes } = useRecipe();

    const id = computed(() => props.id);
    const day = computed(() => parseInt(props.day));

    watch(id, async () => {
      await getWeek(id.value);
    });

    onMounted(async () => {
      await getRecipes();
      if (props.id) {
        await getWeek(props.id);
      }
    });

    const selectRecipe = (recipe: IRecipe) => {
      if (formData?.day?.length > day.value) {
        return;
      }
      formData.days[day.value] = recipe;
      updateWeek(props.id);
    };

    return {
      selectRecipe,
      formData,
      recipes,
    };
  },
});
</script>

<style lang="postcss" scoped>
.router-link-active {
  font-weight: bold;
}
</style>
