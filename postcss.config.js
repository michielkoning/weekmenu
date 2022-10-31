module.exports = {
  "postcss-mixins": {
    mixinsDir: "./src/assets/css/mixins/",
  },
  plugins: {
    "postcss-preset-env": {
      importFrom: "./src/assets/css/media-queries/media-queries.css",
      disableDeprecationNotice: true,
      features: {
        "nesting-rules": true,
        "custom-media-queries": true,
        "media-query-ranges": true,
      },
    },
  },
};
