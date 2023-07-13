// 每日配置
import Layout from '@/layout'

const DayConfigRouter = {
  path: '/dayconfig',
  component: Layout,
  redirect: '/dayconfig/blocktimedata',
  alwaysShow: true,
  name: 'DayConfig',
  meta: {
    title: '每日配置',
    icon: 'el-icon-setting',
    roles: ['BlockTimeData', 'PackHoliday', 'ProgramData', 'ProductionReportData', 'NoProgramData', 'NetworkBoard', 'TestProgramData', 'ProductProgramData']
  },
  children: [
    {
      path: 'blocktimetata',
      component: () => import('@/views/DayConfig/BlockTimeData'),
      name: 'BlockTimeData',
      meta: {
        title: '维护时间表',
        roles: ['BlockTimeData']
      }
    },
    {
      path: 'packholiday',
      component: () => import('@/views/DayConfig/PackHoliday'),
      name: 'PackHoliday',
      meta: {
        title: '包装线放假表',
        roles: ['PackHoliday']
      }
    },
    {
      path: 'programdata',
      component: () => import('@/views/DayConfig/ProgramData'),
      name: 'ProgramData',
      meta: {
        title: '程序表',
        roles: ['ProgramData']
      }
    },
    {
      path: 'productionreportdata',
      component: () => import('@/views/DayConfig/ProductionReportData'),
      name: 'ProductionReportData',
      meta: {
        title: '生产报表',
        roles: ['ProductionReportData']
      }
    },
    {
      path: 'noprogramdata',
      component: () => import('@/views/DayConfig/NoProgramData'),
      name: 'NoProgramData',
      meta: {
        title: '无程序清单表',
        roles: ['NoProgramData']
      }
    },
    {
      path: 'networkboard',
      component: () => import('@/views/DayConfig/NetworkBoard'),
      name: 'NetworkBoard',
      meta: {
        title: '网板信息表',
        roles: ['NetworkBoard']
      }
    },
    {
      path: 'testprogramdata',
      component: () => import('@/views/DayConfig/TestProgramData'),
      name: 'TestProgramData',
      meta: {
        title: '试跑程序表',
        roles: ['TestProgramData']
      }
    },
    {
      path: 'productprogramdata',
      component: () => import('@/views/DayConfig/ProductProgramData'),
      name: 'ProductProgramData',
      meta: {
        title: '量产程序表',
        roles: ['ProductProgramData']
      }
    }
  ]
}

export default DayConfigRouter
