import { firebaseApp, db } from "@/firebase";
import {
  getAuth,
  setPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  Unsubscribe,
  User,
  signOut,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ComponentOptions } from "vue";

const user = ref(null as User | null);

export default (): ComponentOptions => {
  const form = reactive({
    email: "michielasdkaoni12312n1g@gmail.com",
    password: "michielkoning",
  });
  const error = ref(null);
  const loading = ref(false);
  const router = useRouter();

  const listener = ref(null as Unsubscribe | null);

  const setUserEventListener = () => {
    const auth = getAuth();
    listener.value = auth.onAuthStateChanged((firebaseUser) => {
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
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, form.email, form.password);
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
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence);
      await getAuth(firebaseApp).setPersistence(browserLocalPersistence);
      const response = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await setDoc(doc(db, "users", response.user?.uid), {});

      router.push("/");
    } catch (err) {
      // error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
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
