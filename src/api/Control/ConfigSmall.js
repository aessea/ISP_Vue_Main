import request from '../../utils/request'
// 获取数据
export function GetTableData() {
  return request({
    url: '/Control/ConfigData/get_table_data_small/',
    method: 'get'
  })
}
// 修改数据
export function ModifyData(data) {
  return request({
    url: '/Control/ConfigData/modify_data_small/',
    method: 'post',
    data
  })
}
