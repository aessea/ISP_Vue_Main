import request from '../../utils/request'
// 获取数据
export function GetTableData(data) {
  return request({
    url: '/Control/ParamsConfig/get_table_data/',
    method: 'post',
    data
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
// 测试库指定数据库的数据
export function SyncDatabaseData() {
  return request({
    method: 'get',
    url: '/Control/ParamsConfig/sync_data/'
  })
}
