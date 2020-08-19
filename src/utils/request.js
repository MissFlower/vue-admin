/*
 * @Descripttion:
 * @version:
 * @Author: DoveyLoveyCora
 * @Date: 2020-08-16 17:09:42
 * @LastEditors: DoveyLoveyCora
 * @LastEditTime: 2020-08-18 08:39:02
 */
import axios from 'axios'
import qs from 'qs'
// import store from 'src/store'

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
