import request from '../../utils/request'
const API_URL_FIRST = 'schedule'
const API_URL_SECOND = 'api'
const API_TIMEOUT = 10 * 60 * 1000
// 推送SMT未排接口
export function SmtUnscheduled(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/saveApsScheduleSmtWplan`,
    method: 'post',
    timeout: API_TIMEOUT,
    data
  })
}
// 推送SMT预排接口
export function SmtPrescheduled(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/saveApsSmtScheduleResultFirst`,
    method: 'post',
    timeout: API_TIMEOUT,
    data
  })
}
// 推送SMT正排接口
export function SmtScheduled(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/saveApsSmtScheduleResultSecond`,
    method: 'post',
    timeout: API_TIMEOUT,
    data
  })
}
// 推送AI未排接口
export function AiUnscheduled(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/saveApsScheduleAiWplan`,
    method: 'post',
    timeout: API_TIMEOUT,
    data
  })
}
// 推送AI预排接口
export function AiPrescheduled(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/saveApsAiScheduleResultFirst`,
    method: 'post',
    timeout: API_TIMEOUT,
    data
  })
}
// 推送AI正排接口
export function AiScheduled(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/saveApsAiScheduleResultSecond`,
    method: 'post',
    timeout: API_TIMEOUT,
    data
  })
}
// 推送自制工单分配结果
export function SaveApsSelfMo(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/saveApsSelfMo`,
    method: 'post',
    timeout: API_TIMEOUT,
    data
  })
}
// 推送外包工单分配结果
export function SaveApsOutsoutceMo(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/saveApsOutsoutceMo`,
    method: 'post',
    timeout: API_TIMEOUT,
    data
  })
}
// 更新钢网信息接口
export function GetApsMtool(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/getApsMtool`,
    method: 'post',
    timeout: API_TIMEOUT,
    data
  })
}
// 更新程序信息接口
export function GetApsProgram(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/getApsProgram`,
    method: 'post',
    timeout: API_TIMEOUT,
    data
  })
}
// 更新齐套信息接口
export function GetApsMoBaseData(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/getApsMoBaseData`,
    method: 'post',
    timeout: API_TIMEOUT,
    data
  })
}
// 更新工单进度接口
export function GetApsMoProgData(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/getApsMoProgData`,
    method: 'post',
    timeout: API_TIMEOUT,
    data
  })
}
// 更新包装点时间
export function GetApsDeliveryDay(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/getApsDeliveryDay`,
    method: 'post',
    timeout: API_TIMEOUT,
    data
  })
}
// 推送量化结果
export function SaveApsOutPutCount(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/saveApsOutPutCount`,
    method: 'post',
    timeout: API_TIMEOUT,
    data
  })
}
