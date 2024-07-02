<template>
  <div id="main">
    <el-card class="card-tip">
      <el-alert
        :title="$t('AnalysisControlPage.TitleTip')"
        :type="checkAlertType"
        :closable="false"
        style="margin: 0px;"
      >
        <template slot="title">
          <div id="checkMessage">
            <div>{{ $t('AnalysisControlPage.TextCheckData1') }}</div>
          </div>
        </template>
      </el-alert>
    </el-card>
    <el-card class="card-tip">
      <el-alert
        :title="$t('AnalysisControlPage.TitleTip')"
        :type="analysisAlertType"
        :closable="false"
        style="margin: 0px;"
      >
        <template slot="title">
          <div id="analysisMessage">
            <div>{{ analysisMessage }}</div>
          </div>
        </template>
      </el-alert>
    </el-card>
    <el-row :gutter="10" style="margin-right: 10px;margin-top: 16px;">
      <el-col :span="6">
        <el-card class="card-progress">
          <div slot="header" class="clearfix">
            <span>{{ $t('AnalysisControlPage.TitleAnaProgress') }}</span>
          </div>
          <el-progress
            :text-inside="true"
            :stroke-width="16"
            :percentage="percentage_1"
            :color="progressColor"
            class="layui-progress-bar"
            style="margin-top: 0px;"
            :indeterminate="true"
          />
          <el-alert
            style="color: #303133;"
            :title="progress_text_1"
            type="info"
            center
            :closable="false"
          />
          <el-progress
            :text-inside="true"
            :stroke-width="16"
            :percentage="percentage_2"
            :color="progressColor"
            class="layui-progress-bar"
          />
          <el-alert
            style="color: #303133;"
            :title="progress_text_2"
            type="info"
            center
            :closable="false"
          />
          <el-progress
            :text-inside="true"
            :stroke-width="16"
            :percentage="percentage_3"
            :color="progressColor"
            class="layui-progress-bar"
          />
          <el-alert
            style="color: #303133;"
            :title="progress_text_3"
            type="info"
            center
            :closable="false"
          />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="control">
          <div slot="header" class="clearfix">
            <span>{{ $t('AnalysisControlPage.ControlPanel') }}</span>
          </div>
          <el-row>
            <el-col :span="24">
              <el-steps :active="stepNow" :align-center="false" finish-status="success" simple>
                <el-step :title="$t('AnalysisControlPage.TitleAnaStep1')" />
                <el-step :title="$t('AnalysisControlPage.TitleAnaStep2')" />
                <el-step :title="$t('AnalysisControlPage.TitleAnaStep3')" />
                <el-step :title="$t('AnalysisControlPage.TitleAnaStep4')" />
              </el-steps>
              <div class="box-button">
                <el-row>
                  <el-col :span="24">
                    <div class="control-button">
                      <el-input
                        :value="uploadFileName"
                        :placeholder="$t('AnalysisControlPage.TextUploadFile')"
                      />
                      <el-upload
                        ref="upload"
                        class="upload-demo"
                        action="alert"
                        accept=".xlsx"
                        :show-file-list="false"
                        :auto-upload="false"
                        :file-list="uploadFiles"
                        :on-change="loadExcelFile"
                      >
                        <el-button slot="trigger" type="primary">
                          {{ $t('AnalysisControlPage.BtnUploadFile') }}
                        </el-button>
                      </el-upload>
                      <div>
                        <el-button v-if="buttons.includes('AnalysisControl/doCheckScheduleData')" type="primary" @click="doCheckScheduleData">
                          {{ $t('AnalysisControlPage.BtnCheckFile') }}
                        </el-button>
                        <el-button v-if="buttons.includes('AnalysisControl/analysisSchedule')" type="primary" :disabled="analysisBtnEnable" @click="analysisSchedule">
                          {{ $t('AnalysisControlPage.BtnAnaFile') }}
                        </el-button>
                        <el-button v-if="buttons.includes('AnalysisControl/pushSchedule')" type="apiBtn" @click="pushSchedule">
                          {{ $t('AnalysisControlPage.BtnAnaPush') }}
                        </el-button>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button v-if="buttons.includes('AnalysisControl/download')" type="success" @click="downloadAnaExcel">
                {{ $t('AnalysisControlPage.BtnDownloadLatestFile') }}
              </el-button>
              <el-button v-if="buttons.includes('AnalysisControl/statisticsSchedule')" type="apiBtn" @click="statisticsSchedule">
                {{ $t('AnalysisControlPage.BtnGetStaResult') }}
              </el-button>
              <el-button v-if="buttons.includes('AnalysisControl/pushImportSchedule')" type="apiBtn" @click="pushImportSchedule">
                {{ $t('AnalysisControlPage.BtnImportPush') }}
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="card_result">
          <div slot="header" class="clearfix">
            <span class="ana-res-text">{{ $t('AnalysisControlPage.TextAnaResult') }}</span>
          </div>
          <p style="font-weight:bold;line-height: 90%;">{{ schedule_time }}-{{ schedule_mode }}
            <span style="font-weight:normal;">{{ ana_time }}</span>
          </p>
          <p style="line-height:160%">
            {{ $t('PublicText.Feasible') }}: {{ feasible }}<br>
            {{ $t('PublicText.ResultValue') }}: {{ obj_value }}<br>
            {{ $t('PublicText.OverdueValue') }}: {{ overdue_value }}<br>
            {{ $t('PublicText.IdleValue') }}: {{ idle_value }}<br>
            {{ $t('PublicText.LineBalanceValue') }}: {{ line_balance }}<br>
            {{ $t('PublicText.ThreeDayPoints') }}: {{ three_days_points }}<br>
          </p>
          <div class="ana-history">
            <el-select v-model="selectAnaTime" :placeholder="$t('AnalysisControlPage.TextAnaResult')" style="width: 200px;" size="mini">
              <el-option
                v-for="item in options_history_analysis"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button style="margin-left: 5px;" type="info" size="mini" @click="getHistoryAnaData">
              {{ $t('PublicBtn.BtnGet') }}
            </el-button>
            <el-tooltip class="item" effect="dark" :content="$t('PublicBtn.Refresh')" placement="top">
              <el-button style="margin-left: 5px;" size="mini" @click="getHistoryAnaItem">
                <i class="el-icon-refresh" />
              </el-button>
            </el-tooltip>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      v-el-drag-dialog
      :title="$t('AnalysisControlPage.TitlePushSchedule')"
      :visible.sync="pushDialogVisible"
      width="520px"
      :before-close="handlePushClose"
      @dragDialog="handleDrag"
    >
      <el-row style="text-align: center;">
        <el-col :span="24">
          <el-tooltip class="item" effect="dark" :content="smtUnscheduledTip" placement="top">
            <el-button type="apiBtn" @click="post_unscheduled">
              {{ $t('AnalysisControlPage.BtnPsuhSMTNot') }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="smtPrescheduledTip" placement="top">
            <el-button type="apiBtn" @click="post_pre_scheduled">
              {{ $t('PubAnalysisControlPagelicBtn.BtnPushSMTPre') }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="smtScheduledTip" placement="top">
            <el-button type="apiBtn" @click="post_scheduled">
              {{ $t('AnalysisControlPage.BtnPushSMTNor') }}
            </el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlePushClose">
          {{ $t('PublicBtn.Close') }}
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="statisticsTitle"
      :visible.sync="statisticsDialogVisible"
      width="60%"
      :before-close="handleCloseStatistics"
      class="statistics-dialog"
    >
      <el-tabs>
        <el-tab-pane :label="$t('AnalysisControlPage.StatisticsRes1')">
          <el-table
            id="table1"
            v-loading="loading_table1"
            :data="tableData_1"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            height="460"
            border
          >
            <el-table-column
              prop="line"
              :label="$t('AnalysisControlPage.TextLine')"
            />
            <el-table-column
              prop="points_type"
              :label="$t('AnalysisControlPage.TextPointType')"
            />
            <el-table-column
              prop="points"
              :label="$t('AnalysisControlPage.TextPoints')"
            />
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('AnalysisControlPage.StatisticsRes2')">
          <el-table
            id="table2"
            v-loading="loading_table2"
            :data="tableData_2"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            height="460"
            border
          >
            <el-table-column
              prop="type"
              :label="$t('AnalysisControlPage.TextType')"
            />
            <el-table-column
              prop="hours"
              :label="$t('AnalysisControlPage.TextHours')"
            />
            <el-table-column
              prop="days"
              :label="$t('AnalysisControlPage.TextDays')"
            />
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('AnalysisControlPage.StatisticsRes3')">
          <el-table
            id="table3"
            v-loading="loading_table3"
            :data="tableData_3"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            height="460"
            border
          >
            <el-table-column
              prop="type"
              :label="$t('AnalysisControlPage.TextType')"
            />
            <el-table-column
              prop="points"
              :label="$t('AnalysisControlPage.TextPoints2')"
            />
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('AnalysisControlPage.StatisticsRes4')">
          <el-table
            id="table4"
            v-loading="loading_table4"
            :data="tableData_4"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            height="460"
            border
          >
            <el-table-column
              prop="line"
              :label="$t('AnalysisControlPage.TextLine')"
            />
            <el-table-column
              prop="time"
              :label="$t('AnalysisControlPage.TextTime')"
            />
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseStatistics">
          {{ "$t('PublicBtn.Close')" }}
        </el-button>
        <el-button type="primary" @click="exportStatisticsExcel">
          {{ "$t('AnalysisControlPage.BtnExportExcel')" }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'
import elDragDialog from '@/directive/el-drag-dialog'
import {} from '@/api/Control/AnalysisControl'
import { DoCheckScheduleData, GetHistoryAnaItem, GetHistoryAnaData,
  AnalysisSchedule, GetRunFlag, ClearAnaProgress, GetAnaProgress, StatisticsSchedule
} from '@/api/Control/AnalysisControl'
import { SmtUnscheduled, SmtPrescheduled, SmtScheduled } from '@/api/Control/DockingMes'
import { DoImportPushSchedule } from '@/api/Control/AnalysisControl'
import { DownloadFile } from '@/api/common'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
export default {
  name: 'AnalysisControl',
  directives: { elDragDialog },
  data() {
    return {
      progressColor: '#02bafd', // 进度条颜色
      pushLoading: {
        text: this.$t('PublicText.MesApiPushing'),
        background: 'rgba(0, 0, 0, 0.5)'
      },
      percentage_1: 0,
      percentage_2: 0,
      percentage_3: 0,
      progress_text_1: this.$t('AnalysisControlPage.TextProgress1'),
      progress_text_2: this.$t('AnalysisControlPage.TextProgress2'),
      progress_text_3: this.$t('AnalysisControlPage.TextProgress3'),
      uploadFiles: [], // 上传的文件列表（限制1个）
      uploadFileName: '',
      pushDialogVisible: false, // 推送排程接口
      smtUnscheduledTip: this.$t('PublicText.MesApiPush'),
      smtPrescheduledTip: this.$t('PublicText.MesApiPush'),
      smtScheduledTip: this.$t('PublicText.MesApiPush'),
      aiUnscheduledTip: this.$t('PublicText.MesApiPush'),
      aitPrescheduledTip: this.$t('PublicText.MesApiPush'),
      aitScheduledTip: this.$t('PublicText.MesApiPush'),
      isAnalysis: false,
      schedule_time: '', // 排程时间
      schedule_mode: '', // 正排或预排
      ana_time: '', // 分析排程的时间
      feasible: '', // 是否可行
      obj_value: '', // 目标值
      overdue_value: '', // 逾期
      idle_value: '', // 停顿
      line_balance: '', // 线平衡
      three_days_points: '', // 三天总点数
      options_history_analysis: [], // 历史分析结果
      selectFileName: '', // 选中的历史Excel文件名
      checkAlertType: 'info', // success error warning info
      analysisAlertType: 'info',
      stepNow: 0,
      ana_progress_refresh: null, // 分析排程刷新进度条
      analysisMessage: this.$t('AnalysisControlPage.MsgAnalysisTip'),
      progressCount: 0,
      selectAnaTime: '', // 根据选中的分析时间获取历史分析结果
      tableData_1: [],
      tableData_2: [],
      tableData_3: [],
      tableData_4: [],
      loading_table1: true,
      loading_table2: true,
      loading_table3: true,
      loading_table4: true,
      statisticsTitle: this.$t('AnalysisControlPage.MsgStaRes'),
      statisticsDialogVisible: false, // 量化结果dialog显示
      analysisBtnEnable: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'buttons'
    ])
  },
  created() {
    this.getHistoryAnaItem()
  },
  mounted() {

  },
  methods: {
    handleDrag() {
      // this.$refs.select.blur()
    },
    // 监听进度条
    listenProgress() {
      this.ana_progress_refresh = setInterval(() => { // 每隔2秒监听进度条
        setTimeout(this.getAnaProgress(), 0)
      }, 2000)
    },
    pushImportSchedule() {
      if (this.checkAlertType !== 'success') {
        var confirmText = [this.$t('AnalysisControlPage.MsgDoAnalysis6'), this.$t('AnalysisControlPage.MsgDoAnalysis7')]
        const newDatas = []
        const h = this.$createElement
        for (const i in confirmText) {
          newDatas.push(h('p', null, confirmText[i]))
        }
        this.$confirm(this.$t('PublicText.TitleTip'), {
          title: this.$t('PublicText.TitleTip'),
          message: h('div', null, newDatas),
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          cancelButtonText: this.$t('PublicBtn.Cancel'),
          type: 'warning'
        }).then(() => {
          this.checkPushImportSchedule()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('PublicBtn.MsgUnimport')
          })
        })
      } else {
        this.checkPushImportSchedule()
      }
    },
    checkPushImportSchedule() {
      if (this.checkAlertType !== 'success') {
        this.$confirm(this.$t('AnalysisControlPage.MsgCheckData4'), this.$t('PublicText.TitleTip'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          cancelButtonText: this.$t('PublicBtn.Cancel'),
          type: 'warning'
        }).then(() => {
          this.doImportPsuhSchedule()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('PublicText.TextCancel')
          })
        })
      } else {
        this.doImportPsuhSchedule()
      }
    },
    // 导入后直接推送
    async doImportPsuhSchedule() {
      const form = new FormData()
      form.append('file', this.uploadFile)
      form.append('file_name', this.uploadFileName)
      form.append('user_name', this.name)
      const importLoading = {
        text: this.$t('PublicBtn.ImportLoadiing'),
        background: 'rgba(0, 0, 0, 0.5)'
      }
      this.loadingInstance = Loading.service(importLoading)
      await DoImportPushSchedule(form).then(res => {
        this.loadingInstance.close()
        this.pushDialogVisible = true
        this.$alert(res.message, this.$t('PublicText.TitleTip'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'success'
        })
      }).catch(err => {
        this.loadingInstance.close()
        this.$alert(this.$t('AnalysisControlPage.MsgImportFailed') + err, this.$t('PublicText.TitleTip'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'error'
        })
      })
    },
    // 取消监听进度条
    clearListenProgress() {
      clearInterval(this.ana_progress_refresh)
      this.ana_progress_refresh = null
    },
    // 分析排程进度条
    getAnaProgress() {
      GetAnaProgress().then(res => {
        this.percentage_1 = res.p0
        this.percentage_2 = res.p1
        this.percentage_3 = res.p2
        this.progress_text_1 = res.p0text
        this.progress_text_2 = res.p1text
        this.progress_text_3 = res.p2text
        if (res.p2 >= 25 && this.progressCount === 0) {
          this.progressCount = 1
          // 显示分析排程的结果
          this.showAnaData(res, 0)
        }
        if (res.p2 === 100) {
          setTimeout(() => {
            this.clearListenProgress()
          }, 2000)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 上传文件
    loadExcelFile(file, fileList) {
      const fileName = file.name.replace(/\.xlsx$/, '')
      let regex, TextFileTypeError2
      if (sessionStorage.getItem('lang') === 'zh') {
        regex = /^(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])(主板|小板)(正排|预排).*$/
        TextFileTypeError2 = '（正确文件名示例：0901主板预排）'
      } else {
        regex = /^(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])_(MainBoard|SmallBoard)_(Preliminary|Regular).*$/
        TextFileTypeError2 = '(Example of correct file name: 0901_MainBoard_Regular.xlsx)'
      }
      if (!regex.test(fileName)) {
        const tip = this.$t('SchedulePanelPage.TextFileTypeError1') + `<br/>` + TextFileTypeError2
        this.$alert(tip, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          dangerouslyUseHTMLString: true,
          type: 'error'
        })
        return
      }
      if (fileList.length > 0) {
        this.uploadFiles = fileList = [fileList[fileList.length - 1]] // 选择最后一次选择文件
        this.uploadFileName = this.uploadFiles[0].name // 更新文件名
        this.uploadFile = this.uploadFiles[0].raw // 更新文件
      }
      this.isAnalysis = false // 重置检查分析排程
      this.resetCheckAlertMessage() // 重置上方Alert提示信息
      this.stepNow = 1
    },
    // 显示Alert提示信息
    showCheckAlertMessage(data_list, message_type) {
      if (data_list.length > 0) {
        this.checkAlertType = message_type
        // 删除上一次的提示信息
        const alert_div = document.getElementById('checkMessage')
        while (alert_div.hasChildNodes()) { // 当div下还存在子节点时 循环继续
          alert_div.removeChild(alert_div.firstChild)
        }
        for (var i = 0; i < data_list.length; i++) {
          // 显示提示信息
          const div_text = document.createElement('div')
          div_text.innerHTML = data_list[i]
          alert_div.appendChild(div_text) // 将标签插入到指定标签中
        }
      }
    },
    // 重置Alert提示信息
    resetCheckAlertMessage() {
      this.checkAlertType = 'info'
      const alert_div = document.getElementById('checkMessage')
      while (alert_div.hasChildNodes()) { // 当div下还存在子节点时 循环继续
        alert_div.removeChild(alert_div.firstChild)
      }
      const div_text = document.createElement('div')
      div_text.innerHTML = this.$t('AnalysisControlPage.MsgCheckData2')
      alert_div.appendChild(div_text) // 将标签插入到指定标签中
    },
    showAnalysisAlertMessage(data_list, message_type) {
      if (data_list.length > 0) {
        this.analysisAlertType = message_type
        // 删除上一次的提示信息
        const alert_div = document.getElementById('analysisMessage')
        while (alert_div.hasChildNodes()) { // 当div下还存在子节点时 循环继续
          alert_div.removeChild(alert_div.firstChild)
        }
        for (var i = 0; i < data_list.length; i++) {
          // 显示提示信息
          const div_text = document.createElement('div')
          div_text.innerHTML = data_list[i]
          alert_div.appendChild(div_text) // 将标签插入到指定标签中
        }
      }
    },
    resetAnalysisAlertMessage() {
      this.analysisAlertType = 'info'
      this.analysisMessage = this.$t('AnalysisControlPage.MsgAnalysisTip')
    },
    // 后端数据检查
    async doCheckScheduleData() {
      if (this.uploadFileName === '') {
        this.$message({
          type: 'warning',
          message: this.$t('AnalysisControlPage.MsgCheckData3')
        })
        return
      }
      const checkLoading = {
        text: this.$t('PublicText.CheckLoadiing'),
        background: 'rgba(0, 0, 0, 0.5)'
      }
      this.loadingInstance = Loading.service(checkLoading)
      const form = new FormData()
      form.append('file', this.uploadFile)
      this.stepNow = 2
      await DoCheckScheduleData(form).then(res => {
        if (res.message_type === 'success') {
          this.$alert(res.message, this.$t('SchedulePanelPage.TextCheckResult'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'success'
          })
        } else {
          this.$alert(res.message, this.$t('SchedulePanelPage.TextCheckResult'), {
            customClass: 'checkAlertBox',
            dangerouslyUseHTMLString: true,
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: res.message_type
          })
        }
        this.showCheckAlertMessage(res.data_list, res.message_type)
        this.loadingInstance.close()
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(this.$t('SchedulePanelPage.TextCheckError') + err, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'error'
        })
      })
    },
    // 以下函数都是推送排程相关
    pushSchedule() {
      if (this.isAnalysis === true) {
        this.stepNow = 4
        this.pushDialogVisible = true
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('AnalysisControlPage.MsgDoAnalysis8')
        })
      }
    },
    // 清空分析排程进度条
    clearAnaProgress() {
      ClearAnaProgress().then(res => {
        console.log(res.message)
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: this.$t('AnalysisControlPage.MsgDoAnalysis9')
        })
      })
    },
    // 显示分析排程结果
    showAnaData(res, flag) {
      if (flag === 0) {
        this.ana_time = this.$t('AnalysisControlPage.MsgDoAnalysis10')
      } else {
        let time = this.selectAnaTime
        const time_date = time.substring(0, 10)
        const time_time = time.substring(11).replaceAll('-', ':')
        time = time_date + ' ' + time_time
        this.ana_time = '(' + this.$t('AnalysisControlPage.MsgDoAnalysis11') + time + ')'
      }
      this.schedule_mode = res.new_mode
      this.schedule_time = res.new_time
      this.feasible = res.new_feasible_str
      this.obj_value = res.new_obj_value
      this.overdue_value = res.new_overdue_value
      this.idle_value = res.new_real_idle_value
      this.line_balance = res.new_line_balance_value
      this.three_days_points = res.new_three_days_points
    },
    // 重置分析排程显示信息
    resetShowAnaData() {
      // 清空进度条
      this.percentage_1 = 0
      this.percentage_2 = 0
      this.percentage_3 = 0
      this.progress_text_1 = this.$t('AnalysisControlPage.TextProgress1')
      this.progress_text_2 = this.$t('AnalysisControlPage.TextProgress2')
      this.progress_text_3 = this.$t('AnalysisControlPage.TextProgress3')
      // 清空上一份排程结果
      this.schedule_time = ''
      this.schedule_mode = ''
      this.ana_time = ''
      this.feasible = ''
      this.obj_value = ''
      this.overdue_value = ''
      this.idle_value = ''
      this.line_balance = ''
      this.three_days_points = ''
      // 清空错误提示
      this.analysisMessage = ''
      this.progressCount = 0
    },
    // 获取分析排程历史选择项
    getHistoryAnaItem() {
      this.options_history_analysis = []
      GetHistoryAnaItem().then(res => {
        const data = res.Items
        for (const key in data) {
          const temp = {}
          const first_name = data[key]['first']
          const second_name = data[key]['second']
          temp['value'] = second_name
          temp['label'] = first_name + '-' + second_name
          this.options_history_analysis.push(temp)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取历史分析结果
    getHistoryAnaData() {
      GetHistoryAnaData({ 'time': this.selectAnaTime }).then(res => {
        this.showAnaData(res, 1)
        this.$message({
          type: 'success',
          message: this.$t('AnalysisControlPage.MsgGetSuccess')
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: this.$t('AnalysisControlPage.MsgGetFail')
        })
      })
    },
    analysisSchedule() {
      if (this.uploadFileName === '') {
        this.$message({
          type: 'warning',
          message: this.$t('AnalysisControlPage.MsgCheckData3')
        })
        return
      }
      if (this.checkAlertType !== 'success') {
        this.$confirm(this.$t('AnalysisControlPage.MsgCheckData5'), this.$t('PublicText.TitleTip'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          cancelButtonText: this.$t('PublicBtn.Cancel'),
          type: 'warning'
        }).then(() => {
          this.beforeDoAnalysis()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('PublicText.TextCancel')
          })
        })
      } else {
        this.beforeDoAnalysis()
      }
    },
    beforeDoAnalysis() {
      GetRunFlag().then(res => {
        var confirmText
        if (res.run_flag === 1) {
          confirmText = [this.$t('AnalysisControlPage.MsgDoAnalysis1'), this.$t('AnalysisControlPage.MsgDoAnalysis3')]
        } else if (res.ana_run_flag === 1) {
          confirmText = [this.$t('AnalysisControlPage.MsgDoAnalysis2'), this.$t('AnalysisControlPage.MsgDoAnalysis3')]
        }
        const newDatas = []
        const h = this.$createElement
        for (const i in confirmText) {
          newDatas.push(h('p', null, confirmText[i]))
        }
        if (res.run_flag === 1 || res.ana_run_flag === 1) {
          this.$confirm(this.$t('PublicText.TextWarn'), {
            title: this.$t('PublicText.TextWarn'),
            message: h('div', null, newDatas),
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            cancelButtonText: this.$t('PublicBtn.Cancel'),
            confirmButtonClass: 'btnDanger',
            type: 'warning'
          }).then(() => {
            this.doAnalysis()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('PublicText.TextCancel')
            })
          })
        } else {
          this.doAnalysis()
        }
      })
    },
    async doAnalysis() {
      this.$alert(this.$t('AnalysisControlPage.MsgDoAnalysis4'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        type: 'success'
      })
      this.analysisBtnEnable = true
      this.stepNow = 3
      const form = new FormData()
      form.append('file', this.uploadFile)
      form.append('file_name', this.uploadFileName)
      form.append('user_name', this.name)
      this.clearAnaProgress()
      this.resetShowAnaData()
      this.resetAnalysisAlertMessage()
      this.listenProgress()
      await AnalysisSchedule(form).then(res => {
        this.isAnalysis = true // 分析完成
        this.$alert(res.message, res.message_title, {
          customClass: 'checkAlertBox',
          dangerouslyUseHTMLString: true,
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: res.message_type
        })
        this.showAnalysisAlertMessage(res.msg_data_list, res.message_type)
        this.analysisBtnEnable = false
        if (res.message_type === 'error') {
          this.stepNow = 2
        }
        setTimeout(() => {
          this.clearListenProgress()
        }, 5000)
      }).catch(err => {
        this.stepNow = 2
        this.$alert(err, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'error'
        })
        this.analysisBtnEnable = false
        this.showAnalysisAlertMessage(err, 'error')
        setTimeout(() => {
          this.clearListenProgress()
        }, 5000)
      })
    },
    post_unscheduled() {
      this.loadingInstance = Loading.service(this.pushLoading)
      const form = {
        'user_name': this.name
      }
      SmtUnscheduled(form).then(res => {
        if (res.code === 20000) {
          this.$alert(res.message, this.$t('PublicText.MesApiPushSuccess'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'success'
          })
          this.smtUnscheduledTip = this.$t('PublicText.MesApiPushed')
        } else {
          this.$alert(this.$t('PublicText.MesApiPushError'), this.$t('PublicText.TextError'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'error'
          })
        }
        this.loadingInstance.close() // 清除动画
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(err, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'error'
        })
      })
    },
    post_pre_scheduled() {
      this.loadingInstance = Loading.service(this.pushLoading)
      const form = {
        'user_name': this.name
      }
      SmtPrescheduled(form).then(res => {
        if (res.code === 20000) {
          this.$alert(res.message, this.$t('PublicText.MesApiPushSuccess'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'success'
          })
          this.smtPrescheduledTip = this.$t('PublicText.MesApiPushed')
        } else {
          this.$alert(this.$t('PublicText.MesApiPushError'), this.$t('PublicText.TextError'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'error'
          })
        }
        this.loadingInstance.close() // 清除动画
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(err, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'error'
        })
      })
    },
    post_scheduled() {
      this.loadingInstance = Loading.service(this.pushLoading)
      const form = {
        'user_name': this.name
      }
      SmtScheduled(form).then(res => {
        if (res.code === 20000) {
          this.$alert(res.message, this.$t('PublicText.MesApiPushSuccess'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'success'
          })
          this.smtScheduledTip = this.$t('PublicText.MesApiPushed')
        } else {
          this.$alert(this.$t('PublicText.MesApiPushError'), this.$t('PublicText.TextError'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'error'
          })
        }
        this.loadingInstance.close() // 清除动画
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(err, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'error'
        })
      })
    },
    // 下载表格
    downloadAnaExcel() {
      DownloadFile('analysis_file_path').then(res => {
        this.stepNow = 4
        this.$message({
          type: 'success',
          message: this.$t('Msg.BeginDownload')
        })
        this.downloadFile(res)
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: this.$t('Msg.DownloadError')
        })
      })
    },
    // 从后端下载表格
    downloadFile(res) {
      const link = document.createElement('a')
      const blob = new Blob([res.data])
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      const temp = res.headers['content-disposition'].split('attachment;filename=')[1]
      const file_name = decodeURIComponent(temp)
      link.download = file_name
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(link.href) // 释放URL对象
      document.body.removeChild(link)
    },
    // 量化结果 TODO
    statisticsSchedule() {
      if (this.isAnalysis !== true) {
        this.$message({
          type: 'warning',
          message: this.$t('AnalysisControlPage.MsgDoAnalysis5')
        })
        return
      }
      if (this.uploadFileName !== '') {
        this.statisticsTitle = this.$t('AnalysisControlPage.MsgStaRes') + '-' + this.uploadFileName
      } else {
        this.statisticsTitle = this.$t('AnalysisControlPage.MsgStaRes')
      }
      this.statisticsDialogVisible = true
      this.stepNow = 4
      StatisticsSchedule().then(res => {
        this.$message({
          type: 'success',
          message: this.$t('AnalysisControlPage.MsgStaSuccess')
        })
        this.tableData_1 = res.table_data1
        this.tableData_2 = res.table_data2
        this.tableData_3 = res.table_data3
        this.tableData_4 = res.table_data4
        this.loading_table1 = false
        this.loading_table2 = false
        this.loading_table3 = false
        this.loading_table4 = false
      })
    },
    // 量化结果导出到Excel TODO
    exportStatisticsExcel() {
      var xlsxParam = {
        raw: true
      } // 转换成excel时，使用原始的格式，这样导出的时候数字过长不会变成科学计数法
      const workbook = XLSX.utils.book_new()
      // 添加多个sheet页
      const ws1 = XLSX.utils.table_to_sheet(document.querySelector('#table1'), xlsxParam)
      XLSX.utils.book_append_sheet(workbook, ws1, 'table1')
      const ws2 = XLSX.utils.table_to_sheet(document.querySelector('#table2'), xlsxParam)
      XLSX.utils.book_append_sheet(workbook, ws2, 'table2')
      const ws3 = XLSX.utils.table_to_sheet(document.querySelector('#table3'), xlsxParam)
      XLSX.utils.book_append_sheet(workbook, ws3, 'table3')
      const ws4 = XLSX.utils.table_to_sheet(document.querySelector('#table4'), xlsxParam)
      XLSX.utils.book_append_sheet(workbook, ws4, 'table4')
      const wbout = XLSX.write(workbook, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: 'application/octet-stream;charset=utf-8"'
          }), this.$t('AnalysisControlPage.MsgStaRes') + '.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    handlePushClose() {
      this.pushDialogVisible = false
    },
    // 是否关闭量化结果
    handleCloseStatistics() {
      this.$confirm(this.$t('AnalysisControlPage.MsgCloseSta'), this.$t('PublicText.TitleTip'), {
        type: 'warning',
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel')
      }).then(_ => {
        this.statisticsDialogVisible = false
      }).catch(_ => {})
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/css/Control/AnalysisControl.scss';
</style>
<style>
.card-tip .el-card__body{
    padding: 0px;
}
.btnDanger{
  background-color: #F56C6C !important;
  border-color: #F56C6C !important;
}
.btnDanger:hover{
  background-color: #f04747 !important;
  border-color: #f04747 !important;
}
.layui-progress-bar{
  margin-top: 20px;
}
.layui-progress-bar .el-progress-bar__inner:before {
  content:"";
  width:100%;
  height:100%;
  display:block;
  background-image:repeating-linear-gradient(-45deg,rgba(255,255,255,0.3) 0,rgba(255,255,255,0.3) 12.5%,transparent 0,transparent 25%);
  background-size:40px 40px;
  animation:move 2.5s linear infinite;
}
@keyframes move {
  from {
    background-position: 40px 0;
  }
  to {
    background-position:  0;
  }
}

.checkAlertBox{
  width: 46%;
  word-break: break-all !important;
  overflow: auto;
}
</style>
