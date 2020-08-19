import { getInfo } from 'src/api/user'
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
