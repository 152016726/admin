import Vue from 'vue'
import Router from 'vue-router'
const login = r =>
  require.ensure([], () => r(require('@/views/login/index')), 'login')

const redirect = r =>
  require.ensure([], () => r(require('@/views/login/auth-redirect')), 'redirect')

const dashboard = r =>
  require.ensure([], () => r(require('@/views/goods/goodsList')), 'dashboard')

const memberManagement = r =>
  require.ensure([], () => r(require('@/views/members/member/management')), 'memberManagement')

const memberDetail = r =>
  require.ensure([], () => r(require('@/views/members/member/memberDetail')), 'memberDetail')

const registerCard = r =>
  require.ensure([], () => r(require('@/views/members/member/registerCard')), 'registerCard')

const upgradeRules = r =>
  require.ensure([], () => r(require('@/views/members/upgrade/upgradeRules')), 'upgradeRules')

const upgradeDetail = r =>
  require.ensure([], () => r(require('@/views/members/upgrade/upgradeDetail')), 'upgradeDetail')

const integralRules = r =>
  require.ensure([], () => r(require('@/views/members/integral/integralRules')), 'integralRules')

const integralDetail = r =>
  require.ensure([], () => r(require('@/views/members/integral/integralDetail')), 'integralDetail')

const memberActivity = r =>
  require.ensure([], () => r(require('@/views/members/activity/memberActivity')), 'memberActivity')

const activityDetail = r =>
  require.ensure([], () => r(require('@/views/members/activity/activityDetail')), 'activityDetail')

const memberDay = r =>
  require.ensure([], () => r(require('@/views/members/day/memberDay')), 'memberDay')

const dayDetail = r =>
  require.ensure([], () => r(require('@/views/members/day/dayDetail')), 'dayDetail')

const notFound = r =>
  require.ensure([], () => r(require('@/views/404')), 'notFound')

const baseList = r =>
  require.ensure([], () => r(require('@/views/goods/dashboard')), 'baseList')

const goodsDetail = r =>
  require.ensure([], () => r(require('@/views/goods/goodsDetail')), 'goodsDetail')

// 解决Uncaught (in promise) NavigationDuplicated
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: login,
    hidden: true
  },
  {
    path: '/auth-redirect',
    name: 'auth-redirect',
    component: redirect,
    hidden: true
  },
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {title: '基础数据', icon: 'dashboard'},
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: dashboard,
      meta: {title: '商品清单', icon: 'dashboard', affix: true},
    }]
  }
]

export const asyncRoutes = [
  // {
  //   path: '/baseInfo',
  //   name: 'baseInfo',
  //   component: Layout,
  //   redirect: '/baseInfo/baseList',
  //   meta: {title: '基础数据', icon: 'dashboard'},
  //   children: [{
  //     path: 'baseList',
  //     name: 'baseList',
  //     component: baseList,
  //     meta: {title: '基础数据', icon: 'dashboard', affix: true},
  //     children: [{
  //       path: 'goodsDetail',
  //       name: 'goodsDetail',
  //       component: goodsDetail,
  //       meta: {title: '详情'},
  //       hidden: true
  //     }]
  //   }]
  // },
  {
    path: '/member',
    name: 'member',
    component: Layout,
    redirect: '/member/memberManagement',
    meta: {title: '会员管理', icon: 'dashboard'},
    children: [
      {
        path: 'memberManagement',
        name: 'memberManagement',
        component: memberManagement,
        meta: {title: '会员卡管理', icon: 'clipboard', affix: true},
        children: [
          {
            path: 'memberDetail',
            name: 'memberDetail',
            component: memberDetail,
            meta: {title: '详情'},
            hidden: true
          }
        ]
      },
      {
        path: 'registerCard',
        name: 'registerCard',
        component: registerCard,
        meta: {title: '会员卡办理', icon: 'star'},
        hidden: true
      },
      {
        path: 'upgradeRules',
        name: 'upgradeRules',
        component: upgradeRules,
        meta: {title: '升级规则', icon: 'chart'},
        children: [
          {
            path: 'upgradeDetail',
            name: 'upgradeDetail',
            component: upgradeDetail,
            meta: {title: '详情'},
            hidden: true
          }
        ]
      },
      {
        path: 'integralRules',
        name: 'integralRules',
        component: integralRules,
        meta: {title: '积分规则', icon: 'language'},
        children: [
          {
            path: 'integralDetail',
            name: 'integralDetail',
            component: integralDetail,
            meta: {title: '详情'},
            hidden: true
          }
        ]
      },
      {
        path: 'memberActivity',
        name: 'memberActivity',
        component: memberActivity,
        meta: {title: '积分活动', icon: 'size'},
        children: [
          {
            path: 'activityDetail',
            name: 'activityDetail',
            component: activityDetail,
            meta: {title: '详情'},
            hidden: true
          }
        ]
      },
      {
        path: 'memberDay',
        name: 'memberDay',
        component: memberDay,
        meta: {title: '会员日活动', icon: 'link'},
        children: [
          {
            path: 'dayDetail',
            name: 'dayDetail',
            component: dayDetail,
            meta: {title: '详情'},
            hidden: true
          }
        ]
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: notFound,
    hidden: true
  },
  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
