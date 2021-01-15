<template>
  <recipes-list @selectRecipe="selectRecipe" />
</template>

<script>
import RecipesList from "@/components/RecipesList";
import useWeekMenu from "@/compositions/weekMenu";

export default {
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
    const selectRecipe = (recipeId) => {
      updateWeekMenuItem(props.id, {
        recipe: recipeId,
      });
    };

    return {
      formData,
      selectRecipe,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

ul {
  list-style: none outside;
  margin: 0 0 1em;
  padding: 0;
}

li {
  display: grid;
  grid-template-columns: 4em auto;
  grid-gap: 1em;
  margin-bottom: 0.25em;
  align-items: center;
}

.day {
  display: block;
  height: 4em;
  width: 4em;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
