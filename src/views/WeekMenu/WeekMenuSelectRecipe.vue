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
    const selectRecipe = ({ id, title, icon }) => {
      updateWeekMenuItem(props.id, {
        recipe: {
          id,
          title,
          icon,
        },
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
</style>
