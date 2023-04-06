import request from '../../utils/request'
// 获取文件列表
export function GetFilesList(data) {
  return request({
    url: '/FileManage/SmallOutputFiles/get_files_list/',
    method: 'post',
    data
  })
}
// 下载文件
export function DownloadFile(data) {
  return request({
    method: 'post',
    url: '/FileManage/SmallOutputFiles/download_file/',
    responseType: 'blob',
    data
  })
}
// 删除勾选的数据
export function DeleteFiles(data) {
  return request({
    url: '/FileManage/SmallOutputFiles/delete_files/',
    method: 'post',
    data
  })
}
// 删除三个月前的数据
export function DeleteBeforeFiles() {
  return request({
    url: '/FileManage/SmallOutputFiles/delete_range_files/',
    method: 'get'
  })
}

