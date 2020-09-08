/**
 * 二次封装 axios
 */
import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import { Message } from 'element-ui'
import settings from 'src/settings' // 基础路径从各个项目的配置文件中获取
import Cookie from 'js-cookie'
import store from 'src/store' // 从业务项目中引入store
import { UPDATE_REQUEST_COUNT } from 'src/store/modules/app/types'
// 请求超时时间
const TIMEOUT = 10000

const http = axios.create({
  baseURL: settings.apiBaseUrl,
  timeout: TIMEOUT,
  headers: {
    common: { 'X-Requested-With': 'XMLHttpRequest' },
    post: { 'Content-Type': 'application/json' }
  },

  // 设置拦截器中使用的默认值
  loading: true,
  showMessage: true
})

// http 请求拦截器
http.interceptors.request.use(
  (config) => {
    if (config.loading) store.commit(UPDATE_REQUEST_COUNT, 1)

    Cookie.set('REDIRECT_URL', window.location.href)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// http 响应拦截器
http.interceptors.response.use(
  (response) => {
    const result = response.data

    if (response.config.loading) store.commit(UPDATE_REQUEST_COUNT, -1)

    // 请求失败
    if (result.code !== '000000') {
      const msg = result.msg || '服务器内部错误！'

      if (response.config.showMessage) Message.error(`${msg}`)

      return Promise.reject(msg)
    }
    // 请求成功
    return result.data
  },
  async(error) => {
    if (error.config.loading) store.commit(UPDATE_REQUEST_COUNT, -1)

    // 对于请求超时
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      Message.error('当前网络不佳，请检查你的网络')
      return
    }

    // TODO 统一处理全部的错误代码
    if (error.response) {
      switch (error.response.status) {
        case 403:
          Vue.prototype.$alert('你没有此项功能权限，请在取得授权后刷新重试。', {
            // customClass: 'widen-alert',
            confirmButtonText: '刷新重试',
            callback: () => {
              location.reload()
            }
          })
          break
        case 401:
          // 开发环境直接调用登录接口 模拟登录
          if (process.env.NODE_ENV === 'development') {
            request
              .postByURL('/login/password', {
                username: 123,
                password: 123
              })
              .then(() => location.reload())
          } else {
            window.location = error.response.data
          }
          return
        case 500:
          break
        default:
      }
    }
    return Promise.reject(error)
  }
)

const request = {}
request.postByFormData = (url, data, config) => {
  return http({
    url,
    method: 'post',
    data: qs.stringify(data),
    headers: {
      'Content-Type':
        'application/x-www-form-urlencoded; charset=UTF-8; multipart/form-data'
    },
    ...config
  })
}

request.post2Update = (url, data, config) => {
  return http({
    url,
    method: 'post',
    data,
    headers: { 'Content-Type': 'charset=UTF-8; multipart/form-data' },
    ...config
  })
}

request.postByURL = (url, params, config) => {
  return http({
    url,
    method: 'post',
    params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    ...config
  })
}
;['get', 'post', 'put', 'delete'].forEach((method) => {
  if (method !== 'post') {
    request[method] = (url, params, config) => {
      return http({
        url,
        params,
        method,
        ...config
      })
    }
    return
  }
  // post 请求使用request body 传递
  request[method] = (url, data, config) => {
    return http({
      url,
      method,
      data,
      ...config
    })
  }
})

export default request
