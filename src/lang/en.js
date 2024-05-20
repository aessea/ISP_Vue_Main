export default {
  user: {
    uname: 'User Name',
    role: 'Role',
    sex: 'Sex'
  },
  title: {
    Language: 'Language', // 语言
    Login: 'Login', // 登录
    SignOut: 'Sign Out', // 退出登录
    PageStyle: 'Page Style', // 页面样式设计
    ThemeColor: 'Theme Color', // 主题颜色
    RouteLabels: 'Route Labels', // 启用路由标签
    FixedTopNavigation: 'Fixed Top Navigation', // 固定顶部导航
    DisplayLogo: 'Display Logo', // 显示侧边LOGO
    Resize: 'Font Size', // 调整字体大小
    Search: 'Search', // 搜索
    SizeDefault: 'Default', // 默认
    SizeMedium: 'Medium', // 中等
    SizeSmall: 'Small', // 小号
    SizeMini: 'Mini' // 超小号
  },
  Msg: {
    InputName: 'Please enter your username', // 请输入用户名
    InputPassword: 'Please enter your password' // 请输入密码
  },
  // 表单验证
  Form: {
    NotNull: 'It cannot be a null value' // 不能为空
  },
  Placeholder: {
    Enter: 'Please enter', // 请输入
    Select: 'Please select' // 请选择
  },
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
  // 通用文本
  PublicText: {
    CheckLoadiing: 'Checking...', // 检查中...
    ImportLoadiing: 'Importing...', // 导入中...
    MesApiUpload: 'Not Updated', // 未更新
    MesApiPush: 'Not Pushed', // 未推送
    TextError: 'Error' // 错误
  },
  // 通用按钮
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
  },
  // 通用
  TablePage: {
    // 按钮
    BtnAppend: 'Append', // 添加
    BtnDelete: 'Delete', // 删除
    BtnImport: 'Import', // 导入
    BtnExport: 'Export', // 导出
    BtnClose: 'Close', // 关闭
    BtnModify: 'Modify', // 确认修改
    BtnAppendContinue: 'Append And Continue', // 添加并继续
    BtnRefreshTable: 'Refresh Table', // 刷新表格
    BtnViewInstruction: 'View Instruction', // 查看说明
    BtnAppendData: 'Append Data', // 追加数据
    BtnReplaceData: 'Replace Data', // 替换数据
    BtnUploadFile: 'Upload File', // 上传文件
    BtnConfirmImport: 'Confirm Import', // 确认导入
    BtnConfirmExport: 'Confirm Export', // 确认导出
    BtnConfirmDelete: 'Comfirm Delete', // 确认删除
    BtnUndelete: 'Undelete', // 取消删除
    // 标题
    TitleAppendData: 'Append Data', // 添加数据
    TitleModifyData: 'Modify Data', // 修改数据
    TitleFormDescription: 'Description of The Form', // 表格说明
    TitleImportData: 'Import Data', // 导入数据
    TitleExportData: 'Export Data', // 导出数据
    TitleOperate: 'Operate', // 操作
    // 提示信息
    TitleTip: 'Tip', // 提示
    MsgIllustrate: 'Various notes on the form are written here.', // 关于表格的各种说明写在这
    MsgExportType: 'File format to export:', // 要导出的文件格式：
    MsgAppendSuccess: 'The data was added successfully', // 数据添加成功
    MsgAppendError: 'Submission failed, please fill in the data as required!', // 提交失败，请按照要求填写数据！
    MsgSelectWarn: 'Please select at least one piece of data', // 请至少选中一条数据
    MsgDeleteMultiDataWarn1: 'Please select at least one piece of data ', // 确定要删除选中的
    MsgDeleteMultiDataWarn2: ' pieces of data?', // 条数据？
    MsgDeleteMultiDataWarn3: 'The selected ', // 成功删除选中的
    MsgDeleteMultiDataWarn4: ' pieces of data were deleted', // 条数据
    MsgModifyInfo: 'The data is not modified, does not need to be submitted', // 数据未修改，无需提交
    MsgModifySuccess: 'The data was modified', // 数据已修改
    MsgModifyError: 'Submission failed, please fill in the data as required!', // 提交失败，请按照要求填写数据！
    MsgModifyCloseWarn: 'Data is not committed, are you sure to close the window?', // 数据未提交，确定要关闭窗口？
    MsgDeleteWarn: 'Are you sure you want to delete that data?', // 确定要删除该数据？
    MsgDeleteSuccess: 'The data has been deleted', // 该数据已删除
    MsgImportReplace: 'This will erase all the original content, Are you sure you want to replace it?', // 此操作将会清空所有原有内容, 确定要进行替换操作？
    MsgUnimport: 'Unimport', // 取消导入
    MsgImportData1: 'A total of ', // 本次共导入了
    MsgImportData2: ' pieces of data were imported', // 条数据
    MsgExportSuccess: 'Export Successful', // 导出成功
    MsgExportData1: 'A total of ', // 本次共导出了
    MsgExportData2: ' pieces of data were exported' // 条数据
  },
  PackHoliday: {
    pack_line: 'Pack Line', // 包装线
    holiday_begin: 'Holiday Begin', // 放假开始时间
    holiday_end: 'Holiday End' // 放假结束时间
  }
}
