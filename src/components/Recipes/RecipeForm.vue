<template>
  <app-form :button-title="edit" @submit="submit">
    <h1>{{ formData.title }}</h1>
    <form-fieldset :title="title">
      <form-input-text id="name" v-model="formData.title" title="Naam recept" />
      <form-select-tag v-model="formData.category" />
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
    </form-fieldset>
  </app-form>
</template>

<script lang="ts">
import useRecipes from "@/composables/recipes";
import { onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import FormFieldset from "@/components/FormElements/FormFieldset.vue";
import FormInputText from "@/components/FormElements/FormInputText.vue";
import FormSelectTag from "@/components/FormElements/FormSelectTag.vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import AppForm from "@/components/FormElements/AppForm.vue";

export default defineComponent({
  components: {
    FormFieldset,
    FormInputText,
    FormSelectTag,
    AppForm,
  },
  setup() {
    const route = useRoute();
    const title = computed(() => {
      return route.params.id ? "Recept bewerken" : "Nieuw recept";
    });
    const router = useRouter();

    const id = computed(() => {
      return route.params.id;
    });
    const { createRecipe, formData, getRecipe, updateRecipe, deleteRecipe } =
      useRecipes();

    onMounted(() => {
      if (id.value) getRecipe(id.value);
    });

    watch(id, (newId) => {
      getRecipe(newId);
    });

    const submit = async () => {
      if (route.params.id) {
        updateRecipe(route.params.id);
      } else {
        const id = await createRecipe();
        router.push({ name: "Recipes", params: { id } });
      }
    };

    const deleteRecipe1 = async () => {
      if (route.params.id === undefined) {
        return;
      }
      await deleteRecipe(route.params.id);
      router.push({ name: "Recipes" });
    };

    return {
      title,
      deleteRecipe1,
      submit,
      formData,
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
