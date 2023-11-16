// 每日配置
import Layout from '@/layout'

const SchedulePanelRouter = {
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
        title: '计算排程面板',
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
}

export default SchedulePanelRouter
