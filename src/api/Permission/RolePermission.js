import request from '../../utils/request'
const API_URL_FIRST = 'User'
// 用户角色信息
export function GetAllRoleInfo() {
  return request({
    url: `/${API_URL_FIRST}/get_all_role_info/`,
    method: 'get'
  })
}
// 创建用户
export function CreateRole(data) {
  return request({
    url: `/${API_URL_FIRST}/create_role/`,
    method: 'post',
    data
  })
}
// 修改用户基本信息
export function ModifyRoleInfo(data) {
  return request({
    url: `/${API_URL_FIRST}/modify_role_info/`,
    method: 'post',
    data
  })
}
// 删除用户
export function DeleteRole(data) {
  return request({
    url: `/${API_URL_FIRST}/delete_role/`,
    method: 'post',
    data
  })
}
// 可切换语言的角色
export function AddEnableSwitchRoles(data) {
  return request({
    url: `/${API_URL_FIRST}/add_enable_switch_roles/`,
    method: 'post',
    data
  })
}

