// 生管配置
import Layout from '@/layout'

const ProductionManageRouter = {
  path: '/productionmanage',
  component: Layout,
  redirect: '/productionmanage/earlyduedateboard8',
  alwaysShow: true,
  name: 'ProductionManage',
  meta: {
    title: '生管配置',
    icon: 'el-icon-setting',
    roles: [
      'EarlyDueDateBoard8', 'KeyBoardSpecialModel', 'PackHoliday', 'ProductionReportData',
      'KeyBoardLineData'
    ]
  },
  children: [
    {
      path: 'earlyduedateboard8',
      component: () => import('@/views/LongConfig/EarlyDueDateBoard8'),
      name: 'EarlyDueDateBoard8',
      meta: {
        title: '板号提早交期表',
        roles: ['EarlyDueDateBoard8']
      }
    },
    {
      path: 'keyboardspecialmodel',
      component: () => import('@/views/LongConfig/KeyBoardSpecialModel'),
      name: 'KeyBoardSpecialModel',
      meta: {
        title: '小板特殊机种表',
        roles: ['KeyBoardSpecialModel']
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
      path: 'productionreportdata',
      component: () => import('@/views/DayConfig/ProductionReportData'),
      name: 'ProductionReportData',
      meta: {
        title: '生产报表',
        roles: ['ProductionReportData']
      }
    },
    {
      path: 'keyBoardlinedata',
      component: () => import('@/views/LongConfig/KeyBoardLineData'),
      name: 'KeyBoardLineData',
      meta: {
        title: '按键板表',
        roles: ['KeyBoardLineData']
      }
    }
  ]
}

export default ProductionManageRouter
