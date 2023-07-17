// 每日配置
import Layout from '@/layout'

const LoggingRouter = {
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
}

export default LoggingRouter
