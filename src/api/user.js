/*
 * @Description: 用户api
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-03 16:20:57
 */
import request from 'src/utils/request'

/**
 * @description: 获取用户信息 和 权限表
 * @param {type}
 * @return {type}
 * @author: AiDongYang
 */
export function getInfo(params) {
  return request.get('/user/info', { token: 123 })
}

/**
 * @description: 用户登录
 * @param {username} 必传: 是, 类型: String, 描述: 用户名
 * @param {password} 必传: 是, 类型: String, 描述: 密码
 * @return {type}
 * @author: AiDongYang
 */
export function login(params) {
  return request.post('/login', params)
}
