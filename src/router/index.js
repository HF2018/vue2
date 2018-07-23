import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/vuex/store'
import HelloWorld from '@/components/HelloWorld'
//登录 
import login from '@/components/login'
// import login from '../login'
//客户维系
import market from '@/components/market'
import hui from '@/components/hui'
import test from '@/components/test'
import brief from '@/components/brief'
import briefHome from '@/components/brief/home'
import charts from '@/components/brief/charts'
import sms from '@/components/sms/sms'
import marketHome from '@/components/sms/home'
import dataBrief from '@/components/sms/dataBrief'
import sendSms from '@/components/sms/sendSms'
import smsDetail from '@/components/sms/smsDetail'
import failReason from '@/components/sms/failReason'
import cheapHome from '@/components/cheap/home'
//会员中心
import user from '@/components/user'
import userHome from '@/components/user/createGroup'
import fastSearch from '@/components/user/fastSearch'
import gList from '@/components/user/groupList'
import accurateSearch from '@/components/user/accurateSearch'
import saveAim from '@/components/user/saveAim'
import vipDetail from '@/components/user/vipDetail'
import gDetail from '@/components/user/gDetail'
import settings from '@/components/user/settings'
import aim from '@/components/user/aim'
import countIndex from '@/components/user/countIndex'
import setClass from '@/components/user/setClass'
import classifyAim from '@/components/user/classifyAim'
//账号管理
import account from '@/components/account'
//营销方案
import project from '@/components/project'
import mPlans from '@/components/projects/plans'
import createPlans from '@/components/projects/createPlans'
import pDetail from '@/components/projects/plansDetail'
//设置
import setting from '@/components/setting'
Vue.use(VueRouter)
const routes = [
  {
    path: "/",
    redirect: 'index',

  },
  {
    path: '/index',
    component: login,
    meta: {
      title: '药店狗后台系统'
    }
  },
  // 营销方式
  {
    path: '/market',
    component: market,

    children: [
      {
        path: "/",
        redirect: 'sms'
      },
      //短信营销
      {
        path: "sms",
        component: marketHome,
        children: [
          //默认展示的页面
          {
            path: "/",
            redirect: 'dataBrief'
          },
          {
            path: "dataBrief",
            component: dataBrief,
          },
          {
            path: "sms",
            component: sms,
          },
          {
            // path: "sendSms",
            path: "sendSms/:id",
            component: sendSms,

          },
          {
            path: "sendSms",
            // path: "sendSms/:id",
            component: sendSms,

          },
          {
            path: "smsDetail/:index/:id",
            component: smsDetail
          },
          {
            path: "failReason",
            component: failReason,
          },
        ]
      },
      //微信营销
      {
        path: "HelloWorld",
        component: HelloWorld,
      },
      //混合营销
      {
        path: "mixmarket",
        component: HelloWorld,
      },
      //优惠券
      {
        path: "cheap",
        component: cheapHome,
        children: [
          {
            path: "/",
            redirect: 'cheapHome'
          },
          {
            path: "cheapHome",
            component: cheapHome,
          },
        ],
      },
    ]
  },
  //会员中心（筛选）
  {
    path: '/user',
    component: user,
    // meta: {
    //   requiresAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    //   a: 2
    // },
    children: [
      {
        path: "/",
        redirect: 'cGroup'
      },
      //基础查询
      {
        path: "cGroup",
        component: userHome,
        children: [
          {
            path: "/",
            redirect: 'accurateSearch',
          },
          {
            path: "accurateSearch",
            name: 'accurateSearch',
            component: accurateSearch,
          },
          {
            path: "vipDetail/:id",
            name: 'vipDetail',
            component: vipDetail,
          },
        ]
      },
      //对已创建的分组，进行分类
      {
        path: "setClass",
        component: setClass,
      },
      //保存目标，创建目标
      {
        path: "saveAim",
        component: saveAim,
      },
      //对目标进行分类
      {
        path: "classifyAim",
        component: classifyAim,
      },
      //类型设置，属性设置
      {
        path: "settings",
        // name: pDetail,
        component: settings,
      },
      //营销目标。匹配方案
      {
        path: "aim",
        component: aim,
      },
      {
        path: "gDetail/:id",
        component: gDetail,
      },
      //计算指标
      // {
      //   path: "countIndex",
      //   component: countIndex,
      // },
    ],
  },
  {
    path: '/brief',
    component: brief,
    // name: 'brief',
    children: [
      {
        path: "/",
        redirect: 'briefHome',
      },
      {
        path: 'briefHome',
        name: 'briefHome',
        component: briefHome,
      },
      {
        path: 'charts',
        name: 'charts',
        component: charts,
      },
    ]
  },

  {
    path: '/setting',
    component: setting,

  },
  //营销方案
  {
    path: '/project',
    component: project,
    // name: 'project',
    children: [
      {
        path: "/",
        redirect: 'plans',
      },
      {
        path: "plans",
        component: mPlans,

      },
      {
        path: "plans/:id",
        component: mPlans,
        // children: [
        //   {
        //     path: "d/:id/:id",
        //     component: pDetail,
        //   },
        // ]
      },
      {
        path: "createPlans",
        name: 'createPlans',
        component: createPlans,

      },
      {
        path: "createPlans/:ids",
        component: createPlans,

      },
      {
        path: "d/:id/:id",
        component: pDetail,

      },
    ]

  },
  //账号管理
  {
    path: '/account',
    component: account,

  },
  // 定向
  {
    path: '/',
    redirect: '/market'
    // component: home
  }
]
var router = new VueRouter({
  routes,
  mode: 'hash',
  // mode: 'history',
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
// if (window.localStorage.getItem('token')) {
//   store.commit(types.LOGIN, window.localStorage.getItem('token'))
// }
// router.beforeEach((to, from, next) => {
//   store.commit('login')
//   console.log('to.meta.a == '+to.meta.a)
//   console.log('to.meta.requiresAuth == '+to.meta.requiresAuth)
//   console.log(store.state.a.token)
//   console.log(to.meta.requiresAuth)
//   if (to.meta.requiresAuth) {  // 判断该路由是否需要登录权限
//     //console.log('需要验证的')
//     if (store.state.a.token == '') {//没有登录
//       next({
//         path: '/index',
//         query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//     else {//登录的
//       console.log('登录的')  // 通过vuex state获取当前的token是否存在
//       next();
//     }
//   }
//   else {
//     console.log('不需要验证的')
//     // console.log(window.cookie.getItem('s'))
//     next()
//   }

// })


// const router = new VueRouter({
//   routes
// });

export default router
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
