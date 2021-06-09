/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-07 17:06:45
 */
import Cookie from 'js-cookie'
import * as types from './types'
const state = {
  sideBar: {
    opened: Cookie.get('sideBarStatus') ? !!+Cookie.get('sideBarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookie.get('size') || 'medium'
}

const mutations = {
  [types.TOGGLE_SIDEBAR]: state => {
    state.sideBar.opened = !state.sideBar.opened
    if (state.sideBar.opened) {
      Cookie.set('sideBarStatus', 1)
    } else {
      Cookie.set('sideBarStatus', 0)
    }
  },
  [types.CLOSE_SIDEBAR]: (state, withoutAnimation) => {
    Cookie.set('sidebarStatus', 0)
    state.sideBar.opened = false
    state.sideBar.withoutAnimation = withoutAnimation
  },
  [types.TOGGLE_DEVICE]: (state, device) => {
    state.device = device
    if (device === 'mobile') {
      state.sideBar.opened = false
      Cookie.set('sideBarStatus', 0)
    } else {
      state.sideBar.opened = true
      Cookie.set('sideBarStatus', 1)
    }
  },
  [types.SET_SIZE]: (state, size) => {
    state.size = size
    Cookie.set('size', size)
  }
}

const actions = {
  [types.toggleSideBar]({ commit }) {
    commit(types.TOGGLE_SIDEBAR)
  },
  [types.closeSideBar]({ commit }) {

  },
  [types.toggleDevice]({ commit }, device) {
    commit(types.TOGGLE_DEVICE, device)
  },
  [types.setSize]({ commit }, size) {
    commit(types.SET_SIZE, size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
