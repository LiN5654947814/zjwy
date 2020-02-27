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
import parkingApplication from '../components/parking/parkingApplication.vue'
import FixDetail from '../components/fix/fixDetail.vue'
import AddPay from '../components/pay/addPay.vue'
import AddFix from '../components/fix/addFix.vue'
import OwnerHome from '../views/owner_home.vue'
import OwnerFix from '../components/ownerMain/ownerFix.vue'
import OwnerApplication from '../components/ownerMain/ownerApplication.vue'
import OwnerPasswordModify from '../components/ownerMain/ownerPasswordModify.vue'
import parkingRegister from '../components/parking/parkingRegister.vue'
import complaint from '../components/complaint/complaint.vue'
import complaintReply from '../components/complaint/complaintReply.vue'
import ownerComplaint from '../components/ownerMain/ownerComplaint.vue'
import ownerNotice from '../components/ownerMain/ownerNoticeDetail.vue'
import error from '../components/error.vue'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      roles: ['admin']
    },
    component: Home,
    children: [
      {
        // 首页
        path: '/main',
        name: 'main',
        meta: {
          roles: ['admin']
        },
        component: Main
      },
      // 公告详情页
      {
        path: '/bulletinDetails/:id',
        name: 'bulletinDetails',
        meta: {
          roles: ['admin']
        },
        component: BulletinDetails
      },
      // 公告编辑页
      {
        path: '/bulletinModify',
        name: 'bulletinModify',
        meta: {
          roles: ['admin']
        },
        component: BulletinModify
      },
      {
        // 业主管理
        path: '/owner',
        name: 'owner',
        meta: {
          roles: ['admin']
        },
        component: Owner
      },
      {
        // 新增业主
        path: '/owner/addowner',
        name: 'addowner',
        meta: {
          roles: ['admin']
        },
        component: AddOwner
      },
      {
        // 房产列表
        path: '/estate',
        name: 'estate',
        meta: {
          roles: ['admin']
        },
        component: Estate
      },
      {
        // 新增房产信息
        path: '/estate/addEstateApplication',
        name: 'addEstate',
        meta: {
          roles: ['admin']
        },
        component: AddEstate
      },
      {
        // 房产销售管理
        path: '/estateApplication',
        name: 'estateApplication',
        meta: {
          roles: ['admin']
        },
        component: EstateApplication
      },
      {
        // 房产销售登记
        path: '/estateRegister',
        name: 'estateRegister',
        meta: {
          roles: ['admin']
        },
        component: EstateRegister
      },
      {
        // 报修管理
        path: '/fix',
        name: 'fix',
        meta: {
          roles: ['admin']
        },
        component: Fix
      },
      {
        // 报修详情页
        path: '/fixDetail',
        name: 'fixDetail',
        meta: {
          roles: ['admin']
        },
        component: FixDetail
      },
      {
        // 新增报修信息
        path: '/addFix',
        name: 'addFix',
        meta: {
          roles: ['admin']
        },
        component: AddFix
      },
      {
        // 投诉管理
        path: '/complaint',
        name: 'complaint',
        meta: {
          roles: ['admin']
        },
        component: complaint
      },
      {
        // 投诉详情
        path: '/complaintReply',
        name: 'complaintReply',
        meta: {
          roles: ['admin']
        },
        component: complaintReply
      },
      {
        // 公有车位管理
        path: '/parking',
        name: 'parking',
        meta: {
          roles: ['admin']
        },
        component: Parking
      },
      {
        // 私有车位
        path: '/parkingApplication',
        name: 'parkingApplication',
        meta: {
          roles: ['admin']
        },
        component: parkingApplication
      },
      {
        // 新增车位信息
        path: '/addParking',
        name: 'addParking',
        meta: {
          roles: ['admin']
        },
        component: addParking
      },
      {
        // 登记车位
        path: '/parkingRegister',
        name: 'parkingRegister',
        meta: {
          roles: ['admin']
        },
        component: parkingRegister
      },
      {
        // 费用列表
        path: '/pay',
        name: 'pay',
        meta: {
          roles: ['admin']
        },
        component: Pay
      },
      {
        // 新增费用信息
        path: '/addPay',
        name: 'addPay',
        meta: {
          roles: ['admin']
        },
        component: AddPay
      }
    ]
  },
  {
    path: '/ownerHome',
    name: 'ownerHome',
    meta: {
      roles: ['owner']
    },
    component: OwnerHome,
    children: [
      {
        // 业主首页
        path: '/ownerApplication',
        name: 'ownerApplication',
        meta: {
          roles: ['owner']
        },
        component: OwnerApplication
      },
      {
        // 业主报修页
        path: '/ownerFix',
        name: 'ownerFix',
        meta: {
          roles: ['owner']
        },
        component: OwnerFix
      },
      {
        // 业主修改密码
        path: '/ownerPasswordModify',
        name: 'ownerPasswordModify',
        meta: {
          roles: ['owner']
        },
        component: OwnerPasswordModify
      },
      {
        // 业主投诉页
        path: '/ownerComplaint',
        name: 'ownerComplaint',
        meta: {
          roles: ['owner']
        },
        component: ownerComplaint
      },
      {
        // 业主公告详情页
        path: '/ownerNotice/:id',
        name: 'ownerNotice',
        meta: {
          roles: ['owner']
        },
        component: ownerNotice
      }
    ]
  },
  {
    path: '/error',
    name: error,
    meta: {
      roles: ['admin', 'owner']
    },
    component: error
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 动态路由
router.beforeEach((to, from, next) => {
  // 申明一个token
  const tokenStr = window.localStorage.getItem('token')
  const author = window.localStorage.getItem('author')
  let role
  if (author === 'true') {
    role = 'admin'
  } else if (author === 'false') {
    role = 'owner'
  }
  // 无权限访问login放行
  if (to.path === '/login') {
    return next()
  }

  if (to.path === '/') {
    return next('/login')
  }
  // 判断有无token
  if (!tokenStr) {
    // 没有就强制返回登录页
    Vue.prototype.$message({
      type: 'error',
      message: '没有权限，请重新登陆'
    })
    return next('/login')
    // 判断后端传来的值与即将跳转的页面权限是否匹配
  } else if (to.meta.roles.includes(role)) {
    // 匹配就通行
    next()
  } else {
    // 不匹配返回登录
    Vue.prototype.$message({
      type: 'error',
      message: '没有权限，请重新登陆'
    })
    next('/login')
  }
})

export default router
