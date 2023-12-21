import request from '../../utils/request'
export function GetTableData(data) {
  return request({
    url: '/User/RunControlConfig/get_table_data/',
    method: 'post',
    data
  })
}
export function ModifyData(data) {
  return request({
    url: '/User/RunControlConfig/modify_data/',
    method: 'post',
    data
  })
}
// 确认导出数据
export function ExportData() {
  return request({
    url: '/DayConfig/AiMatchJobRule/export_data/',
    method: 'get'
  })
}

