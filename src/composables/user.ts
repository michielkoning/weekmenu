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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ComponentOptions } from "vue";
import { IUser} from '@/types/IUser'

const user = ref(null as User | null);

export default (): ComponentOptions => {
  const error = ref(null);
  const loading = ref(false);
  const router = useRouter();

  const listener = ref(null as Unsubscribe | null);

  const setUserEventListener = async () => {
    const auth = await getAuth();
    listener.value = auth.onAuthStateChanged((firebaseUser) => {
      user.value = firebaseUser;
    });
  };

  const resetUserEventListener = () => {
    listener.value = null;
  };

  const login = async (user: IUser) => {
    error.value = null;
    loading.value = true;

    try {
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, user.email, user.password);
      router.push("/");
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false;
    }
  };

  const register = async (user: IUser) => {
    error.value = null;
    loading.value = true;
    try {
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence);
      await getAuth(firebaseApp).setPersistence(browserLocalPersistence);
      const response = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      await setDoc(doc(db, "users", response.user?.uid), {});

      router.push("/");
    } catch (err: any) {
       error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      // console.error(error.message);
    } finally {
      router.push("/inloggen");
    }
  };

  return {
    user,
    error,
    login,
    register,
    loading,
    logout,
    setUserEventListener,
    resetUserEventListener,
  };
};
