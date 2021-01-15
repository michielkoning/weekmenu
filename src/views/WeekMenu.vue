<template>
  <div class="page">
    <div>
      <ul>
        <li v-for="weekMenuItem in weekMenu" :key="weekMenuItem">
          <div class="day">{{ weekMenuItem.day }}</div>
          <router-link
            :to="{ name: 'WeekMenu2', params: { id: weekMenuItem.id } }"
          >
            {{
              weekMenuItem.recipe ? weekMenuItem.recipe : "Voeg een recept toe"
            }}
          </router-link>
        </li>
      </ul>
      <button @click="add">Add</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { ref, inject } from "vue";
// import useWeekMenu from "@/compositions/weekMenu";

export default {
  props: {
    day: String,
    default: null,
  },
  setup(props) {
    const weekMenu = inject("weekMenu");
    // const { createWeekMenuItem } = useWeekMenu();
    const days = ref([
      { day: "za", recipe: null },
      { day: "zo", recipe: null },
      { day: "ma", recipe: null },
    ]);

    const add = () => {
      // createWeekMenuItem();
    };

    const selectRecipe = (title) => {
      const day = days.value.find((d) => d.day === props.day);
      day.recipe = title;
    };

    return {
      add,
      selectRecipe,
      days,
      weekMenu,
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
