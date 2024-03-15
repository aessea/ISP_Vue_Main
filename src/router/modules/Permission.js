// 每日配置
import Layout from '@/layout'

const PermissionRouter = {
  path: '/permission',
  component: Layout,
  redirect: '/permission/page',
  alwaysShow: true, // will always show the root menu
  name: 'Permission',
  meta: {
    title: '系统管理',
    icon: 'lock',
    roles: ['UserManage', 'RolePermission', 'ButtonPermission', 'InterfaceConfig', 'RunControlConfig', 'ParamsConfig']
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
        title: '配置管理',
        roles: ['ParamsConfig']
      }
    },
    {
      path: 'interfaceconfig',
      component: () => import('@/views/LongConfig/InterfaceConfig'),
      name: 'InterfaceConfig',
      meta: {
        title: 'MES接口配置管理',
        roles: ['InterfaceConfig']
      }
    },
    {
      path: 'runcontrolconfigmanage',
      component: () => import('@/views/Permission/RunControlConfigManage'),
      name: 'RunControlConfig',
      meta: {
        title: '排程功能管理',
        roles: ['RunControlConfig']
      }
    }
  ]
}

export default PermissionRouter
