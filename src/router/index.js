import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../views/home.vue'
import Main from '../components/main/main.vue'
import Owner from '../components/owner/owner.vue'
import Estate from '../components/estate/estate.vue'
import EstateApplication from '../components/estate/estateApplication.vue'
import Fix from '../components/fix/fix.vue'
import Parking from '../components/parking/parking.vue'
import Pay from '../components/pay/pay.vue'
import BulletinDetails from '../components/main/bulletinDetails.vue'
import BulletinModify from '../components/main/bulletinModify.vue'
import AddOwner from '../components/owner/addOwner.vue'
import AddEstate from '../components/estate/addEstate.vue'
import EstateRegister from '../components/estate/estateResgister.vue'
import EstateApplicationModify from '../components/estate/estateApplicationModify.vue'
import addParking from '../components/parking/addParking.vue'
import FixDetail from '../components/fix/fixDetail.vue'
import AddPay from '../components/pay/addPay.vue'
import AddFix from '../components/fix/addFix.vue'
import OwnerHome from '../views/owner_home.vue'
import OwnerFix from '../components/ownerMain/ownerFix.vue'
import OwnerApplication from '../components/ownerMain/ownerApplication.vue'
import OwnerPasswordModify from '../components/ownerMain/ownerPasswordModify.vue'

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
        // 首页
        path: '/main',
        name: 'main',
        component: Main
      },
      // 公告详情页
      {
        path: '/bulletinDetails/:id',
        name: 'bulletinDetails',
        component: BulletinDetails
      },
      // 公告编辑页
      {
        path: '/bulletinModify',
        name: 'bulletinModify',
        component: BulletinModify
      },
      {
        // 业主管理
        path: '/owner',
        name: 'owner',
        component: Owner
      },
      {
        // 新增业主
        path: '/owner/addowner',
        name: 'addowner',
        component: AddOwner
      },
      {
        // 房产列表
        path: '/estate',
        name: 'estate',
        component: Estate
      },
      {
        // 新增房产信息
        path: '/estate/addEstateApplication',
        name: 'addEstate',
        component: AddEstate
      },
      {
        // 房产销售管理
        path: '/estateApplication',
        name: 'estateApplication',
        component: EstateApplication
      },
      {
        // 房产销售登记
        path: '/estateRegister',
        name: 'estateRegister',
        component: EstateRegister
      },
      {
        // 报修管理
        path: '/fix',
        name: 'fix',
        component: Fix
      },
      {
        // 报修详情页
        path: '/fixDetail',
        name: 'fixDetail',
        component: FixDetail
      },
      {
        // 新增报修信息
        path: '/addFix',
        name: 'addFix',
        component: AddFix
      },
      {
        // 车位管理
        path: '/parking',
        name: 'parking',
        component: Parking
      },
      {
        // 新增车位信息
        path: '/addParking',
        name: 'addParking',
        component: addParking
      },
      {
        // 费用列表
        path: '/pay',
        name: 'pay',
        component: Pay
      },
      {
        // 新增费用信息
        path: '/addPay',
        name: 'addPay',
        component: AddPay
      }
    ]
  },
  {
    path: '/ownerHome',
    name: 'ownerHome',
    component: OwnerHome,
    children: [
      {
        // 业主首页
        path: '/ownerApplication',
        name: 'ownerApplication',
        component: OwnerApplication
      },
      {
        // 业主报修页
        path: '/ownerFix',
        name: 'ownerFix',
        component: OwnerFix
      },
      {
        // 业主修改密码
        path: '/ownerPasswordModify',
        name: 'ownerPasswordModify',
        component: OwnerPasswordModify
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
