import { firebase } from "@/firebase";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ComponentOptions } from "vue";

const user = ref(null as firebase.User | null);

export default (): ComponentOptions => {
  const form = reactive({
    email: "michielasdkaoni12312n1g@gmail.com",
    password: "michielkoning",
  });
  const error = ref(null);
  const loading = ref(false);
  const router = useRouter();

  const listener = ref(null as firebase.Unsubscribe | null);

  const setUserEventListener = () => {
    listener.value = firebase.auth().onAuthStateChanged((firebaseUser) => {
      user.value = firebaseUser;
    });
  };

  const resetUserEventListener = () => {
    listener.value = null;
  };

  const login = async () => {
    error.value = null;
    loading.value = true;

    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      await firebase
        .auth()
        .signInWithEmailAndPassword(form.email, form.password);
      router.push("/");
    } catch (err) {
      // error.value = err.message;
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
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password);
      firebase.firestore().collection("users").doc(response.user?.uid).set({});
      router.push("/");
    } catch (err) {
      // error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      router.push("/inloggen");
    } catch (error) {
      // alert(error.message);
      router.push("/inloggen");
    }
  };

  return {
    user,
    error,
    form,
    login,
    register,
    loading,
    logout,
    setUserEventListener,
    resetUserEventListener,
  };
};
