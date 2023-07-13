// 外包相关
import Layout from '@/layout'
// 外包数据
const OutsourceOtherDataRouter = {
  path: '/outsourceotherdata',
  component: Layout,
  redirect: '/outsourceotherdata/schedule',
  alwaysShow: true,
  name: 'OutsourceData',
  meta: {
    title: '外包存储模块',
    icon: 'el-icon-s-data',
    roles: ['Schedule', 'DayCapacityConfig', 'Division', 'OldOrder', 'OutputFiles',
      'Summary', 'ParamConfig', 'MotherBoard', 'SmallBoard']
  },
  children: [
    {
      path: 'schedule',
      component: () => import('@/views/Outsource/OtherData/Schedule'),
      name: 'Schedule',
      meta: {
        title: '业务排程明细',
        roles: ['Schedule']
      }
    },
    {
      path: 'daycapacityconfig',
      component: () => import('@/views/Outsource/OtherData/DayCapacityConfig'),
      name: 'DayCapacityConfig',
      meta: {
        title: '每日产能配置',
        roles: ['DayCapacityConfig']
      }
    },
    {
      path: 'division',
      component: () => import('@/views/Outsource/OtherData/Division'),
      name: 'Division',
      meta: {
        title: '分工单格式',
        roles: ['Division']
      }
    },
    {
      path: 'oldorder',
      component: () => import('@/views/Outsource/OtherData/OldOrder'),
      name: 'OldOrder',
      meta: {
        title: '旧工单',
        roles: ['OldOrder']
      }
    },
    {
      path: 'outputfiles',
      component: () => import('@/views/Outsource/OtherData/OutputFiles'),
      name: 'OutputFiles',
      meta: {
        title: '输出文件',
        roles: ['OutputFiles']
      }
    },
    {
      path: 'summary',
      component: () => import('@/views/Outsource/OtherData/Summary'),
      name: 'Summary',
      meta: {
        title: '业务排程汇总',
        roles: ['Summary']
      }
    },
    {
      path: 'paramconfig',
      component: () => import('@/views/Outsource/OtherData/ParamConfig'),
      name: 'ParamConfig',
      meta: {
        title: '参数配置',
        roles: ['ParamConfig']
      }
    },
    // {
    //   path: 'columnnameconfig',
    //   component: () => import('@/views/Outsource/OtherData/ColumnNameConfig'),
    //   name: 'ColumnNameConfig',
    //   meta: {
    //     title: '列名配置',
    //     roles: ['admin']
    //   }
    // },
    // {
    //   path: 'sheetnameconfig',
    //   component: () => import('@/views/Outsource/OtherData/SheetNameConfig'),
    //   name: 'SheetNameConfig',
    //   meta: {
    //     title: '表名配置',
    //     roles: ['admin']
    //   }
    // },
    // {
    //   path: 'tablecolumnconfig',
    //   component: () => import('@/views/Outsource/OtherData/TableColumnConfig'),
    //   name: 'TableColumnConfig',
    //   meta: {
    //     title: '读取列名配置',
    //     roles: ['admin']
    //   }
    // },
    {
      path: 'motherboard',
      component: () => import('@/views/Outsource/OtherData/MotherBoard'),
      name: 'MotherBoard',
      meta: {
        title: '外协主板信息',
        roles: ['MotherBoard']
      }
    },
    {
      path: 'smallboard',
      component: () => import('@/views/Outsource/OtherData/SmallBoard'),
      name: 'SmallBoard',
      meta: {
        title: '外协小板信息',
        roles: ['SmallBoard']
      }
    }
  ]
}
export default OutsourceOtherDataRouter
