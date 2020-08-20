/*
 * @Description: 
 * @Version: 0.1.0
 * @Autor: AiDongYang
 * @Date: 2020-08-20 17:07:20
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-08-20 17:10:06
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('SvgIcon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)