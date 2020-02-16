module.exports = {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  server: {
    host: process.env.HOST,
    port: process.env.PORT
  },
  loading: { color: '#007bff' },
  css: ['~/assets/scss/main.scss'],
  plugins: [
    { src: '~/plugins/datepicker', ssr: false },
    { src: '~/plugins/sticky', ssr: false },
    { src: '~/plugins/notifications', ssr: false },
    { src: '~/plugins/scrollto', ssr: false },
    { src: '~/plugins/lazyload', ssr: false }
  ],
  buildModules: ['@nuxtjs/eslint-module'],
  modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios', '@nuxtjs/auth', '@nuxtjs/dotenv', '@nuxtjs/moment'],
  axios: {
    proxy: true,
    https: true
  },
  moment: {
    defaultLocale: 'ru',
    locales: ['ru']
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { propertyName: 'token.accessToken' }
        }
      }
    },
    redirect: {
      logout: '/login'
    }
  },
  router: {
    middleware: ['auth']
  },
  build: {
    extend(config, ctx) {}
  }
}
