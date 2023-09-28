import request from '../utils/request'
const API_URL_FIRST = 'Dashboard'
// 获取排程结果数据
export function GetChartsData(days) {
  return request({
    url: `/${API_URL_FIRST}/get_charts_data/`,
    method: 'get',
    params: { days }
  })
}
export function GetCalendarData() {
  return request({
    url: `/${API_URL_FIRST}/get_calendar_data/`,
    method: 'get'
  })
}
