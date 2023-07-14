import request from '../../utils/request'
// 用户角色信息
export function GetAllRoleInfo() {
  return request({
    url: '/User/get_all_role_info/',
    method: 'get'
  })
}
// 创建用户
export function CreateRole(data) {
  return request({
    url: '/User/create_role/',
    method: 'post',
    data
  })
}
// 修改用户基本信息
export function ModifyRoleInfo(data) {
  return request({
    url: '/User/modify_role_info/',
    method: 'post',
    data
  })
}
// 删除用户
export function DeleteRole(data) {
  return request({
    url: '/User/delete_role/',
    method: 'post',
    data
  })
}
