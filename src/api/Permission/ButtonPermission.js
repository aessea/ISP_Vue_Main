import request from '../../utils/request'
const API_URL_FIRST = 'User'
// 修改用户基本信息
export function ModifyButton(data) {
  return request({
    url: `/${API_URL_FIRST}/modify_button_permission/`,
    method: 'post',
    data
  })
}
// 搜索
export function SearchRoleData(data) {
  return request({
    url: `/${API_URL_FIRST}/search_data/`,
    method: 'post',
    data
  })
}
