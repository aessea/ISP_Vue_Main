import request from '../../utils/request'
// 获取表格数据分页获取
export function GetTableData(data) {
  return request({
    url: '/HistoryLog/HistoryOpera/get_table_data/',
    method: 'post',
    data
  })
}
export function SearchData(data) {
  return request({
    url: '/HistoryLog/HistoryOpera/search_data/',
    method: 'post',
    data
  })
}
export function DeleteHistoryLog(data) {
  return request({
    url: '/HistoryLog/HistoryOpera/delete_history_data/',
    method: 'post',
    data
  })
}
