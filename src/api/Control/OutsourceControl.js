import request from '../../utils/request'
const API_URL_FIRST = 'OutsourcingPriority'
import { REQUEST_TIMEOUT } from '../config'
// 导入文件
export function ImportFiles(data) {
  return request({
    url: `/${API_URL_FIRST}/importallfiles/`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 进行数据检查
export function DoCheckInputFiles(data) {
  return request({
    url: `/${API_URL_FIRST}/check_input_files/`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 组件筛选
export function DoFilterRules(data) {
  return request({
    url: `/${API_URL_FIRST}/filterrules/`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 更新新机种
export function UpdateNewModels(data) {
  return request({
    url: `/${API_URL_FIRST}/updatenewmodels/`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 显示筛选规则
export function ShowFilterRules(data) {
  return request({
    url: `/${API_URL_FIRST}/showfilterrules/`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 生成分工单
export function GnerateDivisions(data) {
  return request({
    url: `/${API_URL_FIRST}/generatedivisions/`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 计算排程
export function DoOutsourceDistribute(data) {
  return request({
    url: `/${API_URL_FIRST}/outsourcedistribute/`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 输出文件
export function GenerateOutput(data) {
  return request({
    url: `/${API_URL_FIRST}/generateoutput/`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 获取进度条
export function GetProgress() {
  return request({
    url: `/${API_URL_FIRST}/get_progress/`,
    method: 'get'
  })
}
// 保存导航条
export function SaveStepNow(data) {
  return request({
    url: `/${API_URL_FIRST}/save_step_now/`,
    method: 'post',
    data
  })
}
// 获取基本数据
export function GetBaseData() {
  return request({
    method: 'get',
    url: `/${API_URL_FIRST}/get_base_data/`
  })
}
// 获取所有下载文件的路径
export function DownloadAllFile() {
  return request({
    method: 'get',
    url: `/${API_URL_FIRST}/get_single_output_files/`
  })
}
// 下载文件
export function DownloadFile(data) {
  return request({
    method: 'post',
    url: `/${API_URL_FIRST}/download/`,
    responseType: 'blob',
    data
  })
}
// 更新旧工单网板状态
export function UpdateOutsourceMeshBoard(data) {
  return request({
    method: 'post',
    url: `/${API_URL_FIRST}/updatemeshboard/`,
    data
  })
}
// 获取组件筛选下载文件的路径
export function DownloadFilterOutputFiles() {
  return request({
    method: 'get',
    url: `/${API_URL_FIRST}/getfilteroutput/`
  })
}
// 获取配置
export function GetParamConfig() {
  return request({
    method: 'get',
    url: `/${API_URL_FIRST}/paramconfig/get_all_data/`
  })
}
// 更新配置
export function UpdateConfigurableParams(data) {
  return request({
    method: 'post',
    url: `/${API_URL_FIRST}/paramconfig/update_configurable_params/`,
    data
  })
}
// 清空每日产能
export function ClearDayCapacityConfig() {
  return request({
    method: 'get',
    url: `/${API_URL_FIRST}/daycapacityconfig/clear_data/`
  })
}
// 添加每日产能
export function AppendDayCapacityConfig(data) {
  return request({
    method: 'post',
    url: `/${API_URL_FIRST}/daycapacityconfig/add_data/`,
    data
  })
}
// 获取每日产能
export function GetDayCapacityConfig() {
  return request({
    method: 'get',
    url: `/${API_URL_FIRST}/daycapacityconfig/get_table_data_control/`
  })
}
// 下载外包新机种
export function DoOutsourceOutputModelName(data) {
  return request({
    method: 'post',
    url: `/${API_URL_FIRST}/do_outsource_output_model_name/`,
    data
  })
}
// 重新调整
export function ReAdjustInput(data) {
  return request({
    url: `/${API_URL_FIRST}/readjust_input/`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
