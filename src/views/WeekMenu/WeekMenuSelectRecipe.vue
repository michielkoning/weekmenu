<template>
  <h1>Selecteer een recept</h1>
  <recipes-list v-if="recipes.length" @selectRecipe="selectRecipe" />
  <div v-else class="text">
    <p>Je hebt nog geen recepten aangemaakt.</p>
    <router-link :to="{ name: 'RecipeAdd' }" class="btn btn-primary">
      Maak een nieuw recept aan
    </router-link>
  </div>
</template>

<script lang="ts">
import RecipesList from "@/components/RecipesList.vue";
import useWeekMenu from "@/compositions/weekMenu";
import useRecipes from "@/compositions/recipes";
import { onMounted, defineComponent } from "vue";
import { IRecipe } from "@/interfaces/IRecipe";

export default defineComponent({
  components: {
    RecipesList,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { updateWeekMenuItem, formData } = useWeekMenu();
    const { recipes, getRecipes } = useRecipes();

    onMounted(() => {
      getRecipes();
    });
    const selectRecipe = ({ id, title, icon }: IRecipe) => {
      updateWeekMenuItem(props.id, {
        recipe: {
          id,
          title,
          icon,
        },
      });
    };
    return {
      recipes,
      formData,
      selectRecipe,
    };
  },
});
</script>

<style lang="postcss" scoped>
.text {
  padding: 1em;
  position: sticky;
  top: 0;
}
</style>
