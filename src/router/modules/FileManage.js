// 每日配置
import Layout from '@/layout'

const FileManageRouter = {
  path: '/filemanage',
  component: Layout,
  redirect: '/filemanage/mainoutputfiles',
  alwaysShow: true,
  name: 'FileManage',
  meta: {
    title: 'FileManage',
    icon: 'el-icon-download',
    roles: ['InputFiles', 'MainOutputFiles', 'SmallOutputFiles', 'AnalysisFiles', 'IdleFiles', 'AnalyseProgramFiles', 'StatisticsFiles', 'ApiStatisticsFiles', 'LogFiles']
  },
  children: [
    {
      path: 'inputfiles',
      component: () => import('@/views/FileManage/InputFiles'),
      name: 'InputFiles',
      meta: {
        title: 'InputFiles',
        roles: ['InputFiles']
      }
    },
    {
      path: 'analysisinputfiles',
      component: () => import('@/views/FileManage/AnalysisInputFiles'),
      name: 'AnalysisInputFiles',
      meta: {
        title: 'AnalysisInputFiles',
        roles: ['InputFiles']
      }
    },
    {
      path: 'mainoutputfiles',
      component: () => import('@/views/FileManage/MainOutputFiles'),
      name: 'MainOutputFiles',
      meta: {
        title: 'MainOutputFiles',
        roles: ['MainOutputFiles']
      }
    },
    {
      path: 'smalloutputfiles',
      component: () => import('@/views/FileManage/SmallOutputFiles'),
      name: 'SmallOutputFiles',
      meta: {
        title: 'SmallOutputFiles',
        roles: ['SmallOutputFiles']
      }
    },
    {
      path: 'analysisfiles',
      component: () => import('@/views/FileManage/AnalysisFiles'),
      name: 'AnalysisFiles',
      meta: {
        title: 'AnalysisFiles',
        roles: ['AnalysisFiles']
      }
    },
    {
      path: 'idlefiles',
      component: () => import('@/views/FileManage/IdleFiles'),
      name: 'IdleFiles',
      meta: {
        title: 'IdleFiles',
        roles: ['IdleFiles']
      }
    },
    {
      path: 'analyseprogramfiles',
      component: () => import('@/views/FileManage/AnalyseProgramFiles'),
      name: 'AnalyseProgramFiles',
      meta: {
        title: 'AnalyseProgramFiles',
        roles: ['AnalyseProgramFiles']
      }
    },
    {
      path: 'statisticsfiles',
      component: () => import('@/views/FileManage/StatisticsFiles'),
      name: 'StatisticsFiles',
      meta: {
        title: 'StatisticsFiles',
        roles: ['StatisticsFiles']
      }
    },
    {
      path: 'apistatisticsfiles',
      component: () => import('@/views/FileManage/ApiStatisticsFiles'),
      name: 'ApiStatisticsFiles',
      meta: {
        title: 'ApiStatisticsFiles',
        roles: ['ApiStatisticsFiles']
      }
    },
    {
      path: 'logfiles',
      component: () => import('@/views/FileManage/LogFiles'),
      name: 'LogFiles',
      meta: {
        title: 'LogFiles',
        roles: ['LogFiles']
      }
    }
  ]
}

export default FileManageRouter
