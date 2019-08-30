import router from './router'
import {getToken} from '@/utils/token' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import store from './store'
import { Message } from 'element-ui'

const whiteList = ['login']

router.beforeEach(async (to, from, next) => {

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 获取token令牌
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const {roles} = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          console.log(accessRoutes, 'accessRoutes');
          router.addRoutes(accessRoutes)
          next({...to, replace: true})
        } catch (error) {
          // await store.dispatch('user/resetToken')
          Message.error(error || 'Has error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})
