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
    roles: ['admin', 'common']
  },
  children: [
    {
      path: 'modelnamerestrictions',
      component: () => import('@/views/Outsource/Constraints/ModelNameRestrictions'),
      name: 'ModelNameRestrictions',
      meta: {
        title: 'AI/SMT组件优先分配',
        roles: ['admin', 'common']
      }
    },
    {
      path: 'capacity',
      component: () => import('@/views/Outsource/Constraints/Capacity'),
      name: 'Capacity',
      meta: {
        title: '产能限制表',
        roles: ['admin', 'common']
      }
    },
    {
      path: 'processrestrictions',
      component: () => import('@/views/Outsource/Constraints/ProcessRestrictions'),
      name: 'ProcessRestrictions',
      meta: {
        title: '制程约束表',
        roles: ['admin', 'common']
      }
    },
    {
      path: 'packagelinerestrictions',
      component: () => import('@/views/Outsource/Constraints/PackageLineRestrictions'),
      name: 'PackageLineRestrictions',
      meta: {
        title: '包装线限制表',
        roles: ['admin', 'common']
      }
    },
    {
      path: 'customerrestrictions',
      component: () => import('@/views/Outsource/Constraints/CustomerRestrictions'),
      name: 'CustomerRestrictions',
      meta: {
        title: '客户约束表',
        roles: ['admin', 'common']
      }
    },
    {
      path: 'jobordertyperestrictions',
      component: () => import('@/views/Outsource/Constraints/JobOrderTypeRestrictions'),
      name: 'JobOrderTypeRestrictions',
      meta: {
        title: '工单类型限制表',
        roles: ['admin', 'common']
      }
    },
    {
      path: 'boardnorestrictions',
      component: () => import('@/views/Outsource/Constraints/BoardNoRestrictions'),
      name: 'BoardNoRestrictions',
      meta: {
        title: '板号限制表',
        roles: ['admin', 'common']
      }
    },
    {
      path: 'filterrulesdata',
      component: () => import('@/views/Outsource/Constraints/FilterRulesData'),
      name: 'FilterRulesData',
      meta: {
        title: '筛选规则表',
        roles: ['admin', 'common']
      }
    }
  ]
}

export default OutsourceConstraintsRouter
