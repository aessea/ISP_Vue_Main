// 预测数据
import Layout from '@/layout'

const PredictRouter = {
  path: '/predict',
  component: Layout,
  redirect: '/predict/trainledtdata',
  alwaysShow: true,
  name: 'Predict',
  meta: {
    title: 'Predict',
    icon: 'el-icon-coin',
    roles: ['TrainLEDTData', 'TrainData', 'FixedCTData', 'TrainDataMap']
  },
  children: [
    {
      path: 'trainledtdata',
      component: () => import('@/views/Predict/TrainLEDTData'),
      name: 'TrainLEDTData',
      meta: {
        title: 'TrainLEDTData',
        roles: ['TrainLEDTData']
      }
    },
    {
      path: 'traindata',
      component: () => import('@/views/Predict/TrainData'),
      name: 'TrainData',
      meta: {
        title: 'TrainData',
        roles: ['TrainData']
      }
    },
    {
      path: 'fixedctdata',
      component: () => import('@/views/Predict/FixedCTData'),
      name: 'FixedCTData',
      meta: {
        title: 'FixedCTData',
        roles: ['FixedCTData']
      }
    },
    {
      path: 'traindatamap',
      component: () => import('@/views/Predict/TrainDataMap'),
      name: 'TrainDataMap',
      meta: {
        title: 'TrainDataMap',
        roles: ['TrainDataMap']
      }
    }
  ]
}

export default PredictRouter
