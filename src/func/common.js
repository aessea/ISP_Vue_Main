import { GetButtonPermission } from '@/api/common'
// 获取按钮权限的函数
export function getButtonPermission(role_name, menu_name) {
  const data = {
    'role_name': role_name,
    'menu_name': menu_name
  }
  GetButtonPermission(data).then(res => {
    this.addDataDialogDisable = res.data.addDataDialogDisable
    this.deleteDataDisable = res.data.deleteDataDisable
    this.importDataDialogDisable = res.data.importDataDialogDisable
    this.exportDataDialogDisable = res.data.exportDataDialogDisable
  })
}
