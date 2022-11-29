<script setup lang="ts">
import { reactive, computed, onMounted } from "vue";
import type { IFormData, IIngredient } from "@/interfaces/IRecipe";
import { useRouter } from "vue-router";
import FormFieldset from "@/components/Forms/Elements/FormFieldset.vue";
import FormInputText from "@/components/Forms/Elements/FormInputText.vue";
import FormTextarea from "@/components/Forms/Elements/FormTextarea.vue";
import AppForm from "@/components/Forms/Elements/AppForm.vue";
import { ROUTES } from "@/enums/routes";
import { required, numeric } from "@/i18n/validators";
import useVuelidate from "@vuelidate/core";
import useValidate from "@/composables/useValidate";
import FormPersons from "@/components/Forms/Elements/FormPersons.vue";
import useRecipes from "@/composables/useRecipes";

const { error, upsertRecipe, recipe, getRecipe } = useRecipes();

const formData = reactive<IFormData>({
  id: undefined,
  title: "",
  content: "",
  ingredients: "",
  preperationTime: 0,
  persons: 2,
  source: "",
});

const rules = computed(() => ({
  title: {
    required,
  },
  preperationTime: {
    numeric,
  },
  persons: {
    numeric,
  },
}));
const v$ = useVuelidate(rules, formData, { $lazy: true });

const { formError } = useValidate(v$, error);

const router = useRouter();

const createArrayOfInput = (input: string) => {
  const list = input.split("\n");
  return list.filter((item) => item !== "");
};

const createIngredients = (input: string) => {
  const list = createArrayOfInput(input);
  return list.map((ingredient) => {
    const matches = ingredient.split(/(\d+ )/).filter(Boolean);
    if (matches.length > 0 && !isNaN(parseFloat(matches[0]))) {
      const amount = parseFloat(matches[0]) / formData.persons;
      return {
        amount,
        title: matches[1],
      };
    }
    return {
      title: ingredient,
    };
  });
};

const props = defineProps<{
  title: string;
  id?: string;
}>();

const submit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }

  const content = createArrayOfInput(formData.content);
  const ingredients = createIngredients(formData.ingredients);

  const response = await upsertRecipe({
    ...formData,
    ingredients,
    content,
  });

  if (!response) {
    return;
  }

  router.push({
    name: ROUTES.recipes_details,
    params: {
      id: response,
    },
  });
};

const setFormData = async () => {
  if (!props.id) {
    return;
  }
  await getRecipe(props.id);
  if (!recipe.value) {
    return;
  }
  formData.id = recipe.value.id;
  formData.title = recipe.value.title;
  formData.preperationTime = recipe.value.preperationTime;
  if (recipe.value.content) {
    formData.content = recipe.value.content.join("\n\n");
  }
  if (recipe.value.persons) {
    formData.persons = recipe.value.persons;
  }
  formData.source = recipe.value.source;
  formData.ingredients = recipe.value.ingredients
    .map((ingredient: IIngredient) => {
      if (ingredient.amount) {
        const amount = ingredient.amount * formData.persons;
        return `${amount} ${ingredient.title}`;
      }
      return ingredient.title;
    })
    .join("\n");
};

onMounted(async () => {
  await setFormData();
});
</script>

<template>
  <app-form
    :submitted="false"
    :button-title="title"
    :error="formError"
    @submit="submit"
  >
    <form-fieldset title="Recept">
      <form-input-text
        id="title"
        v-model="formData.title"
        :errors="v$.title.$errors"
        title="Title"
        @blur="v$.title.$touch"
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
      <form-persons v-model.number="formData.persons" />
      <form-input-text
        id="preperationTime"
        v-model.number="formData.preperationTime"
        :errors="v$.preperationTime.$errors"
        title="Bereidingstijd"
        type="number"
        @blur="v$.preperationTime.$touch"
      />
      <form-input-text id="source" v-model="formData.source" title="Bron" />
    </form-fieldset>
  </app-form>
</template>
