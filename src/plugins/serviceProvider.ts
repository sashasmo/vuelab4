import serviceProvider from '@/services'

export default {
  install: (app) => {
    app.config.globalProperties.$serviceProvider = serviceProvider
    app.provide('serviceProvider', serviceProvider)
  }
}
