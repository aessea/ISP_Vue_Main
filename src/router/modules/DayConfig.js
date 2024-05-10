// 每日配置
import Layout from '@/layout'

const DayConfigRouter = {
  path: '/dayconfig',
  component: Layout,
  redirect: '/dayconfig/blocktimedata',
  alwaysShow: true,
  name: 'DayConfig',
  meta: {
    title: 'DayConfig',
    icon: 'el-icon-setting',
    roles: ['BlockTimeData', 'PackHoliday', 'ProgramData', 'ProductionReportData', 'NoProgramData', 'NetworkBoard', 'TestProgramData', 'ProductProgramData',
      'ProcessAiHoliday', 'PackagingLineHoliday']
  },
  children: [
    {
      path: 'blocktimetata',
      component: () => import('@/views/DayConfig/BlockTimeData'),
      name: 'BlockTimeData',
      meta: {
        title: 'BlockTimeData',
        roles: ['BlockTimeData']
      }
    },
    {
      path: 'processaiholiday',
      component: () => import('@/views/DayConfig/ProcessAiHoliday'),
      name: 'ProcessAiHoliday',
      meta: {
        title: 'ProcessAiHoliday',
        roles: ['ProcessAiHoliday']
      }
    },
    {
      path: 'packaginglineHoliday',
      component: () => import('@/views/DayConfig/PackagingLineHoliday'),
      name: 'PackagingLineHoliday',
      meta: {
        title: 'PackagingLineHoliday',
        roles: ['PackagingLineHoliday']
      }
    },
    {
      path: 'packholiday',
      component: () => import('@/views/DayConfig/PackHoliday'),
      name: 'PackHoliday',
      meta: {
        title: 'PackHoliday',
        roles: ['PackHoliday']
      }
    },
    {
      path: 'programdata',
      component: () => import('@/views/DayConfig/ProgramData'),
      name: 'ProgramData',
      meta: {
        title: 'ProgramData',
        roles: ['ProgramData']
      }
    },
    {
      path: 'productionreportdata',
      component: () => import('@/views/DayConfig/ProductionReportData'),
      name: 'ProductionReportData',
      meta: {
        title: 'ProductionReportData',
        roles: ['ProductionReportData']
      }
    },
    {
      path: 'noprogramdata',
      component: () => import('@/views/DayConfig/NoProgramData'),
      name: 'NoProgramData',
      meta: {
        title: 'NoProgramData',
        roles: ['NoProgramData']
      }
    },
    {
      path: 'networkboard',
      component: () => import('@/views/DayConfig/NetworkBoard'),
      name: 'NetworkBoard',
      meta: {
        title: 'NetworkBoard',
        roles: ['NetworkBoard']
      }
    },
    {
      path: 'testprogramdata',
      component: () => import('@/views/DayConfig/TestProgramData'),
      name: 'TestProgramData',
      meta: {
        title: 'TestProgramData',
        roles: ['TestProgramData']
      }
    },
    {
      path: 'productprogramdata',
      component: () => import('@/views/DayConfig/ProductProgramData'),
      name: 'ProductProgramData',
      meta: {
        title: 'ProductProgramData',
        roles: ['ProductProgramData']
      }
    }
  ]
}

export default DayConfigRouter
