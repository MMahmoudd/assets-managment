module.exports = {
  devServer: {
    disableHostCheck: true,
    // proxy: 'https://81.29.108.94/',
  },
  publicPath: process.env.BASE_URL,

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'ar',
      fallbackLocale: 'ar',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
