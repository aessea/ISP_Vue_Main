// 长期配置
import Layout from '@/layout'

const LongConfigRouter = {
  path: '/longconfig',
  component: Layout,
  redirect: '/longconfig/ledctata',
  alwaysShow: true,
  name: 'LongConfig',
  meta: {
    title: '长期配置',
    icon: 'el-icon-setting',
    roles: ['admin', 'senioradmin']
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
        title: 'MP1补线表',
        roles: ['admin', 'senioradmin']
      }
    },
    {
      path: 'notmp1addlinedata',
      component: () => import('@/views/LongConfig/NotMP1AddLineData'),
      name: 'NotMP1AddLineData',
      meta: {
        title: '非MP1补线表',
        roles: ['admin', 'senioradmin']
      }
    },
    {
      path: 'exchangelinedata',
      component: () => import('@/views/LongConfig/ExchangeLineData'),
      name: 'ExchangeLineData',
      meta: {
        title: '交换线别表',
        roles: ['admin', 'senioradmin']
      }
    },
    {
      path: 'linedata',
      component: () => import('@/views/LongConfig/LineData'),
      name: 'LineData',
      meta: {
        title: '产线配置表',
        roles: ['admin', 'senioradmin']
      }
    },
    {
      path: 'capacitychangedata',
      component: () => import('@/views/LongConfig/CapacityChangeData'),
      name: 'CapacityChangeData',
      meta: {
        title: '产能变化表',
        roles: ['admin', 'senioradmin']
      }
    },
    {
      path: 'optimizedmachinedata',
      component: () => import('@/views/LongConfig/OptimizedMachineData'),
      name: 'OptimizedMachineData',
      meta: {
        title: '优化机种表',
        roles: ['admin', 'senioradmin']
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
        title: '主板制程配置表',
        roles: ['admin', 'senioradmin']
      }
    },
    {
      path: 'smallprocessdata',
      component: () => import('@/views/LongConfig/SmallProcessData'),
      name: 'SmallProcessData',
      meta: {
        title: '小板制程配置表',
        roles: ['admin', 'senioradmin']
      }
    },
    {
      path: 'keyBoardlinedata',
      component: () => import('@/views/LongConfig/KeyBoardLineData'),
      name: 'KeyBoardLineData',
      meta: {
        title: '按键板表',
        roles: ['admin', 'senioradmin']
      }
    },
    {
      path: 'earlyduedateboard8',
      component: () => import('@/views/LongConfig/EarlyDueDateBoard8'),
      name: 'EarlyDueDateBoard8',
      meta: {
        title: '板号提早交期表',
        roles: ['admin', 'senioradmin']
      }
    },
    {
      path: 'changelinedata',
      component: () => import('@/views/LongConfig/ChangeLineData'),
      name: 'ChangeLineData',
      meta: {
        title: '线体变化表',
        roles: ['admin', 'senioradmin']
      }
    },
    {
      path: 'pairedsmtmachinedata',
      component: () => import('@/views/LongConfig/PairedSMTMachineData'),
      name: 'PairedSMTMachineData',
      meta: {
        title: '配套板表',
        roles: ['admin', 'senioradmin']
      }
    },
    {
      path: 'keyboardspecialmodel',
      component: () => import('@/views/LongConfig/KeyBoardSpecialModel'),
      name: 'KeyBoardSpecialModel',
      meta: {
        title: '小板特殊机种表',
        roles: ['admin', 'senioradmin']
      }
    },
    {
      path: 'interfaceconfig',
      component: () => import('@/views/LongConfig/InterfaceConfig'),
      name: 'InterfaceConfig',
      meta: {
        title: '接口配置表',
        roles: ['admin', 'senioradmin']
      }
    },
    {
      path: 'boardadvancedate',
      component: () => import('@/views/LongConfig/BoardAdvanceDate'),
      name: 'BoardAdvanceDate',
      meta: {
        title: '后工序提早交期表',
        roles: ['admin', 'senioradmin']
      }
    }
  ]
}

export default LongConfigRouter
