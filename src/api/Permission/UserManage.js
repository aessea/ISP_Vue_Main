import request from '../../utils/request'
const API_URL_FIRST = 'User'
// 获取所有用户信息
export function GetAllUserInfo() {
  return request({
    url: `/${API_URL_FIRST}/get_all_user/`,
    method: 'get'
  })
}
// 创建用户
export function CreateUser(data) {
  return request({
    url: `/${API_URL_FIRST}/create_user/`,
    method: 'post',
    data
  })
}
// 修改用户基本信息
export function ModifyUserInfo(data) {
  return request({
    url: `/${API_URL_FIRST}/modify_userinfo/`,
    method: 'post',
    data
  })
}
// 修改用户密码
export function ModifyUserPassword(data) {
  return request({
    url: `/${API_URL_FIRST}/modify_password/`,
    method: 'post',
    data
  })
}
// 删除用户
export function DeleteUser(data) {
  return request({
    url: `/${API_URL_FIRST}/delete_user/`,
    method: 'post',
    data
  })
}
