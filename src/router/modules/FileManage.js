// 每日配置
import Layout from '@/layout'

const FileManageRouter = {
  path: '/filemanage',
  component: Layout,
  redirect: '/filemanage/mainoutputfiles',
  alwaysShow: true,
  name: 'FileManage',
  meta: {
    title: '文件管理',
    icon: 'el-icon-download',
    roles: ['InputFiles', 'MainOutputFiles', 'SmallOutputFiles', 'AnalysisFiles', 'IdleFiles', 'AnalyseProgramFiles', 'StatisticsFiles', 'ApiStatisticsFiles', 'LogFiles']
  },
  children: [
    {
      path: 'inputfiles',
      component: () => import('@/views/FileManage/InputFiles'),
      name: 'InputFiles',
      meta: {
        title: '输入文件',
        roles: ['InputFiles']
      }
    },
    {
      path: 'mainoutputfiles',
      component: () => import('@/views/FileManage/MainOutputFiles'),
      name: 'MainOutputFiles',
      meta: {
        title: '主板输出文件',
        roles: ['MainOutputFiles']
      }
    },
    {
      path: 'smalloutputfiles',
      component: () => import('@/views/FileManage/SmallOutputFiles'),
      name: 'SmallOutputFiles',
      meta: {
        title: '小板输出文件',
        roles: ['SmallOutputFiles']
      }
    },
    {
      path: 'analysisfiles',
      component: () => import('@/views/FileManage/AnalysisFiles'),
      name: 'AnalysisFiles',
      meta: {
        title: '分析排程输出文件',
        roles: ['AnalysisFiles']
      }
    },
    {
      path: 'idlefiles',
      component: () => import('@/views/FileManage/IdleFiles'),
      name: 'IdleFiles',
      meta: {
        title: 'idle明细文件',
        roles: ['IdleFiles']
      }
    },
    {
      path: 'analyseprogramfiles',
      component: () => import('@/views/FileManage/AnalyseProgramFiles'),
      name: 'AnalyseProgramFiles',
      meta: {
        title: '无程序清单文件',
        roles: ['AnalyseProgramFiles']
      }
    },
    {
      path: 'statisticsfiles',
      component: () => import('@/views/FileManage/StatisticsFiles'),
      name: 'StatisticsFiles',
      meta: {
        title: '量化文件',
        roles: ['StatisticsFiles']
      }
    },
    {
      path: 'apistatisticsfiles',
      component: () => import('@/views/FileManage/ApiStatisticsFiles'),
      name: 'ApiStatisticsFiles',
      meta: {
        title: '接口量化文件',
        roles: ['ApiStatisticsFiles']
      }
    },
    {
      path: 'logfiles',
      component: () => import('@/views/FileManage/LogFiles'),
      name: 'LogFiles',
      meta: {
        title: '日志文件',
        roles: ['LogFiles']
      }
    }
  ]
}

export default FileManageRouter
