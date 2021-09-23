import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { firebaseApp, initializeFirebase } from "./firebase";

initializeFirebase();

if (firebaseApp) {
  createApp(App).use(router).mount("#app");
}
