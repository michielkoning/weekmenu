import { firebase } from "@firebase/app";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default () => {
  const form = reactive({
    email: "michielkoning@gmail.com",
    password: "michielkoning",
  });
  const error = ref(null);
  const loading = ref(false);

  const router = useRouter();

  const login = async () => {
    error.value = null;
    loading.value = true;

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(form.email, form.password);
      router.push("/");
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const register = async () => {
    error.value = null;
    loading.value = true;
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password);
      router.push("/");
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    error,
    form,
    login,
    register,
    loading,
  };
};
