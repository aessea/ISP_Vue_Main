// 每日配置
import Layout from '@/layout'

const PermissionRouter = {
  path: '/permission',
  component: Layout,
  redirect: '/permission/page',
  alwaysShow: true, // will always show the root menu
  name: 'Permission',
  meta: {
    title: '权限管理',
    icon: 'lock',
    roles: ['UserManage', 'RolePermission', 'ButtonPermission']
  },
  children: [
    {
      path: 'usermanage',
      component: () => import('@/views/Permission/UserManage'),
      name: 'UserManage',
      meta: {
        title: '用户管理',
        roles: ['UserManage']
      }
    },
    {
      path: 'rolepermission',
      component: () => import('@/views/Permission/RolePermission'),
      name: 'RolePermission',
      meta: {
        title: '角色权限管理',
        roles: ['RolePermission']
      }
    },
    {
      path: 'buttonpermission',
      component: () => import('@/views/Permission/ButtonPermission'),
      name: 'ButtonPermission',
      meta: {
        title: '按钮权限管理',
        roles: ['ButtonPermission']
      }
    },
    {
      path: 'paramsconfigmanage',
      component: () => import('@/views/Permission/ParamConfigManage'),
      name: 'ParamsConfigManage',
      meta: {
        title: '排程配置管理',
        roles: ['ParamsConfig']
      }
    }
  ]
}

export default PermissionRouter
