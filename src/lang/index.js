import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import axios from 'axios'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang导入Element的语言包 英文
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang导入Element的语言包 中文
import enLocale from './en' // 导入项目中用到的英文语言包
import zhLocale from './zh'// 导入项目中用到的中文语言包
import { GetLanguage } from '@/api/common'
import store from '@/store' // 直接导入 Vuex store

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

// 创建一个方法来初始化VueI18n
async function createI18n() {
  // 从后端接口获取初始语言
  let lang = 'zh' // 默认语言为中文
  await GetLanguage().then(res => {
    lang = res.language_code
  }).catch(err => {
    console.log(err)
  })
  store.dispatch('app/setLanguage', lang)
  // 创建并返回VueI18n实例
  return new VueI18n({
    locale: lang, // 使用从后端获取的语言
    messages
  })
}

// 导出一个异步函数，返回初始化后的i18n实例
export default async function() {
  const i18n = await createI18n()
  return i18n
}
