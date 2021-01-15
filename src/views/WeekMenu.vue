<template>
  <div class="page">
    <ul>
      <li v-for="day2 in days" :key="day2">
        <div class="day">{{ day2.day }}</div>
        <router-link :to="{ name: 'WeekMenu', params: { day: day2.day } }">
          {{ day2.recipe ? day2.recipe : "Voeg een recept toe" }}
        </router-link>
      </li>
    </ul>
    <recipes-list v-if="day" @selectRecipe="selectRecipe" />
  </div>
</template>

<script>
import { inject, ref } from "vue";
import RecipesList from "@/components/RecipesList";

export default {
  components: {
    RecipesList,
  },
  props: {
    day: String,
    default: null,
  },
  setup(props) {
    const days = ref([
      { day: "za", recipe: null },
      { day: "zo", recipe: null },
      { day: "ma", recipe: null },
    ]);
    const posts = inject("posts");

    const selectRecipe = (title) => {
      const day = days.value.find((d) => d.day === props.day);
      day.recipe = title;
    };

    return {
      selectRecipe,
      days,
      posts,
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
