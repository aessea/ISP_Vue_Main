import request from '../../../utils/request'
// 获取表格数据 分页获取
export function GetTableData(data) {
  return request({
    url: '/OutsourcingPriority/filterrules/get_table_data/',
    method: 'post',
    data
  })
}
// 添加数据
export function AddData(data) {
  return request({
    url: '/OutsourcingPriority/filterrules/add_data/',
    method: 'post',
    data
  })
}
// 修改数据
export function ModifyData(data) {
  return request({
    url: '/OutsourcingPriority/filterrules/modify_data/',
    method: 'post',
    data
  })
}
// 删除勾选的数据
export function DeleteData(data) {
  return request({
    url: '/OutsourcingPriority/filterrules/delete_data/',
    method: 'post',
    data
  })
}
// 删除一条数据
export function HandleDelete(data) {
  return request({
    url: '/OutsourcingPriority/filterrules/handle_delete/',
    method: 'post',
    data
  })
}
// 确认导入数据
export function ImportData(data) {
  return request({
    url: '/OutsourcingPriority/filterrules/import_data/',
    method: 'post',
    data
  })
}
// 确认导出数据
export function ExportData() {
  return request({
    url: '/OutsourcingPriority/filterrules/export_data/',
    method: 'get'
  })
}
// 获取列名
export function GetBaseData() {
  return request({
    url: '/OutsourcingPriority/filterrules/get_base_data/',
    method: 'get'
  })
}

