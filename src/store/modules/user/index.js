/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-09 20:28:17
 */
import { login, register, getInfo } from 'src/api/user'
import { getToken, setToken, removeToken } from '@/utils/token'
import { resetRouter } from '@/router'
import * as types from './types'
import defaultSettings from 'src/settings'

const state = {
  token: getToken(defaultSettings.TOKEN_NAME),
  name: '',
  permissionList: []
}

const mutations = {
  [types.SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [types.SET_NAME]: (state, name) => {
    state.name = name
  },
  [types.SET_PERMISSION_LIST]: (state, permissionList) => {
    state.permissionList = permissionList
  }
}

const actions = {
  // 登录
  [types.login]({ commit }, params) {
    return new Promise((resolve, reject) => {
      login(params)
        .then(response => {
          const { token } = response
          commit(types.SET_TOKEN, token)
          setToken(defaultSettings.TOKEN_NAME, token)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 登出
  [types.logout]({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      dispatch(types.resetToken)
      resetRouter()
      resolve()
    })
  },
  // 注册
  [types.register]({ commit }, params) {
    return new Promise((resolve, reject) => {
      register(params)
        .then(response => {
          const { token } = response
          commit(types.SET_TOKEN, token)
          setToken(defaultSettings.TOKEN_NAME, token)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 获取用户信息
  [types.getInfo]({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { userInfo } = response

        if (!userInfo) {
          reject('Verification failed, please Login again.')
        }
        const { userName, permissionList } = userInfo

        if (!permissionList || permissionList.length <= 0) {
          reject('getInfo: permissionList must be a non-null array!')
        }

        commit(types.SET_NAME, userName)
        commit(types.SET_PERMISSION_LIST, permissionList)
        resolve(userInfo)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 重置token
  [types.resetToken]({ commit }) {
    return new Promise((resole, reject) => {
      commit(types.SET_TOKEN, '')
      commit(types.SET_NAME, '')
      commit(types.SET_PERMISSION_LIST, [])
      removeToken(defaultSettings.TOKEN_NAME)
      resole()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
