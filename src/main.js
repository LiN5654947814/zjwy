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
// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // 400错误
    if (response.data.state === 400) {
      Vue.prototype.$message({
        type: 'error',
        message: '请求失败'
      })
      // 404错误
    } else if (response.data.state === 404) {
      console.log(1111)
      Vue.prototype.$message({
        type: 'error',
        message: response.data.message
      })
      // 强制返回登录页
      router.replace('/login')
      // 401错误
    } else if (response.data.state === 401) {
      Vue.prototype.$message({
        type: 'error',
        message: response.data.message
      })
    }
    return response
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
// 发送请求前做点什么
axiosInstance.interceptors.request.use(config => {
  // 获取token
  const token = localStorage.getItem('token')
  if (token) {
    // 设置请求头，发送token
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})
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
