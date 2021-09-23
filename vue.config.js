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
      categories: ["food"],
      lang: "nl",
      orientation: "portrait-primary",
      shortcuts: [
        {
          name: "Weekmenu",
          short_name: "Weekmenu",
          url: "/",
          icons: [{ src: "/img/icons/android-chrome", sizes: "192x192" }],
        },
        {
          name: "Recepten",
          short_name: "Recepten",
          url: "/recepten",
          icons: [{ src: "/img/icons/android-chrome.png", sizes: "192x192" }],
        },
      ],
    },
    workboxOptions: {
      exclude: ["netlify.toml"],
    },
  },
};
