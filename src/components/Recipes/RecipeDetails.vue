<template>
  <div ref="div" class="div">
    <h1>{{ formData.title }}</h1>
    <recipe-ingredients :ingredients="formData.ingredients" />
    <recipe-directions :directions="formData.directions" />
    <button @click="testa">test</button>
  </div>
</template>

<script lang="ts">
import useRecipes from "@/composables/recipes";
import { onMounted, computed, watch, ref } from "vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import RecipeIngredients from "@/components/Recipes/RecipeIngredients.vue";
import RecipeDirections from "@/components/Recipes/RecipeDirections.vue";

export default defineComponent({
  components: {
    RecipeIngredients,
    RecipeDirections,
  },
  setup() {
    const route = useRoute();
    const title = computed(() => {
      return route.params.id ? "Recept bewerken" : "Nieuw recept";
    });

    const div = ref(null as HTMLElement | null);
    const open = ref(false);

    const id = computed(() => {
      return route.params.id;
    });
    const { formData, getRecipe } = useRecipes();

    onMounted(() => {
      if (id.value) getRecipe(id.value);
    });

    watch(id, (newId) => {
      getRecipe(newId);
    });

    const testa = () => {
      if (div.value) {
        if (!open.value) {
          div.value.requestFullscreen();
          open.value = true;
        } else {
          document.exitFullscreen();
          open.value = false;
        }
      }
    };

    return {
      testa,
      div,
      title,
      formData,
    };
  },
});
</script>

<style lang="postcss" scoped>
.buttons {
  display: flex;
  justify-content: space-between;
}

.icon {
  width: 1em;
  height: 1em;
}

.div {
  background: white;
}
</style>
