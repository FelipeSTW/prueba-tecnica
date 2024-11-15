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
      app.component('v-card', {
        template: '<div class="v-card"><slot></slot></div>'
      })
      app.component('v-card-title', {
        template: '<div class="v-card-title"><slot></slot></div>'
      })
      app.component('v-card-text', {
        template: '<div class="v-card-text"><slot></slot></div>'
      })
      app.component('v-row', {
        template: '<div class="v-row"><slot></slot></div>'
      })
      app.component('v-col', {
        template: '<div class="v-col"><slot></slot></div>'
      })
      app.component('v-chart', {
        template: '<div class="v-chart"></div>',
        props: ['option']
      })
    }
  }