import request from '../../utils/request'
// 修改数据
export function DoImportPushSchedule(data) {
  return request({
    url: '/Control/AnalysisControl/do_import_push_schedule/',
    method: 'post',
    data
  })
}
