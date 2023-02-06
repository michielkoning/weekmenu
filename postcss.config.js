// eslint-disable-next-line no-undef
module.exports = {
  "postcss-mixins": {
    mixinsDir: "./src/assets/css/mixins/",
  },
  plugins: {
    "postcss-preset-env": {
      disableDeprecationNotice: true,
      features: {
        "nesting-rules": true,
        "custom-media-queries": true,
        "media-query-ranges": true,
      },
    },
  },
};
