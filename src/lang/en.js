export default {
  route: { // 路由
    // 首页
    Dashboard: 'Dashboard', // 首页（一级菜单）
    // 控制面板
    Control: 'Control Panel', // 控制面板（一级菜单）
    SchedulePanel: 'Compute Panel', // 计算排程面板
    ParamsConfig: 'Params Config', // 排程配置
    AnalysisControl: 'Analysis Panel', // 分析排程面板
    // 每日配置
    DayConfig: 'Daily Config', // 每日配置（一级菜单）
    BlockTimeData: 'Maintenance Data', // 维护时间表
    ProcessAiHoliday: 'Process AI Holiday', // AI放假维护表
    PackagingLineHoliday: 'Packaging Line Holiday', // 包装线提前天数表
    PackHoliday: 'Pack Holiday', // 包装线放假表
    ProgramData: 'Program Data', // 程序表
    ProductionReportData: 'Production Report Data', // 生产报表
    NoProgramData: 'No Program Data', // 无程序清单表
    NetworkBoard: 'Network Board', // 网板信息表
    TestProgramData: 'Test Program Data', // 试跑程序表
    ProductProgramData: 'Product Program Data', // 量产程序表
    // 长期配置
    LongConfig: 'Long Config', // 长期配置（一级菜单）
    MP1AddLineData: 'MP1 AddLine Data', // MP1补线表
    NotMP1AddLineData: 'Not MP1 AddLine Data', // 非MP1补线表
    ExchangeLineData: 'Exchange Line Data', // 交换线别表
    LineData: 'Line Data', // 产线配置表
    CapacityChangeData: 'Capacity Change Data', // 产能变化表
    OptimizedMachineData: 'Optimized Machine Data', // 优化机种表
    ProcessData: 'Main Process Data', // 主板制程配置表
    SmallProcessData: 'Small Process Data', // 小板制程配置表
    KeyBoardLineData: 'KeyBoard Line Data', // 按键板表
    EarlyDueDateBoard8: 'Early DueDate Board', // 板号提早交期表
    ChangeLineData: 'Change Line Data', // 线体变化表
    PairedSMTMachineData: 'Paired SMT Machine Data', // 配套板表
    KeyBoardSpecialModel: 'KeyBoard Special Model', // 无需打板机种表
    BoardAdvanceDate: 'Board Advance Date', // 后工序提早交期表
    ProcessSequenceMap: 'Process Sequence Map', // 先后加工循序对照表
    CustomerData: 'Customer Data', // 客户识别表
    DelayPackingLine: 'Delay Packing Line', // 包装线延后表
    KeyboardMachineName: 'Keyboard Machine Name', // 小板同订单号上排程表
    // 预测数据
    Predict: 'Predict Data', // 预测数据（一级菜单）
    TrainLEDTData: 'LED Train Data', // LED训练数据
    TrainData: 'Train Data', // 训练数据
    FixedCTData: 'Fixed CT Data', // 车间指定CT表
    TrainDataMap: 'Train Data Map', // 新线体预测参考表
    // 系统文件
    FileManage: 'System Files', // 系统文件（一级菜单）
    InputFiles: 'Compute Input Files', // 计算输入文件
    AnalysisInputFiles: 'Analysis Input Files', // 分析输入文件
    MainOutputFiles: 'Main Input Files', // 主板输入文件
    SmallOutputFiles: 'Small Input Files', // 小板输入文件
    AnalysisFiles: 'Analysis Output Files', // 分析输出文件
    IdleFiles: 'Idle Files', // Idle明细文件
    AnalyseProgramFiles: 'No Program Files', // 无程序清单文件
    StatisticsFiles: 'Statistics Files', // 量化文件
    ApiStatisticsFiles: 'API Statistics Files', // 接口量化文件
    LogFiles: 'Log Files', // 日志文件
    // 系统管理
    Permission: 'System Manage', // 系统管理（一级菜单）
    UserManage: 'Users Manage', // 用户管理
    RolePermission: 'Roles Manage', // 角色权限管理
    ButtonPermission: 'Buttons Manage', // 按钮权限管理
    ParamsConfigManage: 'Params Manage', // 配置管理
    InterfaceConfig: 'Interface Manage', // MES接口配置管理
    RunControlConfig: 'Function Manage', // 排程功能管理
    // 系统日志
    SystemLog: 'System Log', // 系统日志（一级菜单）
    HistoryRun: 'Run Log', // 运行日志
    HistoryOpera: 'Opera Log', // 操作记录
    ScheduleResData: 'Schedule Data', // 排程记录
    MesInterfaceLog: 'Interface Log' // 接口日志
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
