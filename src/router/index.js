import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../views/home.vue'
import Main from '../components/main/main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/main',
        name: 'main',
        component: Main
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 动态路由
router.beforeEach((to, from, next) => {
  // 无权限访问login放行
  if (to.path === '/login') {
    return next()
  }
  // 申明一个token
  const tokenStr = window.localStorage.getItem('token')
  // 判断有无token
  if (!tokenStr) {
    // 没有就强制返回登录页
    return next('/login')
  } else {
    next()
  }
})

export default router
