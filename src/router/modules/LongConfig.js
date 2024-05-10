// 长期配置
import Layout from '@/layout'

const LongConfigRouter = {
  path: '/longconfig',
  component: Layout,
  redirect: '/longconfig/ledctata',
  alwaysShow: true,
  name: 'LongConfig',
  meta: {
    title: 'LongConfig',
    icon: 'el-icon-setting',
    roles: ['MP1AddLineData', 'NotMP1AddLineData', 'ExchangeLineData', 'LineData', 'CapacityChangeData', 'OptimizedMachineData',
      'ProcessData', 'SmallProcessData', 'KeyBoardLineData', 'ChangeLineData', 'PairedSMTMachineData',
      'KeyBoardSpecialModel', 'BoardAdvanceDate', 'ProcessSequenceMap',
      'CustomerData', 'DelayPackingLine', 'KeyboardMachineName']
  },
  children: [
    // {
    //   path: 'ledctata',
    //   component: () => import('@/views/LongConfig/LEDCTData'),
    //   name: 'LEDCTData',
    //   meta: {
    //     title: 'LED经验数据',
    //     roles: ['admin']
    //   }
    // },
    {
      path: 'mp1addlinedata',
      component: () => import('@/views/LongConfig/MP1AddLineData'),
      name: 'MP1AddLineData',
      meta: {
        title: 'MP1AddLineData',
        roles: ['MP1AddLineData']
      }
    },
    {
      path: 'notmp1addlinedata',
      component: () => import('@/views/LongConfig/NotMP1AddLineData'),
      name: 'NotMP1AddLineData',
      meta: {
        title: 'NotMP1AddLineData',
        roles: ['NotMP1AddLineData']
      }
    },
    {
      path: 'exchangelinedata',
      component: () => import('@/views/LongConfig/ExchangeLineData'),
      name: 'ExchangeLineData',
      meta: {
        title: 'ExchangeLineData',
        roles: ['ExchangeLineData']
      }
    },
    {
      path: 'linedata',
      component: () => import('@/views/LongConfig/LineData'),
      name: 'LineData',
      meta: {
        title: 'LineData',
        roles: ['LineData']
      }
    },
    {
      path: 'capacitychangedata',
      component: () => import('@/views/LongConfig/CapacityChangeData'),
      name: 'CapacityChangeData',
      meta: {
        title: 'CapacityChangeData',
        roles: ['CapacityChangeData']
      }
    },
    {
      path: 'optimizedmachinedata',
      component: () => import('@/views/LongConfig/OptimizedMachineData'),
      name: 'OptimizedMachineData',
      meta: {
        title: 'OptimizedMachineData',
        roles: ['OptimizedMachineData']
      }
    },
    // {
    //   path: 'setupdata',
    //   component: () => import('@/views/LongConfig/SetUpData'),
    //   name: 'SetUpData',
    //   meta: {
    //     title: '切换表',
    //     roles: ['admin']
    //   }
    // },
    {
      path: 'mainprocessdata',
      component: () => import('@/views/LongConfig/ProcessData'),
      name: 'ProcessData',
      meta: {
        title: 'ProcessData',
        roles: ['ProcessData']
      }
    },
    {
      path: 'smallprocessdata',
      component: () => import('@/views/LongConfig/SmallProcessData'),
      name: 'SmallProcessData',
      meta: {
        title: 'SmallProcessData',
        roles: ['SmallProcessData']
      }
    },
    {
      path: 'keyBoardlinedata',
      component: () => import('@/views/LongConfig/KeyBoardLineData'),
      name: 'KeyBoardLineData',
      meta: {
        title: 'KeyBoardLineData',
        roles: ['KeyBoardLineData']
      }
    },
    {
      path: 'earlyduedateboard8',
      component: () => import('@/views/LongConfig/EarlyDueDateBoard8'),
      name: 'EarlyDueDateBoard8',
      meta: {
        title: 'EarlyDueDateBoard8',
        roles: ['EarlyDueDateBoard8']
      }
    },
    {
      path: 'changelinedata',
      component: () => import('@/views/LongConfig/ChangeLineData'),
      name: 'ChangeLineData',
      meta: {
        title: 'ChangeLineData',
        roles: ['ChangeLineData']
      }
    },
    {
      path: 'pairedsmtmachinedata',
      component: () => import('@/views/LongConfig/PairedSMTMachineData'),
      name: 'PairedSMTMachineData',
      meta: {
        title: 'PairedSMTMachineData',
        roles: ['PairedSMTMachineData']
      }
    },
    {
      path: 'keyboardspecialmodel',
      component: () => import('@/views/LongConfig/KeyBoardSpecialModel'),
      name: 'KeyBoardSpecialModel',
      meta: {
        title: 'KeyBoardSpecialModel',
        roles: ['KeyBoardSpecialModel']
      }
    },
    {
      path: 'boardadvancedate',
      component: () => import('@/views/LongConfig/BoardAdvanceDate'),
      name: 'BoardAdvanceDate',
      meta: {
        title: 'BoardAdvanceDate',
        roles: ['BoardAdvanceDate']
      }
    },
    {
      path: 'processsequencmap',
      component: () => import('@/views/LongConfig/ProcessSequenceMap'),
      name: 'ProcessSequenceMap',
      meta: {
        title: 'ProcessSequenceMap',
        roles: ['ProcessSequenceMap']
      }
    },
    {
      path: 'customerdata',
      component: () => import('@/views/LongConfig/CustomerData'),
      name: 'CustomerData',
      meta: {
        title: 'CustomerData',
        roles: ['CustomerData']
      }
    },
    {
      path: 'delaypackingline',
      component: () => import('@/views/LongConfig/DelayPackingLine'),
      name: 'DelayPackingLine',
      meta: {
        title: 'DelayPackingLine',
        roles: ['DelayPackingLine']
      }
    },
    {
      path: 'keyboardmachinename',
      component: () => import('@/views/LongConfig/KeyboardMachineName'),
      name: 'KeyboardMachineName',
      meta: {
        title: 'KeyboardMachineName',
        roles: ['KeyboardMachineName']
      }
    }
  ]
}

export default LongConfigRouter
