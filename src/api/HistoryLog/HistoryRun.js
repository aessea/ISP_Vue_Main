import request from '../../utils/request'
// 获取表格数据分页获取
export function GetTableData(data) {
  return request({
    url: '/HistoryLog/HistoryRun/get_table_data/',
    method: 'post',
    data
  })
}
// 获取表格数据 分页获取
export function SearchData(data) {
  return request({
    url: '/HistoryLog/HistoryRun/search_data/',
    method: 'post',
    data
  })
}
// 删除历史数据
export function DeleteHistoryLog(data) {
  return request({
    url: '/HistoryLog/HistoryRun/delete_history_log/',
    method: 'post',
    data
  })
}
