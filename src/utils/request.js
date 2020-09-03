/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-03 17:57:54
 */
/*
 * @Descripttion: axios二次封装
 * @version: 1.0.0
 * @Author: DoveyLoveyCora
 * @Date: 2020-08-16 17:09:42
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-03 16:40:56
 */
import axios from 'axios'
import qs from 'qs'
import store from 'src/store'
import Vue from 'vue'
import { Message } from 'element-ui'
import { UPDATE_REQUREST_COUNT } from 'src/store/modules/common/types'

// 请求超时时间
const TIMEOUT = 10000
// const BASE_URL = process.env.VUE_APP_BASE_API
const BASE_URL = '/api'

// import Vue from 'vue'

const http = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    common: {
      'X-Requested-with': 'XMLHttpRequest'
    },
    post: {
      'Content-type': 'application/json'
    }
  }
})

// http 请求拦截
http.interceptors.request.use(config => {
  if (config.loading) {
    store.commit(UPDATE_REQUREST_COUNT, 1)
  }
  return config
},
error => {
  return Promise.reject(error)
})

// http 相应拦截器
http.interceptors.response.use(response => {
  const result = response.data

  if (response.config.loading) {
    store.commit(UPDATE_REQUREST_COUNT, -1)
  }

  if (result.returnStatus !== 'Success') {
    const msg = result.returnMsg || '服务器内部错误!'
    if (response.config.showMessage) {
      Message.error(`${msg}`)
    }
    // throw new Error(msg)
    return Promise.reject(msg)
  }

  // 请求成功
  return result.data
},
error => {
  store.commit(UPDATE_REQUREST_COUNT, -1)

  // 处理请求超时
  if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
    Message.error('当前网络不佳,请检查你的网络!')
    return
  }

  // TODO 统一处理全部的错误代码
  if (error.response) {
    switch (error.response.status) {
      case 403:
        Vue.prototype.$alert('你没有此项功能权限,请在取得权限后刷新重试。',
          {
            confirmButtonText: '刷新重试',
            callback: action => {
              location.reload()
            }
          }
        )
        break
    }
  }
  return Promise.reject(error)
})

const request = {}
request.postForm = (url, data, { headers = {}, loading = true, showMessage = true } = {}) => {
  return http({
    url,
    method: 'post',
    data: qs.stringify(data),
    headers: {
      ...headers,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8; multipart/form-data'
    },
    loading,
    showMessage
  })
}
request.postUpload = (url, data, { headers = {}, loading = true, showMessage = true } = {}) => {
  return http({
    url,
    method: 'post',
    data,
    headers: {
      ...headers,
      'Content-Type': 'charset=UTF-8; multipart/form-data'
    },
    loading,
    showMessage
  })
}
request.postToURL = (url, params, { headers = {}, loading = true, showMessage = true } = {}) => {
  return http({
    url,
    method: 'post',
    params,
    headers: {
      ...headers,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    loading,
    showMessage
  })
}
['get', 'post', 'put', 'delete'].forEach(method => {
  if (method !== 'post') {
    request[method] = (url, params, { headers = {}, loading = true, showMessage = true } = {}) => {
      return http({
        url,
        params,
        method,
        headers,
        loading,
        showMessage
      })
    }
    return
  }
  // post 请求使用request body 传递
  request[method] = (url, data, { headers = {}, loading = true, showMessage = true } = {}) => {
    return http({
      url,
      data,
      method,
      headers,
      loading,
      showMessage
    })
  }
})

export default request
