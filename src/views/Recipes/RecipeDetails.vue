<template>
  <form @submit.prevent="submit">
    <form-fieldset title="Recept beheren">
      <form-input-text id="name" v-model="formData.title" title="Naam recept" />
      <form-select-tag v-model="formData.icon" />
      <div class="buttons">
        <button type="submit" class="btn btn-primary">
          Recept {{ id ? "wijzigen" : "toevoegen" }}
        </button>
        <button
          v-if="id"
          type="button"
          class="btn btn-danger"
          @click="deleteRecipe1"
        >
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
      </div>
    </form-fieldset>
  </form>
</template>

<script>
import useRecipes from "@/compositions/recipes";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import FormFieldset from "@/components/Forms/FormFieldset";
import FormInputText from "@/components/Forms/FormInputText";
import FormSelectTag from "@/components/Forms/FormSelectTag";

export default {
  components: {
    FormFieldset,
    FormInputText,
    FormSelectTag,
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

<style lang="postcss" scoped>
form {
  background: #efefef;
  padding: 1em;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.icon {
  width: 1em;
  height: 1em;
}
</style>
