export default {
  FileKeyWord: {
    MainWord: 'MainBoard', // 主板
    SmallWord: 'SmallBoard', // 小板
    DulySchedule: 'Duly', // 正排
    PrepSchedule: 'Prep', // 预排
    Holiday: 'Holiday' // 放假
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
    LangSwitchSuccess: 'The language switch is successful', // 语言切换成功
    SwitchLanguageTip: 'The schedule is being calculated or analyzed, and the language cannot be switched', // 正在计算或分析排程，无法切换语言
    ConfirmSwitchLanguage: 'Are you sure you want to switch languages?', // 语言切换成功
    DownloadSuccess: 'Download successfully', // 下载成功
    DownloadFail: 'Download failed', // 下载失败
    BeginDownload: 'Begin Download', // 开始下载
    DownloadError: 'Download Request Error', // 下载请求出错
    RefreshPage: 'Refresh Page', // 刷新页面
    CloseThisTag: 'Close This Tag', // 关闭当前标签
    CloseOtherTag: 'Close Other Tag', // 关闭其他标签
    CloseAllTag: 'Close All Tag' // 关闭所有标签
  },
  // 表单验证
  Form: {
    NotNull: 'It cannot be a null value', // 不能为空
    PleaseSelect: 'Please select', // 请选择
    UserNameLength: 'Username length must be between 5 and 20 characters', // 用户名长度必须为 5 到 20 个字符
    PasswordLength: 'Password length must be between 8 and 20 characters', // 密码长度必须为 8 到 20 个字符
    EmailFormatError: 'Email format is incorrect', // 邮箱格式不正确
    InputPwdTwice: 'Please enter your password again' // 请再次输入密码
  },
  // 请输入
  Placeholder: {
    Enter: 'Please enter', // 请输入
    Select: 'Please select', // 请选择
    PleInput012: 'Please enter 0 or 1 or 2', // 请输入0或1或2
    No0Yes1: 'Enter 0 for no and 1 for yes' // 输入0表示否,1表示是
  },
  // 通用文本
  PublicText: {
    CheckLoadiing: 'Checking...', // 检查中...
    ImportLoadiing: 'Importing...', // 导入中...
    ExportLoadiing: 'Exporting...', // 导出中...
    SyncLoadiing: 'Synchronizing...', // 同步中...
    MesApiNotUpdate: 'Not Updated', // 未更新
    MesApiUpdate: 'Updated', // 已更新
    MesApiUpdating: 'Updating...', // 更新中...
    MesApiPushing: 'Pushing...', // 推送中...
    MesApiPushed: 'Pushed', // 已推送
    MesApiPushError: 'Pushed', // 推送失败
    MesApiPushSuccess: 'Pushing...', // 推送成功
    UpdateSuccess: 'Update Successfully', // 更新成功
    UpdateError: 'Update Error', // 更新出错
    MesApiPush: 'Not Pushed', // 未推送
    TextError: 'Error', // 错误
    TextWarn: 'Warn', // 警告
    TextCancel: 'Canceled', // 已取消
    TitleTip: 'Tip', // 提示
    Feasible: 'Feasible', // 是否可行解
    LineBalanceValue: 'Balance', // 包装线平衡
    IdleValue: 'Idle', // 停顿
    OverdueValue: 'Overdue', // 逾期
    ResultValue: 'Result Value', // 目标值
    ThreeDayPoints: 'Three Days Points', // 三天总点数
    To: 'to', // 至
    InitialFailed: '', // 初始化数据出错
    DeleteFailed: 'Delete failed', // 删除失败
    ModifySuccess: 'Modify Successfully', // 修改成功
    BtnDeleteHisLog: 'Delete History Log', // 删除历史日志
    Enabled: 'Enabled', // 已启用
    NotEnabled: 'Not enabled', // 未启用
    Yes: 'Yes', // 是
    No: 'No' // 否
  },
  // 通用按钮
  PublicBtn: {
    Confirm: 'Confirm', // 确定
    Close: 'Close', // 关闭
    Append: 'Append', // 添加
    Delete: 'Delete', // 删除
    Modify: 'Modify', // 修改
    Import: 'Import', // 导入
    Export: 'Export', // 导出
    Run: 'Run', // 运行
    Backup: 'Backup', // 备份
    Api: 'API', // 接口
    Other: 'Other', // 其他
    Cancel: 'Cancel', // 取消
    Open: 'Open', // 开启
    Refresh: 'Refresh', // 刷新
    BtnGet: 'Get', // 获取
    ConfirmDelete: 'Confirm Delete', // 确认删除
    ConfirmModify: 'Confirm Modify', // 确认修改
    ConfirmCreate: 'Confirm Create', // 确认创建
    Search: 'Search', // 搜索
    Crrate: 'Create' // 创建
  },
  route: { // 路由
    // 首页
    Dashboard: 'Dashboard', // 首页（一级菜单）
    // 控制面板
    Control: 'Control Panel', // 控制面板（一级菜单）
    SchedulePanel: 'Calculate Panel', // 计算排程面板
    ParamsConfig: 'Params Configuration', // 排程配置
    AnalysisControl: 'Analyse Panel', // 分析排程面板
    // 每日配置
    DayConfig: 'Daily Configuration', // 每日配置（一级菜单）
    BlockTimeData: 'Date Maintenance', // 维护时间表
    ProcessAiHoliday: 'AI day-off Maintenance', // AI放假维护表
    PackagingLineHoliday: 'FA Line Advance Maintenance', // 包装线提前天数表
    PackHoliday: 'FA Line day-off Maintenance', // 包装线放假表
    ProgramData: 'Program Data', // 程序表
    ProductionReportData: 'Production Report', // 生产报表
    NoProgramData: 'No Program Data', // 无程序清单表
    NetworkBoard: 'Screen Board Data', // 网板信息表
    TestProgramData: 'Test Program Data', // 试跑程序表
    ProductProgramData: 'Mass Production Program', // 量产程序表
    // 长期配置
    LongConfig: 'Long Configuration', // 长期配置（一级菜单）
    MP1AddLineData: 'MP1 Line Filing Data', // MP1补线表
    NotMP1AddLineData: 'Non-MP1 Line Filing Data', // 非MP1补线表
    ExchangeLineData: 'Exchange Line Data', // 交换线别表
    LineData: 'Line Configuration', // 产线配置表
    CapacityChangeData: 'Capacity Change Data', // 产能变化表
    OptimizedMachineData: 'Optimized Model Data', // 优化机种表
    ProcessData: 'MainBoard Process Config', // 主板制程配置表
    SmallProcessData: 'SmallBoard Process Config', // 小板制程配置表
    KeyBoardLineData: 'KeyBoard Data', // 按键板表
    EarlyDueDateBoard8: 'Board Early Delivery Data', // 板号提早交期表
    ChangeLineData: 'Change Line Data', // 线体变化表
    PairedSMTMachineData: 'Related Board Data', // 配套板表
    KeyBoardSpecialModel: 'Model Data No Need AI', // 无需打板机种表
    BoardAdvanceDate: 'Board Advance Date', // 后工序提早交期表
    ProcessSequenceMap: 'Process Sequence Map', // 先后加工循序对照表
    CustomerData: 'Customer Data', // 客户识别表
    DelayPackingLine: 'FA Line Delay Data', // 包装线延后表
    KeyboardMachineName: 'SmallBoard the Same Order', // 小板同订单号上排程表
    // 预测数据
    Predict: 'Predict Data', // 预测数据（一级菜单）
    TrainLEDTData: 'LED Train Data', // LED训练数据
    TrainData: 'Train Data', // 训练数据
    FixedCTData: 'Fixed CT Data', // 车间指定CT表
    TrainDataMap: 'New Line Refer Data', // 新线体预测参考表
    // 系统文件
    FileManage: 'System Files', // 系统文件（一级菜单）
    InputFiles: 'Calculate Input Files', // 计算输入文件
    AnalysisInputFiles: 'Analysis Input Files', // 分析输入文件
    MainOutputFiles: 'MainBoard Output Files', // 主板输出文件
    SmallOutputFiles: 'SmallBoard Output Files', // 小板输出文件
    ABLOutputFiles: 'ABLBoard Output Files', // ABL输出文件
    AnalysisFiles: 'Analyse Output Files', // 分析输出文件
    IdleFiles: 'Idle Detail Files', // Idle明细文件
    AnalyseProgramFiles: 'No Program Files', // 无程序清单文件
    StatisticsFiles: 'Quantized Files', // 量化文件
    ApiStatisticsFiles: 'API Quantized Files', // 接口量化文件
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
  // 首页
  DashboardPage: {
    QuickActions: 'Quick Actions' // 快捷操作
  },
  // 控制面板
  SchedulePanelPage: {
    // 标题
    ScheduleDateTitle: 'Schedule Title', // 排程标题
    TitleScheduleRunTime: 'Running Time', // 排程运行时长
    ScheduleType: 'Type', // 排程类型
    TaskProgress: 'Task Progress', // 任务进度
    ControlPanel: 'Control Center', // 控制中心
    TitleTrainPredictModel: 'Train Predict Model', // 训练预测模型
    TitleRelatedOperate: 'Related Operations', // 排程相关操作
    MainDowload: 'Download MainBoard', // 主板下载
    SmallDowload: 'Download SmallBoard', // 小板下载
    LogDownload: 'Download Log', // 日志下载
    Config: 'Config', // 配置
    TitleDownloadNewMain: 'Download the latest output file', // 下载主板最新排程
    TitleDownloadNewSmall: 'Download the latest output file', // 下载小板最新排程
    TitleDownloadNewLog: 'Download the latest log file', // 下载最新日志
    TitleComputeBoth: 'Calculate MainBoard and SmallBoard', // 计算主板和小板排程
    TitleComputeMain: 'Calculate MainBoard', // 计算主板排程
    TitleComputeSmall: 'Calculate SmallBoard', // 计算小板排程
    TitleComputeABL: 'Calculate ABLBoard', // 计算ABL排程
    ComputeTextStep1: 'Upload File', // 上传排程
    ComputeTextStep2: 'Import File', // 导入排程
    ComputeTextStep3: 'Update File', // 更新信息
    ComputeTextStep4: 'Begin Calculate', // 计算排程
    TextMainUploadName: 'Retrieve Main Upload File', // 获取主板上传文件
    TextSmallUploadName: 'Retrieve Small Upload File', // 获取小板上传文件
    TextChooseHoliday: 'Select one or more holiday dates', // 选择一个或多个包装放假日期
    TextUploadMainFile: 'Please upload MainBoard file', // 请上传主板排程文件
    TextUploadSmallFile: 'Please upload SmallBoard file', // 请上传小板排程文件
    TextUploadABLFile: 'Please upload ABLBoard file', // 请上传ABL排程文件
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
    TextScheduleRunTime5: 'Calculation completed, total time cost:', // 计算完毕，总耗时：
    TextStopCompute1: 'Please enter below, please enter in the input box below', // 请在下方输入框输入
    TextStopCompute2: 'Comfirm Stop', // 确认终止
    TextStopCompute3: 'Then click Confirm to terminate the schedule!', // 后点击确定以终止排程！
    TextStopTabu: 'Are you sure you want to terminate your deep search?', // 确定要终止深度搜索？
    TextNoNeedStopTabu: 'No need to terminate if you are not calculating the schedule!', // 未在计算排程，无需终止！
    TextCurrentTrainDate: 'Current Model Date:', // 当前模型日期：
    TextFileTypeError1: 'The file name format is wrong, please modify it and upload it again!', // 文件命名格式错误，请修改后重新上传！
    TextFailedToGet: 'Failed to get', // 获取失败
    TextGetMainUploadTime: 'Get Main Upload File', // 获取主板上传文件
    TextGetSmallUploadTime: 'Get Small Upload File', // 获取小板上传文件
    TextTrainTip: 'Scheduling is being calculated, and the predictive model cannot be trained!', // 正在计算排程，无法训练预测模型！
    TextModifyHoliday: 'Are you sure you want to modify the holiday date?', // 确定要修改放假日期？
    // 转移扣点
    TextBucklePoints1: 'File not imported, cannot transfer penalty points', // 未导入文件，无法转移扣点
    TextBucklePoints2: 'Are you sure you want to transfer penalty points?', // 确定要进行转移扣点操作？
    TextBucklePoints3: 'Work order progress not updated, are you sure you want to transfer penalty points?', // 未更新工单进度，确定要转移扣点操作？
    TextBucklePoints4: 'Transferring penalty points, please wait...', // 转移扣点中，请稍等...
    TextBucklePoints5: 'Penalty points transferred successfully', // 转移扣点成功
    TextBucklePoints6: 'Penalty points deduction failed', // 扣点失败
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
    TextComputeTip7: 'File not imported, cannot calculate schedule', // 未导入文件，无法计算排程
    TextComputeTip8: 'Schedule calculation has started, please do not click repeatedly', // 已开始计算排程，请勿重复点击
    TextComputeTip9: 'Currently calculating or analyzing schedule, are you sure you want to restart the calculation?', // 目前正在计算排程或分析排程，确定要重新开始计算？
    TextComputeTip10: 'Note: This operation will interrupt the current schedule!', // 注意：此操作将会中断当前的排程！
    TextComputeTip11: 'Failed to start the calculation', // 开始计算失败
    // 接口更新提示
    TextApiUploadTip1: 'The server is calculating the schedule, unable to update information!', // 服务器正在计算排程，无法更新信息！
    TextApiUploadTip2: 'Note: Please update after importing and before starting the calculation', // 注：请在导入之后，开始计算之前更新
    TextApiUploadTip3: 'File not imported, cannot update information', // 未导入文件，无法更新信息
    TextApiUploadTip4: 'Are you sure you want to update?', // 确定要进行更新？
    TextApiUploadTip5: 'Error updating information', // 更新信息出错
    TextApiUploadTip6: 'Are you sure you want to push the quantification results?', // 确定要推送量化结果？
    TextApiUploadTip7: 'Package point time updated successfully!', // 包装点时间更新成功！
    // 导出提示
    TextExportTip1: 'No files are imported, no export is required', // 未导入文件，无需导出
    TextExportTip2: 'Export failed, file does not exist', // 导出失败，文件不存在
    // 按钮
    BtnContinueImport: 'Yes, Continue Import', // 确定，仍要导入
    BtnContinueCompute: 'Yes, Continue Calculate', // 确定，仍要计算
    BtnModifyPackHoliday: 'Modify Packaging Holiday', // 修改包装放假
    BtnTrainPredictModel: 'Train Predict Model', // 训练预测模型
    BtnComputeMain: 'Calculate MainBoard', // 计算主板排程
    BtnComputeSmall: 'Calculate SmallBoard', // 计算小板排程
    BtnComputeABL: 'Calculate ABLBoard', // 计算ABL排程
    BtnComputeBoth: 'Calculate BothBoard', // 计算主板小板
    BtnEndDeepSearch: 'Stop DeepSearch', // 终止深度搜索
    BtnEndCompute: 'Stop Calculate', // 终止计算排程
    BtnPushStatistics: 'Push Stastic', // 推送量化结果
    BtnDownloadMain: 'Schedule File', // 下载主板排程
    BtnDownloadSmall: 'Schedule File', // 下载小板排程
    BtnDownloadIdle: 'Idle Detail File', // 下载idle明细
    BtnDownloadStastic: 'Quantized File', // 下载量化结果
    BtnDownloadNoPro: 'NoProgram File', // 下载无程序表
    BtnDownloadLog: 'Log File', // 下载最新日志
    BtnUploadMain: 'Upload File', // 上传主板排程
    BtnUploadSmall: 'Upload File', // 上传小板排程
    BtnUploadABL: 'Upload File', // 上传ABL排程
    BtnImportFile: 'Import File', // 导入排程
    BtnTransferMain: 'Transfer Main', // 主板转移扣点
    BtnTransferSmall: 'Transfer Small', // 小板转移扣点
    BtnTransfer: 'Transfer Points', // 转移扣点
    BtnExportMain: 'Export File', // 导出主板
    BtnExportSmall: 'Export File', // 导出小板
    BtnExportABL: 'Export File', // 导出ABL
    BtnGetMainUpload: 'Get Main Upload File', // 获取主板上传文件
    BtnGetSmallUpload: 'Get Small Upload File', // 获取小板上传文件
    BtnGetApsProgram: 'Update Program Info', // 更新程序信息
    BtnGetApsMtool: 'Update Stencil Info', // 更新钢网信息
    BtnGetApsMoBaseData: 'Update Material Info', // 更新齐套信息
    BtnGetApsMoProgData: 'Update Ticket Progress', // 更新工单进度
    BtnGetApsDeliveryDay: 'Update Packaging Time', // 更新包装时间
    BtnBeginCompute: 'Begin Calculate' // 开始计算排程
  },
  // 通用
  TablePage: {
    // 按钮
    BtnAppend: 'Append', // 添加
    BtnDelete: 'Delete', // 删除
    BtnDeleteAllData: 'Delete All Data', // 清空所有数据
    BtnImport: 'Import', // 导入
    BtnExport: 'Export', // 导出
    BtnClose: 'Close', // 关闭
    BtnModify: 'Modify', // 修改
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
    MsgExportData2: ' pieces of data were exported', // 条数据
    MsgDeleteDataAllData: 'Are you sure you want to delete all data?' // 确定要清空所有数据？
  },
  // 分析排程页面
  AnalysisControlPage: {
    // 标题
    TitleTip: 'Tip', // 提示信息
    TextCheckData1: 'Data check prompt: Data check has not been performed yet', // 数据检查提示信息：还未进行数据检查
    TitleAnaProgress: 'Analyse Progress', // 分析进度
    ControlPanel: 'Control Center', // 控制中心
    TitleAnaStep1: 'Upload', // 上传文件
    TitleAnaStep2: 'Check File', // 检查文件
    TitleAnaStep3: 'Do Analyse', // 分析排程
    TitleAnaStep4: 'Push to Mes', // 推送排程
    TextUploadFile: 'Please upload file', // 请上传文件
    BtnUploadFile: '1.Upload File', // 1.上传文件
    BtnCheckFile: '2.Check File', // 2.检查文件
    BtnAnaFile: '3.Do Analyze', // 3.分析排程
    BtnAnaPush: '4.Push to Mes', // 4.分析后推送
    BtnDownloadLatestFile: 'Download Analyse Result File', // 下载最新分析结果文件
    BtnGetStaResult: 'Get Quantized Data', // 获取量化结果
    BtnImportPush: 'Import then Push to Mes', // 导入后直接推送
    TextAnaResult: 'Analyse Result', // 分析结果
    FindHistoryAnaRes: 'View Historical Analysis Results', // 查看历史分析结果
    TitlePushSchedule: 'Push Schedule', // 推送排程
    BtnPsuhSMTNot: 'Push SMT Unarranged', // 推送SMT未排
    BtnPushSMTPre: 'Push SMT Prearranged', // 推送SMT预排
    BtnPushSMTNor: 'Push SMT Arranged', // 推送SMT正排
    StatisticsRes1: 'Quantitative Result 1', // 量化结果1，
    TextLine: 'Line', // 线体
    TextPointType: 'Point Type', // 点数类别
    TextPoints: 'Points', // 点数
    StatisticsRes2: 'Quantitative Result 2', // 量化结果2
    TextType: 'Quantification Type', // 量化类型
    TextHours: 'Quantitative Result (Hours)', // 量化结果（小时）
    TextDays: 'Quantitative Result (Days)', // 量化结果（天）
    StatisticsRes3: 'Quantitative Result 3', // 量化结果3
    TextPoints2: 'Value', // 值
    StatisticsRes4: 'Quantitative Result 4', // 量化结果4
    TextTime: 'Line Completion Time', // 线体完工时间
    BtnExportExcel: 'Export to Excel', // 导出Excel
    TextProgress1: 'Preprocessing | Not Started', // 预处理|未开始
    TextProgress2: 'Analysis | Not Started', // 分析|未开始
    TextProgress3: 'Output Table | Not Started', // 输出表格|未开始
    MsgAnalysisTip: 'Analysis Schedule Prompt: Analysis schedule is not completed', // 分析排程提示信息：未完成分析排程
    MsgPushImport1: 'Are you sure you want to import and push schedule directly?', // 确定要直接导入后推送排程
    MsgPushImport2: 'Note: Direct import will not perform analysis of the schedule!', // 注意：直接导入将不会进行分析排程！
    MsgCheckData1: 'Data check failed, are you sure you want to import schedule?', // 数据检查未通过，确定要导入排程？
    MsgImportFailed: 'Import failed', // 导入失败
    MsgCheckData2: 'Data check prompt: Data check has not been performed yet', // 数据检查提示信息：未进行数据检查
    MsgGetSuccess: 'Get successful', // 获取成功
    MsgGetFail: 'Get failed', // 获取失败
    MsgCheckData3: 'Please upload file first', // 请先上传文件
    MsgCheckData4: 'Data check failed, are you sure you want to import schedule?', // 数据检查未通过，确定要导入排程?
    MsgCheckData5: 'Data check failed, are you sure you want to start analyzing schedule?', // 数据检查未通过，确定要开始分析排程?
    MsgDoAnalysis1: 'Currently calculating schedule, are you sure you want to start analysis?', // 目前正在计算排程，确定要开始分析？
    MsgDoAnalysis2: 'Currently analyzing schedule, are you sure you want to start analysis?', // 目前正在分析排程，确定要开始分析？
    MsgDoAnalysis3: 'Note: This operation will affect the current running schedule results!', // 注意：此操作将会影响当前运行的排程结果！
    MsgDoAnalysis4: 'Analysis schedule started, please pay attention to the progress bar', // 开始分析排程，请关注进度条
    MsgDoAnalysis5: 'Analysis schedule is not completed, unable to get quantitative results!', // 未完成分析排程，无法获取量化结果！
    MsgDoAnalysis6: 'Are you sure you want to import and push schedule directly?', // 确定要直接导入后推送排程？
    MsgDoAnalysis7: 'Note: Direct import will not perform analysis of the schedule!', // 注意：直接导入将不会进行分析排程！
    MsgDoAnalysis8: 'Analysis schedule is not completed, unable to push!', // 未完成分析排程，无法进行推送！
    MsgDoAnalysis9: 'Error requesting clear progress bar', // 清空进度条请求出错
    MsgDoAnalysis10: '(Latest analysis result)', // (最新分析结果)
    MsgDoAnalysis11: 'Analysis Time:', // 分析时间：
    MsgStaRes: 'Quantitative Results', // 量化结果
    MsgStaSuccess: 'Quantification Successful', // 量化成功
    MsgCloseSta: 'Confirm to close quantification window?' // 确认关闭量化窗口？
  },
  // 排程配置/排程配置管理
  ParamsConfigPage: {
    MainConfig: 'Main Config', // 主板配置
    SmallConfig: 'Small Config', // 小板配置
    OtherConfig: 'Other Config', // 其它配置
    BtnModifyConfig: 'Modify Config', // 修改配置
    BtnRestoreDefault: 'Restore Default', // 恢复默认
    TipRestoreDefault: 'Restore Default', // 确定要该配置恢复到默认值？
    param_classify: 'Config Classification', // 配置分类
    param_name_front: 'Config Name', // 配置名
    param_value: 'Config Value', // 配置值
    param_description: 'Config Description', // 配置描述
    param_before_value: 'The Last Config Value', // 上一次配置值
    param_default_value: 'Default Config Value', // 配置默认值
    param_default_name: 'Default Config Name', // 默认配置名
    serial_number: 'Display Order', // 显示顺序
    update_user: 'Update User', // 修改人
    update_time: 'Update Time', // 修改时间
    visible_roles: 'Configurable Roles', // 可配置的角色
    UnknownClassify: 'Unknown Classify', // 未知分类
    BtnClearBackup: 'Clear the scheduled backup table ', // 清空排程备份表
    TitleSyncData: 'Synchronize the scheduling configuration of the specified database', // 同步指定数据库的排程配置
    ConfirmSyncDatabase: 'Are you sure you want to synchronize the schedule configuration of the database specified in the schedule configuration table?', // 确定要同步排程配置表中指定数据库的排程配置？
    ConfirmRestoreDefau: 'Are you sure you want the configuration to revert to its default values?', // 确定要该配置恢复到默认值？
    ConfirmClearBackup: 'Are you sure you want to empty your scheduled backup table?', // 确定要清空排程备份表？
    Unknownclassify: 'Unknown Classify' // 未知分类
  },
  // 生产报表
  ProductionReportDataPage: {
    ExportDateRange: 'Export Date Range:', // 导出日期范围：
    SyncDatabase: 'Synchronize production reports for the specified database' // 同步指定数据库的生产报表
  },
  // 量产程序表
  ProductProgramDataPage: {
    UpdateMesData: 'Update Mes Data' // 更新MES程序
  },
  ProcessSequenceMapPage: {
    GeneralJob: 'General Job' // 普通工单
  },
  // 运行日志
  HistoryRunPage: {
    SelectLevel: 'Select LEVEL' // 选择LEVEL
  },
  // 历史操作
  HistoryOperaPage: {
    user_name: 'User name', // 用户名
    table_name: 'Object', // 操作对象
    action_type: 'Operation Type', // 操作类型
    action: 'Operation', // 操作
    action_time: 'Date of operation', // 操作日期
    TextSearchType: 'Search operation type', // 搜索操作类型
    TextSearchUser: 'Search user name', // 搜索用户名
    TextSearchObject: 'Search object', // 搜索操作对象
    TextDeleteMonthAgo: 'Deleting logs from months ago:', // 删除几个月前的日志：
    SelectOneKeyWord: 'Please enter at least one keyword', // 请至少输入一个关键词
    DeleteHisLog1: 'Are you sure you want to delete logs older than ', // 确认要删除
    DeleteHisLog2: ' months?' // 个月前的日志？
  },
  // 接口日志
  MesInterfaceLogPage: {
    name: 'Name', // 接口函数名
    api_name: 'API Name', // 接口名称
    require_time: 'Require Time', // 发送请求的时间
    require_user: 'Require User', // 请求的用户
    post_data: 'Post Data', // 发送的数据
    require_type: 'Require Type', // 请求类型
    receive_data: 'Receive Data', // 接收的数据
    remark: 'Remark', // 备注
    time_consumed: 'Time Consumed', // 耗时（单位：秒）
    ExportPostData: 'Export Post Data', // 导出发送数据
    ExportReceiveData: 'Export Receive Data', // 导出接收数据
    DeleteHisData: 'Delete History Data', // 删除历史数据
    FileDetail: 'File Detail', // 数据详情
    MsgExport1: 'Export failed', // 导出失败
    MsgExport2: 'The interface receives empty data', // 当前接口接收数据为空
    MsgExport3: 'Data parsing errors', // 数据解析错误
    MsgExport4: 'The interface post empty data', // 当前接口发送数据为空
    TextSearchData: 'Search by interface function name or interface name' // 按照接口函数名或接口名称搜索
  },
  // 用户管理
  UserManagePage: {
    username: 'User Name', // 用户名
    password: 'Password', // 密码
    roles: 'Roles', // 用户角色
    remark: 'Remark', // 备注
    enable: 'Enable', // 是否启用
    email: 'email', // 邮箱
    description: 'Description', // 描述
    create_time: 'Create Time', // 创建时间
    last_login_time: 'Last Login Time', // 最后一次登录时间
    CreateUser: 'Create User', // 创建用户
    CreateUserSuccess: 'Create User Successfully', // 创建用户成功
    ModifyPwd: 'Modify Password', // 修改密码
    ViewOrModifyInfo: 'View or Modify Info', // 查看或修改信息
    DeleteUser: 'Delete User', // 删除用户
    NewPwd: 'New Password', // 新的密码
    PleInputNewPwd: 'Please enter new password', // 请输入新的密码
    PleReInputNewPwd: 'Please enter your password again', // 请再次输入密码
    ConfirmPwd: 'Confirm your password', // 确认密码
    TwiceInputError: 'The password entered twice is inconsistent, please re-enter it!', // 两次输入密码不一致，请重新输入！
    ConfirmDeleteUser: 'Confirm Delete User', // 确定要删除该用户？
    PwdVerification: 'The password should be composed of letters, numbers, and symbols, and must be uppercase and lowercase' // 密码应由字母、数字、符号三种组成，且必须包含大小写
  },
  // 角色管理
  RolePermissionPage: {
    role_name: 'Role Name', // 角色名称
    enable_menu_list: 'Enable Pages', // 可访问的页面
    CreateRole: 'Create Role', // 创建角色
    EnableSwitchRoles: 'Modify Enable Switch Roles', // 可切换语言的角色
    DeleteRole: 'Delete Role', // 删除角色
    PleInputRoleName: 'Please input role name', // 请输入角色名称
    PermissionSet: 'Permission Settings', // 权限设置
    PermissionSelect: 'Select Permission', // 选择权限
    AllPermissions: 'All Permissions', // 所有权限
    AutPermissions: 'Authorized Permissions', // 已授权权限
    RevokePermissions: 'Revoke Permissions', // 收回权限
    AddPermissions: 'Add Permissions', // 添加权限
    ConfirmDelRole: 'Are you sure you want to remove the role?' // 确定要删除该角色？
  },
  // 按钮权限管理
  ButtonPermissionPage: {
    SearchRoleName: 'Search role name', // 搜索角色名称
    role_name: 'Role Name', // 角色名称
    menu_name: 'Menu Name', // 菜单名
    enable_button_list: 'Buttons with permissions', // 拥有权限的按钮
    ModifyBtnPer: 'Modify Button Permission', // 修改按钮权限
    ButtonPerSet: 'Button permission settings', // 按钮权限设置
    ConfirmModRole: 'Are you sure you want to modify button permissions?', // 确定要修改按钮权限？
    PleSelectRole: 'Please Select a Role' // 请选择角色
  },
  // 接口配置管理
  InterfaceConfigPage: {
    name: 'API Name', // 接口函数名
    description: 'Description', // 接口描述
    url: 'Address', // 接口相对地址
    remark: 'Remark', // 备注
    request_test_server: 'Request MES formal/test server', // 请求MES的正式服/测试服
    FormalServer: 'Formal Server', // 正式服
    TestServer: 'Test Server' // 测试服
  },
  // 排程功能管理RunControlConfigManage
  FuncManagePage: {
    func_module: 'Function Module', // 功能所属模块
    func_index: 'Display Order', // 显示顺序
    func_des: 'Function Name', // 功能名称
    is_run: 'Enable', // 是否开启
    remark: 'Remark' // 备注
  },
  // 维护时间表
  BlockTimeDataPage: {
    BtnAddMultiData: 'Add Multi Data', // 添加多个维护
    BtnBackupData: 'Backup Data', // 备份数据
    BtnRecoverBackupData: 'Recover Backup Data', // 恢复备份
    BtnManageBackupData: 'Manage Backup Data', // 备份管理
    BtnAddHolidayLines: 'Select Default Holiday Lines', // 选择默认锁定时间的线体
    TitleSyncData: 'Synchronize the maintenance schedule of the specified database', // 同步指定数据库的维护时间表
    TextBackupData1: 'Automatic backup name is the current time', // 自动备份的备份名为当前时间
    TitleBackupData: 'Backup Data', // 备份数据
    TextBackupData2: 'Please enter backup name:', // 请输入备份名称：
    TextBackupData3: 'Please select backup name:', // 请选择备份名称：
    TextBackupData4: '(Note: Restoring backup will overwrite the current table)', // （注意：恢复备份将会覆盖当前表）
    TextBackupName: 'Backup Name', // 备份名称
    OriginalImport: 'Original Import', // 原方式导入
    AutoBackup: 'Auto Backup', // 自动备份
    DateTimeStart: 'Maintenance start time', // 维护开始时间
    DateTimeEnd: 'Maintenance end time', // 维护结束时间
    DateStart: 'Start date', // 开始日期
    DateEnd: 'End date', // 结束日期
    DayTime: 'Day shift early off', // 白班早下班
    NightTime: 'Night shift early off', // 夜班早下班
    MaintainTime: 'Day shift maintenance', // 白班保养
    CustomTime: 'Custom time (Method One)', // 自定义时间(方式一)
    CustomTime2: 'Custom time (Method Two)', // 自定义时间(方式二)
    ConfirmRecovery: 'Confirm Restore', // 确认恢复
    SelectAll: 'Select All', // 全选
    MsgAppendData1: 'Successfully added', // 成功添加
    MsgAppendData2: 'maintenance data entries', // 条维护数据
    MsgDeleteData1: 'Are you sure you want to delete selected', // 确定要删除选中的
    MsgDeleteData2: 'Successfully deleted selected', // 成功删除选中的
    MsgDeleteData3: 'backup(s)?', // 个备份？
    MsgSyncData1: 'Are you sure you want to synchronize maintenance schedule table of specified database in the schedule configuration table?' // 确定要同步排程配置表中指定数据库的维护时间表？
  },
  // 文件管理
  FileDataPage: {
    BtnDeleteFile: 'Delete File', // 删除文件
    BtnDeleteBulkFiles: 'Delete Files in Date Range', // 批量删除文件
    BtnResetFilesList: 'Reset Files List', // 重置文件列表
    file_name: 'File Name', // 文件名
    file_time: 'File Time', // 创建时间
    remark: 'Remark', // 备注
    create_user: 'Create User', // 创建人
    TextDeleteAgoFile: 'Delete files from months ago:', // 删除几个月前的文件：
    TextInputMonth: 'Please enter the number of months', // 请输入月份数
    MsgDeleteFile1: 'Please select at least one file', // 请至少选中一个文件
    MsgDeleteFile2: 'Are you sure you want to delete the selected ', // 确定要删除选中的
    MsgDeleteFile4: ' files', // 个文件
    MsgDeleteFile5: 'Are you sure you want to delete files from ', // 确定要删除
    MsgDeleteFile6: ' months ago?', // 个月前的文件？
    MsgDeleteFile7: 'Successful deletion of 10 files', // 成功删除:
    MsgDeleteFile8: 'Files older than ', // 未查找到:
    MsgDeleteFile9: ' months were not found', // 个月前的文件
    MsgDeleteFile10: 'Are you sure you want to reset the file list?' // 确定要重置文件列表？
  },
  // 产线配置表
  LineDataPage: {
    NotBPRLine: 'Not BPR', // 非BPR线
    IsBPRLine: 'BPR', // BPR线
    SmallBoardLine: 'Small Line', // 小板线
    SmallLine: 'Small Line', // 小工单线
    SmallMiddleLine: 'SmallMiddle Line', // 中小工单线
    MiddleLine: 'Middle Line', // 中工单线
    MiddleBigLine: 'MiddleBig Line', // 中大工单线
    BigLine: 'Big Line', // 大工单线
    UnkonwnLine: 'Unkonwn', // 未知
    MsgAppendData: 'Successfully add 1 piece of data (Note: If necessary, please remember to maintain the MP1 line sheet, non-MP1 line sheet, workshop designated CT table, and sequence comparison table at the same time)' // 成功添加 1 条数据（注：如有需要，请记得同时维护MP1补线表、非MP1补线表、车间指定CT表、先后加工顺序对照表）TODO
  }
}
