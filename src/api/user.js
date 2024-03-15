import request from '@/utils/request'
const API_URL_FIRST = 'User'
export function login(data) {
  return request({
    url: `/${API_URL_FIRST}/login/`,
    method: 'post',
    data
  })
}
export function getInfo() {
  return request({
    url: `/${API_URL_FIRST}/info/`,
    method: 'get'
    // params: { token }
  })
}
export function logout() {
  return request({
    url: `/${API_URL_FIRST}/logout/`,
    method: 'post'
  })
}
