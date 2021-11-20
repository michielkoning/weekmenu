<template>
  <form class="recipe" @submit.prevent="save">
    <form-fieldset title="Recept bewerken">
      <form-input-text v-model="formData.title" name="title" title="Titel" />
      <form-input-text
        v-model="formData.preparationTime"
        name="preparationTime"
        title="Bereidingstijd"
      />
      <form-textarea
        v-model="directions"
        name="directions"
        title="Bereidingstijd"
        rows="10"
      />
      <form-textarea
        v-model="ingredients"
        name="ingredients"
        title="Ingrediënten"
        rows="10"
      />
    </form-fieldset>
    <button type="submit">Save</button>
    <button type="button" @click="deleteR" v-if="id">Delete</button>
  </form>
</template>

<script lang="ts">
import useRecipes from "@/composables/recipes";
import { IIngredient } from "@/types/IIngredient";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import FormInputText from "@/components/Forms/FormInputText.vue";
import FormFieldset from "@/components/Forms/FormFieldset.vue";
import FormTextarea from "@/components/Forms/FormTextarea.vue";
export default defineComponent({
  components: {
    FormInputText,
    FormFieldset,
    FormTextarea,
  },
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const router = useRouter();

    const directions = ref("");
    const ingredients = ref("");

    const { formData, getRecipe, updateRecipe, createRecipe, deleteRecipe } =
      useRecipes();

    onMounted(async () => {
      await getRecipe(props.id);
      directions.value = formData.directions.join("\n\n");
      ingredients.value = formData.ingredients
        .map((ingredient: IIngredient) => {
          if (ingredient.amount) {
            return `${ingredient.amount} ${ingredient.title}`;
          }
          return ingredient.title;
        })
        .join("\n");
    });

    const deleteR = async () => {
      await deleteRecipe(props.id);
      router.push({
        name: "Recipes",
      });
    };

    const createIngredients = () => {
      const directionList = ingredients.value.split("\n");
      const filledList = directionList.filter((direction) => direction !== "");
      const filed = filledList.map((ingredient) => {
        var matches = ingredient.split(/(\d+)/).filter(Boolean);
        if (matches.length > 0 && !isNaN(parseFloat(matches[0]))) {
          return {
            amount: parseFloat(matches[0]),
            title: matches[1],
          };
        }
        return {
          title: ingredient,
        };
      });
      return JSON.stringify(filed);
    };

    const createDirections = () => {
      const directionList = directions.value.split("\n");
      const filledList = directionList.filter((direction) => direction !== "");
      return JSON.stringify(filledList);
    };

    const save = async () => {
      formData.directions = createDirections();
      formData.ingredients = createIngredients();
      let id = null;
      if (props.id) {
        id = props.id;
        await updateRecipe();
      } else {
        id = await createRecipe();
      }
      router.push({
        name: "RecipeDetails",
        params: { id },
      });
    };

    return {
      ingredients,
      directions,
      save,
      formData,
      deleteR,
    };
  },
});
</script>
