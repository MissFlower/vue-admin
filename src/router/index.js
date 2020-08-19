import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import MainLayout from '@/layout/MainLayout'
// import OpenLayout from '@/layout/OpenLayout'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/home',
    component: MainLayout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('src/views/Home')
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
        icon: 'About',
        noCache: true
      }
    }]
  }
]

export const asyncRoutes = [
  {
    path: '/table',
    component: MainLayout,
    redirect: '/table/dynamicTable',
    name: 'Table',
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
        path: 'inlineEditEable',
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
    redirect: 'noRedirect',
    name: 'Charts',
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

export default router
