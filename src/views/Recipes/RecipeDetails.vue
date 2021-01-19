<template>
  <form @submit.prevent="submit">
    <form-fieldset title="Recept beheren">
      <form-input-text id="name" v-model="formData.title" title="Naam recept" />
      <div>
        <select v-model="formData.icon">
          <option value="meat">Vlees</option>
          <option value="fish">Vis</option>
          <option value="vegetarian">Vegetarisch</option>
        </select>
      </div>
      <button type="submit">Recept {{ id ? "wijzigen" : "toevoegen" }}</button>
      <button v-if="id" type="button" @click="deleteRecipe1">
        Recept verwijderen
      </button>
    </form-fieldset>
  </form>
</template>

<script>
import useRecipes from "@/compositions/recipes";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import FormFieldset from "@/components/Forms/FormFieldset";
import FormInputText from "@/components/Forms/FormInputText";

export default {
  components: {
    FormFieldset,
    FormInputText,
  },
  props: {
    id: String,
    default: null,
  },
  setup(props) {
    const router = useRouter();
    const {
      createPost,
      formData,
      getRecipe,
      updatePost,
      deleteRecipe,
    } = useRecipes();

    onMounted(() => {
      if (props.id) getRecipe(props.id);
    });

    const submit = async () => {
      if (props.id) {
        updatePost(props.id);
      } else {
        const id = await createPost();
        router.push({ name: "RecipeDetails", params: { id } });
      }
    };

    const deleteRecipe1 = async () => {
      await deleteRecipe(props.id);
      router.push({ name: "RecipesHome" });
    };

    return {
      deleteRecipe1,
      submit,
      formData,
    };
  },
};
</script>
