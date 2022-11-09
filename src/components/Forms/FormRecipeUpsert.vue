<script setup lang="ts">
import { reactive, ref, toRef, watchEffect, type Ref, computed } from "vue";
import { upsert } from "@/db/recipes";
import type { IFormData, IIngredient, IRecipeDetails } from "@/types/IRecipe";
import { useRouter } from "vue-router";
import FormFieldset from "@/components/Forms/Elements/FormFieldset.vue";
import FormInputText from "@/components/Forms/Elements/FormInputText.vue";
import FormTextarea from "@/components/Forms/Elements/FormTextarea.vue";
import AppForm from "@/components/Forms/Elements/AppForm.vue";
import { ROUTES } from "@/enums/routes";
import { required, numeric } from "@/i18n/validators";
import useVuelidate from "@vuelidate/core";
import useValidate from "@/composables/useValidate";

const error: Ref<string | null> = ref(null);

const formData = reactive<IFormData>({
  title: "",
  content: "",
  ingredients: "",
  preperationTime: 0,
});

const rules = computed(() => ({
  title: {
    required,
  },
  preperationTime: {
    numeric,
  },
}));
const v$ = useVuelidate(rules, formData, { $lazy: true });

const { formError } = useValidate(v$, error);

const loading = ref(false);
const router = useRouter();

const createArrayOfInput = (input: string) => {
  const list = input.split("\n");
  return list.filter((item) => item !== "");
};

const createIngredients = (input: string) => {
  const list = createArrayOfInput(input);
  return list.map((ingredient) => {
    const matches = ingredient.split(/(\d+)/).filter(Boolean);
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

const props = defineProps<{
  title: string;
  recipe?: IRecipeDetails;
}>();
const recipe = toRef(props, "recipe");

const submit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }

  try {
    loading.value = true;

    const content = createArrayOfInput(formData.content);
    const ingredients = createIngredients(formData.ingredients);

    const response = await upsert({
      ...formData,
      ingredients,
      content,
    });
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

const setFormData = () => {
  if (!recipe.value) {
    return;
  }
  formData.id = recipe.value.id;
  formData.title = recipe.value.title;
  formData.preperationTime = recipe.value.preperationTime;
  if (recipe.value.content) {
    formData.content = recipe.value.content.join("\n\n");
  }
  formData.ingredients = recipe.value.ingredients
    .map((ingredient: IIngredient) => {
      if (ingredient.amount) {
        return `${ingredient.amount} ${ingredient.title}`;
      }
      return ingredient.title;
    })
    .join("\n");
};

watchEffect(() => {
  if (recipe.value) {
    setFormData();
  }
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
      <form-input-text
        id="preperationTime"
        v-model.number="formData.preperationTime"
        :errors="v$.preperationTime.$errors"
        title="Bereidingstijd"
        type="number"
        @blur="v$.preperationTime.$touch"
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
</template>
