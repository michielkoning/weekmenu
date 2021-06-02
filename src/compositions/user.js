import { firebase } from "@firebase/app";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useRecipes from "@/compositions/recipes";
import useWeekMenu from "@/compositions/weekMenu";

export default () => {
  const form = reactive({
    email: "michielkoning@gmail.com",
    password: "michielkoning",
  });
  const error = ref(null);
  const loading = ref(false);
  const { getPosts } = useRecipes();
  const { getWeekMenu } = useWeekMenu();
  const router = useRouter();

  const login = async () => {
    error.value = null;
    loading.value = true;

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(form.email, form.password);
      await getPosts();
      await getWeekMenu();
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

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      router.push("/inloggen");
    } catch (error) {
      alert(error.message);
      router.push("/inloggen");
    }
  };

  const profile = () => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: "Jane Q. User",
      })
      .then(function () {
        // Update successful.
        console.log("succes");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return {
    profile,
    error,
    form,
    login,
    register,
    loading,
    logout,
  };
};
