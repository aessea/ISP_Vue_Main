import { GetButtonPermission } from '@/api/common'
// 获取按钮权限的函数
export function getButtonPermission(user_name, menu_name) {
  const data = {
    'user_name': user_name,
    'menu_name': menu_name
  }
  GetButtonPermission(data).then(res => {
    console.log('123123123:', res.data)
    return res.data
  })
}
