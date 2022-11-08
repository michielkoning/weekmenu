import { ref, type Ref } from "vue";
import {
  login as loginUser,
  register as registerUser,
  resetPassword as resetPasswordUser,
  updatePassword as updatePasswordUser,
} from "@/db/user";

export default () => {
  const loading = ref(false);
  const error: Ref<string | null> = ref(null);
  const success = ref(false);

  const login = async (email: string, password: string) => {
    try {
      error.value = null;
      loading.value = true;
      await loginUser(email, password);
      success.value = true;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      error.value = null;
      loading.value = true;
      await registerUser(email, password);
      success.value = true;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      error.value = null;
      loading.value = true;
      await resetPasswordUser(email);
      success.value = true;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const updatePassword = async (password: string) => {
    try {
      error.value = null;
      loading.value = true;
      await updatePasswordUser(password);
      success.value = true;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    success,
    login,
    register,
    resetPassword,
    updatePassword,
  };
};
