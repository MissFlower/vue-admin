/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-04 10:40:07
 */
import Cookie from 'js-cookie'
const state = {
  sideBar: {
    opened: Cookie.get('sideBarStatus') ? !!+Cookie.get('sideBarStatus') : true
  }
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sideBar.opened = !state.sideBar.opened
    if (state.sideBar.opened) {
      Cookie.set('sideBarStatus', 1)
    } else {
      Cookie.set('sideBarStatus', 0)
    }
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
