import request from 'src/utils/request'

export function getInfo(params) {
  return request.get('/user/info', { token: 123 })
}
