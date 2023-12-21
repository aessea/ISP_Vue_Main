import request from '../../utils/request'
// 获取文件列表
export function GetFilesList(data) {
  return request({
    url: '/FileManage/IdleFiles/get_files_list/',
    method: 'post',
    data
  })
}
// 下载文件
export function DownloadFile(data) {
  return request({
    method: 'post',
    url: '/FileManage/IdleFiles/download_file/',
    responseType: 'blob',
    data
  })
}
// 删除勾选的数据
export function DeleteFiles(data) {
  return request({
    url: '/FileManage/IdleFiles/delete_files/',
    method: 'post',
    data
  })
}
// 删除n个月前的数据
export function DeleteBeforeFiles(data) {
  return request({
    url: '/FileManage/IdleFiles/delete_range_files/',
    method: 'post',
    data
  })
}
// 查找文件重置文件表
export function ResetAllFileList() {
  return request({
    url: '/FileManage/IdleFiles/reset_all_file_list/',
    method: 'get'
  })
}

