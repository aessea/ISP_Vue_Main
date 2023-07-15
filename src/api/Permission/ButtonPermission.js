import request from '../../utils/request'
// 修改用户基本信息
export function ModifyButton(data) {
  return request({
    url: '/User/modify_button_permission/',
    method: 'post',
    data
  })
}
// 搜索
export function SearchRoleData(data) {
  return request({
    url: '/User/search_data/',
    method: 'post',
    data
  })
}
