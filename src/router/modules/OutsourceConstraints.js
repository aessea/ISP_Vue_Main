// 外包相关
import Layout from '@/layout'
// 外包基本数据
const OutsourceConstraintsRouter = {
  path: '/outsourceconstraints',
  component: Layout,
  redirect: '/outsourceconstraints/modelnamerestrictions',
  alwaysShow: true,
  name: 'OutsourceConstraints',
  meta: {
    title: '外包约束数据',
    icon: 'el-icon-s-data',
    roles: ['Capacity', 'ProcessRestrictions', 'PackageLineRestrictions', 'CustomerRestrictions',
      'JobOrderTypeRestrictions', 'BoardNoRestrictions', 'FilterRulesData', 'ModelNameRestrictions',
      'Manufacturer']
  },
  children: [

    {
      path: 'capacity',
      component: () => import('@/views/Outsource/Constraints/Capacity'),
      name: 'Capacity',
      meta: {
        title: '产能限制表',
        roles: ['Capacity']
      }
    },
    {
      path: 'processrestrictions',
      component: () => import('@/views/Outsource/Constraints/ProcessRestrictions'),
      name: 'ProcessRestrictions',
      meta: {
        title: '制程约束表',
        roles: ['ProcessRestrictions']
      }
    },
    {
      path: 'packagelinerestrictions',
      component: () => import('@/views/Outsource/Constraints/PackageLineRestrictions'),
      name: 'PackageLineRestrictions',
      meta: {
        title: '包装线限制表',
        roles: ['PackageLineRestrictions']
      }
    },
    {
      path: 'customerrestrictions',
      component: () => import('@/views/Outsource/Constraints/CustomerRestrictions'),
      name: 'CustomerRestrictions',
      meta: {
        title: '客户约束表',
        roles: ['CustomerRestrictions']
      }
    },
    {
      path: 'jobordertyperestrictions',
      component: () => import('@/views/Outsource/Constraints/JobOrderTypeRestrictions'),
      name: 'JobOrderTypeRestrictions',
      meta: {
        title: '工单类型限制表',
        roles: ['JobOrderTypeRestrictions']
      }
    },
    {
      path: 'boardnorestrictions',
      component: () => import('@/views/Outsource/Constraints/BoardNoRestrictions'),
      name: 'BoardNoRestrictions',
      meta: {
        title: '板号限制表',
        roles: ['BoardNoRestrictions']
      }
    },
    {
      path: 'filterrulesdata',
      component: () => import('@/views/Outsource/Constraints/FilterRulesData'),
      name: 'FilterRulesData',
      meta: {
        title: '筛选规则表',
        roles: ['FilterRulesData']
      }
    },
    {
      path: 'modelnamerestrictions',
      component: () => import('@/views/Outsource/Constraints/ModelNameRestrictions'),
      name: 'ModelNameRestrictions',
      meta: {
        title: '主板历史生产厂商表',
        roles: ['ModelNameRestrictions']
      }
    },
    {
      path: 'manufacturer',
      component: () => import('@/views/Outsource/OtherData/Manufacturer'),
      name: 'Manufacturer',
      meta: {
        title: '小板历史生产厂商表',
        roles: ['Manufacturer']
      }
    }
  ]
}

export default OutsourceConstraintsRouter
