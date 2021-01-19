<template>
  <div class="page">
    <div>
      <ul v-if="weekMenu.length">
        <list-item
          v-for="weekMenuItem in weekMenu"
          :id="formatDate(weekMenuItem.day, 'eeeeee')"
          :key="weekMenuItem.id"
          :icon="
            weekMenuItem.recipe && weekMenuItem.recipe.icon
              ? weekMenuItem.recipe.icon
              : null
          "
          :icon-small="true"
          :color="colors[formatDate(weekMenuItem.day, 'i') - 1]"
          :title="
            weekMenuItem.recipe
              ? weekMenuItem.recipe.title
              : 'Selecteer een recept'
          "
          :active="route.params.id === weekMenuItem.id"
          @selectItem="selectRecipe(weekMenuItem)"
        />
      </ul>
      <button @click="addWeekMenuItem">Add</button>
      <button v-if="weekMenu.length" @click="remove">Remove</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { inject } from "vue";
import useWeekMenu from "@/compositions/weekMenu";
import { format, add } from "date-fns";
import { nl } from "date-fns/locale";
import ListItem from "@/components/ListItem.vue";
import { useRouter, useRoute } from "vue-router";

export default {
  components: {
    ListItem,
  },
  props: {
    day: String,
    default: null,
  },
  setup() {
    const weekMenu = inject("weekMenu");
    const router = useRouter();
    const route = useRoute();

    const { createWeekMenuItem, formData, deleteWeekMenuItem } = useWeekMenu();

    const convertToDate = (date) => {
      return new Date(date.seconds * 1000);
    };

    const colors = ["green", "red", "purple", "blue", "green", "red", "purple"];

    const selectRecipe = (recipe) => {
      router.push({
        name: "WeekMenuSelectRecipe",
        params: { id: recipe.id },
      });
    };

    const formatDate = (date, unit) => {
      return format(convertToDate(date), unit, { locale: nl });
    };

    const addWeekMenuItem = () => {
      if (weekMenu.value.length) {
        const lastItem = weekMenu.value[weekMenu.value.length - 1];
        const date = convertToDate(lastItem.day);
        formData.day = add(date, {
          days: 1,
        });
      } else {
        formData.day = new Date();
      }
      createWeekMenuItem();
    };

    const remove = () => {
      const lastItem = weekMenu.value[weekMenu.value.length - 1];
      deleteWeekMenuItem(lastItem.id);
    };

    return {
      colors,
      route,
      formatDate,
      remove,
      formData,
      addWeekMenuItem,
      weekMenu,
      selectRecipe,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;
}

ul {
  list-style: none outside;
  margin: 0 0 1em;
  padding: 0;
}
</style>
