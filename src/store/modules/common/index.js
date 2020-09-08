/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-03 16:50:42
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-08 21:12:42
 */
/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-03 16:50:42
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-03 17:07:28
 */
import * as types from './types'

export default {
  state: {
    // 请求记数
    requestCount: 0,
    // 字典表
    dict: {}
  },

  mutations: {
    // 修改引用计数
    [types.UPDATE_REQUEST_COUNT](state, amount) {
      state.requestCount += amount
    },

    // 存入一个字典
    [types.SET_DICT](state, { type, dict }) {
      state.dict[type] = dict
    }
  },

  actions: {
    /**
     * @description: 字典查询接口
     * @param {type} 字典名称
     * @return {type} {Promise<*>}
     * @author: AiDongYang
     */
    // async [types.queryByType]({ commit, state }, type) {
    //   if (state.dict[type]) return state.dict[type]
    //   const dict = await queryByType({ type })
    //   commit(types.SET_DICT, { type, dict })
    //   return dict
    // }
  }
}
