module.exports = {
  "postcss-mixins": {
    mixinsDir: "./src/assets/css/mixins/",
  },
  plugins: {
    "postcss-preset-env": {
      features: {
        "nesting-rules": true,
        "custom-media-queries": true,
        "media-query-ranges": true,
      },
    },
  },
};
