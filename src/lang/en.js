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
  },
  PublicText: {
    CheckLoadiing: 'Checking...', // 检查中...
    ImportLoadiing: 'Importing...', // 导入中...
    MesApiUpload: 'Not Updated', // 未更新
    MesApiPush: 'Not Pushed', // 未推送
    TextError: 'Error' // 错误
  },
  PublicBtn: {
    Confirm: 'Confirm', // 确定
    Close: 'Close', // 关闭
    Append: 'Append', // 添加
    Cancel: 'Cancel' // 取消
  },
  SchedulePanelPage: { // 控制面板
    // 标题
    ScheduleDateTitle: 'Schedule Title', // 排程标题
    TitleScheduleRunTime: 'Schedule Run Time', // 排程运行时长
    ScheduleType: 'Schedule Type', // 排程类型
    Feasible: 'Feasible', // 是否可行解
    LineBalanceValue: 'Line Balance', // 包装线平衡
    IdleValue: 'Idle Days', // 停顿(天)
    OverdueValue: 'Overdue Days', // 逾期(天)
    ResultValue: 'Result Value', // 目标值
    TaskProgress: 'Task Progress', // 任务进度
    ControlPanel: 'Control Center', // 控制中心
    TrainPredictModelTitle: 'Train Predict Model', // 训练预测模型
    MainDowload: 'Download Main', // 主板下载
    SmallDowload: 'Download Small', // 小板下载
    LogDownload: 'Download Log', // 日志下载
    Config: 'Config', // 配置
    TitleDownloadNewMain: 'Download New Main', // 下载主板最新排程
    TitleDownloadNewSmall: 'Download New Small', // 下载小板最新排程
    TitleDownloadNewLog: 'Download New Log', // 下载最新日志
    TextMainUploadName: 'Retrieve Main Upload File', // 获取主板上传文件
    TextSmallUploadName: 'Retrieve Small Upload File', // 获取小板上传文件
    TextChooseHoliday: 'Select one or more holiday dates', // 选择一个或多个包装放假日期
    // 提示
    Progress1: 'Training Prediction Model Not Started | 0%', // 第一个进度条：未开始训练预测模型|0%
    Progress2: 'Not Started | 0%', // 第二个进度条：未开始|0%
    Progress3: 'Initial Solution Not Started | 0%', // 第三个进度条：未开始初始解|0%
    Progress4: 'Deep Search Not Started | 0%', // 第四个进度条：未开始深度搜索|0%
    TextScheduleRunTime1: 'Not Started', // 未开始
    TextScheduleRunTime2: 'Calculation Error', // 计算排程出错
    TextScheduleRunTime3: 'Calculating:', // 计算中：
    TextScheduleRunTime4: 'Calculation Error, Total Time Taken:', // 计算排程出错，耗时：
    TextScheduleRunTime5: 'Calculation Completed, Total Time Taken:', // 计算完毕，总耗时：
    // 按钮
    BtnModifyPackHoliday: 'Modify Pack Holiday', // 修改包装放假
    BtnTrainPredictModel: 'Train Predict Model', // 训练预测模型
    BtnComputeMain: 'Compute Main', // 计算主板排程
    BtnComputeSmall: 'Compute Small', // 计算小板排程
    BtnComputeBoth: 'Compute Both', // 计算主板小板
    BtnEndDeepSearch: 'End DeepSearch', // 终止深度搜索
    BtnEndCompute: 'End Compute', // 终止计算排程
    BtnPushStatistics: 'Push Stastic', // 推送量化结果
    BtnDownloadMain: 'Download Main', // 下载主板排程
    BtnDownloadSmall: 'Download Small', // 下载小板排程
    BtnDownloadIdle: 'Download Idle', // 下载idle明细
    BtnDownloadStastic: 'Download Stastic', // 下载量化结果
    BtnDownloadNoPro: 'Download NoProgram', // 下载无程序表
    BtnDownloadLog: 'Download Log', // 下载最新日志
    BtnUploadMain: 'Upload Main File', // 上传主板排程
    BtnUploadSmall: 'Upload Small File', // 上传小板排程
    BtnImportFile: 'Import File', // 导入排程
    BtnTransferMain: 'Transfer Main', // 主板转移扣点
    BtnTransferSmall: 'Transfer Small', // 小板转移扣点
    BtnTransfer: 'Transfer', // 转移扣点
    BtnExportMain: 'Export Main', // 导出主板
    BtnExportSmall: 'Export Small', // 导出小板
    BtnGetMainUpload: 'Get Main Upload File', // 获取主板上传文件
    BtnGetSmallUpload: 'Get Small Upload File', // 获取小板上传文件
    BtnGetApsProgram: 'Get Small Upload File', // 更新程序信息
    BtnGetApsMtool: 'Get Small Upload File', // 更新钢网信息
    BtnGetApsMoBaseData: 'Get Small Upload File', // 更新齐套信息
    BtnGetApsMoProgData: 'Get Small Upload File', // 更新工单进度
    BtnGetApsDeliveryDay: 'Get Small Upload File', // 更新包装时间
    BtnBeginCompute: 'Begin Conpute' // 开始计算排程
  }
}
