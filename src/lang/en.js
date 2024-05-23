export default {
  FileKeyWord: {
    MainWord: 'Main Board', // 主板
    SmallWord: 'Small Board', // 小板
    FormalSchedule: 'Formal Schedule', // 正排
    UnFormalSchedule: 'UnFormal Schedule' // 预排
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
    InputPassword: 'Please enter your password', // 请输入密码
    LangSwitchSuccess: 'The language switch is successful' // 语言切换成功
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
    ExportLoadiing: 'Exporting...', // 导出中...
    MesApiNotUpdate: 'Not Updated', // 未更新
    MesApiUpdate: 'Updated', // 已更新
    MesApiUpdating: 'Updating...', // 更新中...
    MesApiPushing: 'Pushing...', // 推送中...
    MesApiPushed: 'Pushed', // 已推送
    MesApiPushError: 'Pushed', // 推送失败
    MesApiPushSuccess: 'Pushing...', // 推送成功
    MesApiPush: 'Not Pushed', // 未推送
    TextError: 'Error', // 错误
    TextWarn: 'Warn', // 警告
    TextCancel: 'Canceled', // 已取消
    TitleTip: 'Tip' // 提示
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
    ScheduleType: 'Type', // 排程类型
    Feasible: 'Feasible', // 是否可行解
    LineBalanceValue: 'Balance', // 包装线平衡
    IdleValue: 'Idle', // 停顿(天)
    OverdueValue: 'Overdue', // 逾期(天)
    ResultValue: 'Result Value', // 目标值
    TaskProgress: 'Task Progress', // 任务进度
    ControlPanel: 'Control Center', // 控制中心
    TitleTrainPredictModel: 'Train Predict Model', // 训练预测模型
    TitleRelatedOperate: 'Related Operations', // 排程相关操作
    MainDowload: 'Download Main', // 主板下载
    SmallDowload: 'Download Small', // 小板下载
    LogDownload: 'Download Log', // 日志下载
    Config: 'Config', // 配置
    TitleDownloadNewMain: 'Download New Main', // 下载主板最新排程
    TitleDownloadNewSmall: 'Download New Small', // 下载小板最新排程
    TitleDownloadNewLog: 'Download New Log', // 下载最新日志
    TitleComputeBoth: 'Compute Main and Small', // 计算主板和小板排程
    TitleComputeMain: 'Compute Main', // 计算主板排程
    TitleComputeSmall: 'Compute Small', // 计算小板排程
    ComputeTextStep1: 'Upload File', // 上传排程
    ComputeTextStep2: 'Import File', // 导入排程
    ComputeTextStep3: 'Update Data', // 更新信息
    ComputeTextStep4: 'Compute Schedule', // 计算排程
    TextMainUploadName: 'Retrieve Main Upload File', // 获取主板上传文件
    TextSmallUploadName: 'Retrieve Small Upload File', // 获取小板上传文件
    TextChooseHoliday: 'Select one or more holiday dates', // 选择一个或多个包装放假日期
    TextUploadMainFile: 'Please Upload Main Schedule File', // 请上传主板排程文件
    TextUploadSmallFile: 'Please Upload Main Schedule File', // 请上传小板排程文件
    TextRefreshUploadTime: 'Refresh File Upload Time', // 刷新文件上传时间
    // 提示
    TextChooseTrainDate: 'Select train date', // 选择预测模型日期
    Progress1: 'Training Prediction Model Not Started | 0%', // 第一个进度条：未开始训练预测模型|0%
    Progress2: 'Not Started | 0%', // 第二个进度条：未开始|0%
    Progress3: 'Initial Solution Not Started | 0%', // 第三个进度条：未开始初始解|0%
    Progress4: 'Deep Search Not Started | 0%', // 第四个进度条：未开始深度搜索|0%
    TextScheduleRunTime1: 'Not Started', // 未开始
    TextScheduleRunTime2: 'Calculation Error', // 计算排程出错
    TextScheduleRunTime3: 'Calculating:', // 计算中：
    TextScheduleRunTime4: 'Calculation Error, Total Time Taken:', // 计算排程出错，耗时：
    TextScheduleRunTime5: 'Calculation Completed, Total Time Taken:', // 计算完毕，总耗时：
    TextStopCompute1: 'Please enter below, please enter in the input box below', // 请在下方输入框输入
    TextStopCompute2: 'Comfirm Stop', // 确认终止
    TextStopCompute3: 'Then click Confirm to terminate the schedule!', // 后点击确定以终止排程！
    TextStopTabu: 'Are you sure you want to terminate your deep search?', // 确定要终止深度搜索？
    TextNoNeedStopTabu: 'No need to terminate if you are not calculating the schedule!', // 未在计算排程，无需终止！
    TextCurrentTrainDate: 'Current Model Date:', // 当前模型日期：
    TextFileTypeError1: 'The file name format is wrong, please modify it and upload it again!', // 文件命名格式错误，请修改后重新上传！
    TextFileTypeError2: '(Example of correct file name: 0901 motherboard pre-arrangement)', // （正确文件名示例：0901主板预排）
    TextFailedToGet: 'Failed to get', // 获取失败
    TextGetMainUploadTime: 'Get Main Upload File', // 获取主板上传文件
    TextGetSmallUploadTime: 'Get Small Upload File', // 获取小板上传文件
    TextTrainTip: 'Scheduling is being calculated, and the predictive model cannot be trained!', // 正在计算排程，无法训练预测模型！
    TextBeginDownload: 'Begin Download', // 开始下载
    TextDownloadFailed: 'Download Failed', // 下载失败
    TextModifyHoliday: '', // 确定要修改放假日期？
    // 转移扣点
    TextBucklePoints1: '', // 未导入文件，无法转移扣点
    TextBucklePoints2: '', // 确定要进行转移扣点操作？
    TextBucklePoints3: '', // 未更新工单进度，确定要转移扣点操作？
    TextBucklePoints4: '', // 转移扣点中，请稍等...
    TextBucklePoints5: '', // 转移扣点成功
    TextBucklePoints6: '', // 扣点失败
    // 检查
    TextCheckResult: 'Check Result', // 检查结果
    TextCheckError: 'There was an abnormality in the inspection', // 检查出现异常
    // 计算排程提示
    TextComputeTip1: 'The schedule file cannot be imported if the schedule file is not uploaded', // 未上传排程文件，无法导入
    TextComputeTip2: 'Note: This will affect the results of the currently running schedule!', // 注意：此操作将会影响当前运行的排程结果！
    TextComputeTip3: 'Currently calculating the schedule and are you sure you want to proceed with the import?', // 目前正在计算排程，确定要继续导入？
    TextComputeTip4: 'Are you currently analyzing the schedule and are you sure you want to proceed with the import?', // 目前正在分析排程，确定要继续导入？
    TextComputeTip5: 'Are you currently calculating or analyzing schedules and are sure you want to proceed with the import?', // 目前正在计算排程或分析排程，确定要继续导入？
    TextComputeTip6: 'The schedule file cannot be imported if the schedule file is not uploaded', // 主板和小板的排程文件未全部上传，无法导入
    TextComputeTip7: '', // 未导入文件，无法计算排程
    TextComputeTip8: '', // 已开始计算排程，请勿重复点击
    TextComputeTip9: '', // 目前正在计算排程或分析排程，确定要重新开始计算？
    TextComputeTip10: '', // 注意：此操作将会中断当前的排程！
    TextComputeTip11: 'Failed to start the calculation', // 开始计算失败
    // 接口更新提示
    TextApiUploadTip1: '', // 服务器正在计算排程，无法更新信息！
    TextApiUploadTip2: '', // 注：请在导入之后，开始计算之前更新
    TextApiUploadTip3: '', // 未导入文件，无法更新信息
    TextApiUploadTip4: 'Are you sure you want to update?', // 确定要进行更新？
    TextApiUploadTip5: '', // 更新信息出错
    TextApiUploadTip6: '', // 确定要推送量化结果？
    TextApiUploadTip7: '', // 包装点时间更新成功！
    // 导出提示
    TextExportTip1: 'No files are imported, no export is required', // 未导入文件，无需导出
    TextExportTip2: '', // 导出失败，文件不存在
    // 按钮
    BtnContinueImport: 'Yes, Continue Import', // 确定，仍要导入
    BtnContinueCompute: 'Yes, Continue Compute', // 确定，仍要计算
    BtnModifyPackHoliday: 'Modify Pack Holiday', // 修改包装放假
    BtnTrainPredictModel: 'Train Predict Model', // 训练预测模型
    BtnComputeMain: 'Compute Main', // 计算主板排程
    BtnComputeSmall: 'Compute Small', // 计算小板排程
    BtnComputeBoth: 'Compute Both', // 计算主板小板
    BtnEndDeepSearch: 'Stop DeepSearch', // 终止深度搜索
    BtnEndCompute: 'Stop Compute', // 终止计算排程
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
  }
}
