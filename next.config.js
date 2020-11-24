const withImages = require("next-images");
module.exports = withImages({
  i18n: {
    locales: ["en", "pt-BR"],
    defaultLocale: "en",
  },
});
