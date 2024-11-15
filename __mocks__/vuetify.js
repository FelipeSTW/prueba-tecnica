export default {
    install: (app) => {
      app.component('v-app', {
        template: '<div class="v-app"><slot></slot></div>'
      })
      app.component('v-container', {
        template: '<div class="v-container"><slot></slot></div>'
      })
      app.component('v-main', {
        template: '<div class="v-main"><slot></slot></div>'
      })
    }
  }