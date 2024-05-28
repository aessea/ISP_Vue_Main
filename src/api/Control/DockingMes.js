// 对接MES的接口
import request from '../../utils/request'
const API_URL_FIRST = 'schedule'
const API_URL_SECOND = 'api'
import { REQUEST_TIMEOUT } from '../config'
// 推送SMT未排接口
export function SmtUnscheduled(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/saveApsScheduleSmtWplan`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 推送SMT预排接口
export function SmtPrescheduled(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/saveApsSmtScheduleResultFirst`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 推送SMT正排接口
export function SmtScheduled(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/saveApsSmtScheduleResultSecond`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 推送自制工单分配结果
export function SaveApsSelfMo(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/saveApsSelfMo`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 推送外包工单分配结果
export function SaveApsOutsoutceMo(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/saveApsOutsoutceMo`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 更新钢网信息接口
export function GetApsMtool(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/getApsMtool`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 更新程序信息接口
export function GetApsProgram(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/getApsProgram`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 更新齐套信息接口
export function GetApsMoBaseData(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/getApsMoBaseData`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 更新工单进度接口
export function GetApsMoProgData(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/getApsMoProgData`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 更新包装点时间
export function GetApsDeliveryDay(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/getApsDeliveryDay`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
// 推送量化结果
export function SaveApsOutPutCount(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/saveApsOutPutCount`,
    method: 'post',
    timeout: REQUEST_TIMEOUT,
    data
  })
}
