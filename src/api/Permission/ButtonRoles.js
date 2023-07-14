import request from '../../utils/request'
// 用户角色信息
export function GetAllButtonInfo() {
  return request({
    url: '/User/get_all_button_info/',
    method: 'get'
  })
}
// 修改用户基本信息
export function ModifyButton(data) {
  return request({
    url: '/User/modify_button_permission/',
    method: 'post',
    data
  })
}
