// import 'babel-polyfill';
// import 'whatwg-fetch';
import Vue from 'vue'
import App from './App.vue'

// eslint-disable-next-line no-undef
Vue.config.productionTip = false

// eslint-disable-next-line no-undef
new Vue({
  render: h => h(App)
}).$mount('#app')