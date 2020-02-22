import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import echarts from 'echarts'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
// Vue.prototype.$axios = axios.create({
//   baseURL: 'http://localhost:3000/',
//   timeout: 1000
// })

let axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000
})

axiosInstance.interceptors.response.use(
  response => {
    // 在接收响应做些什么，例如跳转到登录页
    return response
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
axiosInstance.interceptors.request
  .use
  // config => {
  //   if (localStorage.getItem('token')) {
  //     config.headers.commom['token'] = localStorage.getItem('token')
  //     console.log(11111111111111)
  //   }
  //   return config
  // },
  // error => {
  //   return Promise.reject(error)
  // }
  ()
// 全局时间过滤器
Vue.filter('dateFormat', function(dataStr, pattern = 'YYYY-MM-DD') {
  return moment(dataStr).format(pattern)
})
Vue.prototype.$axios = axiosInstance
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
