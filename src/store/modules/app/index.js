/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-07 13:56:53
 */
import Cookie from 'js-cookie'
const state = {
  sideBar: {
    opened: Cookie.get('sideBarStatus') ? !!+Cookie.get('sideBarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookie.get('size') || 'medium'
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
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookie.set('sidebarStatus', 0)
    state.sideBar.opened = false
    state.sideBar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
    console.log(device)
    if (device === 'mobile') {
      state.sideBar.opened = false
      Cookie.set('sideBarStatus', 0)
    } else {
      state.sideBar.opened = true
      Cookie.set('sideBarStatus', 1)
    }
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookie.set('size', size)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }) {

  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
