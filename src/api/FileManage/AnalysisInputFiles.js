import request from '../../utils/request'
// 获取文件列表
export function GetFilesList(data) {
  return request({
    url: '/FileManage/AnalysisInputFiles/get_files_list/',
    method: 'post',
    data
  })
}
// 下载文件
export function DownloadFile(data) {
  return request({
    method: 'post',
    url: '/FileManage/AnalysisInputFiles/download_file/',
    responseType: 'blob',
    data
  })
}
// 删除勾选的数据
export function DeleteFiles(data) {
  return request({
    url: '/FileManage/AnalysisInputFiles/delete_files/',
    method: 'post',
    data
  })
}
// 删除N个月前的数据
export function DeleteBeforeFiles(data) {
  return request({
    url: '/FileManage/AnalysisInputFiles/delete_range_files/',
    method: 'post',
    data
  })
}
// 查找文件重置文件表
export function ResetAllFileList() {
  return request({
    url: '/FileManage/AnalysisInputFiles/reset_all_file_list/',
    method: 'get'
  })
}
