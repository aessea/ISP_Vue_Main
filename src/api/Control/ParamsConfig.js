import request from '../../utils/request'
const API_URL_FIRST = 'Control'
const API_URL_SECOND = 'ParamsConfig'
// 获取数据
export function GetTableData(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/get_table_data/`,
    method: 'post',
    data
  })
}
// 修改数据
export function ModifyData(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/modify_data/`,
    method: 'post',
    data
  })
}
// 恢复为默认值
export function RestoreDefault(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/restore_default/`,
    method: 'post',
    data
  })
}
// 确认导出数据
export function ExportData() {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/export_data/`,
    method: 'get'
  })
}
// 测试库指定数据库的数据
export function SyncDatabaseData(data) {
  return request({
    method: 'post',
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/sync_data/`,
    data
  })
}
// 测试库指定数据库的数据
export function DeleteAllJobdataBackup() {
  return request({
    method: 'get',
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/delete_all_jobdata_backup/`
  })
}
