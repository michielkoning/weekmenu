<template>
  <app-form class="recipe" button-title="Save" @submit="save">
    <form-fieldset title="Recept bewerken">
      <form-input-text v-model="formData.title" name="title" title="Titel" />
      <form-input-text
        v-model.number="formData.preparationTime"
        type="number"
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
    <template #buttons>
      <button v-if="id" type="button" class="btn btn-danger" @click="deleteR">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="trash"
          role="img"
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
          ></path>
        </svg>
      </button>
    </template>
  </app-form>
</template>

<script lang="ts">
import useRecipes from "@/composables/recipes";
import { IIngredient } from "@/types/IIngredient";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import FormInputText from "@/components/FormElements/FormInputText.vue";
import FormFieldset from "@/components/FormElements/FormFieldset.vue";
import FormTextarea from "@/components/FormElements/FormTextarea.vue";
import AppForm from "@/components/FormElements/AppForm.vue";

export default defineComponent({
  components: {
    FormInputText,
    FormFieldset,
    FormTextarea,
    AppForm,
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

    const createArrayOfInput = (input: string) => {
      const list = input.split("\n");
      return list.filter((item) => item !== "");
    };

    const createIngredients = () => {
      const list = createArrayOfInput(ingredients.value);
      return list.map((ingredient) => {
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
    };

    const createDirections = () => {
      return createArrayOfInput(directions.value);
    };

    const save = async () => {
      formData.directions = createDirections();
      formData.ingredients = createIngredients();
      console.log(formData);
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

<style lang="postcss" scoped>
.icon {
  width: 1em;
  height: 1em;
}
</style>
