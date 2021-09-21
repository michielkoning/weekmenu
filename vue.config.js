const title = "Weekmenu";
const color = "#d4e4a2";

module.exports = {
  pwa: {
    name: title,
    themeColor: color,
    msTileColor: color,
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    manifestOptions: {
      background_color: color,
      theme_color: color,
      categories: ["food"],
      lang: "nl",
      name: title,
      orientation: "portrait-primary",
      short_name: title,
    },
  },
};
