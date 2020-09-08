/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-08 15:01:19
 */
import { login, register, getInfo } from 'src/api/user'
import { getToken, setToken, removeToken } from '@/utils/token'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  permissionList: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_PERMISSION_LIST: (state, permissionList) => {
    state.permissionList = permissionList
  }
}

const actions = {
  // 登录
  login({ commit }, params) {
    return new Promise((resolve, reject) => {
      login(params)
        .then(response => {
          const { token } = response
          commit('SET_TOKEN', token)
          setToken('token', token)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 登出
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_NAME', '')
      commit('SET_PERMISSION_LIST', [])
      removeToken('token')
      resetRouter()
      resolve()
    })
  },
  // 注册
  register({ commit }, params) {
    return new Promise((resolve, reject) => {
      register(params)
        .then(response => {
          const { token } = response
          commit('SET_TOKEN', token)
          setToken('token', token)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 获取用户信息
  getInfo({ commit }) {
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

        commit('SET_NAME', userName)
        commit('SET_PERMISSION_LIST', permissionList)
        resolve(userInfo)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 重置token
  resetToken({ commit }) {
    return new Promise((resole, reject) => {
      commit('SET_NAME', '')
      commit('SET_PERMISSION_LIST', [])
      removeToken('token')
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
