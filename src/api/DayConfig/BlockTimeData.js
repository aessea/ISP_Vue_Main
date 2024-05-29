import request from '../../utils/request'
const API_URL_FIRST = 'DayConfig'
const API_URL_SECOND = 'BlockTimeData'
// 获取表格数据 分页获取
export function GetTableData(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/get_table_data/`,
    method: 'post',
    data
  })
}
// 获取初始化数据
export function GetDefaultData() {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/get_default_data/`,
    method: 'get'
  })
}
// 添加数据
export function AddData(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/add_data/`,
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
// 删除勾选的数据
export function DeleteData(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/delete_data/`,
    method: 'post',
    data
  })
}
// 删除一条数据
export function HandleDelete(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/handle_delete/`,
    method: 'post',
    data
  })
}
// 确认导入数据
export function ImportData(data) {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/import_data/`,
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
// 获取备份名
export function GetBackupName() {
  return request({
    method: 'get',
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/get_backup_name/`
  })
}
// 备份数据
export function BackupData(data) {
  return request({
    method: 'post',
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/backup_data/`,
    data
  })
}
// 恢复备份
export function RecoverBackupData(data) {
  return request({
    method: 'post',
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/recover_backup_data/`,
    data
  })
}
// 删除备份数据
export function DeleteBackupData(data) {
  return request({
    method: 'post',
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/delete_backup_data/`,
    data
  })
}
// 添加多个放假
export function AddMultiData(data) {
  return request({
    method: 'post',
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/add_multi_data/`,
    data
  })
}
// 测试库同步正式库的维护时间表
export function SyncDatabaseData(data) {
  return request({
    method: 'post',
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/sync_data/`,
    data
  })
}

// 添加按默认锁定时间的线体
export function AddHolidayLines(data) {
  return request({
    method: 'post',
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/add_holidayLines_data/`,
    data
  })
}

// 获取按默认锁定时间的线体
export function GetHolidayLines() {
  return request({
    method: 'get',
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/get_holidayLines_data/`
  })
}
// 获取表格列名
export function GetLangDict() {
  return request({
    url: `/${API_URL_FIRST}/${API_URL_SECOND}/get_lang_dict/`,
    method: 'get'
  })
}
