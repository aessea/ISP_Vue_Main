export default {
  route: { // 路由
    // 首页
    Dashboard: '首页', // 首页（一级菜单）
    // 控制面板
    Control: '控制面板', // 控制面板（一级菜单）
    SchedulePanel: '计算排程面板', // 计算排程面板
    ParamsConfig: '排程配置', // 排程配置
    AnalysisControl: '分析排程面板', // 分析排程面板
    // 每日配置
    DayConfig: '每日配置', // 每日配置（一级菜单）
    BlockTimeData: '维护时间表', // 维护时间表
    ProcessAiHoliday: 'AI放假维护表', // AI放假维护表
    PackagingLineHoliday: '包装线提前天数表', // 包装线提前天数表
    PackHoliday: '包装线放假表', // 包装线放假表
    ProgramData: '程序表', // 程序表
    ProductionReportData: '生产报表', // 生产报表
    NoProgramData: '无程序清单表', // 无程序清单表
    NetworkBoard: '网板信息表', // 网板信息表
    TestProgramData: '试跑程序表', // 试跑程序表
    ProductProgramData: '量产程序表', // 量产程序表
    // 长期配置
    LongConfig: '长期配置', // 长期配置（一级菜单）
    MP1AddLineData: 'MP1补线表', // MP1补线表
    NotMP1AddLineData: '非MP1补线表', // 非MP1补线表
    ExchangeLineData: '交换线别表', // 交换线别表
    LineData: '产线配置表', // 产线配置表
    CapacityChangeData: ' 产能变化表', // 产能变化表
    OptimizedMachineData: '优化机种表', // 优化机种表
    ProcessData: '主板制程配置表', // 主板制程配置表
    SmallProcessData: '小板制程配置表', // 小板制程配置表
    KeyBoardLineData: '按键板表', // 按键板表
    EarlyDueDateBoard8: '板号提早交期表', // 板号提早交期表
    ChangeLineData: '线体变化表', // 线体变化表
    PairedSMTMachineData: '配套板表', // 配套板表
    KeyBoardSpecialModel: '无需打板机种表', // 无需打板机种表
    BoardAdvanceDate: '后工序提早交期表', // 后工序提早交期表
    ProcessSequenceMap: '先后加工循序对照表p', // 先后加工循序对照表
    CustomerData: '客户识别表', // 客户识别表
    DelayPackingLine: '包装线延后表', // 包装线延后表
    KeyboardMachineName: '小板同订单号上排程表', // 小板同订单号上排程表
    // 预测数据
    Predict: '预测数据', // 预测数据（一级菜单）
    TrainLEDTData: 'LED训练数据', // LED训练数据
    TrainData: '训练数据', // 训练数据
    FixedCTData: '车间指定CT表', // 车间指定CT表
    TrainDataMap: '新线体预测参考表', // 新线体预测参考表
    // 系统文件
    FileManage: '系统文件', // 系统文件（一级菜单）
    InputFiles: '计算输入文件', // 计算输入文件
    AnalysisInputFiles: '分析输入文件', // 分析输入文件
    MainOutputFiles: '主板输入文件', // 主板输入文件
    SmallOutputFiles: '小板输入文件', // 小板输入文件
    AnalysisFiles: '分析输出文件', // 分析输出文件
    IdleFiles: 'Idle明细文件', // Idle明细文件
    AnalyseProgramFiles: '无程序清单文件', // 无程序清单文件
    StatisticsFiles: '量化文件', // 量化文件
    ApiStatisticsFiles: '接口量化文件', // 接口量化文件
    LogFiles: '日志文件', // 日志文件
    // 系统管理
    Permission: '系统管理', // 系统管理（一级菜单）
    UserManage: '用户管理', // 用户管理
    RolePermission: '角色权限管理', // 角色权限管理
    ButtonPermission: '按钮权限管理', // 按钮权限管理
    ParamsConfigManage: '配置管理', // 配置管理
    InterfaceConfig: 'MES接口配置管理', // MES接口配置管理
    RunControlConfig: '排程功能管理', // 排程功能管理
    // 系统日志
    SystemLog: '系统日志', // 系统日志（一级菜单）
    HistoryRun: '运行日志', // 运行日志
    HistoryOpera: '操作记录', // 操作记录
    ScheduleResData: '排程记录', // 排程记录
    MesInterfaceLog: '接口日志' // 接口日志
  },
  role: {
    permission: 'Permission'
  },
  user: {
    uname: 'User Name',
    role: 'Role',
    sex: 'Sex'
  },
  title: {
    text: 'SMT Schedule System'
  }
}
