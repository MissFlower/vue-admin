/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-03 14:37:17
 */
import Cookie from 'js-cookie'
const state = {
  sideBar: {
    opened: true
  },
  requestCount: 0
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sideBar.opened = !state.sideBar.opened
    if (state.sideBar.opened) {
      Cookie.set('sideBarStatus', 1)
    } else {
      Cookie.set('sideBarStatus', 0)
    }
  },
  UPDATE_REQUEST_COUNT: (state, count) => {
    state.requestCount += count
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
