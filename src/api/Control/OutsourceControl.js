import request from '../../utils/request'

// 导入文件
export function ImportFiles(data) {
  return request({
    url: '/OutsourcingPriority/importallfiles/',
    method: 'post',
    timeout: 10 * 60 * 1000,
    data
  })
}
// 组件筛选
export function DoFilterRules(data) {
  return request({
    url: '/OutsourcingPriority/filterrules/',
    method: 'post',
    timeout: 100 * 60 * 1000,
    data
  })
}
// 更新新机种
export function UpdateNewModels(data) {
  return request({
    url: '/OutsourcingPriority/updatenewmodels/',
    method: 'post',
    timeout: 100 * 60 * 1000,
    data
  })
}
// 显示筛选规则
export function ShowFilterRules(data) {
  return request({
    url: '/OutsourcingPriority/showfilterrules/',
    method: 'post',
    timeout: 100 * 60 * 1000,
    data
  })
}
// 生成分工单
export function GnerateDivisions(data) {
  return request({
    url: '/OutsourcingPriority/generatedivisions/',
    method: 'post',
    timeout: 100 * 60 * 1000,
    data
  })
}
// 计算排程
export function DoOutsourceDistribute(data) {
  return request({
    url: '/OutsourcingPriority/outsourcedistribute/',
    method: 'post',
    timeout: 100 * 60 * 1000,
    data
  })
}
// 输出文件
export function GenerateOutput(data) {
  return request({
    url: '/OutsourcingPriority/generateoutput/',
    method: 'post',
    timeout: 100 * 60 * 1000,
    data
  })
}
// 获取进度条
export function GetProgress() {
  return request({
    url: '/OutsourcingPriority/get_progress/',
    method: 'get'
  })
}
// 获取排程结果
export function GeScheduleRes() {
  return request({
    method: 'get',
    url: '/preprocess/control/get_schedule_res/'
  })
}
// 保存导航条
export function SaveStepNow(data) {
  return request({
    url: '/OutsourcingPriority/save_step_now/',
    method: 'post',
    data
  })
}
// 获取基本数据
export function GetBaseData() {
  return request({
    method: 'get',
    url: '/OutsourcingPriority/get_base_data/'
  })
}
// 获取所有下载文件的路径
export function DownloadAllFile() {
  return request({
    method: 'get',
    url: '/OutsourcingPriority/get_single_output_files/'
  })
}
// 下载文件
export function DownloadFile(data) {
  return request({
    method: 'post',
    url: '/OutsourcingPriority/download/',
    responseType: 'blob',
    data
  })
}
export function UpdateOutsourceMeshBoard(data) {
  return request({
    method: 'post',
    url: '/OutsourcingPriority/updatemeshboard/',
    data
  })
}
// 获取组件筛选下载文件的路径
export function DownloadFilterOutputFiles() {
  return request({
    method: 'get',
    url: '/OutsourcingPriority/getfilteroutput/'
  })
}
// 获取配置
export function GetParamConfig() {
  return request({
    method: 'get',
    url: '/OutsourcingPriority/paramconfig/get_all_data/'
  })
}
// 更新配置
export function UpdateConfigurableParams(data) {
  return request({
    method: 'post',
    url: '/OutsourcingPriority/paramconfig/update_configurable_params/',
    data
  })
}
// 清空每日产能
export function ClearDayCapacityConfig() {
  return request({
    method: 'get',
    url: '/OutsourcingPriority/daycapacityconfig/clear_data/'
  })
}
// 添加每日产能
export function AppendDayCapacityConfig(data) {
  return request({
    method: 'post',
    url: '/OutsourcingPriority/daycapacityconfig/add_data/',
    data
  })
}
// 获取每日产能
export function GetDayCapacityConfig() {
  return request({
    method: 'get',
    url: '/OutsourcingPriority/daycapacityconfig/get_table_data_control/'
  })
}
// 下载外包新机种
export function DoOutsourceOutputModelName(data) {
  return request({
    method: 'post',
    url: '/OutsourcingPriority/do_outsource_output_model_name/',
    data
  })
}
