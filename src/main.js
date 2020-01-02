import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
