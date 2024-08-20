export default {
  FileKeyWord: {
    MainWord: '主板', // 主板
    SmallWord: '小板', // 小板
    DulySchedule: '正排', // 正排
    PrepSchedule: '预排', // 预排
    Holiday: '放假' // 放假
  },
  title: {
    Language: '语言', // 语言
    Login: '登录', // 登录
    SignOut: '退出登录', // 退出登录
    PageStyle: '页面样式设计', // 页面样式设计
    ThemeColor: '主题颜色', // 主题颜色
    RouteLabels: '启用路由标签', // 启用路由标签
    FixedTopNavigation: '固定顶部导航', // 固定顶部导航
    DisplayLogo: '显示侧边LOGO', // 显示侧边LOGO
    Resize: '调整字体大小', // 调整字体大小
    Search: '搜索', // 搜索
    SizeDefault: '默认', // 默认
    SizeMedium: '中等', // 中等
    SizeSmall: '小号', // 小号
    SizeMini: '超小号' // 超小号
  },
  Msg: {
    InputName: '请输入用户名', // 请输入用户名
    InputPassword: '请输入密码', // 请输入密码
    LangSwitchSuccess: '语言切换成功', // 语言切换成功
    SwitchLanguageTip: '正在计算或分析排程，无法切换语言', // 正在计算或分析排程，无法切换语言
    ConfirmSwitchLanguage: '确定要切换语言？', // 语言切换成功
    DownloadSuccess: '下载成功', // 下载成功
    DownloadFail: '下载失败', // 下载失败
    BeginDownload: '开始下载', // 开始下载
    DownloadError: '下载请求出错', // 下载请求出错
    RefreshPage: '刷新页面', // 刷新页面
    CloseThisTag: '关闭当前标签', // 关闭当前标签
    CloseOtherTag: '关闭其他标签', // 关闭其他标签
    CloseAllTag: '关闭所有标签' // 关闭所有标签
  },
  // 表单验证
  Form: {
    NotNull: '不能为空', // 不能为空
    PleaseSelect: '请选择', // 请选择
    UserNameLength: '用户名长度必须为 5 到 20 个字符', // 用户名长度必须为 5 到 20 个字符
    PasswordLength: '密码长度必须为 8 到 20 个字符', // 密码长度必须为 8 到 20 个字符
    EmailFormatError: '邮箱格式不正确', // 邮箱格式不正确
    InputPwdTwice: '请再次输入密码' // 请再次输入密码
  },
  // 请输入
  Placeholder: {
    Enter: '请输入', // 请输入
    Select: '请选择', // 请选择
    PleInput012: '请输入0或1或2', // 请输入0或1或2
    No0Yes1: '输入0表示否,1表示是' // 输入0表示否,1表示是
  },
  // 通用文本
  PublicText: {
    CheckLoadiing: '检查中...', // 检查中...
    ImportLoadiing: '导入中...', // 导入中...
    ExportLoadiing: '导出中...', // 导出中...
    SyncLoadiing: '同步中...', // 同步中...
    MesApiNotUpdate: '未更新', // 未更新
    MesApiUpdate: '已更新', // 已更新
    MesApiUpdating: '更新中...', // 更新中...
    MesApiPushing: '推送中...', // 推送中...
    MesApiPushed: '已推送', // 已推送
    MesApiPushError: '推送失败', // 推送失败
    MesApiPushSuccess: '推送成功', // 推送成功
    UpdateSuccess: '更新成功', // 更新成功
    UpdateError: '更新出错', // 更新出错
    MesApiPush: '未推送', // 未推送
    TextError: '错误', // 错误
    TextWarn: '警告', // 警告
    TextCancel: '已取消', // 已取消
    TitleTip: '提示', // 提示
    Feasible: '是否可行解', // 是否可行解
    LineBalanceValue: '包装线平衡', // 包装线平衡
    IdleValue: '停顿', // 停顿
    OverdueValue: '逾期', // 逾期
    ResultValue: '结果值', // 目标值
    ThreeDayPoints: '三天总点数', // 三天总点数
    To: '至', // 至
    InitialFailed: '初始化数据出错', // 初始化数据出错
    DeleteFailed: '删除失败', // 删除失败
    ModifySuccess: '修改成功', // 修改成功
    BtnDeleteHisLog: '删除历史日志', // 删除历史日志
    Enabled: '已启用', // 已启用
    NotEnabled: '未启用', // 未启用
    Yes: '是', // 是
    No: '否' // 否
  },
  // 通用按钮
  PublicBtn: {
    Confirm: '确定', // 确定
    Close: '关闭', // 关闭
    Append: '添加', // 添加
    Delete: '删除', // 删除
    Modify: '修改', // 修改
    Import: '导入', // 导入
    Export: '导出', // 导出
    Run: '运行', // 运行
    Backup: '备份', // 备份
    Api: '接口', // 接口
    Other: '其他', // 其他
    Cancel: '取消', // 取消
    Open: '开启', // 开启
    Refresh: '刷新', // 刷新
    BtnGet: '获取', // 获取
    ConfirmDelete: '确认删除', // 确认删除
    ConfirmModify: '确认修改', // 确认修改
    ConfirmCreate: '确认创建', // 确认创建
    Search: '搜索', // 搜索
    Crrate: '创建' // 创建
  },
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
    CapacityChangeData: '产能变化表', // 产能变化表
    OptimizedMachineData: '优化机种表', // 优化机种表
    ProcessData: '主板制程配置表', // 主板制程配置表
    SmallProcessData: '小板制程配置表', // 小板制程配置表
    KeyBoardLineData: '按键板表', // 按键板表
    EarlyDueDateBoard8: '板号提早交期表', // 板号提早交期表
    ChangeLineData: '线体变化表', // 线体变化表
    PairedSMTMachineData: '配套板表', // 配套板表
    KeyBoardSpecialModel: '无需打板机种表', // 无需打板机种表
    BoardAdvanceDate: '后工序提早交期表', // 后工序提早交期表
    ProcessSequenceMap: '先后加工循序对照表', // 先后加工循序对照表
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
    MainOutputFiles: '主板输出文件', // 主板输入文件
    SmallOutputFiles: '小板输出文件', // 小板输入文件
    ABLOutputFiles: 'ABL输出文件', // ABL输出文件
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
    InterfaceConfig: '接口配置管理', // MES接口配置管理
    RunControlConfig: '排程功能管理', // 排程功能管理
    // 系统日志
    SystemLog: '系统日志', // 系统日志（一级菜单）
    HistoryRun: '运行日志', // 运行日志
    HistoryOpera: '操作记录', // 操作记录
    ScheduleResData: '排程记录', // 排程记录
    MesInterfaceLog: '接口日志' // 接口日志
  },
  // 首页
  DashboardPage: {
    QuickActions: '快捷操作' // 快捷操作
  },
  // 控制面板
  SchedulePanelPage: {
    // 标题
    ScheduleDateTitle: '排程标题', // 排程标题
    TitleScheduleRunTime: '排程运行时长', // 排程运行时长
    ScheduleType: '类型', // 排程类型
    TaskProgress: '任务进度', // 任务进度
    ControlPanel: '控制中心', // 控制中心
    TitleTrainPredictModel: '训练预测模型', // 训练预测模型
    TitleRelatedOperate: '相关操作', // 排程相关操作
    MainDowload: '下载主板', // 下载主板
    SmallDowload: '下载小板', // 下载小板
    LogDownload: '下载日志', // 下载日志
    Config: '配置', // 配置
    TitleDownloadNewMain: '下载最新主板排程', // 下载最新主板排程
    TitleDownloadNewSmall: '下载最新小板排程', // 下载最新小板排程
    TitleDownloadNewLog: '下载最新日志', // 下载最新日志
    TitleComputeBoth: '计算主板和小板', // 计算主板和小板排程
    TitleComputeMain: '计算主板', // 计算主板排程
    TitleComputeSmall: '计算小板', // 计算小板排程
    TitleComputeABL: '计算ABL', // 计算ABL排程
    ComputeTextStep1: '上传排程文件', // 上传排程
    ComputeTextStep2: '导入排程文件', // 导入排程
    ComputeTextStep3: '更新排程信息', // 更新信息
    ComputeTextStep4: '计算排程', // 计算排程
    TextMainUploadName: '获取主板上传文件', // 获取主板上传文件
    TextSmallUploadName: '获取小板上传文件', // 获取小板上传文件
    TextChooseHoliday: '选择一个或多个包装放假日期', // 选择一个或多个包装放假日期
    TextUploadMainFile: '请上传主板排程文件', // 请上传主板排程文件
    TextUploadSmallFile: '请上传主板排程文件', // 请上传小板排程文件
    TextUploadABLFile: '请上传ABL排程文件', // 请上传ABL排程文件
    TextRefreshUploadTime: '刷新文件上传时间', // 刷新文件上传时间
    // 提示
    TextChooseTrainDate: '选择预测模型日期', // 选择预测模型日期
    Progress1: '未开始训练预测模型|0%', // 未开始训练预测模型|0%
    Progress2: '未开始|0%', // 未开始|0%
    Progress3: '未开始初始解|0%', // 未开始初始解|0%
    Progress4: '未开始深度搜索|0%', // 未开始深度搜索|0%
    TextScheduleRunTime1: '未开始', // 未开始
    TextScheduleRunTime2: '计算排程出错', // 计算排程出错
    TextScheduleRunTime3: '计算中：', // 计算中：
    TextScheduleRunTime4: '计算排程出错，耗时：', // 计算排程出错，耗时：
    TextScheduleRunTime5: '计算完毕，总耗时：', // 计算完毕，总耗时：
    TextStopCompute1: '请在下方输入框输入', // 请在下方输入框输入
    TextStopCompute2: '确定终止', // 确定终止
    TextStopCompute3: '后点击确定以终止排程！', // 后点击确定以终止排程！
    TextStopTabu: '确定要终止深度搜索？', // 确定要终止深度搜索？
    TextNoNeedStopTabu: '未在计算排程，无需终止！', // 未在计算排程，无需终止！
    TextCurrentTrainDate: '当前模型日期：', // 当前模型日期：
    TextFileTypeError1: '文件命名格式错误，请修改后重新上传！', // 文件命名格式错误，请修改后重新上传！
    TextFailedToGet: '获取失败', // 获取失败
    TextGetMainUploadTime: '获取主板上传文件', // 获取主板上传文件
    TextGetSmallUploadTime: '获取小板上传文件', // 获取小板上传文件
    TextTrainTip: '正在计算排程，无法训练预测模型！', // 正在计算排程，无法训练预测模型！
    TextModifyHoliday: '确定要修改放假日期？', // 确定要修改放假日期？
    // 转移扣点
    TextBucklePoints1: '未导入文件，无法转移扣点', // 未导入文件，无法转移扣点
    TextBucklePoints2: '确定要进行转移扣点操作？', // 确定要进行转移扣点操作？
    TextBucklePoints3: '未更新工单进度，确定要转移扣点操作？', // 未更新工单进度，确定要转移扣点操作？
    TextBucklePoints4: '转移扣点中，请稍等...', // 转移扣点中，请稍等...
    TextBucklePoints5: '转移扣点成功', // 转移扣点成功
    TextBucklePoints6: '扣点失败', // 扣点失败
    // 检查
    TextCheckResult: '检查结果', // 检查结果
    TextCheckError: '检查出现异常', // 检查出现异常
    // 计算排程提示
    TextComputeTip1: '未上传排程文件，无法导入', // 未上传排程文件，无法导入
    TextComputeTip2: '注意：此操作将会影响当前运行的排程结果！', // 注意：此操作将会影响当前运行的排程结果！
    TextComputeTip3: '目前正在计算排程，确定要继续导入？', // 目前正在计算排程，确定要继续导入？
    TextComputeTip4: '目前正在分析排程，确定要继续导入？', // 目前正在分析排程，确定要继续导入？
    TextComputeTip5: '目前正在计算排程或分析排程，确定要继续导入？', // 目前正在计算排程或分析排程，确定要继续导入？
    TextComputeTip6: '主板和小板的排程文件未全部上传，无法导入', // 主板和小板的排程文件未全部上传，无法导入
    TextComputeTip7: '未导入文件，无法计算排程', // 未导入文件，无法计算排程
    TextComputeTip8: '已开始计算排程，请勿重复点击', // 已开始计算排程，请勿重复点击
    TextComputeTip9: '目前正在计算排程或分析排程，确定要重新开始计算？', // 目前正在计算排程或分析排程，确定要重新开始计算？
    TextComputeTip10: '注意：此操作将会中断当前的排程！', // 注意：此操作将会中断当前的排程！
    TextComputeTip11: '开始计算失败', // 开始计算失败
    // 接口更新提示
    TextApiUploadTip1: '服务器正在计算排程，无法更新信息！', // 服务器正在计算排程，无法更新信息！
    TextApiUploadTip2: '注：请在导入之后，开始计算之前更新', // 注：请在导入之后，开始计算之前更新
    TextApiUploadTip3: '未导入文件，无法更新信息', // 未导入文件，无法更新信息
    TextApiUploadTip4: '确定要进行更新？', // 确定要进行更新？
    TextApiUploadTip5: '更新信息出错', // 更新信息出错
    TextApiUploadTip6: '确定要推送量化结果？', // 确定要推送量化结果？
    TextApiUploadTip7: '包装点时间更新成功！', // 包装点时间更新成功！
    // 导出提示
    TextExportTip1: '未导入文件，无需导出', // 未导入文件，无需导出
    TextExportTip2: '导出失败，文件不存在', // 导出失败，文件不存在
    // 按钮
    BtnContinueImport: '确定，仍要导入', // 确定，仍要导入
    BtnContinueCompute: '确定，仍要计算', // 确定，仍要计算
    BtnModifyPackHoliday: '修改包装放假', // 修改包装放假
    BtnTrainPredictModel: '训练预测模型', // 训练预测模型
    BtnComputeMain: '计算主板排程', // 计算主板排程
    BtnComputeSmall: '计算小板排程', // 计算小板排程
    BtnComputeABL: '计算ABL排程', // 计算ABL排程
    BtnComputeBoth: '计算主板小板', // 计算主板小板
    BtnEndDeepSearch: '终止深度搜索', // 终止深度搜索
    BtnEndCompute: '终止计算排程', // 终止计算排程
    BtnPushStatistics: '推送量化结果', // 推送量化结果
    BtnDownloadMain: '下载主板排程', // 下载主板排程
    BtnDownloadSmall: '下载小板排程', // 下载小板排程
    BtnDownloadIdle: '下载idle明细', // 下载idle明细
    BtnDownloadStastic: '下载量化结果', // 下载量化结果
    BtnDownloadNoPro: '下载无程序表', // 下载无程序表
    BtnDownloadLog: '下载最新日志', // 下载最新日志
    BtnUploadMain: '上传主板排程', // 上传主板排程
    BtnUploadSmall: '上传小板排程', // 上传小板排程
    BtnUploadABL: '上传ABL排程', // 上传ABL排程
    BtnImportFile: '导入排程', // 导入排程
    BtnTransferMain: '主板转移扣点', // 主板转移扣点
    BtnTransferSmall: '小板转移扣点', // 小板转移扣点
    BtnTransfer: '转移扣点', // 转移
    BtnExportMain: '导出主板', // 导出主板
    BtnExportSmall: '导出小板', // 导出小板
    BtnExportABL: '导出ABL', // 导出ABL
    BtnGetMainUpload: '获取主板上传文件', // 获取主板上传文件
    BtnGetSmallUpload: '获取小板上传文件', // 获取小板上传文件
    BtnGetApsProgram: '更新程序信息', // 更新程序信息
    BtnGetApsMtool: '更新钢网信息', // 更新钢网信息
    BtnGetApsMoBaseData: '更新齐套信息', // 更新齐套信息
    BtnGetApsMoProgData: '更新工单进度', // 更新工单进度
    BtnGetApsDeliveryDay: '更新包装时间', // 更新包装时间
    BtnBeginCompute: '开始计算排程' // 开始计算排程
  },
  // 通用
  TablePage: {
    // 按钮
    BtnAppend: '添加', // 添加
    BtnDelete: '删除', // 删除
    BtnDeleteAllData: '清空所有数据', // 清空所有数据
    BtnImport: '导入', // 导入
    BtnExport: '导出', // 导出
    BtnClose: '关闭', // 关闭
    BtnModify: '修改', // 修改
    BtnAppendContinue: '添加并继续', // 添加并继续
    BtnRefreshTable: '刷新表格', // 刷新表格
    BtnViewInstruction: '查看说明', // 查看说明
    BtnAppendData: '追加数据', // 追加数据
    BtnReplaceData: '替换数据', // 替换数据
    BtnUploadFile: '上传文件', // 上传文件
    BtnConfirmImport: '确认导入', // 确认导入
    BtnConfirmExport: '确认导出', // 确认导出
    BtnConfirmDelete: '确认删除', // 确认删除
    // 标题
    TitleAppendData: '添加数据', // 添加数据
    TitleModifyData: '修改数据', // 修改数据
    TitleFormDescription: '表格说明', // 表格说明
    TitleImportData: '导入数据', // 导入数据
    TitleExportData: '导出数据', // 导出数据
    TitleOperate: '操作', // 操作
    // 提示信息
    TitleTip: '提示', // 提示
    MsgIllustrate: '关于表格的各种说明写在这', // 关于表格的各种说明写在这
    MsgExportType: '要导出的文件格式：', // 要导出的文件格式：
    MsgAppendSuccess: '数据添加成功', // 数据添加成功
    MsgAppendError: '提交失败，请按照要求填写数据！', // 提交失败，请按照要求填写数据！
    MsgSelectWarn: '请至少选中一条数据', // 请至少选中一条数据
    MsgDeleteMultiDataWarn1: '确定要删除选中的', // 确定要删除选中的
    MsgDeleteMultiDataWarn2: ' 条数据？', // 条数据？
    MsgDeleteMultiDataWarn3: '成功删除选中的', // 成功删除选中的
    MsgDeleteMultiDataWarn4: ' 条数据', // 条数据
    MsgModifyInfo: '数据未修改，无需提交', // 数据未修改，无需提交
    MsgModifySuccess: '数据已修改', // 数据已修改
    MsgModifyError: '提交失败，请按照要求填写数据！', // 提交失败，请按照要求填写数据！
    MsgModifyCloseWarn: '数据未提交，确定要关闭窗口？', // 数据未提交，确定要关闭窗口？
    MsgDeleteWarn: '确定要删除该数据？', // 确定要删除该数据？
    MsgDeleteSuccess: '该数据已删除', // 该数据已删除
    MsgImportReplace: '此操作将会清空所有原有内容, 确定要进行替换操作？', // 此操作将会清空所有原有内容, 确定要进行替换操作？
    MsgUnimport: '取消导入', // 取消导入
    MsgImportData1: '本次共导入了', // 本次共导入了
    MsgImportData2: ' 条数据', // 条数据
    MsgExportSuccess: '导出成功', // 导出成功
    MsgExportData1: '本次共导出了', // 本次共导出了
    MsgExportData2: ' 条数据', // 条数据
    MsgDeleteDataAllData: '确定要清空所有数据？' // 确定要清空所有数据？
  },
  // 分析排程页面
  AnalysisControlPage: {
    // 标题
    TitleTip: '提示', // 提示信息
    TextCheckData1: '还未进行数据检查', // 数据检查提示信息：还未进行数据检查
    TitleAnaProgress: '分析进度', // 分析进度
    ControlPanel: '控制中心', // 控制中心
    TitleAnaStep1: '上传文件', // 上传文件
    TitleAnaStep2: '检查文件', // 检查文件
    TitleAnaStep3: '分析排程', // 分析排程
    TitleAnaStep4: '推送排程', // 推送排程
    TextUploadFile: '请上传文件', // 请上传文件
    BtnUploadFile: '1.上传文件', // 1.上传文件
    BtnCheckFile: '2.检查文件', // 2.检查文件
    BtnAnaFile: '3.分析排程', // 3.分析排程
    BtnAnaPush: '4.分析后推送', // 4.分析后推送
    BtnDownloadLatestFile: '下载最新分析结果文件', // 下载最新分析结果文件
    BtnGetStaResult: '获取量化结果', // 获取量化结果
    BtnImportPush: '导入后直接推送', // 导入后直接推送
    TextAnaResult: '分析结果', // 分析结果
    FindHistoryAnaRes: '查看历史分析结果', // 查看历史分析结果
    TitlePushSchedule: '推送排程', // 推送排程
    BtnPsuhSMTNot: '推送SMT未排', // 推送SMT未排
    BtnPushSMTPre: '推送SMT预排', // 推送SMT预排
    BtnPushSMTNor: '推送SMT正排', // 推送SMT正排
    StatisticsRes1: '量化结果1', // 量化结果1，
    TextLine: '线体', // 线体
    TextPointType: '点数类别', // 点数类别
    TextPoints: '点数', // 点数
    StatisticsRes2: '量化结果2', // 量化结果2
    TextType: '量化类型', // 量化类型
    TextHours: '量化结果（小时）', // 量化结果（小时）
    TextDays: '量化结果（天）', // 量化结果（天）
    StatisticsRes3: '量化结果3', // 量化结果3
    TextPoints2: '值', // 值
    StatisticsRes4: '量化结果4', // 量化结果4
    TextTime: '线体完工时间', // 线体完工时间
    BtnExportExcel: '导出Excel', // 导出Excel
    TextProgress1: '预处理|未开始', // 预处理|未开始
    TextProgress2: '分析|未开始', // 分析|未开始
    TextProgress3: '输出表格|未开始', // 输出表格|未开始
    MsgAnalysisTip: '未完成分析排程', // 分析排程提示信息：未完成分析排程
    MsgPushImport1: '确定要直接导入后推送排程', // 确定要直接导入后推送排程
    MsgPushImport2: '注意：直接导入将不会进行分析排程！', // 注意：直接导入将不会进行分析排程！
    MsgCheckData1: '数据检查未通过，确定要导入排程？', // 数据检查未通过，确定要导入排程？
    MsgImportFailed: '导入失败', // 导入失败
    MsgCheckData2: '数据检查提示信息：未进行数据检查', // 数据检查提示信息：未进行数据检查
    MsgGetSuccess: '获取成功', // 获取成功
    MsgGetFail: '获取失败', // 获取失败
    MsgCheckData3: '请先上传文件', // 请先上传文件
    MsgCheckData4: '数据检查未通过，确定要导入排程?', // 数据检查未通过，确定要导入排程?
    MsgCheckData5: '数据检查未通过，确定要开始分析排程?', // 数据检查未通过，确定要开始分析排程?
    MsgDoAnalysis1: '目前正在计算排程，确定要开始分析？', // 目前正在计算排程，确定要开始分析？
    MsgDoAnalysis2: '目前正在分析排程，确定要开始分析？', // 目前正在分析排程，确定要开始分析？
    MsgDoAnalysis3: '注意：此操作将会影响当前运行的排程结果！', // 注意：此操作将会影响当前运行的排程结果！
    MsgDoAnalysis4: '开始分析排程，请关注进度条', // 开始分析排程，请关注进度条
    MsgDoAnalysis5: '未完成分析排程，无法获取量化结果！', // 未完成分析排程，无法获取量化结果！
    MsgDoAnalysis6: '确定要直接导入后推送排程？', // 确定要直接导入后推送排程？
    MsgDoAnalysis7: '注意：直接导入将不会进行分析排程！', // 注意：直接导入将不会进行分析排程！
    MsgDoAnalysis8: '未完成分析排程，无法进行推送！', // 未完成分析排程，无法进行推送！
    MsgDoAnalysis9: '清空进度条请求出错', // 清空进度条请求出错
    MsgDoAnalysis10: '(最新分析结果)', // (最新分析结果)
    MsgDoAnalysis11: '分析时间：', // 分析时间：
    MsgStaRes: '量化结果', // 量化结果
    MsgStaSuccess: '量化成功', // 量化成功
    MsgCloseSta: '确认关闭量化窗口？' // 确认关闭量化窗口？
  },
  // 排程配置/排程配置管理
  ParamsConfigPage: {
    MainConfig: '主板配置', // 主板配置
    SmallConfig: '小板配置', // 小板配置
    OtherConfig: '其它配置', // 其它配置
    BtnModifyConfig: '修改配置', // 修改配置
    BtnRestoreDefault: '恢复默认', // 恢复默认
    TipRestoreDefault: '确定要该配置恢复到默认值？', // 确定要该配置恢复到默认值？
    param_classify: '配置分类', // 配置分类
    param_name_front: '配置名', // 配置名
    param_value: '配置值', // 配置值
    param_description: '配置描述', // 配置描述
    param_before_value: '上一次配置值', // 上一次配置值
    param_default_value: '配置默认值', // 配置默认值
    param_default_name: '默认配置名', // 默认配置名
    serial_number: '显示顺序', // 显示顺序
    update_user: '修改人', // 修改人
    update_time: '修改时间', // 修改时间
    visible_roles: '可配置的角色', // 可配置的角色
    UnknownClassify: '未知分类', // 未知分类
    BtnClearBackup: '清空排程备份表', // 清空排程备份表
    TitleSyncData: '同步指定数据库的排程配置', // 同步指定数据库的排程配置
    ConfirmSyncDatabase: '确定要同步排程配置表中指定数据库的排程配置？', // 确定要同步排程配置表中指定数据库的排程配置？
    ConfirmRestoreDefau: '确定要该配置恢复到默认值？', // 确定要该配置恢复到默认值？
    ConfirmClearBackup: '确定要清空排程备份表？', // 确定要清空排程备份表？
    Unknownclassify: '未知分类' // 未知分类
  },
  // 生产报表
  ProductionReportDataPage: {
    ExportDateRange: '导出日期范围:', // 导出日期范围：
    SyncDatabase: '同步指定数据库的生产报表' // 同步指定数据库的生产报表
  },
  // 量产程序表
  ProductProgramDataPage: {
    UpdateMesData: '更新MES程序' // 更新MES程序
  },
  ProcessSequenceMapPage: {
    GeneralJob: '普通工单' // 普通工单
  },
  // 运行日志
  HistoryRunPage: {
    SelectLevel: '选择LEVEL' // 选择LEVEL
  },
  // 历史操作
  HistoryOperaPage: {
    user_name: '用户名', // 用户名
    table_name: '操作对象', // 操作对象
    action_type: '操作类型', // 操作类型
    action: '操作', // 操作
    action_time: '操作日期', // 操作日期
    TextSearchType: '搜索操作类型', // 搜索操作类型
    TextSearchUser: '搜索用户名', // 搜索用户名
    TextSearchObject: '搜索操作对象', // 搜索操作对象
    TextDeleteMonthAgo: '删除几个月前的日志:', // 删除几个月前的日志：
    SelectOneKeyWord: '请至少输入一个关键词', // 请至少输入一个关键词
    DeleteHisLog1: '确认要删除', // 确认要删除
    DeleteHisLog2: '个月前的日志？' // 个月前的日志？
  },
  // 接口日志
  MesInterfaceLogPage: {
    name: '接口函数名', // 接口函数名
    api_name: '接口名称', // 接口名称
    require_time: '发送请求的时间', // 发送请求的时间
    require_user: '请求的用户', // 请求的用户
    post_data: '发送的数据', // 发送的数据
    require_type: '请求类型', // 请求类型
    receive_data: '接收的数据', // 接收的数据
    remark: '备注', // 备注
    time_consumed: '耗时（单位：秒）', // 耗时（单位：秒）
    ExportPostData: '导出发送数据', // 导出发送数据
    ExportReceiveData: '导出接收数据', // 导出接收数据
    DeleteHisData: '删除历史数据', // 删除历史数据
    FileDetail: '数据详情', // 数据详情
    MsgExport1: '导出失败', // 导出失败
    MsgExport2: '当前接口接收数据为空', // 当前接口接收数据为空
    MsgExport3: '数据解析错误', // 数据解析错误
    MsgExport4: '当前接口发送数据为空', // 当前接口发送数据为空
    TextSearchData: '按照接口函数名或接口名称搜索' // 按照接口函数名或接口名称搜索
  },
  // 用户管理
  UserManagePage: {
    username: '用户名', // 用户名
    password: '密码', // 密码
    roles: '用户角色', // 用户角色
    remark: '备注', // 备注
    enable: '是否启用', // 是否启用
    email: '邮箱', // 邮箱
    description: '描述', // 描述
    create_time: '创建时间', // 创建时间
    last_login_time: '最后一次登录时间', // 最后一次登录时间
    CreateUser: '创建用户', // 创建用户
    CreateUserSuccess: '创建用户成功', // 创建用户成功
    ModifyPwd: '修改密码', // 修改密码
    ViewOrModifyInfo: '查看或修改信息', // 查看或修改信息
    DeleteUser: '删除用户', // 删除用户
    NewPwd: '新的密码', // 新的密码
    PleInputNewPwd: '请输入新的密码', // 请输入新的密码
    PleReInputNewPwd: '请再次输入密码', // 请再次输入密码
    ConfirmPwd: '确认密码', // 确认密码
    TwiceInputError: '两次输入密码不一致，请重新输入！', // 两次输入密码不一致，请重新输入！
    ConfirmDeleteUser: '确定要删除该用户？', // 确定要删除该用户？
    PwdVerification: '密码应由字母、数字、符号三种组成，且必须包含大小写' // 密码应由字母、数字、符号三种组成，且必须包含大小写
  },
  // 角色管理
  RolePermissionPage: {
    role_name: '角色名称', // 角色名称
    enable_menu_list: '可访问的页面', // 可访问的页面
    CreateRole: '创建角色', // 创建角色
    EnableSwitchRoles: '调整支持切换语言的角色', // 可切换语言的角色
    DeleteRole: '删除角色', // 删除角色
    PleInputRoleName: '请输入角色名称', // 请输入角色名称
    PermissionSet: '权限设置', // 权限设置
    PermissionSelect: '选择权限', // 选择权限
    AllPermissions: '所有权限', // 所有权限
    AutPermissions: '已授权权限', // 已授权权限
    RevokePermissions: '收回权限', // 收回权限
    AddPermissions: '添加权限', // 添加权限
    ConfirmDelRole: '确定要删除该角色？' // 确定要删除该角色？
  },
  // 按钮权限管理
  ButtonPermissionPage: {
    SearchRoleName: '搜索角色名称', // 搜索角色名称
    role_name: '角色名称', // 角色名称
    menu_name: '菜单名', // 菜单名
    enable_button_list: '拥有权限的按钮', // 拥有权限的按钮
    ModifyBtnPer: '修改按钮权限', // 修改按钮权限
    ButtonPerSet: '按钮权限设置', // 按钮权限设置
    ConfirmModRole: '确定要修改按钮权限？', // 确定要修改按钮权限？
    PleSelectRole: '请选择角色' // 请选择角色
  },
  // 接口配置管理
  InterfaceConfigPage: {
    name: '接口函数名', // 接口函数名
    description: '描述', // 接口描述
    url: '地址', // 接口相对地址
    remark: '备注', // 备注
    request_test_server: '', // 请求MES的正式服/测试服
    FormalServer: '正式服', // 正式服
    TestServer: '测试服' // 测试服
  },
  // 排程功能管理RunControlConfigManage
  FuncManagePage: {
    func_module: '功能所属模块', // 功能所属模块
    func_index: '显示顺序', // 显示顺序
    func_des: '功能名称', // 功能名称
    is_run: '是否开启', // 是否开启
    remark: '备注' // 备注
  },
  // 维护时间表
  BlockTimeDataPage: {
    BtnAddMultiData: '添加多个维护', // 添加多个维护
    BtnBackupData: '备份数据', // 备份数据
    BtnRecoverBackupData: '恢复备份', // 恢复备份
    BtnManageBackupData: '备份管理', // 备份管理
    BtnAddHolidayLines: '选择默认锁定时间的线体', // 选择默认锁定时间的线体
    TitleSyncData: '同步指定数据库的维护时间表', // 同步指定数据库的维护时间表
    TextBackupData1: '自动备份的备份名为当前时间', // 自动备份的备份名为当前时间
    TitleBackupData: '备份数据', // 备份数据
    TextBackupData2: '请输入备份名称：', // 请输入备份名称：
    TextBackupData3: '请选择备份名称：', // 请选择备份名称：
    TextBackupData4: '（注意：恢复备份将会覆盖当前表）', // （注意：恢复备份将会覆盖当前表）
    TextBackupName: '备份名称', // 备份名称
    OriginalImport: '原方式导入', // 原方式导入
    AutoBackup: '自动备份', // 自动备份
    DateTimeStart: '维护开始时间', // 维护开始时间
    DateTimeEnd: '维护结束时间', // 维护结束时间
    DateStart: '开始日期', // 开始日期
    DateEnd: '结束日期', // 结束日期
    DayTime: '白班早下班', // 白班早下班
    NightTime: '夜班早下班', // 夜班早下班
    MaintainTime: '白班保养', // 白班保养
    CustomTime: '自定义时间(方式一)', // 自定义时间(方式一)
    CustomTime2: '自定义时间(方式二)', // 自定义时间(方式二)
    ConfirmRecovery: '确认恢复', // 确认恢复
    SelectAll: '全选', // 全选
    MsgAppendData1: '成功添加', // 成功添加
    MsgAppendData2: '条维护数据', // 条维护数据
    MsgDeleteData1: '确定要删除选中的', // 确定要删除选中的
    MsgDeleteData2: '成功删除选中的', // 成功删除选中的
    MsgDeleteData3: '个备份？', // 个备份？
    MsgSyncData1: '确定要同步排程配置表中指定数据库的维护时间表？' // 确定要同步排程配置表中指定数据库的维护时间表？
  },
  // 文件管理
  FileDataPage: {
    BtnDeleteFile: '删除文件', // 删除文件
    BtnDeleteBulkFiles: '批量删除文件', // 批量删除文件
    BtnResetFilesList: '重置文件列表', // 重置文件列表
    file_name: '文件名', // 文件名
    file_time: '创建时间', // 创建时间
    remark: '备注', // 备注
    create_user: '创建人', // 创建人
    TextDeleteAgoFile: '删除几个月前的文件：', // 删除几个月前的文件：
    TextInputMonth: '请输入月份数', // 请输入月份数
    MsgDeleteFile1: '请至少选中一个文件', // 请至少选中一个文件
    MsgDeleteFile2: '确定要删除选中的', // 确定要删除选中的
    MsgDeleteFile4: ' 个文件', // 个文件
    MsgDeleteFile5: '确定要删除', // 确定要删除
    MsgDeleteFile6: ' 个月前的文件？', // 个月前的文件？
    MsgDeleteFile7: '成功删除10个文件', // 成功删除:
    MsgDeleteFile8: '未查找到', // 未查找到:
    MsgDeleteFile9: ' 个月前的文件', // 个月前的文件
    MsgDeleteFile10: '确定要重置文件列表？' // 确定要重置文件列表？
  },
  // 产线配置表
  LineDataPage: {
    NotBPRLine: '非BPR线', // 非BPR线
    IsBPRLine: 'BPR线', // BPR线
    SmallBoardLine: '小板线', // 小板线
    SmallLine: '小工单线', // 小工单线
    SmallMiddleLine: '中小工单线', // 中小工单线
    MiddleLine: '中工单线', // 中工单线
    MiddleBigLine: '中大工单线', // 中大工单线
    BigLine: '大工单线', // 大工单线
    UnkonwnLine: '未知', // 未知
    MsgAppendData: '成功添加 1 条数据（注：如有需要，请记得同时维护MP1补线表、非MP1补线表、车间指定CT表、先后加工顺序对照表）' // 成功添加 1 条数据（注：如有需要，请记得同时维护MP1补线表、非MP1补线表、车间指定CT表、先后加工顺序对照表）
  }
}
