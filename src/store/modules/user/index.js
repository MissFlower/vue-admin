/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-03 16:25:19
 */
import { login, getInfo } from 'src/api/user'
const state = {
  name: '',
  permissionList: []
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_PERMISSION_LIST: (state, permissionList) => {
    state.permissionList = permissionList
  }
}

const actions = {
  // 登录
  login() {
    return new Promise((resolve, reject) => {
      login().then(response => {
        const { data } = response
        console.log(data)
      })
    })
  },
  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, permissionList } = data

        if (!permissionList || permissionList.length <= 0) {
          reject('getInfo: permissionList must be a non-null array!')
        }

        commit('SET_NAME', name)
        commit('SET_PERMISSION_LIST', permissionList)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
