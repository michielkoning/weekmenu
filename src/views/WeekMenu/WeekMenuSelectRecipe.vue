<template>
  <recipes-list v-if="posts.length" @selectRecipe="selectRecipe" />
  <div v-else class="text">
    <p>Je hebt nog geen recepten aangemaakt.</p>
    <router-link :to="{ name: 'RecipeAdd' }" class="btn btn-primary">
      Maak een nieuw recept aan
    </router-link>
  </div>
</template>

<script>
import RecipesList from "@/components/RecipesList";
import useWeekMenu from "@/compositions/weekMenu";
import { inject } from "vue";
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
    const posts = inject("posts");
    return {
      posts,
      formData,
      selectRecipe,
    };
  },
};
</script>

<style lang="postcss" scoped>
.text {
  padding: 1em;
  position: sticky;
  top: 0;
}
</style>
