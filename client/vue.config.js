module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/globals/_index.scss";
          @import "@/assets/styles/utils/_index.scss";
        `,
      },
    },
  },
};
