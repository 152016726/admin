import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    name: 'auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {title: '基础数据' , icon: 'dashboard'},
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/goods/goodsList'),
      meta: {title: '商品清单' , icon: 'dashboard', affix: true},
    }]
  }
]

export const asyncRoutes = [
  {
    path: '/baseInfo',
    name: 'baseInfo',
    component: Layout,
    redirect: '/baseInfo/baseList',
    meta: {title: '基础数据' , icon: 'dashboard'},
    children: [{
      path: 'baseList',
      name: 'baseList',
      component: () => import('@/views/goods/dashboard'),
      meta: {title: '基础数据' , icon: 'dashboard', affix: true},
      children:[{
        path: 'goodsDetail',
        name: 'goodsDetail',
        component: ()=> import('@/views/goods/goodsDetail'),
        meta: {title: '详情'},
        hidden: true
      }]
    }]
  },
  {
    path: '/useForm',
    component: Layout,
    name: 'useForm',
    meta: {title: '商品列表', icon: 'form', roles: ['editor']},
    redirect: '/useForm/table',
    children: [
      {
        path: 'table',
        name: 'table',
        component: ()=> import('@/views/table'),
        meta: {title: '商品类别', icon: 'table',roles: ['editor']}
      },
      {
        path: 'tree',
        name: 'tree',
        component: ()=> import('@/views/table'),
        meta: {title: '商品展示', icon: 'tree', roles: ['editor']}
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
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
