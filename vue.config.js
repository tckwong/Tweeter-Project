module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      scss: {
        data: `@import "~@/css/generalStyle.scss";`
      }
    }
  }
}
