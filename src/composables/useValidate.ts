import type { Validation } from "@vuelidate/core";
import { computed, type Ref } from "vue";
import { useI18n } from "vue-i18n";

export default (v$: Ref<Validation>, error: Ref<null | string>) => {
  const { t } = useI18n();

  const formError = computed(() => {
    if (v$.value.$dirty && v$.value.$invalid) {
      return t("validations.form");
    } else if (error.value) {
      return error.value;
    }
    return null;
  });

  return {
    formError,
  };
};
