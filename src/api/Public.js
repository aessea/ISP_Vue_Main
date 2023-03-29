import request from '@/utils/request'

// 获取导入示例文件，传入示例的文件名
export function DownloadExamleImportFile(file_name) {
  return request({
    url: '/OutsourcingPriority/download_import_example_file/',
    method: 'get',
    params: { file_name },
    responseType: 'blob'
  })
}
export function DownloadFile(file_key) {
  return request({
    url: '/Control/download_file/',
    method: 'get',
    params: { file_key },
    responseType: 'blob'
  })
}
export function GetLineProcess() {
  return request({
    url: '/Control/get_line_process/',
    method: 'get'
  })
}
