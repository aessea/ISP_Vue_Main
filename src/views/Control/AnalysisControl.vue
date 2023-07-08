<template>
  <div id="main">
    <el-card class="card-tip">
      <el-alert
        title="提示信息"
        :type="checkAlertType"
        :closable="false"
        style="margin: 0px;"
      >
        <template slot="title">
          <div id="checkMessage">
            <div>排程文件检查结果</div>
          </div>
        </template>
      </el-alert>
    </el-card>
    <el-card class="card-tip">
      <el-alert
        title="提示信息"
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
            <span>分析进度</span>
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
            <span>控制中心</span>
          </div>
          <el-row>
            <el-col :span="24">
              <el-steps :active="stepNow" :align-center="false" finish-status="success" simple>
                <el-step title="上传文件" />
                <el-step title="检查文件" />
                <el-step title="分析排程" />
                <el-step title="推送排程" />
              </el-steps>
              <div class="box-button">
                <el-row>
                  <el-col :span="24">
                    <div class="control-button">
                      <el-input
                        :value="uploadFileName"
                        placeholder="未上传文件"
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
                          1.上传排程
                        </el-button>
                      </el-upload>
                      <div>
                        <el-button type="primary" @click="checkData">
                          2.检查文件
                        </el-button>
                        <el-button type="primary" @click="analysisSchedule">
                          3.分析排程
                        </el-button>
                        <el-button type="apiBtn" @click="pushSchedule">
                          4.推送排程
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
              <el-button type="success" @click="generateOutput('compute')">
                下载分析结果文件
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="card_result">
          <div slot="header" class="clearfix">
            <span class="ana-res-text">分析结果</span>
          </div>
          <p style="font-weight:bold;line-height: 90%;">{{ schedule_time }}-{{ schedule_mode }}
            <span style="font-weight:normal;">{{ ana_time }}</span>
          </p>
          <p style="line-height:160%">
            是否可行解：{{ feasible }}<br>
            目标值：{{ obj_value }}<br>
            逾期：{{ overdue_value }}<br>
            停顿：{{ idle_value }}<br>
            线平衡：{{ line_balance }}<br>
            三天总点数：{{ three_days_points }}<br>
          </p>
          <div class="ana-history">
            <el-select v-model="selectAnaTime" placeholder="查看历史分析结果" style="width: 200px%;" size="mini">
              <el-option
                v-for="item in options_history_analysis"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button style="margin-left: 5px;" type="info" size="mini" @click="getHistoryAnaData">
              获取
            </el-button>
            <el-tooltip class="item" effect="dark" content="刷新列表" placement="top">
              <el-button style="margin-left: 5px;" size="mini" @click="getHistoryAnaItem">
                <i class="el-icon-refresh" />
              </el-button>
            </el-tooltip>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin: 10px;">
      <el-col :span="24">
        <el-card class="card-config">
          <div slot="header" class="clearfix">
            <span>历史推送数据</span>
            <el-button v-if="isUpdateConfig === false" style="float: right; padding: 3px 0" type="text" @click="modifyParamsConfig">修改配置</el-button>
            <el-button v-else-if="isUpdateConfig === true" style="float: right; padding: 3px 0" type="text" @click="saveParamsConfig">保存修改</el-button>
          </div>
          <div class="table-box">
            <el-table
              id="mytable"
              :header-cell-style="{color:'#606266'}"
              :data="table_data_params_config"
            >
              <el-table-column prop="push_name" label="推送对象" width="160" />
              <el-table-column prop="push_time" label="推送时间" width="160" />
              <el-table-column prop="push_user" label="推送人" width="160" />
              <el-table-column prop="push_result" label="推送结果" />
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      v-el-drag-dialog
      title="推送排程"
      :visible.sync="pushDialogVisible"
      width="520px"
      :before-close="handlePushClose"
      @dragDialog="handleDrag"
    >
      <el-alert
        title="推送主板"
        type="info"
        :closable="false"
        style="margin-top: 10px;margin-bottom: 10px;"
      />
      <el-row style="text-align: center;">
        <el-col :span="24">
          <el-tooltip class="item" effect="dark" :content="smtUnscheduledTip" placement="top">
            <el-button type="apiBtn" @click="post_unscheduled">
              推送SMT未排
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="smtPrescheduledTip" placement="top">
            <el-button type="apiBtn" @click="post_pre_scheduled">
              推送SMT预排
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="smtScheduledTip" placement="top">
            <el-button type="apiBtn" @click="post_scheduled">
              推送SMT正排
            </el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-alert
        title="推送AI"
        type="info"
        :closable="false"
        style="margin-top: 10px;margin-bottom: 10px;"
      />
      <el-row style="text-align: center;">
        <el-col :span="24">
          <el-tooltip class="item" effect="dark" :content="aiUnscheduledTip" placement="top">
            <el-button type="apiBtn" style="padding-left: 28px;padding-right: 28px" disabled @click="post_ai_unscheduled">
              推送AI未排
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="aitPrescheduledTip" placement="top">
            <el-button type="apiBtn" style="padding-left: 28px;padding-right: 28px" disabled @click="post_ai_pre_scheduled">
              推送AI预排
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="aitScheduledTip" placement="top">
            <el-button type="apiBtn" style="padding-left: 28px;padding-right: 28px" disabled @click="post_ai_scheduled">
              推送AI正排
            </el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlePushClose">
          关闭
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
import { SmtUnscheduled, SmtPrescheduled, SmtScheduled, AiUnscheduled,
  AiPrescheduled, AiScheduled, CheckData, GetHistoryAnaItem, GetHistoryAnaData,
  ImportPushSchedule, GetRunFlag, ClearAnaProgress, GetAnaProgress
} from '@/api/Control/OnlineTable'
export default {
  name: 'AnalysisControl',
  directives: { elDragDialog },
  data() {
    return {
      progressColor: '#02bafd', // 进度条颜色
      pushLoading: {
        text: '推送中，请稍等...',
        background: 'rgba(0, 0, 0, 0.5)'
      },
      percentage_1: 0,
      percentage_2: 0,
      percentage_3: 0,
      progress_text_1: '预处理|未开始',
      progress_text_2: '分析|未开始',
      progress_text_3: '输出表格|未开始',
      uploadFiles: [], // 上传的文件列表（限制1个）
      uploadFileName: '',
      pushDialogVisible: false, // 推送排程接口
      smtUnscheduledTip: '未推送',
      smtPrescheduledTip: '未推送',
      smtScheduledTip: '未推送',
      aiUnscheduledTip: '未推送',
      aitPrescheduledTip: '未推送',
      aitScheduledTip: '未推送',
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
      analysisMessage: '分析排程提示信息'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {

  },
  mounted() {

  },
  methods: {
    // 监听进度条
    listenProgress() {
      this.ana_progress_refresh = setInterval(() => { // 每隔2秒监听进度条
        setTimeout(this.getAnaProgress(), 0)
      }, 2000)
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
        const run_flag = res.run_flag
        if (run_flag === -1) {
          this.clearListenProgress()
          this.$message({
            type: 'error',
            message: '分析出错'
          })
          const anaErrMessage = '分析出错：' + res.ana_err_message
          this.showAnalysisAlertMessage(anaErrMessage, 'error')
        } else if (res.p2 === 25 && this.progressCount === 0) {
          this.$message({
            type: 'success',
            message: '分析完毕，正在生成表格'
          })
          // 显示分析排程的结果
          this.showAnaData(res, 0)
        } else if (res.p2 === 100) {
          // 生成表格后就不再监听进度条
          this.clearListenProgress()
          this.$message({
            type: 'success',
            message: '生成表格完毕，可以下载表格和获取量化'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 上传文件
    loadExcelFile(file, fileList) {
      const fileName = file.name.replace(/\.xlsx$/, '')
      const regex = /^(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])(主板|小板)(正排|预排).*$/

      if (!regex.test(fileName)) {
        const tip = '文件命名格式错误，请修改后重新上传！' + `<br/>` + '（正确文件名示例：0901主板预排）'
        this.$alert(tip, '错误', {
          confirmButtonText: '确定',
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
      div_text.innerHTML = '提示信息'
      alert_div.appendChild(div_text) // 将标签插入到指定标签中
    },
    showAnalysisAlertMessage(message_info, message_type) {
      this.analysisAlertType = message_type
      this.analysisMessage = message_info
    },
    resetAnalysisAlertMessage() {
      this.analysisAlertType = 'info'
      this.analysisMessage = '分析排程提示信息'
    },
    // 后端数据检查
    async checkData() {
      if (this.uploadFileName === '') {
        this.$message({
          type: 'warning',
          message: '未上传文件'
        })
        return
      }
      const checkLoading = {
        text: '数据检查中...',
        background: 'rgba(0, 0, 0, 0.5)'
      }
      this.loadingInstance = Loading.service(checkLoading)
      const form = new FormData()
      form.append('file', this.uploadFile)
      this.stepNow = 2
      await CheckData(form).then(res => {
        this.showCheckAlertMessage(res.data_list, res.message_type)
        this.loadingInstance.close()
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert('检查出现错误：' + err, '错误', {
          confirmButtonText: '确定',
          type: 'error'
        })
      })
    },
    // 以下函数都是推送排程相关
    pushSchedule() {
      if (this.isAnalysis === true) {
        this.pushDialogVisible = true
      } else {
        this.$alert('未完成分析排程，无法进行推送！', '警告', {
          confirmButtonText: '确定',
          type: 'warning'
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
          message: '清空进度条请求出错'
        })
      })
    },
    // 显示分析排程结果
    showAnaData(res, flag) {
      if (flag === 0) {
        this.ana_time = '(最新分析结果)'
      } else {
        let time = this.selectAnaTime
        const time_date = time.substring(0, 10)
        const time_time = time.substring(11).replaceAll('-', ':')
        time = time_date + ' ' + time_time
        this.ana_time = '(分析时间：' + time + ')'
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
      this.progress_text_1 = '预处理|未开始'
      this.progress_text_2 = '分析|未开始'
      this.progress_text_3 = '输出表格|未开始'
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
          message: '获取成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: '获取失败'
        })
      })
    },
    analysisSchedule() {
      if (this.checkAlertType !== 'success') {
        this.$confirm('数据检查未通过，确定要开始分析排程?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.beforeDoAnalysis()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消分析'
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
          confirmText = ['目前正在计算排程，确定要开始分析？', '注意：此操作将会影响当前运行的排程结果！']
        } else if (res.ana_run_flag === 1) {
          confirmText = ['目前正在分析排程，确定要开始分析？', '注意：此操作将会影响当前运行的排程结果！']
        }
        const newDatas = []
        const h = this.$createElement
        for (const i in confirmText) {
          newDatas.push(h('p', null, confirmText[i]))
        }
        if (res.run_flag === 1 || res.ana_run_flag === 1) {
          this.$confirm('警告', {
            title: '警告',
            message: h('div', null, newDatas),
            confirmButtonText: '确定分析',
            cancelButtonText: '取消',
            confirmButtonClass: 'btnDanger',
            type: 'warning'
          }).then(() => {
            this.doAnalysis()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消分析'
            })
          })
        } else {
          this.doAnalysis()
        }
      })
    },
    async doAnalysis() {
      this.$message({
        type: 'success',
        message: '开始分析排程，请关注进度条'
      })
      const form = new FormData()
      form.append('file', this.uploadFile)
      form.append('file_name', this.uploadFileName)
      form.append('user_name', this.name)
      this.resetShowAnaData()
      this.resetAnalysisAlertMessage()
      this.listenProgress()
      this.stepNow = 3
      await ImportPushSchedule(form).then(res => {
        this.isAnalysis = true // 分析完成
        this.$alert(res.message, '提示', {
          confirmButtonText: '确定',
          type: 'success'
        })
        this.showAnalysisAlertMessage(res.message, 'success')
      }).catch(err => {
        this.$alert(err, '错误', {
          confirmButtonText: '确定',
          type: 'error'
        })
        this.showAnalysisAlertMessage(err, 'error')
      })
    },
    post_unscheduled() {
      this.loadingInstance = Loading.service(this.pushLoading)
      const form = {
        'user_name': this.name
      }
      SmtUnscheduled(form).then(res => {
        if (res.code === 20000) {
          this.$alert(res.message, '推送排程成功', {
            confirmButtonText: '确定',
            type: 'success'
          })
          this.smtUnscheduledTip = '已推送'
        } else {
          this.$alert('推送失败', '错误', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
        this.loadingInstance.close() // 清除动画
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(err, '错误', {
          confirmButtonText: '确定',
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
          this.$alert(res.message, '推送排程成功', {
            confirmButtonText: '确定',
            type: 'success'
          })
          this.smtPrescheduledTip = '已推送'
        } else {
          this.$alert('推送失败', '错误', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
        this.loadingInstance.close() // 清除动画
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(err, '错误', {
          confirmButtonText: '确定',
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
          this.$alert(res.message, '推送排程成功', {
            confirmButtonText: '确定',
            type: 'success'
          })
          this.smtScheduledTip = '已推送'
        } else {
          this.$alert('推送失败', '错误', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
        this.loadingInstance.close() // 清除动画
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(err, '错误', {
          confirmButtonText: '确定',
          type: 'error'
        })
      })
    },
    post_ai_unscheduled() {
      this.loadingInstance = Loading.service(this.pushLoading)
      const form = {
        'user_name': this.name
      }
      AiUnscheduled(form).then(res => {
        if (res.code === 20000) {
          this.$alert(res.message, '推送排程成功', {
            confirmButtonText: '确定',
            type: 'success'
          })
          this.aiUnscheduledTip = '已推送'
        } else {
          this.$alert('推送失败', '错误', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
        this.loadingInstance.close() // 清除动画
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(err, '错误', {
          confirmButtonText: '确定',
          type: 'error'
        })
      })
    },
    post_ai_pre_scheduled() {
      this.loadingInstance = Loading.service(this.pushLoading)
      const form = {
        'user_name': this.name
      }
      AiPrescheduled(form).then(res => {
        if (res.code === 20000) {
          this.$alert(res.message, '推送排程成功', {
            confirmButtonText: '确定',
            type: 'success'
          })
          this.aiPrescheduledTip = '已推送'
        } else {
          this.$alert('推送失败', '错误', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
        this.loadingInstance.close() // 清除动画
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(err, '错误', {
          confirmButtonText: '确定',
          type: 'error'
        })
      })
    },
    post_ai_scheduled() {
      this.loadingInstance = Loading.service(this.pushLoading)
      const form = {
        'user_name': this.name
      }
      AiScheduled(form).then(res => {
        if (res.code === 20000) {
          this.$alert(res.message, '推送排程成功', {
            confirmButtonText: '确定',
            type: 'success'
          })
          this.aiScheduledTip = '已推送'
        } else {
          this.$alert('推送失败', '错误', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
        this.loadingInstance.close() // 清除动画
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(err, '错误', {
          confirmButtonText: '确定',
          type: 'error'
        })
      })
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
