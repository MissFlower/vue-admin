import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'

import 'animate.css'
import 'normalize.css/normalize.css' // css样式重置
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'src/styles/index.scss'

import 'src/assets/icons'
import 'src/utils/permission' // 权限控制

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  zIndex: 30000
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
