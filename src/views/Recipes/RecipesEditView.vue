<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, type Ref } from "vue";
import { getDetails, edit } from "@/db/recipes";
import type { IFormData, IIngredient } from "@/types/IRecipe";
import { useRouter } from "vue-router";
import FormFieldset from "@/components/Forms/Elements/FormFieldset.vue";
import FormInputText from "@/components/Forms/Elements/FormInputText.vue";
import FormTextarea from "@/components/Forms/Elements/FormTextarea.vue";
import AppForm from "@/components/Forms/Elements/AppForm.vue";
import TheDashboard from "@/components/Layout/TheDashboard.vue";
import useBreadCrumb from "@/composables/useBreadCrumb";
import { ROUTES } from "@/enums/routes";

const { add: addToBreadCrumb, remove: removeFromBreadCrumb } = useBreadCrumb();
const error: Ref<string | null> = ref(null);

const formData = reactive<IFormData>({
  title: "",
  content: "",
  ingredients: "",
  preperationTime: 60,
});

const loading = ref(false);
const router = useRouter();

const props = defineProps<{
  id?: string;
}>();

const pageTitle = computed(() => {
  if (props.id) {
    return "Recept bewerken";
  }
  return "Recept aanmaken";
});

onMounted(async () => {
  if (props.id) {
    try {
      loading.value = true;
      const response: any = await getDetails(props.id);
      if (!response) {
        throw "No Response";
      }
      formData.id = props.id;
      formData.title = response.title;
      formData.preperationTime = response.preperationTime;
      formData.content = response.content.join("\n\n");

      const ingredients = response.ingredients
        .map((ingredient: IIngredient) => {
          if (ingredient.amount) {
            return `${ingredient.amount} ${ingredient.title}`;
          }
          return ingredient.title;
        })
        .join("\n");
      formData.ingredients = ingredients;
      addToBreadCrumb(formData.title, {
        name: ROUTES.recipes_details,
        params: { id: props.id },
      });
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
  addToBreadCrumb(pageTitle.value);
});

onUnmounted(() => {
  removeFromBreadCrumb(formData.title);
  removeFromBreadCrumb(pageTitle.value);
});

const submit = async () => {
  try {
    loading.value = true;
    const response = await edit(formData);
    if (!response) {
      throw "No Response";
    }
    router.push({
      name: ROUTES.recipes_details,
      params: {
        id: response.id,
      },
    });
  } catch (err) {
    console.log(err instanceof Error);
    if (err instanceof Error) {
      error.value = err.message;
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <the-dashboard>
    <h1>{{ pageTitle }}</h1>
    <app-form
      :submitted="false"
      :button-title="pageTitle"
      :error="error"
      @submit="submit"
    >
      <form-fieldset title="Recept">
        <form-input-text id="title" v-model="formData.title" title="Title" />
        <form-input-text
          id="preperationTime"
          v-model="formData.preperationTime"
          title="Bereidingstijd"
          type="number"
        />
        <form-textarea
          id="content"
          v-model="formData.content"
          :rows="8"
          title="Content"
        />

        <form-textarea
          id="ingredients"
          v-model="formData.ingredients"
          :rows="8"
          title="Ingredients"
        />
      </form-fieldset>
    </app-form>
  </the-dashboard>
</template>
