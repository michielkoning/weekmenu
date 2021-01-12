import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { openDB } from "idb/with-async-ittr.js";

const db = openDB("Articles", 1, {
  upgrade(db) {
    // Create a store of objects
    const store = db.createObjectStore("articles", {
      // The 'id' property of the object will be the key.
      keyPath: "id",
      // If it isn't explicitly set, create a value by auto incrementing.
      autoIncrement: true,
    });
    // Create an index on the 'date' property of the objects.
    store.createIndex("date", "date");
  },
});

createApp(App).use(router).provide("db", db).mount("#app");
