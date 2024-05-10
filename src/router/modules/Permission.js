// 每日配置
import Layout from '@/layout'

const PermissionRouter = {
  path: '/permission',
  component: Layout,
  redirect: '/permission/page',
  alwaysShow: true, // will always show the root menu
  name: 'Permission',
  meta: {
    title: 'Permission',
    icon: 'lock',
    roles: ['UserManage', 'RolePermission', 'ButtonPermission', 'InterfaceConfig', 'RunControlConfig', 'ParamsConfig']
  },
  children: [
    {
      path: 'usermanage',
      component: () => import('@/views/Permission/UserManage'),
      name: 'UserManage',
      meta: {
        title: 'UserManage',
        roles: ['UserManage']
      }
    },
    {
      path: 'rolepermission',
      component: () => import('@/views/Permission/RolePermission'),
      name: 'RolePermission',
      meta: {
        title: 'RolePermission',
        roles: ['RolePermission']
      }
    },
    {
      path: 'buttonpermission',
      component: () => import('@/views/Permission/ButtonPermission'),
      name: 'ButtonPermission',
      meta: {
        title: 'ButtonPermission',
        roles: ['ButtonPermission']
      }
    },
    {
      path: 'paramsconfigmanage',
      component: () => import('@/views/Permission/ParamConfigManage'),
      name: 'ParamsConfigManage',
      meta: {
        title: 'ParamsConfigManage',
        roles: ['ParamsConfig']
      }
    },
    {
      path: 'interfaceconfig',
      component: () => import('@/views/LongConfig/InterfaceConfig'),
      name: 'InterfaceConfig',
      meta: {
        title: 'InterfaceConfig',
        roles: ['InterfaceConfig']
      }
    },
    {
      path: 'runcontrolconfigmanage',
      component: () => import('@/views/Permission/RunControlConfigManage'),
      name: 'RunControlConfig',
      meta: {
        title: 'RunControlConfig',
        roles: ['RunControlConfig']
      }
    }
  ]
}

export default PermissionRouter
