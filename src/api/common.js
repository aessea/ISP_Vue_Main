import request from '@/utils/request'
const API_URL_FIRST = 'Control'
// 获取导入示例文件，传入示例的文件名
export function DownloadExamleImportFile(file_name) {
  return request({
    url: '/OutsourcingPriority/download_import_example_file/',
    method: 'get',
    params: { file_name },
    responseType: 'blob'
  })
}
// 下载文件
export function DownloadFile(file_key) {
  return request({
    url: `/${API_URL_FIRST}/download_file/`,
    method: 'get',
    params: { file_key },
    responseType: 'blob'
  })
}
// 获取所有制程和线体
export function GetLineProcess() {
  return request({
    url: `/${API_URL_FIRST}/get_line_process/`,
    method: 'get'
  })
}
// 获取按钮权限
export function GetButtonPermission(data) {
  return request({
    url: `/${API_URL_FIRST}/get_button_permission/`,
    method: 'post',
    data
  })
}
// 修改语言
export function SwitchLanguage(data) {
  return request({
    url: `/${API_URL_FIRST}/switch_language/`,
    method: 'post',
    data
  })
}
export function GetRunFlag() {
  return request({
    method: 'get',
    url: `/${API_URL_FIRST}//get_run_flag_lang/`
  })
}
// 获取语言
export function GetLanguage() {
  return request({
    url: `/${API_URL_FIRST}/get_language_code/`,
    method: 'post'
  })
}
// 获取修改语言权限
export function GetLanguagePermission(data) {
  return request({
    url: `/${API_URL_FIRST}/get_language_permission/`,
    method: 'post',
    data
  })
}
