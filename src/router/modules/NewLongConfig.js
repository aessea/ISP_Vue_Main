// 新的长期配置
import Layout from '@/layout'

const NewLongConfigRouter = {
  path: '/longconfig',
  component: Layout,
  redirect: '/longconfig/ledctata',
  alwaysShow: true,
  name: 'LongConfig',
  meta: {
    title: '长期配置',
    icon: 'el-icon-setting',
    roles: [
      'MP1AddLineData', 'NotMP1AddLineData', 'ExchangeLineData', 'CapacityChangeData',
      'OptimizedMachineData', 'ProcessData', 'SmallProcessData', 'ChangeLineData',
      'PairedSMTMachineData', 'InterfaceConfig', 'BoardAdvanceDate', 'BlockTimeData',
      'ProgramData', 'NoProgramData', 'NetworkBoard', 'TestProgramData', 'ProductProgramData',
      'ProcessSequenceMap', 'CustomerData', 'DelayPackingLine'
    ]
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
      path: 'mp1addlinedata',
      component: () => import('@/views/LongConfig/MP1AddLineData'),
      name: 'MP1AddLineData',
      meta: {
        title: 'MP1补线表',
        roles: ['MP1AddLineData']
      }
    },
    {
      path: 'notmp1addlinedata',
      component: () => import('@/views/LongConfig/NotMP1AddLineData'),
      name: 'NotMP1AddLineData',
      meta: {
        title: '非MP1补线表',
        roles: ['NotMP1AddLineData']
      }
    },
    {
      path: 'exchangelinedata',
      component: () => import('@/views/LongConfig/ExchangeLineData'),
      name: 'ExchangeLineData',
      meta: {
        title: '交换线别表',
        roles: ['ExchangeLineData']
      }
    },
    {
      path: 'capacitychangedata',
      component: () => import('@/views/LongConfig/CapacityChangeData'),
      name: 'CapacityChangeData',
      meta: {
        title: '产能变化表',
        roles: ['CapacityChangeData']
      }
    },
    {
      path: 'optimizedmachinedata',
      component: () => import('@/views/LongConfig/OptimizedMachineData'),
      name: 'OptimizedMachineData',
      meta: {
        title: '优化机种表',
        roles: ['OptimizedMachineData']
      }
    },
    {
      path: 'mainprocessdata',
      component: () => import('@/views/LongConfig/ProcessData'),
      name: 'ProcessData',
      meta: {
        title: '主板制程配置表',
        roles: ['ProcessData']
      }
    },
    {
      path: 'smallprocessdata',
      component: () => import('@/views/LongConfig/SmallProcessData'),
      name: 'SmallProcessData',
      meta: {
        title: '小板制程配置表',
        roles: ['SmallProcessData']
      }
    },
    {
      path: 'changelinedata',
      component: () => import('@/views/LongConfig/ChangeLineData'),
      name: 'ChangeLineData',
      meta: {
        title: '线体变化表',
        roles: ['ChangeLineData']
      }
    },
    {
      path: 'pairedsmtmachinedata',
      component: () => import('@/views/LongConfig/PairedSMTMachineData'),
      name: 'PairedSMTMachineData',
      meta: {
        title: '配套板表',
        roles: ['PairedSMTMachineData']
      }
    },
    {
      path: 'interfaceconfig',
      component: () => import('@/views/LongConfig/InterfaceConfig'),
      name: 'InterfaceConfig',
      meta: {
        title: '对接MES接口配置表',
        roles: ['InterfaceConfig']
      }
    },
    {
      path: 'boardadvancedate',
      component: () => import('@/views/LongConfig/BoardAdvanceDate'),
      name: 'BoardAdvanceDate',
      meta: {
        title: '后工序提早交期表',
        roles: ['BoardAdvanceDate']
      }
    },
    {
      path: 'customerdata',
      component: () => import('@/views/LongConfig/CustomerData'),
      name: 'CustomerData',
      meta: {
        title: '客户识别表',
        roles: ['CustomerData']
      }
    },
    {
      path: 'processsequencmap',
      component: () => import('@/views/LongConfig/ProcessSequenceMap'),
      name: 'ProcessSequenceMap',
      meta: {
        title: '先后加工顺序对照表',
        roles: ['ProcessSequenceMap']
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
      path: 'delaypackingline',
      component: () => import('@/views/LongConfig/DelayPackingLine'),
      name: 'DelayPackingLine',
      meta: {
        title: '包装线延后表',
        roles: ['DelayPackingLine']
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

export default NewLongConfigRouter
