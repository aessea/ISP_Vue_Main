// 每日配置
import Layout from '@/layout'

const LoggingRouter = {
  path: '/historylog',
  component: Layout,
  redirect: '/historylog/loggingdb',
  alwaysShow: true,
  name: 'Logging',
  meta: {
    title: '系统日志',
    icon: 'documentation',
    roles: ['HistoryRun', 'HistoryOpera', 'ScheduleResData', 'MesInterfaceLog']
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
    },
    {
      path: 'scheduleresdata',
      component: () => import('@/views/HistoryLog/ScheduleResData'),
      name: 'ScheduleResData',
      meta: {
        title: '历史排程记录',
        roles: ['ScheduleResData'],
        noCache: true
      }
    },
    {
      path: 'mesinterfacelog',
      component: () => import('@/views/HistoryLog/MesInterfaceLog'),
      name: 'MesInterfaceLog',
      meta: {
        title: '接口日志表',
        roles: ['MesInterfaceLog'],
        noCache: true
      }
    }
  ]
}

export default LoggingRouter
