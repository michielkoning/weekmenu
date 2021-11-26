import { reactive } from "vue";
import { ComponentOptions } from "vue";
import { IWeek } from "@/types/IWeek";
import { IRecipe } from "@/types/IRecipe";
import useUser from "@/composables/user";
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
  runTransaction,
  // serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

const formData = reactive({
  startDate: new Date(),
  days: [],
  recipes: [],
} as IWeek);

export default (): ComponentOptions => {
  const { getUser } = useUser();

  const getWeek = async () => {
    const user = getUser();

    try {
      if (!user) {
        throw "Incorrect user ID";
      }
      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw "Document does not exist!";
      }

      const response = docSnap.data();
      formData.recipes = response.weekMenu;
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };

  const selectRecipe = async (recipe: IRecipe, selectedDay: number) => {
    const user = getUser();

    try {
      if (!user) {
        throw "Incorrect user ID";
      }

      const sfDocRef = doc(db, "users", user.uid);
      const recipeRed = doc(db, "users", user.uid, "recipes", recipe.id);

      formData.recipes[selectedDay] = recipeRed;
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);

        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }

        transaction.update(sfDocRef, {
          weekMenu: formData.recipes,
        });
      });
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };

  return {
    selectRecipe,
    getWeek,
    formData,
  };
};
