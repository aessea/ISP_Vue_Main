// 每日配置
import Layout from '@/layout'

const LoggingRouter = {
  path: '/historylog',
  component: Layout,
  redirect: '/historylog/loggingdb',
  alwaysShow: true,
  name: 'Logging',
  meta: {
    title: 'SystemLog',
    icon: 'documentation',
    roles: ['HistoryRun', 'HistoryOpera', 'ScheduleResData', 'MesInterfaceLog']
  },
  children: [
    {
      path: 'historyrun',
      component: () => import('@/views/HistoryLog/HistoryRun'),
      name: 'HistoryRun',
      meta: {
        title: 'HistoryRun',
        roles: ['HistoryRun'],
        noCache: true
      }
    },
    {
      path: 'historyopera',
      component: () => import('@/views/HistoryLog/HistoryOpera'),
      name: 'HistoryOpera',
      meta: {
        title: 'HistoryOpera',
        roles: ['HistoryOpera'],
        noCache: true
      }
    },
    {
      path: 'scheduleresdata',
      component: () => import('@/views/HistoryLog/ScheduleResData'),
      name: 'ScheduleResData',
      meta: {
        title: 'ScheduleResData',
        roles: ['ScheduleResData'],
        noCache: true
      }
    },
    {
      path: 'mesinterfacelog',
      component: () => import('@/views/HistoryLog/MesInterfaceLog'),
      name: 'MesInterfaceLog',
      meta: {
        title: 'MesInterfaceLog',
        roles: ['MesInterfaceLog'],
        noCache: true
      }
    }
  ]
}

export default LoggingRouter
