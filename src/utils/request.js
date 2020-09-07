/*
 * @Description: axios二次封装
 * @version: 1.0.0
 * @Author: DoveyLoveyCora
 * @Date: 2020-08-16 17:09:42
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-07 19:12:35
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

const http = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    common: {
      'X-Requested-with': 'XMLHttpRequest'
    },
    post: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  },

  // 设置拦截器中使用的默认值
  loading: true,
  showMessage: true
})

// http 请求拦截
http.interceptors.request.use(config => {
  console.log(config)
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

  // 请求失败
  if (result.code !== '000000') {
    const msg = result.msg || '服务器内部错误!'
    if (response.config.showMessage) {
      Message.error(`${msg}`)
    }
    // throw new Error(msg)
    return Promise.reject(msg)
  }

  // 请求成功
  return result.data
},
async error => {
  if (error.config.loading) {
    store.commit(UPDATE_REQUREST_COUNT, -1)
  }

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
            callback: () => {
              location.reload()
            }
          }
        )
        break

      case 401:
        // 未登录
        this.$router.push('/login')
        break
      default:
    }
  }
  return Promise.reject(error)
})

const request = {}
request.postByFormData = (url, data, config) => {
  return http({
    url,
    method: 'post',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8; multipart/form-data'
    },
    ...config
  })
}

request.post2Upload = (url, data, config) => {
  return http({
    url,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'charset=UTF-8; multipart/form-data'
    },
    ...config
  })
}

request.postByUrl = (url, params, config) => {
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

;['get', 'post', 'put', 'delete'].forEach(method => {
  if (method !== 'post') {
    request[method] = (url, params, config) => {
      return http({
        url,
        method,
        params,
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
