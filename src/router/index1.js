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
import mPlans from '@/components/user/marketPlans'
import gDetail from '@/components/user/gDetail'
import pDetail from '@/components/user/plansDetail'
import settings from '@/components/user/settings'
import aim from '@/components/user/aim'
import countIndex from '@/components/user/countIndex'
import setClass from '@/components/user/setClass'
import classifyAim from '@/components/user/classifyAim'
//账号管理
import account from '@/components/account'

Vue.use(VueRouter)
const routes = [
  {
    path: "/",
    redirect: 'index',
   
  },
  {
    path: '/index',
    component: login,
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
            redirect: 'sendSms'
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
            path: "sendSms",
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
            // meta: {
            //   requiresAuth: true,
            // }
          },
          {
            path: "fastSearch",
            component: fastSearch,
          },
          {
            path: "accurateSearch",
            component: accurateSearch,
          },
        ]
      },
      // //分组列表
      // {
      //   path: "gList",
      //   component: gList,
      //   children: [     
      //     {
      //       path: "mPlans/:index",
      //       component: mPlans,
      //     },
      //     {
      //       path: "d/:index/:id",
      //       component: pDetail,
      //     },
      //     {
      //       path: "gDetail/:index",
      //       component: gDetail,
      //     },
      //   ]
      // },
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
        // name: pDetail,
        component: aim,
      },
       //计算指标
       {
        path: "countIndex",
        component: countIndex,
      },
    ],
  },
  {
    path: '/brief',
    component: brief,

  },
  //营销管理
  {
    path: '/project',
    component: hui,

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
