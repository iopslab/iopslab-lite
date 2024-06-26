import * as Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg组件

// Vue.component('SvgIcon', SvgIcon)

const requireAll = (requireContext) => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
