// 生产配置
import Layout from '@/layout'

const ProductionRouter = {
  path: '/production',
  component: Layout,
  redirect: '/production/linedata',
  alwaysShow: true,
  name: 'Production',
  meta: {
    title: '生产配置',
    icon: 'el-icon-setting',
    roles: ['LineData']
  },
  children: [
    {
      path: 'linedata',
      component: () => import('@/views/LongConfig/LineData'),
      name: 'LineData',
      meta: {
        title: '产线配置表',
        roles: ['LineData']
      }
    }
  ]
}

export default ProductionRouter
