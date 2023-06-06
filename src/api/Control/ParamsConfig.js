import request from '../../utils/request'
// 获取数据
export function GetTableData() {
  return request({
    url: '/Control/ParamsConfig/get_table_data/',
    method: 'get'
  })
}
// 修改数据
export function ModifyData(data) {
  return request({
    url: '/Control/ParamsConfig/modify_data/',
    method: 'post',
    data
  })
}
// 恢复为默认值
export function RestoreDefault(data) {
  return request({
    url: '/Control/ParamsConfig/restore_default/',
    method: 'post',
    data
  })
}
// 确认导出数据
export function ExportData() {
  return request({
    url: '/Control/ParamsConfig/export_data/',
    method: 'get'
  })
}
