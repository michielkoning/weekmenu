import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth, User } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  appId: process.env.VUE_APP_APP_ID,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
enableIndexedDbPersistence(db);

const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export { getCurrentUser, firebaseApp, db };
