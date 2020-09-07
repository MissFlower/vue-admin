/*
 * @Description:
 * @Version: 0.1.0
 * @Autor: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-07 17:32:04
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import MainLayout from '@/layout/MainLayout'
import OpenLayout from '@/layout/OpenLayout'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/index',
    component: OpenLayout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('src/views/Index'),
        meta: {
          title: 'Index'
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('src/views/Index/Login'),
        hidden: true,
        meta: {
          title: 'Login'
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('src/views/Index/Register'),
        hidden: true,
        meta: {
          title: 'register'
        }
      }
    ]
  },
  {
    path: '/home',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('src/views/Home'),
        meta: {
          title: 'Home',
          icon: 'home',
          affix: true
        }
      }
    ]
  },
  {
    path: '/documentation',
    component: MainLayout,
    children: [{
      path: 'index',
      name: 'Documentation',
      component: () => import('src/views/Documentation'),
      meta: {
        title: 'Documentation',
        icon: 'documentation',
        affix: true
      }
    }]
  },
  {
    path: '/guide',
    component: MainLayout,
    redirect: '/guide/index',
    children: [{
      path: 'index',
      name: 'Guide',
      component: () => import('src/views/Guide'),
      meta: {
        title: 'Guide',
        icon: 'guide',
        noCache: true
      }
    }]
  },
  {
    path: '/about',
    component: MainLayout,
    children: [{
      path: 'index',
      name: 'About',
      component: () => import('src/views/About'),
      meta: {
        title: 'About',
        icon: 'about',
        noCache: true
      }
    }]
  }
]

export const asyncRoutes = [
  {
    path: '/table',
    component: MainLayout,
    name: 'Table',
    redirect: '/table/dynamicTable',
    meta: {
      title: 'Table',
      icon: 'table',
      code: '001'
    },
    children: [
      {
        path: 'dynamicTable',
        name: 'DynamicTable',
        component: () => import('src/views/DynamicTable'),
        meta: { title: 'Dynamic Table', code: '001001' }
      },
      {
        path: 'dragTable',
        name: 'DragTable',
        component: () => import('src/views/DragTable'),
        meta: { title: 'Drag Table', code: '001002' }
      },
      {
        path: 'inlineEditEnable',
        name: 'InlineEditTable',
        component: () => import('src/views/InlineEditTable'),
        meta: { title: 'Inline Edit', code: '001003' }
      },
      {
        path: 'complexTable',
        name: 'ComplexTable',
        component: () => import('@/views/ComplexTable'),
        meta: { title: 'Complex Table', code: '001004' }
      }
    ]
  },
  {
    path: '/charts',
    component: MainLayout,
    name: 'Charts',
    redirect: '/charts/keyboardChart',
    meta: {
      title: 'Charts',
      icon: 'chart',
      code: '002'
    },
    children: [
      {
        path: 'keyboardChart',
        name: 'KeyboardChart',
        component: () => import('src/views/KeyboardChart'),
        meta: { title: 'Keyboard Chart', noCache: true, code: '002001' }
      },
      {
        path: 'lineChart',
        name: 'LineChart',
        component: () => import('src/views/LineChart'),
        meta: { title: 'Line Chart', noCache: true, code: '002002' }
      },
      {
        path: 'mixChart',
        name: 'MixChart',
        component: () => import('src/views/MixChart'),
        meta: { title: 'Mix Chart', noCache: true, code: '002003' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
