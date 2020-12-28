/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-08 15:58:21
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-08 15:59:34
 */
// 上传 | 更新
const [UPLOAD, UPDATE] = [0, 1]
export const FILE_OPERATOR_INDENTIFY = Object.freeze({
  UPLOAD,
  UPDATE
})
export const FILE_OPERATOR = Object.freeze({
  [UPLOAD]: '上传',
  [UPDATE]: '更新'
})

// 上传状态
const [UNUPLOAD, UPLOADED] = [0, 1]
export const UPLOAD_STATUS = Object.freeze({
  [UNUPLOAD]: '未上传',
  [UPLOADED]: '已上传'
})

// 测试状态
// TODO 未测试状态
const [UNADOPT, ADOPTED, UNTEST] = [0, 1, 2]
export const TEST_STATUS = Object.freeze({
  [ADOPTED]: '通过',
  [UNADOPT]: '未通过'
})
export const TEST_STATUS_COLOR = Object.freeze({
  [ADOPTED]: '#008000',
  [UNADOPT]: '#FF0000',
  [UNTEST]: '#999999'
})

// 字典类型
export const DICTIONARY_TYPE = Object.freeze({
  FACTORY: 'factory', // 工厂
  PRODUCT: 'product', // 产品
  MODEL: 'model' // 型号
})
