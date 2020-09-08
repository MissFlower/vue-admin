/*
 * @Description:
 * @version:
 * @Author: DoveyLoveyCora
 * @Date: 2020-08-12 21:49:15
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-08 14:33:06
 */
import router from 'src/router'
import store from 'src/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/token' // 从Cookie里获取token
import getPageTitle from '@/utils/getPageTitle' // 获取页面title

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/index', '/register'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 开始调用进度条
  NProgress.start()
  // 设置页面title
  document.title = getPageTitle(to.meta.title)
  // 确定用户是否已登录
  const hasToken = getToken('token')
  if (hasToken) {
    // 用户已登录
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      // router.afterEach并不一定都会执行
      NProgress.done()
    } else {
      // 确定用户是否通过getInfo获取了权限列表
      const hasPermissionList = store.getters.permissionList && store.getters.permissionList.length > 0
      if (hasPermissionList) {
        // 如果有权限列表，直接进入
        next()
      } else {
        try {
          // 获取用户权限列表
          const { permissionList } = await store.dispatch('user/getInfo')
          // 根据用户权限列表生成当前用户的路由列表
          const accessRoutes = await store.dispatch('permission/generateRoutes', permissionList)
          // 动态添加可访问路由

          router.addRoutes(accessRoutes)
          // 确保addRoutes完整的hack方法 设置replace:true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 删除token(令牌)并转到登录页面重新登录
          await store.dispatch('user/resetToken')
          // 向页面抛错
          Message.error(error || 'Has Error')
          // 重定向到登录页重新登录
          next(`/login?redirect=${to.path}`)
          // 进度条结束
          NProgress.done()
        }
      }
    }
  } else {
    // 用户未登录
    if (~whiteList.indexOf(to.path)) {
      // 在免费登录白名单中，直接进入
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      // 进度条结束
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 进度条结束
  NProgress.done()
})
