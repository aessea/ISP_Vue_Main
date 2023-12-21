import request from '../../utils/request'
import { REQUEST_TIMEOUT } from '../config'
const API_URL_FIRST = 'Control'
const API_URL_SECOND = 'AnalysisControl'
export function DoImportPushSchedule(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/do_import_push_schedule/`,
    method: 'post',
    data
  })
}
// 检查表格
export function DoCheckScheduleData(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/check_schedule_file/`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 获取分析排程进度条
export function GetAnaProgress() {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/get_analysis_progress/`,
    method: 'get'
  })
}
// 清空分析排程进度条
export function ClearAnaProgress() {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/clear_analysis_progress/`,
    method: 'get'
  })
}
// 获取分析排程中的错误信息
export function GetAnaError() {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/get_analysis_error/`,
    method: 'get'
  })
}
// 分析排程
export function AnalysisExcel(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/begin_analysis/`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 生成表格
export function GenerateAnaExcel() {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/analysis_confirm_output/`,
    method: 'get'
  })
}
// 下载表格
export function DownloadAnaExcel(data) {
  return request({
    method: 'post',
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/download_analysis_excel/`,
    responseType: 'blob',
    data
  })
}
// 获取量化
export function StatisticsSchedule() {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/get_quantify_data/`,
    method: 'get'
  })
}
// 获取历史分析选项
export function GetHistoryAnaItem() {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/get_analysis_select_item/`,
    method: 'get'
  })
}
// 获取历史分析结果
export function GetHistoryAnaData(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/get_analysis_history_data/`,
    method: 'post',
    data
  })
}
// 获取历史Excel选项
export function GetHistoryExcelItem() {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/get_history_excel_item/`,
    method: 'get'
  })
}
// 获取历史Excel
export function GetHistoryExcelData(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/get_history_excel_data/`,
    method: 'post',
    responseType: 'blob',
    data
  })
}
// 获取运行状态
export function GetRunFlag() {
  return request({
    method: 'get',
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/get_run_flag_ana/`
  })
}
// 分析排程+生成表格
export function AnalysisSchedule(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/do_analysis_schedule/`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
