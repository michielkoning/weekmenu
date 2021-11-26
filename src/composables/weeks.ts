import { ref, reactive } from "vue";
import { ComponentOptions } from "vue";
import { IWeek } from "@/types/IWeek";
import { getAuth } from "firebase/auth";
import useApi from "@/composables/api";
import {
  getDoc,
  doc,
  // collection,
  // query,
  // onSnapshot,
  // DocumentData,
  // Unsubscribe,
  // addDoc,
  // deleteDoc,
  // orderBy,
  // runTransaction,
  // serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

const list = ref([] as IWeek[]);
const formData = reactive({
  startDate: new Date(),
  days: [],
  recipes: new Array(7).fill(null),
} as IWeek);

export default (): ComponentOptions => {
  const collectionId = "weeks";
  const { getAll, unsubscribe, get, create, remove } = useApi("weeks");
  const auth = getAuth();
  const user = auth.currentUser;

  const unsubscribeWeekmenu = () => {
    list.value = [];
    if (unsubscribe) {
      unsubscribe();
    }
  };

  const createWeek = async () => {
    return await create(formData);
  };

  const getWeeks = async () => {
    list.value = await getAll();
  };

  const getWeek = async (id: string) => {
    if (!user) {
      return [];
    }

    const docRef = doc(db, "users", user.uid, collectionId, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    }

    return null;
  };

  const deleteWeek = async (id: string) => {
    await remove(id);
  };

  return {
    formData,
    unsubscribeWeekmenu,
    getWeeks,
    getWeek,
    weeks: list,
    createWeek,
    deleteWeek,
  };
};
