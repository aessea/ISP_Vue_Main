import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import OutsourceConstraintsRouter from './modules/OutsourceConstraints'
import OutsourceBaseDataRouter from './modules/OutsourceBaseData'
import OutsourceOtherDataRouter from './modules/OutsourceOtherData'
import DayConfigRouter from './modules/DayConfig'
import LongConfigRouter from './modules/LongConfig'
import PredictRouter from './modules/Predict'
import FileManageRouter from './modules/FileManage'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/Dashboard/Dashboard'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'el-icon-s-home', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/control',
    component: Layout,
    redirect: '/control/schedulepanel',
    alwaysShow: true,
    name: 'Control',
    meta: {
      title: '控制面板',
      icon: 'component',
      roles: ['SchedulePanel', 'ParamsConfig', 'AnalysisControl', 'OutsourceControl']
    },
    children: [
      {
        path: 'schedulepanel',
        component: () => import('@/views/Control/SchedulePanel'),
        name: 'SchedulePanel',
        meta: {
          title: '主板小板排程',
          roles: ['SchedulePanel']
        }
      },
      // {
      //   path: 'configmain',
      //   component: () => import('@/views/Control/ConfigMain'),
      //   name: 'ConfigMain',
      //   meta: {
      //     title: '主板排程配置',
      //     roles: ['admin', 'common']
      //   }
      // },
      // {
      //   path: 'configsmall',
      //   component: () => import('@/views/Control/ConfigSmall'),
      //   name: 'ConfigSmall',
      //   meta: {
      //     title: '小板排程配置',
      //     roles: ['admin', 'common']
      //   }
      // },
      {
        path: 'paramsconfig',
        component: () => import('@/views/Control/ParamsConfig'),
        name: 'ParamsConfig',
        meta: {
          title: '排程配置表',
          roles: ['ParamsConfig']
        }
      },
      {
        path: 'analysiscontrol',
        component: () => import('@/views/Control/AnalysisControl'),
        name: 'AnalysisControl',
        meta: {
          title: '分析推送面板',
          roles: ['AnalysisControl']
        }
      },
      // {
      //   path: 'onlinetable',
      //   component: () => import('@/views/Control/OnlineTable'),
      //   name: 'OnlineTable',
      //   meta: {
      //     title: '在线表格',
      //     roles: ['admin', 'common', 'senioradmin']
      //   }
      // },
      {
        path: 'outsourcecontrol',
        component: () => import('@/views/Control/OutsourceControl'),
        name: 'OutsourceControl',
        meta: {
          title: '外包控制面板',
          roles: ['OutsourceControl']
        }
      }
    ]
  },

  DayConfigRouter,
  LongConfigRouter,
  PredictRouter,
  OutsourceConstraintsRouter,
  OutsourceBaseDataRouter,
  OutsourceOtherDataRouter,
  FileManageRouter,

  {
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
  },
  {
    path: '/historylog',
    component: Layout,
    redirect: '/historylog/loggingdb',
    alwaysShow: true,
    name: 'Logging',
    meta: {
      title: '日志系统',
      icon: 'documentation',
      roles: ['HistoryRun', 'HistoryOpera']
    },
    children: [
      {
        path: 'historyrun',
        component: () => import('@/views/HistoryLog/HistoryRun'),
        name: 'HistoryRun',
        meta: {
          title: '运行日志',
          roles: ['HistoryRun'],
          noCache: true
        }
      },
      {
        path: 'historyopera',
        component: () => import('@/views/HistoryLog/HistoryOpera'),
        name: 'HistoryOpera',
        meta: {
          title: '历史操作',
          roles: ['HistoryOpera'],
          noCache: true
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
