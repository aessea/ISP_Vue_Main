import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import createI18n from './lang' // 导入异步创建的i18n函数
import locale from 'element-ui/lib/locale'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

Vue.config.productionTip = false

// 异步获取i18n实例并初始化Vue实例
async function initApp() {
  const i18n = await createI18n() // 获取i18n实例

  // 配置Element UI组件的语言切换
  locale.i18n((key, value) => i18n.t(key, value))

  new Vue({
    el: '#app',
    router,
    store,
    i18n, // 注入i18n实例
    render: h => h(App)
  })
}

initApp() // 执行异步初始化函数
