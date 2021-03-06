/*
 * @Description: axios二次封装
 * @version: 1.0.0
 * @Author: DoveyLoveyCora
 * @Date: 2020-08-16 17:09:42
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-03-18 11:14:12
 */
import axios from 'axios'
import qs from 'qs'
import store from 'src/store'
import Vue from 'vue'
import { Message } from 'element-ui'
import { UPDATE_REQUEST_COUNT } from 'src/store/modules/common/types'
import { getToken } from '@/utils/token'
import defaultSettings from 'src/settings'
import { addRequest, removeRequest } from './cancelRequest'

// 请求超时时间
const TIMEOUT = 10000000
const BASE_URL = process.env.VUE_APP_BASE_API
axios.defaults.withCredentials = true // 开启发送cookie 前端开启后端也得开启 不然报 Provisional headers are shown

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
  showMessage: true,
  cancelRequest: true
})

// http 请求拦截
http.interceptors.request.use(config => {
  if (config.cancelRequest) {
    removeRequest(config)
    addRequest(config)
  }

  if (config.loading) {
    store.commit(UPDATE_REQUEST_COUNT, 1)
  }

  const token = getToken(defaultSettings.TOKEN_NAME)
  if (token) {
    config.headers[defaultSettings.TOKEN_NAME] = token
  }
  return config
},
error => {
  return Promise.reject(error)
})

// http 相应拦截器
http.interceptors.response.use(response => {
  const result = response.data

  if (response.config.cancelRequest) {
    removeRequest(response.config)
  }

  if (response.config.loading) {
    store.commit(UPDATE_REQUEST_COUNT, -1)
  }

  // 处理流文件
  if (response.request.responseType === 'blob') {
    return response
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
error => {
  if (error.message?.loading || error.config?.loading) {
    store.commit(UPDATE_REQUEST_COUNT, -1)
  }

  // 处理请求超时
  if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
    Message.error('当前网络不佳,请检查你的网络!')
    return
  }

  // TODO 统一处理全部的错误代码
  if (error.response) {
    switch (error.response.status) {
      case 401:
        Vue.prototype.$alert('你没有此项功能权限,请在取得权限后刷新重试。',
          {
            confirmButtonText: '刷新重试',
            callback: () => {
              location.reload()
            }
          }
        )
        break

      case 403:
        // 未登录
        Message.warning(`${error.response.data.message || '登录已过期,请重新登录!'}`)
        break

      case 500:
        // 未登录
        Message.error(`${error.response.data.message || '服务器内部故障!'}`)
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

;['get', 'post', 'put', 'delete', 'patch'].forEach(method => {
  if (method === 'get') {
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
