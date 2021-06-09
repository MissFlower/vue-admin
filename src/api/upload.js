/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-03 11:06:14
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-08 17:28:54
 */
import request from 'src/utils/request'

export function upload(params) {
  return request.post2Upload(
    '/upload',
    params.data,
    {
      loading: false,
      cancelRequest: false,
      cancelToken: params.cancelToken,
      onUploadProgress: params.onUploadProgress
    }
  )
}

export function mergeFiles(params) {
  return request.post('/mergeFiles', params)
}

export function verifyUpload(params) {
  return request.post('verify', params, { loading: false })
}
