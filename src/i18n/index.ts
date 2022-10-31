import { createI18n } from "vue-i18n";
import nl from "./locales/nl.json";

type MessageSchema = typeof nl;

const numberFormats = {
  nl: {
    decimal: {
      style: "decimal",
      maximumFractionDigits: 2,
    },
  },
};

export default createI18n<[MessageSchema], "nl">({
  legacy: false, // you must set `false`, to use Composition API,
  locale: "nl", // set locale
  messages: { nl },
  numberFormats,
});
