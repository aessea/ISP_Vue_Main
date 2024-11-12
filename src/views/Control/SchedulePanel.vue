<template>
  <div id="main">
    <el-card class="card-info">
      <el-row>
        <el-col :span="1">
          <div class="my-icon-date">
            <i class="el-icon-date" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="card-panel-description">
            <div class="card-panel-text-upper">
              {{ $t('SchedulePanelPage.ScheduleDateTitle') }}
            </div>
            <div class="card-panel-text-down">
              {{ schedule_time }}-{{ schedule_mode }}
            </div>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="my-icon-timer">
            <i class="el-icon-timer" />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-panel-description">
            <div class="card-panel-text-upper">
              {{ $t('SchedulePanelPage.TitleScheduleRunTime') }}
            </div>
            <div class="card-panel-text-down">
              {{ schedule_run_time }}
            </div>
          </div>
        </el-col>
        <el-col :span="10" style="float:right;">
          <div class="my-table">
            <el-table
              :data="schedule_result"
              style="width: 610px;"
              :border="false"
              algin="right"
              :header-cell-style="{'font-weight':'normal', 'text-align':'right'}"
              :cell-style="{'font-size':'20px', 'font-weight':'20px', 'text-align': 'right'}"
            >
              <el-table-column prop="schedule_type" :label="$t('SchedulePanelPage.ScheduleType')" width="120px;" />
              <el-table-column prop="enable" :label="$t('PublicText.Feasible')" width="100px;" />
              <el-table-column prop="line_balance" :label="$t('PublicText.LineBalanceValue')" width="100px;" />
              <el-table-column prop="idle_value" :label="$t('PublicText.IdleValue')" width="100px;" />
              <el-table-column prop="overdue_value" :label="$t('PublicText.OverdueValue')" width="85px;" />
              <el-table-column prop="obj_value" :label="$t('PublicText.ResultValue')" width="105px;" />
            </el-table>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="16">
      <el-col :span="8">
        <el-card class="card-progress">
          <div slot="header" class="clearfix">
            <span>{{ $t('SchedulePanelPage.TaskProgress') }}</span>
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
          <el-progress
            :text-inside="true"
            :stroke-width="16"
            :percentage="percentage_4"
            :color="progressColor"
            class="layui-progress-bar"
          />
          <el-alert
            style="color: #303133;"
            :title="progress_text_4"
            type="info"
            center
            :closable="false"
          />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="control">
          <div slot="header" class="clearfix">
            <span>{{ $t('SchedulePanelPage.ControlPanel') }}</span>
          </div>
          <el-row>
            <el-col :span="24">
              <el-alert
                :title="$t('SchedulePanelPage.TitleTrainPredictModel')"
                type="info"
                :closable="false"
              />
              <div class="box-button">
                <el-date-picker
                  v-model="trainDate"
                  type="date"
                  :placeholder="$t('SchedulePanelPage.TextChooseTrainDate')"
                />
                <el-tooltip class="item" effect="dark" :content="trainDateTip" placement="top">
                  <el-button v-if="buttons.includes('SchedulePanel/trainModel')" type="primary" plain style="margin-top:2px;margin-left: 8px;" @click="trainModel">
                    <i class="el-icon-pie-chart" />
                    {{ $t('SchedulePanelPage.BtnTrainPredictModel') }}
                  </el-button>
                </el-tooltip>
              </div>
              <el-alert
                :title="$t('SchedulePanelPage.TitleRelatedOperate')"
                type="info"
                :closable="false"
              />
              <el-row class="button-row">
                <el-button v-if="buttons.includes('SchedulePanel/computeDialogMain')" type="primary" plain @click="computeDialogMain">
                  <i class="el-icon-monitor" />
                  {{ $t('SchedulePanelPage.BtnComputeMain') }}
                </el-button>
                <el-button v-if="buttons.includes('SchedulePanel/computeDialogSmall')" type="primary" plain class="button-margin" @click="computeDialogSmall">
                  <i class="el-icon-monitor" />
                  {{ $t('SchedulePanelPage.BtnComputeSmall') }}
                </el-button>
              </el-row>
              <el-row class="button-row">
                <el-button v-if="buttons.includes('SchedulePanel/computeDialogABL')" type="primary" plain @click="computeDialogABL">
                  <i class="el-icon-monitor" />
                  {{ $t('SchedulePanelPage.BtnComputeABL') }}
                </el-button>
                <el-button v-if="buttons.includes('SchedulePanel/computeDialogBoth')" type="primary" plain @click="computeDialogBoth">
                  <i class="el-icon-monitor" />
                  {{ $t('SchedulePanelPage.BtnComputeBoth') }}
                </el-button>
              </el-row>
              <el-row class="button-row">
                <el-button v-if="buttons.includes('SchedulePanel/stopTabu')" type="stopBtn" plain @click="stopTabu">
                  <i class="el-icon-warning-outline" />
                  {{ $t('SchedulePanelPage.BtnEndDeepSearch') }}
                </el-button>
                <el-button v-if="buttons.includes('SchedulePanel/stopSchedule')" type="stopBtn" plain @click="stopSchedule">
                  <i class="el-icon-warning-outline" />
                  {{ $t('SchedulePanelPage.BtnEndCompute') }}
                </el-button>
              </el-row>
              <!-- <div class="box-button">
                <el-row>
                  <el-col :span="12">
                    <el-button v-if="buttons.includes('SchedulePanel/stopTabu')" type="stopBtn" plain @click="stopTabu">
                      <i class="el-icon-warning-outline" />
                      {{ $t('SchedulePanelPage.BtnEndDeepSearch') }}
                    </el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button v-if="buttons.includes('SchedulePanel/stopSchedule')" type="stopBtn" plain @click="stopSchedule">
                      <i class="el-icon-warning-outline" />
                      {{ $t('SchedulePanelPage.BtnEndCompute') }}
                    </el-button>
                  </el-col>
                  <el-col :span="8">
                    <el-button v-if="buttons.includes('SchedulePanel/post_statistics')" type="pushBtn" plain @click="post_statistics">
                      <i class="el-icon-upload2" />
                      {{ $t('SchedulePanelPage.BtnPushStatistics') }}
                    </el-button>
                  </el-col>
                </el-row>
              </div> -->
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="margin-right: 16px;height: 400px;">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane :label="$t('SchedulePanelPage.MainDowload')" name="main">
              <el-row>
                <el-col :span="24">
                  <el-alert
                    :title="$t('SchedulePanelPage.TitleDownloadNewMain')"
                    type="info"
                    :closable="false"
                  />
                  <el-row class="button-row">
                    <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('result_file_path_main')">
                      <i class="el-icon-download" />
                      {{ $t('SchedulePanelPage.BtnDownloadMain') }}
                    </el-button>
                    <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('idle_info_file_path_main')">
                      <i class="el-icon-download" />
                      {{ $t('SchedulePanelPage.BtnDownloadIdle') }}
                    </el-button>
                  </el-row>
                  <el-row class="button-row">
                    <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('statistics_file_path_main')">
                      <i class="el-icon-download" />
                      {{ $t('SchedulePanelPage.BtnDownloadStastic') }}
                    </el-button>
                    <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('no_program_file_path_main')">
                      <i class="el-icon-download" />
                      {{ $t('SchedulePanelPage.BtnDownloadNoPro') }}
                    </el-button>
                  </el-row>
                  <!-- <div class="box-button">
                    <el-row>
                      <el-col :span="8">
                        <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('result_file_path_main')">
                          <i class="el-icon-download" />
                          {{ $t('SchedulePanelPage.BtnDownloadMain') }}
                        </el-button>
                      </el-col>
                      <el-col :span="8">
                        <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('idle_info_file_path_main')">
                          <i class="el-icon-download" />
                          {{ $t('SchedulePanelPage.BtnDownloadIdle') }}
                        </el-button>
                      </el-col>
                      <el-col :span="8">
                        <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('statistics_file_path_main')">
                          <i class="el-icon-download" />
                          {{ $t('SchedulePanelPage.BtnDownloadStastic') }}
                        </el-button>
                      </el-col>
                    </el-row>
                  </div> -->
                  <!-- <div class="box-button">
                    <el-row>
                      <el-col :span="8">
                        <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('no_program_file_path_main')">
                          <i class="el-icon-download" />
                          {{ $t('SchedulePanelPage.BtnDownloadNoPro') }}
                        </el-button>
                      </el-col>
                    </el-row>
                  </div> -->
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('SchedulePanelPage.SmallDowload')" name="small">
              <el-row>
                <el-col :span="24">
                  <el-alert
                    :title="$t('SchedulePanelPage.TitleDownloadNewSmall')"
                    type="info"
                    :closable="false"
                  />
                  <el-row class="button-row">
                    <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('result_file_path_small')">
                      <i class="el-icon-download" />
                      {{ $t('SchedulePanelPage.BtnDownloadSmall') }}
                    </el-button>
                    <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('idle_info_file_path_small')">
                      <i class="el-icon-download" />
                      {{ $t('SchedulePanelPage.BtnDownloadIdle') }}
                    </el-button>
                  </el-row>
                  <el-row class="button-row">
                    <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('statistics_file_path_small')">
                      <i class="el-icon-download" />
                      {{ $t('SchedulePanelPage.BtnDownloadStastic') }}
                    </el-button>
                    <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('no_program_file_path_small')">
                      <i class="el-icon-download" />
                      {{ $t('SchedulePanelPage.BtnDownloadNoPro') }}
                    </el-button>
                  </el-row>
                  <!-- <div class="box-button">
                    <el-row>
                      <el-col :span="8">
                        <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('result_file_path_small')">
                          <i class="el-icon-download" />
                          {{ $t('SchedulePanelPage.BtnDownloadSmall') }}
                        </el-button>
                      </el-col>
                      <el-col :span="8">
                        <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('idle_info_file_path_small')">
                          <i class="el-icon-download" />
                          {{ $t('SchedulePanelPage.BtnDownloadIdle') }}
                        </el-button>
                      </el-col>
                      <el-col :span="8">
                        <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('statistics_file_path_small')">
                          <i class="el-icon-download" />
                          {{ $t('SchedulePanelPage.BtnDownloadStastic') }}
                        </el-button>
                      </el-col>
                    </el-row>
                  </div> -->
                  <!-- <div class="box-button">
                    <el-row>
                      <el-col :span="8">
                        <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('no_program_file_path_small')">
                          <i class="el-icon-download" />
                          {{ $t('SchedulePanelPage.BtnDownloadNoPro') }}
                        </el-button>
                      </el-col>
                    </el-row>
                  </div> -->
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('SchedulePanelPage.AblDownload')" name="abl">
              <el-row>
                <el-col :span="24">
                  <el-alert
                    :title="$t('SchedulePanelPage.TitleDownloadNewAbl')"
                    type="info"
                    :closable="false"
                  />
                  <el-row class="button-row">
                    <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('result_file_path_main')">
                      <i class="el-icon-download" />
                      {{ $t('SchedulePanelPage.BtnDownloadAbl') }}
                    </el-button>
                    <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('idle_info_file_path_main')">
                      <i class="el-icon-download" />
                      {{ $t('SchedulePanelPage.BtnDownloadIdle') }}
                    </el-button>
                  </el-row>
                  <el-row class="button-row">
                    <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('statistics_file_path_main')">
                      <i class="el-icon-download" />
                      {{ $t('SchedulePanelPage.BtnDownloadStastic') }}
                    </el-button>
                    <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('no_program_file_path_main')">
                      <i class="el-icon-download" />
                      {{ $t('SchedulePanelPage.BtnDownloadNoPro') }}
                    </el-button>
                  </el-row>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('SchedulePanelPage.LogDownload')" name="log">
              <el-row>
                <el-col :span="24">
                  <el-alert
                    :title="$t('SchedulePanelPage.TitleDownloadNewLog')"
                    type="info"
                    :closable="false"
                  />
                  <el-row class="button-row">
                    <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('log_file_path')">
                      <i class="el-icon-download" />
                      {{ $t('SchedulePanelPage.BtnDownloadLog') }}
                    </el-button>
                  </el-row>
                  <!-- <div class="box-button">
                    <el-row>
                      <el-col :span="8">
                        <el-button v-if="buttons.includes('SchedulePanel/downloadScheduleFiles')" type="primary" plain @click="downloadFileBackend('log_file_path')">
                          <i class="el-icon-download" />
                          {{ $t('SchedulePanelPage.BtnDownloadLog') }}
                        </el-button>
                      </el-col>
                    </el-row>
                  </div> -->
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-card class="card-gantt">
      <div slot="header" class="clearfix">
        <span>甘特图</span>
      </div>
    </el-card> -->
    <el-row>
      <el-col :span="24">
        <el-card class="card-config">
          <div slot="header" class="clearfix">
            <span>{{ $t('SchedulePanelPage.Config') }}</span>
          </div>
          <el-date-picker
            v-model="pack_holiday_day_list"
            type="dates"
            :placeholder="$t('SchedulePanelPage.TextChooseHoliday')"
            :style="{width: '70%'}"
            value-format="yyyy-MM-dd"
          />
          <el-button v-if="buttons.includes('SchedulePanel/modifyHoliday')" type="primary" plain style="margin-top:2px;margin-left: 8px;" @click="modifyHoliday">
            {{ $t('SchedulePanelPage.BtnModifyPackHoliday') }}
          </el-button>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      v-el-drag-dialog
      :title="$t('SchedulePanelPage.TitleComputeBoth')"
      :visible.sync="computeBothDialogVisible"
      width="60%"
      :close-on-click-modal="false"
      :before-close="handleCloseBoth"
      @dragDialog="handleDrag"
    >
      <el-steps :active="stepNowBoth" finish-status="success" simple>
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep1')" />
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep2')" />
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep3')" />
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep4')" />
      </el-steps>
      <el-row style="margin-top:10px;">
        <el-col :span="6">
          <el-input :placeholder="$t('SchedulePanelPage.TextUploadMainFile')" :value="uploadFileNameMain" />
        </el-col>
        <el-col :span="4">
          <el-upload
            ref="upload"
            class="upload-demo"
            action=""
            accept=".xlsx"
            :on-change="handleChangeMain"
            :auto-upload="false"
            :show-file-list="false"
            :file-list="uploadFileListMain"
            style="margin-left: 10px;"
          >
            <el-button slot="trigger" type="primary">
              {{ $t('SchedulePanelPage.BtnUploadMain') }}
            </el-button>
          </el-upload>
        </el-col>
        <!-- <el-col :span="2">
          <el-tooltip class="item" effect="dark" :content="mainUploadName" placement="top">
            <el-button style="margin-left: 20px;" @click="getUploadFileMain">
              <i class="el-icon-download" />
            </el-button>
          </el-tooltip>
        </el-col> -->
        <el-col :span="6">
          <el-input style="margin-left: 10px;" :placeholder="$t('SchedulePanelPage.TextUploadSmallFile')" :value="uploadFileNameSmall" />
        </el-col>
        <el-col :span="4">
          <el-upload
            ref="upload"
            class="upload-demo"
            action=""
            accept=".xlsx"
            :on-change="handleChangeSmall"
            :auto-upload="false"
            :show-file-list="false"
            :file-list="uploadFileListSmall"
            style="margin-left: 20px;"
          >
            <el-button slot="trigger" type="primary">
              {{ $t('SchedulePanelPage.BtnUploadSmall') }}
            </el-button>
          </el-upload>
        </el-col>
        <el-col :span="4">
          <el-button type="success" style="margin-left:20px;" @click="beforeImportBoth">
            {{ $t('SchedulePanelPage.BtnImportFile') }}
          </el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px;">
        <el-button type="success" style="margin-left:10px;" @click="beforeDoBucklePoints(uploadFileNameMain)">
          {{ $t('SchedulePanelPage.BtnTransferMain') }}
        </el-button>
        <el-button type="success" style="margin-left:10px;" @click="beforeDoBucklePoints(uploadFileNameSmall)">
          {{ $t('SchedulePanelPage.BtnTransferSmall') }}
        </el-button>
        <el-button @click="exportScheduleDataMain">
          {{ $t('SchedulePanelPage.BtnExportMain') }}
        </el-button>
        <el-button @click="exportScheduleDataSmall">
          {{ $t('SchedulePanelPage.BtnExportSmall') }}
        </el-button>
        <el-tooltip class="item" effect="dark" :content="mainUploadName" placement="top">
          <el-button style="margin-left: 10px;" @click="downloadFileBackend('upload_file_path_main')">
            {{ $t('SchedulePanelPage.BtnGetMainUpload') }}
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="smallUploadName" placement="top">
          <el-button style="margin-left: 10px;" @click="downloadFileBackend('upload_file_path_small')">
            {{ $t('SchedulePanelPage.BtnGetSmallUpload') }}
          </el-button>
        </el-tooltip>
      </el-row>
      <el-alert
        :title="$t('SchedulePanelPage.ComputeTextStep3')"
        type="info"
        :closable="false"
        style="margin-top: 10px;margin-bottom: 10px;"
      />
      <el-row>
        <el-col :span="24">
          <el-tooltip class="item" effect="dark" :content="apsProgramMsg" placement="top">
            <el-button type="primary" @click="getApsProgram('both')">
              {{ $t('SchedulePanelPage.BtnGetApsProgram') }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="apsMtoolMsg" placement="top">
            <el-button type="primary" @click="getApsMtool('both')">
              {{ $t('SchedulePanelPage.BtnGetApsMtool') }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="apsMoBaseData" placement="top">
            <el-button type="primary" @click="getApsMoBaseData('both')">
              {{ $t('SchedulePanelPage.BtnGetApsMoBaseData') }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="apsMoProgData" placement="top">
            <el-button type="primary" @click="getApsMoProgData('both')">
              {{ $t('SchedulePanelPage.BtnGetApsMoProgData') }}
            </el-button>
          </el-tooltip>
          <!-- <el-tooltip class="item" effect="dark" :content="apsDeliveryDay" placement="top">
            <el-button type="primary" @click="getApsDeliveryDay('both')">
              {{ $t('SchedulePanelPage.BtnGetApsDeliveryDay') }}
            </el-button>
          </el-tooltip> -->
        </el-col>
      </el-row>
      <el-alert
        :title="$t('SchedulePanelPage.ComputeTextStep4')"
        type="info"
        :closable="false"
        style="margin-top: 10px;margin-bottom: 10px;"
      />
      <el-button type="primary" @click="beforeComputeBoth">
        {{ $t('SchedulePanelPage.BtnBeginCompute') }}
      </el-button>
      <span slot="footer" class="dialog-footer">
        <el-tooltip class="item" effect="dark" :content="$t('SchedulePanelPage.ComputeTextStep4')" placement="top">
          <el-button @click="getUploadFileTime">
            <i class="el-icon-refresh" />
          </el-button>
        </el-tooltip>
        <el-button @click="handleCloseBoth">
          {{ $t('PublicBtn.Close') }}
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('SchedulePanelPage.TitleComputeMain')"
      :visible.sync="computeMainDialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :before-close="handleCloseMain"
      @dragDialog="handleDrag"
    >
      <el-steps :active="stepNowMain" finish-status="success" simple>
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep1')" />
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep2')" />
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep3')" />
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep4')" />
      </el-steps>
      <el-row style="margin-top:10px;">
        <el-col :span="8">
          <el-input :placeholder="$t('SchedulePanelPage.TextUploadMainFile')" :value="uploadFileNameMain" />
        </el-col>
        <el-col :span="16">
          <el-upload
            ref="upload"
            class="upload-demo"
            action=""
            accept=".xlsx"
            :on-change="handleChangeMain"
            :auto-upload="false"
            :show-file-list="false"
            :file-list="uploadFileListMain"
            style="margin-left: 10px;"
          >
            <el-button slot="trigger" type="primary">
              {{ $t('SchedulePanelPage.BtnUploadMain') }}
            </el-button>
            <el-button type="success" style="margin-left:10px;" @click="beforeImportMain">
              {{ $t('SchedulePanelPage.BtnImportFile') }}
            </el-button>
            <el-button type="success" style="margin-left:10px;" @click="beforeDoBucklePoints(uploadFileNameMain)">
              {{ $t('SchedulePanelPage.BtnTransfer') }}
            </el-button>
            <el-button @click="exportScheduleDataMain">
              {{ $t('SchedulePanelPage.BtnExportMain') }}
            </el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-alert
        :title="$t('SchedulePanelPage.ComputeTextStep3')"
        type="info"
        :closable="false"
        style="margin-top: 10px;margin-bottom: 10px;"
      />
      <el-row>
        <el-col :span="24">
          <el-tooltip class="item" effect="dark" :content="apsProgramMsg" placement="top">
            <el-button type="primary" @click="getApsProgram('main')">
              {{ $t('SchedulePanelPage.BtnGetApsProgram') }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="apsMtoolMsg" placement="top">
            <el-button type="primary" @click="getApsMtool('main')">
              {{ $t('SchedulePanelPage.BtnGetApsMtool') }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="apsMoBaseData" placement="top">
            <el-button type="primary" @click="getApsMoBaseData('main')">
              {{ $t('SchedulePanelPage.BtnGetApsMoBaseData') }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="apsMoProgData" placement="top">
            <el-button type="primary" @click="getApsMoProgData('main')">
              {{ $t('SchedulePanelPage.BtnGetApsMoProgData') }}
            </el-button>
          </el-tooltip>
          <!-- <el-tooltip class="item" effect="dark" :content="apsDeliveryDay" placement="top">
            <el-button type="primary" @click="getApsDeliveryDay('main')">
              {{ $t('SchedulePanelPage.BtnGetApsDeliveryDay') }}
            </el-button>
          </el-tooltip> -->
        </el-col>
      </el-row>
      <el-alert
        :title="$t('SchedulePanelPage.ComputeTextStep4')"
        type="info"
        :closable="false"
        style="margin-top: 10px;margin-bottom: 10px;"
      />
      <el-button type="primary" @click="beforeComputeMain">
        {{ $t('SchedulePanelPage.BtnBeginCompute') }}
      </el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseMain">
          {{ $t('PublicBtn.Close') }}
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('SchedulePanelPage.TitleComputeSmall')"
      :visible.sync="computeSmallDialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :before-close="handleCloseSmall"
      @dragDialog="handleDrag"
    >
      <el-steps :active="stepNowSmall" finish-status="success" simple>
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep1')" />
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep2')" />
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep3')" />
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep4')" />
      </el-steps>
      <el-row style="margin-top:10px;">
        <el-col :span="8">
          <el-input :placeholder="$t('SchedulePanelPage.TextUploadSmallFile')" :value="uploadFileNameSmall" />
        </el-col>
        <el-col :span="16">
          <el-upload
            ref="upload"
            class="upload-demo"
            action=""
            accept=".xlsx"
            :on-change="handleChangeSmall"
            :auto-upload="false"
            :show-file-list="false"
            :file-list="uploadFileListSmall"
            style="margin-left: 10px;"
          >
            <el-button slot="trigger" type="primary">
              {{ $t('SchedulePanelPage.BtnUploadSmall') }}
            </el-button>
            <el-button type="success" style="margin-left:10px;" @click="beforeImportSmall">
              {{ $t('SchedulePanelPage.BtnImportFile') }}
            </el-button>
            <el-button type="success" style="margin-left:10px;" @click="beforeDoBucklePoints(uploadFileNameSmall)">
              {{ $t('SchedulePanelPage.BtnTransfer') }}
            </el-button>
            <el-button @click="exportScheduleDataSmall">
              {{ $t('SchedulePanelPage.BtnExportSmall') }}
            </el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-alert
        :title="$t('SchedulePanelPage.ComputeTextStep3')"
        type="info"
        :closable="false"
        style="margin-top: 10px;margin-bottom: 10px;"
      />
      <el-row>
        <el-col :span="24">
          <el-tooltip class="item" effect="dark" :content="apsProgramMsg" placement="top">
            <el-button type="primary" @click="getApsProgram('small')">
              {{ $t('SchedulePanelPage.BtnGetApsProgram') }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="apsMtoolMsg" placement="top">
            <el-button type="primary" @click="getApsMtool('small')">
              {{ $t('SchedulePanelPage.BtnGetApsMtool') }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="apsMoBaseData" placement="top">
            <el-button type="primary" @click="getApsMoBaseData('small')">
              {{ $t('SchedulePanelPage.BtnGetApsMoBaseData') }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="apsMoProgData" placement="top">
            <el-button type="primary" @click="getApsMoProgData('small')">
              {{ $t('SchedulePanelPage.BtnGetApsMoProgData') }}
            </el-button>
          </el-tooltip>
          <!-- <el-tooltip class="item" effect="dark" :content="apsDeliveryDay" placement="top">
            <el-button type="primary" @click="getApsDeliveryDay('small')">
              {{ $t('SchedulePanelPage.BtnGetApsDeliveryDay') }}
            </el-button>
          </el-tooltip> -->
        </el-col>
      </el-row>
      <el-alert
        :title="$t('SchedulePanelPage.ComputeTextStep4')"
        type="info"
        :closable="false"
        style="margin-top: 10px;margin-bottom: 10px;"
      />
      <el-button type="primary" @click="beforeComputeSmall">
        {{ $t('SchedulePanelPage.BtnBeginCompute') }}
      </el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseSmall">
          {{ $t('PublicBtn.Close') }}
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('SchedulePanelPage.TitleComputeABL')"
      :visible.sync="computeABLDialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :before-close="handleCloseABL"
      @dragDialog="handleDrag"
    >
      <el-steps :active="stepNowABL" finish-status="success" simple>
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep1')" />
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep2')" />
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep3')" />
        <el-step :title="$t('SchedulePanelPage.ComputeTextStep4')" />
      </el-steps>
      <el-row style="margin-top:10px;">
        <el-col :span="8">
          <el-input :placeholder="$t('SchedulePanelPage.TextUploadABLFile')" :value="uploadFileNameABL" />
        </el-col>
        <el-col :span="16">
          <el-upload
            ref="upload"
            class="upload-demo"
            action=""
            accept=".xlsx"
            :on-change="handleChangeABL"
            :auto-upload="false"
            :show-file-list="false"
            :file-list="uploadFileListABL"
            style="margin-left: 10px;"
          >
            <el-button slot="trigger" type="primary">
              {{ $t('SchedulePanelPage.BtnUploadABL') }}
            </el-button>
            <el-button type="success" style="margin-left:10px;" @click="beforeImportABL">
              {{ $t('SchedulePanelPage.BtnImportFile') }}
            </el-button>
            <el-button type="success" style="margin-left:10px;" @click="beforeDoBucklePoints(uploadFileNameABL)">
              {{ $t('SchedulePanelPage.BtnTransfer') }}
            </el-button>
            <el-button @click="exportScheduleDataABL">
              {{ $t('SchedulePanelPage.BtnExportABL') }}
            </el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-alert
        :title="$t('SchedulePanelPage.ComputeTextStep3')"
        type="info"
        :closable="false"
        style="margin-top: 10px;margin-bottom: 10px;"
      />
      <el-row>
        <el-col :span="24">
          <el-tooltip class="item" effect="dark" :content="apsProgramMsg" placement="top">
            <el-button type="primary" @click="getApsProgram('abl')">
              {{ $t('SchedulePanelPage.BtnGetApsProgram') }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="apsMtoolMsg" placement="top">
            <el-button type="primary" @click="getApsMtool('abl')">
              {{ $t('SchedulePanelPage.BtnGetApsMtool') }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="apsMoBaseData" placement="top">
            <el-button type="primary" @click="getApsMoBaseData('abl')">
              {{ $t('SchedulePanelPage.BtnGetApsMoBaseData') }}
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="apsMoProgData" placement="top">
            <el-button type="primary" @click="getApsMoProgData('abl')">
              {{ $t('SchedulePanelPage.BtnGetApsMoProgData') }}
            </el-button>
          </el-tooltip>
          <!-- <el-tooltip class="item" effect="dark" :content="apsDeliveryDay" placement="top">
            <el-button type="primary" @click="getApsDeliveryDay('abl')">
              {{ $t('SchedulePanelPage.BtnGetApsDeliveryDay') }}
            </el-button>
          </el-tooltip> -->
        </el-col>
      </el-row>
      <el-alert
        :title="$t('SchedulePanelPage.ComputeTextStep4')"
        type="info"
        :closable="false"
        style="margin-top: 10px;margin-bottom: 10px;"
      />
      <el-button type="primary" @click="beforeComputeABL">
        {{ $t('SchedulePanelPage.BtnBeginCompute') }}
      </el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseABL">
          {{ $t('PublicBtn.Close') }}
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('PublicText.TitleTip')"
      :visible.sync="stopScheduleDialog"
      width="30%"
      :before-close="handleCloseStop"
      @dragDialog="handleDrag"
    >
      <p style="font-size:16px;">{{ $t('SchedulePanelPage.TextStopCompute1') }}<span style="color:#F56C6C;font-weight:bold;"> {{ $t('SchedulePanelPage.TextStopCompute2') }} </span>{{ $t('SchedulePanelPage.TextStopCompute3') }}</p>
      <el-input v-model="stopInput" :placeholder="$t('Placeholder.Enter')" style="width: 200px;" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseStop">{{ $t('PublicBtn.Cancel') }}</el-button>
        <el-button type="primary" @click="confirmStopSchedule">{{ $t('PublicBtn.Confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'
import elDragDialog from '@/directive/el-drag-dialog'
import { GetProgress, TrainModel, ImportSchedule, ComputeScheduleMain,
  GetRunFlag, StopTabu, GeScheduleRes, StopSchedule, ExportMainScheduleData,
  ImportScheduleBoth, ComputeScheduleSmall, ModifyHoliday, DownloadUploadFileMain,
  DownloadUploadFileSmall, DoBucklePoints, GetUploadFileTime, ComputeScheduleBoth, ExportSmallScheduleData,
  DoCheckScheduleData, ComputeScheduleABL
} from '@/api/Control/SchedulePanel'
import { GetApsMtool, GetApsMoBaseData, GetApsMoProgData, GetApsProgram, GetApsDeliveryDay
} from '@/api/Control/DockingMes'
import { DownloadFile } from '@/api/common'
export default {
  name: 'SchedulePanel',
  directives: { elDragDialog },
  data() {
    return {
      progressColor: '#02bafd', // 进度条颜色

      computeMainDialogVisible: false, // 计算主板排程dialog
      computeSmallDialogVisible: false, // 计算小板排程dialog
      computeABLDialogVisible: false, // 计算ABL排程dialog
      computeBothDialogVisible: false, // 计算主板+小板排程dialog

      stepNowMain: 0, // 计算主板排程
      stepNowSmall: 0, // 计算小板排程
      stepNowABL: 0, // 计算ABL排程
      stepNowBoth: 0, // 计算主板+小板排程

      uploadFileListMain: [], // 主板上传的文件列表
      uploadFileMain: null, // 主板上传的文件
      uploadFileNameMain: '', // 主板文件名

      uploadFileListSmall: [], // 小板上传的文件列表
      uploadFileSmall: null, // 小板上传的文件
      uploadFileNameSmall: '', // 小板文件名

      uploadFileListABL: [], // ABL上传的文件列表
      uploadFileABL: null, // ABL上传的文件
      uploadFileNameABL: '', // ABL文件名

      checkLoading: {
        text: this.$t('PublicText.CheckLoadiing'),
        background: 'rgba(0, 0, 0, 0.6)'
      }, // 检查动画
      importLoading: {
        text: this.$t('PublicText.ImportLoadiing'),
        background: 'rgba(0, 0, 0, 0.5)'
      }, // 导入排程动画
      loadingInstance: null, // 动画实例
      trainDate: new Date(), // 训练预测模型日期
      options_history_excel: [], // 历史排程列表
      isImportMain: false, // 是否上传文件
      isImportSmall: false, // 是否上传小板
      isImportABL: false, // 是否ABL小板
      isImportBoth: false, // 是否上传主板小板
      // 进度条相关
      percentage_1: 0,
      percentage_2: 0,
      percentage_3: 0,
      percentage_4: 0,
      progress_text_1: this.$t('SchedulePanelPage.Progress1'), // '未开始训练预测模型|0%'
      progress_text_2: this.$t('SchedulePanelPage.Progress2'),
      progress_text_3: this.$t('SchedulePanelPage.Progress3'),
      progress_text_4: this.$t('SchedulePanelPage.Progress4'),
      // 排程结果
      schedule_run_time: this.$t('SchedulePanelPage.TextScheduleRunTime1'), // 排程时间 未开始 计算完毕，共耗时：00 时 00 分 00 秒
      schedule_time: '', // 排程时间
      schedule_mode: '', // 正排或预排
      schedule_result: [{
        schedule_type: '',
        obj_value: '',
        idle_value: '',
        overdue_value: '',
        enable: '',
        line_balance: ''
      }],
      progress_refresh: null, // 刷新进度条
      apsMtoolMsg: this.$t('PublicText.MesApiNotUpdate'), // 钢网信息更新提示
      apsProgramMsg: this.$t('PublicText.MesApiNotUpdate'), // 程序信息更新提示
      apsMoProgData: this.$t('PublicText.MesApiNotUpdate'), // 更新工单进度提示
      apsMoBaseData: this.$t('PublicText.MesApiNotUpdate'), // 更新齐套信息提示
      apsDeliveryDay: this.$t('PublicText.MesApiNotUpdate'), // 更新包装时间提示
      stopScheduleDialog: false, // 终止计算排程dialog
      stopInput: '', // 确认终止
      trainDateTip: '', // 训练日期提示
      activeName: process.env.VUE_APP_BASE_SCHEDULE_TYPE,
      mainUploadName: this.$t('SchedulePanelPage.TextMainUploadName'),
      smallUploadName: this.$t('SchedulePanelPage.TextSmallUploadName'),
      saveApsOutPutCountTip: this.$t('PublicText.MesApiPush'),
      clickComputeCount: 0, // 点击计算排程的次数
      pack_holiday_day_list: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'buttons',
      'language'
    ])
  },
  created() {
    this.listenProgress()
    this.getScheduleRes()
  },
  mounted() {

  },
  methods: {
    // dialog可拖拽
    handleDrag() {
      // this.$refs.select.blur()
    },
    // 监听进度条
    listenProgress() {
      this.progress_refresh = setInterval(() => { // 每隔2秒监听进度条
        setTimeout(this.getProgress(), 0)
      }, 10 * 1000)
    },
    // 取消监听进度条
    clearListenProgress() {
      clearInterval(this.progress_refresh)
      this.progress_refresh = null
    },
    // 终止计算排程
    handleCloseStop() {
      this.stopScheduleDialog = false
      this.stopInput = ''
    },
    stopSchedule() {
      GetRunFlag().then(res => {
        if (res.run_flag !== 1) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextNoNeedStopTabu')
          })
        } else {
          this.stopScheduleDialog = true
        }
      })
    },
    confirmStopSchedule() {
      if (this.stopInput !== this.$t('SchedulePanelPage.TextStopCompute2')) {
        this.$message({
          type: 'error',
          message: this.$t('PublicText.TextError')
        })
      } else {
        StopSchedule(this.name).then(res => {
          if (res.code === 20000) {
            this.$alert(res.message, this.$t('PublicText.TitleTip'), {
              confirmButtonText: this.$t('PublicBtn.Confirm'),
              type: 'success'
            })
            setTimeout(() => {
              this.handleCloseStop()
            }, 1000)
          }
        })
      }
    },
    getScheduleRes() {
      GeScheduleRes().then(res => {
        if (res.code === 20000) {
          this.schedule_result = res.table_data
          this.schedule_mode = res.mode
          this.schedule_time = res.date
          this.trainDateTip = this.$t('SchedulePanelPage.TextCurrentTrainDate') + res.train_date
          this.pack_holiday_day_list = res.pack_holiday_day_list
        }
      })
    },
    // 获取进度条
    getProgress() {
      GetProgress().then(res => {
        // 更新进度条
        this.percentage_1 = res.p0
        this.percentage_2 = res.p1
        this.percentage_3 = res.p2
        this.percentage_4 = res.p3
        this.progress_text_1 = res.p0text
        this.progress_text_2 = res.p1text
        this.progress_text_3 = res.p2text
        this.progress_text_4 = res.p3text
        // 程序运行时间
        const start_time = res.start_time
        const end_time = res.end_time
        const time = end_time - start_time
        const second = parseInt(time % 60)
        const minute = parseInt((time / 60) % 60)
        const hour = parseInt((time / (60 * 60)) % 24)
        if (res.run_flag === -1) {
          this.clearListenProgress()
          this.schedule_run_time = this.$t('SchedulePanelPage.TextScheduleRunTime2')
          this.$alert(this.$t('SchedulePanelPage.TextScheduleRunTime2') + ':' + res.err_message, this.$t('PublicText.TextError'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'error'
          })
          this.schedule_run_time = this.$t('SchedulePanelPage.TextScheduleRunTime4') + hour.toString() + ' h ' + minute.toString() + ' m ' + second.toString() + ' s'
        } else if (res.run_flag === 1) {
          this.schedule_run_time = this.$t('SchedulePanelPage.TextScheduleRunTime3') + hour.toString() + ' h ' + minute.toString() + ' m ' + second.toString() + ' s'
        } else if (res.run_flag === 2) {
          this.clearListenProgress()
          this.schedule_run_time = this.$t('SchedulePanelPage.TextScheduleRunTime5') + hour.toString() + ' h ' + minute.toString() + ' m ' + second.toString() + ' s'
          this.getScheduleRes() // 获取排程结果
        } else {
          this.schedule_run_time = this.$t('SchedulePanelPage.TextScheduleRunTime1')
        }
      })
    },
    // 计算主板排程
    computeDialogMain() {
      this.computeMainDialogVisible = true
    },
    // 计算小板排程
    computeDialogSmall() {
      this.computeSmallDialogVisible = true
    },
    // 计算小板排程
    computeDialogABL() {
      this.computeABLDialogVisible = true
    },
    // 计算主板+小板
    computeDialogBoth() {
      this.computeBothDialogVisible = true
      this.getUploadFileTime()
    },
    // 关闭计算主板
    handleCloseMain() {
      this.clickComputeCount = 0
      this.computeMainDialogVisible = false
    },
    // 关闭计算小板
    handleCloseSmall() {
      this.clickComputeCount = 0
      this.computeSmallDialogVisible = false
    },
    // 关闭计算ABL
    handleCloseABL() {
      this.clickComputeCount = 0
      this.computeABLDialogVisible = false
    },
    // 关闭计算主板+小板
    handleCloseBoth() {
      this.clickComputeCount = 0
      this.computeBothDialogVisible = false
    },
    // 主板文件上传钩子
    handleChangeMain(file, fileList) {
      const fileName = file.name.replace(/\.xlsx$/, '')
      let regex, TextFileTypeError2
      if (this.language === 'zh') {
        regex = /^(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])(主板)(正排|预排).*$/
        TextFileTypeError2 = '（正确文件名示例：0901主板预排）'
      } else {
        regex = /^(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])_(MainBoard)_(Preliminary|Regular).*$/
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
      if (file.status === 'ready') {
        if (fileList.length > 0) {
          this.uploadFileListMain = [fileList[fileList.length - 1]] // 选择最后一次选择文件
          this.uploadFileNameMain = this.uploadFileListMain[0].name // 更新文件名
          this.uploadFileMain = this.uploadFileListMain[0].raw // 更新文件
        }
        this.doCheckScheduleData(this.uploadFileMain, this.uploadFileNameMain)
      }
    },
    // 小板文件上传钩子
    handleChangeSmall(file, fileList) {
      const fileName = file.name.replace(/\.xlsx$/, '')
      let regex, TextFileTypeError2
      if (this.language === 'zh') {
        regex = /^(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])(小板)(正排|预排).*$/
        TextFileTypeError2 = '（正确文件名示例：0901主板预排）'
      } else {
        regex = /^(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])_(SmallBoard)_(Preliminary|Regular).*$/
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
      if (file.status === 'ready') {
        if (fileList.length > 0) {
          this.uploadFileListSmall = [fileList[fileList.length - 1]] // 选择最后一次选择文件
          this.uploadFileNameSmall = this.uploadFileListSmall[0].name // 更新文件名
          this.uploadFileSmall = this.uploadFileListSmall[0].raw // 更新文件
        }
        this.doCheckScheduleData(this.uploadFileSmall, this.uploadFileNameSmall)
      }
    },
    // ABL文件上传钩子
    handleChangeABL(file, fileList) {
      const fileName = file.name.replace(/\.xlsx$/, '')
      let regex, TextFileTypeError2
      if (this.language === 'zh') {
        regex = /^(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])(ABL)(正排|预排).*$/
        TextFileTypeError2 = '（正确文件名示例：0901ABL预排）'
      } else {
        regex = /^(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])_(ABLBoard)_(Preliminary|Regular).*$/
        TextFileTypeError2 = '(Example of correct file name: 0901_ABLBoard_Regular.xlsx)'
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
      if (file.status === 'ready') {
        if (fileList.length > 0) {
          this.uploadFileListABL = [fileList[fileList.length - 1]] // 选择最后一次选择文件
          this.uploadFileNameABL = this.uploadFileListABL[0].name // 更新文件名
          this.uploadFileABL = this.uploadFileListABL[0].raw // 更新文件
        }
        this.doCheckScheduleData(this.uploadFileABL, this.uploadFileNameABL)
      }
    },
    // 检查
    async doCheckScheduleData(uploadFile, uploadFileName) {
      this.loadingInstance = Loading.service(this.checkLoading)
      const form = new FormData()
      form.append('file', uploadFile)
      form.append('file_name', uploadFileName)
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
        if (this.uploadFileNameMain !== '') {
          this.stepNowMain = 1
        }
        if (this.uploadFileNameSmall !== '') {
          this.stepNowSmall = 1
        }
        if (this.uploadFileNameABL !== '') {
          this.stepNowABL = 1
        }
        if (this.uploadFileNameMain !== '' && this.uploadFileNameSmall !== '') {
          this.stepNowBoth = 1
        }
        this.loadingInstance.close()
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(this.$t('SchedulePanelPage.TextCheckError') + err, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'error'
        })
      })
    },
    // 获取主板上传的文件
    getUploadFileMain() {
      DownloadUploadFileMain().then(res => {
        this.uploadFileNameMain = res.file_name
        this.stepNowMain = 1
        if (this.uploadFileListMain !== '' && this.uploadFileListSmall !== '') {
          this.stepNowBoth = 1
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          message: this.$t('SchedulePanelPage.TextFailedToGet'),
          type: 'error'
        })
      })
    },
    // 获取小板上传的文件
    getUploadFileSmall() {
      DownloadUploadFileSmall().then(res => {
        this.uploadFileNameSmall = res.file_name
        this.stepNowSmall = 1
        if (this.uploadFileNameMain !== '' && this.uploadFileNameSmall !== '') {
          this.stepNowBoth = 1
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          message: this.$t('SchedulePanelPage.TextFailedToGet'),
          type: 'error'
        })
      })
    },
    // 获取文件上传时间
    getUploadFileTime() {
      GetUploadFileTime().then(res => {
        if (res.code === 20000) {
          this.mainUploadName = this.$t('SchedulePanelPage.TextGetMainUploadTime') + res.main_time
          this.smallUploadName = this.$t('SchedulePanelPage.TextGetSmallUploadTime') + res.small_time
        }
      })
    },
    // 终止深度搜索
    stopTabu() {
      this.$confirm(this.$t('SchedulePanelPage.TextStopTabu'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        type: 'warning'
      }).then(() => {
        StopTabu(this.name).then(res => {
          if (res.code === 20000) {
            this.$message({
              message: res.message,
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // 训练预测模型
    trainModel() {
      GetRunFlag().then(res => {
        if (res.run_flag === 1) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextTrainTip')
          })
        } else {
          this.listenProgress()
          TrainModel({ 'end_time': this.trainDate }).then(res => {
            if (res.code === 20000) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.trainDateTip = this.$t('SchedulePanelPage.TextCurrentTrainDate') + res.train_date
            }
          })
        }
      })
    },
    // 导入后更新接口更新提示
    clearUpdateMag() {
      this.apsMtoolMsg = this.$t('PublicText.MesApiNotUpdate')
      this.apsProgramMsg = this.$t('PublicText.MesApiNotUpdate')
      this.apsMoBaseData = this.$t('PublicText.MesApiNotUpdate')
      this.apsMoProgData = this.$t('PublicText.MesApiNotUpdate')
      this.apsDeliveryDay = this.$t('PublicText.MesApiNotUpdate')
    },
    // 更新步骤条
    updateApiStepMsg() {
      this.stepNowBoth = 3
      this.stepNowMain = 3
      this.stepNowABL = 3
      this.stepNowSmall = 3
    },
    // 导入主板前判断是否在跑排程
    beforeImportMain() {
      if (this.uploadFileNameMain === '') {
        this.$message({
          type: 'warning',
          message: this.$t('SchedulePanelPage.TextComputeTip1')
        })
        return
      }
      GetRunFlag().then(res => {
        if (res.run_flag === 1 || res.ana_run_flag === 1) {
          var confirmText
          if (res.run_flag === 1) {
            confirmText = [this.$t('SchedulePanelPage.TextComputeTip3'), this.$t('SchedulePanelPage.TextComputeTip2')]
          } else if (res.ana_run_flag === 1) {
            confirmText = [this.$t('SchedulePanelPage.TextComputeTip4'), this.$t('SchedulePanelPage.TextComputeTip2')]
          } else {
            confirmText = [this.$t('SchedulePanelPage.TextComputeTip5'), this.$t('SchedulePanelPage.TextComputeTip2')]
          }
          const newDatas = []
          const h = this.$createElement
          for (const i in confirmText) {
            newDatas.push(h('p', null, confirmText[i]))
          }
          this.$confirm(this.$t('PublicText.TextWarn'), {
            title: this.$t('PublicText.TextWarn'),
            message: h('div', null, newDatas),
            confirmButtonText: this.$t('SchedulePanelPage.BtnContinueImport'),
            cancelButtonText: this.$t('PublicBtn.Cancel'),
            confirmButtonClass: 'btnDanger',
            type: 'warning'
          }).then(() => {
            this.submitUploadFile(1)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('PublicText.TextCancel')
            })
          })
        } else {
          this.submitUploadFile(1)
        }
      })
    },
    // 计算主板前判断是否在跑排程
    beforeComputeMain() {
      if (this.isImportMain === false) {
        this.$message({
          type: 'warning',
          message: this.$t('SchedulePanelPage.TextComputeTip7')
        })
        return
      }
      if (this.clickComputeCount >= 1) {
        this.$message({
          type: 'warning',
          message: this.$t('SchedulePanelPage.TextComputeTip8')
        })
        return
      }
      GetRunFlag().then(res => {
        if (res.run_flag === 1 || res.ana_run_flag === 1) {
          var confirmText
          if (res.run_flag === 1) {
            confirmText = [this.$t('SchedulePanelPage.TextComputeTip3'), this.$t('SchedulePanelPage.TextComputeTip2')]
          } else if (res.ana_run_flag === 1) {
            confirmText = [this.$t('SchedulePanelPage.TextComputeTip4'), this.$t('SchedulePanelPage.TextComputeTip2')]
          } else {
            confirmText = [this.$t('SchedulePanelPage.TextComputeTip5'), this.$t('SchedulePanelPage.TextComputeTip2')]
          }
          const newDatas = []
          const h = this.$createElement
          for (const i in confirmText) {
            newDatas.push(h('p', null, confirmText[i]))
          }
          this.$confirm(this.$t('PublicText.TextWarn'), {
            title: this.$t('PublicText.TextWarn'),
            message: h('div', null, newDatas),
            confirmButtonText: this.$t('SchedulePanelPage.BtnContinueCompute'),
            cancelButtonText: this.$t('PublicBtn.Cancel'),
            confirmButtonClass: 'btnDanger',
            type: 'warning'
          }).then(() => {
            this.computeScheduleMain()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('PublicText.TextCancel')
            })
          })
        } else {
          this.computeScheduleMain()
        }
      })
    },
    // 开始计算更新排程显示信息
    refreshComputeShow(res) {
      this.schedule_result = res.table_data
      this.schedule_mode = res.mode
      this.schedule_time = res.date
      this.trainDateTip = this.$t('SchedulePanelPage.TextCurrentTrainDate') + res.train_date
    },
    // 开始计算主板排程
    computeScheduleMain() {
      this.clickComputeCount = 1
      this.listenProgress()
      var is_click_apsMoProgData
      if (this.apsMoProgData === this.$t('PublicText.MesApiNotUpdate')) {
        is_click_apsMoProgData = true
      } else {
        is_click_apsMoProgData = false
      }
      const data = {
        'file_name_main': this.uploadFileNameMain,
        'user_name': this.name,
        'is_click_apsMoProgData': is_click_apsMoProgData
      }
      ComputeScheduleMain(data).then(res => {
        if (res.code === 20000) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.stepNowMain = 4
          this.refreshComputeShow(res)
        } else {
          this.$message({
            message: this.$t('SchedulePanelPage.TextComputeTip11'),
            type: 'error'
          })
        }
      })
    },
    // 导入小板前判断是否在跑排程
    beforeImportSmall() {
      if (this.uploadFileNameSmall === '') {
        this.$message({
          type: 'warning',
          message: this.$t('SchedulePanelPage.TextComputeTip1')
        })
        return
      }
      GetRunFlag().then(res => {
        var confirmText
        if (res.run_flag === 1) {
          confirmText = [this.$t('SchedulePanelPage.TextComputeTip3'), this.$t('SchedulePanelPage.TextComputeTip2')]
        } else if (res.ana_run_flag === 1) {
          confirmText = [this.$t('SchedulePanelPage.TextComputeTip4'), this.$t('SchedulePanelPage.TextComputeTip2')]
        } else {
          confirmText = [this.$t('SchedulePanelPage.TextComputeTip5'), this.$t('SchedulePanelPage.TextComputeTip2')]
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
            confirmButtonText: this.$t('SchedulePanelPage.BtnContinueImport'),
            cancelButtonText: this.$t('PublicBtn.Cancel'),
            confirmButtonClass: 'btnDanger',
            type: 'warning'
          }).then(() => {
            this.submitUploadFile(2)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('PublicText.TextCancel')
            })
          })
        } else {
          this.submitUploadFile(2)
        }
      })
    },
    // 计算小板前判断是否在跑排程
    beforeComputeSmall() {
      if (this.isImportSmall === false) {
        this.$message({
          type: 'warning',
          message: this.$t('SchedulePanelPage.TextComputeTip7')
        })
        return
      }
      if (this.clickComputeCount >= 1) {
        this.$message({
          type: 'warning',
          message: this.$t('SchedulePanelPage.TextComputeTip8')
        })
        return
      }
      const confirmText = [this.$t('SchedulePanelPage.TextComputeTip9'), this.$t('SchedulePanelPage.TextComputeTip10')]
      const newDatas = []
      const h = this.$createElement
      for (const i in confirmText) {
        newDatas.push(h('p', null, confirmText[i]))
      }
      GetRunFlag().then(res => {
        if (res.run_flag === 1 || res.ana_run_flag === 1) {
          this.$confirm(this.$t('PublicText.TextWarn'), {
            title: this.$t('PublicText.TextWarn'),
            message: h('div', null, newDatas),
            confirmButtonText: this.$t('SchedulePanelPage.BtnContinueCompute'),
            cancelButtonText: this.$t('PublicBtn.Cancel'),
            confirmButtonClass: 'btnDanger',
            type: 'warning'
          }).then(() => {
            this.computeScheduleSmall()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('PublicText.TextCancel')
            })
          })
        } else {
          this.computeScheduleSmall()
        }
      })
    },
    // 开始计算小板排程
    computeScheduleSmall() {
      this.clickComputeCount = 1
      this.listenProgress()
      var is_click_apsMoProgData
      if (this.apsMoProgData === this.$t('PublicText.MesApiNotUpdate')) {
        is_click_apsMoProgData = true
      } else {
        is_click_apsMoProgData = false
      }
      const data = {
        'file_name_small': this.uploadFileNameSmall,
        'user_name': this.name,
        'is_click_apsMoProgData': is_click_apsMoProgData
      }
      ComputeScheduleSmall(data).then(res => {
        if (res.code === 20000) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.stepNowSmall = 4
          this.refreshComputeShow(res)
        } else {
          this.$message({
            message: this.$t('SchedulePanelPage.TextComputeTip11'),
            type: 'error'
          })
        }
      })
    },
    // 导入ABL前判断是否在跑排程
    beforeImportABL() {
      if (this.uploadFileNameABL === '') {
        this.$message({
          type: 'warning',
          message: this.$t('SchedulePanelPage.TextComputeTip1')
        })
        return
      }
      GetRunFlag().then(res => {
        var confirmText
        if (res.run_flag === 1) {
          confirmText = [this.$t('SchedulePanelPage.TextComputeTip3'), this.$t('SchedulePanelPage.TextComputeTip2')]
        } else if (res.ana_run_flag === 1) {
          confirmText = [this.$t('SchedulePanelPage.TextComputeTip4'), this.$t('SchedulePanelPage.TextComputeTip2')]
        } else {
          confirmText = [this.$t('SchedulePanelPage.TextComputeTip5'), this.$t('SchedulePanelPage.TextComputeTip2')]
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
            confirmButtonText: this.$t('SchedulePanelPage.BtnContinueImport'),
            cancelButtonText: this.$t('PublicBtn.Cancel'),
            confirmButtonClass: 'btnDanger',
            type: 'warning'
          }).then(() => {
            this.submitUploadFile(3)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('PublicText.TextCancel')
            })
          })
        } else {
          this.submitUploadFile(3)
        }
      })
    },
    // 计算ABL前判断是否在跑排程
    beforeComputeABL() {
      if (this.isImportABL === false) {
        this.$message({
          type: 'warning',
          message: this.$t('SchedulePanelPage.TextComputeTip7')
        })
        return
      }
      if (this.clickComputeCount >= 1) {
        this.$message({
          type: 'warning',
          message: this.$t('SchedulePanelPage.TextComputeTip8')
        })
        return
      }
      const confirmText = [this.$t('SchedulePanelPage.TextComputeTip9'), this.$t('SchedulePanelPage.TextComputeTip10')]
      const newDatas = []
      const h = this.$createElement
      for (const i in confirmText) {
        newDatas.push(h('p', null, confirmText[i]))
      }
      GetRunFlag().then(res => {
        if (res.run_flag === 1 || res.ana_run_flag === 1) {
          this.$confirm(this.$t('PublicText.TextWarn'), {
            title: this.$t('PublicText.TextWarn'),
            message: h('div', null, newDatas),
            confirmButtonText: this.$t('SchedulePanelPage.BtnContinueCompute'),
            cancelButtonText: this.$t('PublicBtn.Cancel'),
            confirmButtonClass: 'btnDanger',
            type: 'warning'
          }).then(() => {
            this.computeScheduleABL()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('PublicText.TextCancel')
            })
          })
        } else {
          this.computeScheduleABL()
        }
      })
    },
    // 开始计算ABL排程
    computeScheduleABL() {
      this.clickComputeCount = 1
      this.listenProgress()
      var is_click_apsMoProgData
      if (this.apsMoProgData === this.$t('PublicText.MesApiNotUpdate')) {
        is_click_apsMoProgData = true
      } else {
        is_click_apsMoProgData = false
      }
      const data = {
        'file_name_abl': this.uploadFileNameABL,
        'user_name': this.name,
        'is_click_apsMoProgData': is_click_apsMoProgData
      }
      ComputeScheduleABL(data).then(res => {
        if (res.code === 20000) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.stepNowABL = 4
          this.refreshComputeShow(res)
        } else {
          this.$message({
            message: this.$t('SchedulePanelPage.TextComputeTip11'),
            type: 'error'
          })
        }
      })
    },
    // 导入排程
    async submitUploadFile(mode) {
      this.clickComputeCount = 0
      this.loadingInstance = Loading.service(this.importLoading)
      const form = {}
      if (mode === 1) {
        form['file_name'] = this.uploadFileNameMain
      } else if (mode === 2) {
        form['file_name'] = this.uploadFileNameSmall
      } else if (mode === 3) {
        form['file_name'] = this.uploadFileNameABL
      } else {
        return
      }
      await ImportSchedule(form).then(res => {
        this.loadingInstance.close()
        this.$message({
          message: res.message,
          type: 'success'
        })
        if (mode === 1) {
          this.stepNowMain = 2
          this.isImportMain = true
        } else if (mode === 2) {
          this.stepNowSmall = 2
          this.isImportSmall = true
        } else if (mode === 3) {
          this.stepNowABL = 2
          this.isImportABL = true
        }
        this.clearUpdateMag()
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(err, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'error'
        })
      })
    },
    beforeImportBoth() {
      if (this.uploadFileNameMain === '' || this.uploadFileNameSmall === '') {
        this.$message({
          type: 'warning',
          message: this.$t('SchedulePanelPage.TextComputeTip6')
        })
        return
      }
      GetRunFlag().then(res => {
        var confirmText
        if (res.run_flag === 1) {
          confirmText = [this.$t('SchedulePanelPage.TextComputeTip3'), this.$t('SchedulePanelPage.TextComputeTip2')]
        } else if (res.ana_run_flag === 1) {
          confirmText = [this.$t('SchedulePanelPage.TextComputeTip4'), this.$t('SchedulePanelPage.TextComputeTip2')]
        } else {
          confirmText = [this.$t('SchedulePanelPage.TextComputeTip5'), this.$t('SchedulePanelPage.TextComputeTip2')]
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
            confirmButtonText: this.$t('SchedulePanelPage.BtnContinueImport'),
            cancelButtonText: this.$t('PublicBtn.Cancel'),
            confirmButtonClass: 'btnDanger',
            type: 'warning'
          }).then(() => {
            this.submitUploadFileBoth()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('PublicText.TextCancel')
            })
          })
        } else {
          this.submitUploadFileBoth()
        }
      })
    },
    async submitUploadFileBoth() {
      this.clickComputeCount = 0
      this.loadingInstance = Loading.service(this.importLoading)
      const form = {
        'file_main': this.uploadFileNameMain,
        'file_small': this.uploadFileNameSmall
      }
      await ImportScheduleBoth(form).then(res => {
        this.loadingInstance.close()
        this.$message({
          message: res.message,
          type: 'success'
        })
        this.stepNowBoth = 2
        this.isImportBoth = true
        this.clearUpdateMag()
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(err, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'error'
        })
      })
    },
    beforeComputeBoth() {
      if (this.isImportBoth === false) {
        this.$message({
          type: 'warning',
          message: this.$t('SchedulePanelPage.TextComputeTip7')
        })
        return
      }
      if (this.clickComputeCount >= 1) {
        this.$message({
          type: 'warning',
          message: this.$t('SchedulePanelPage.TextComputeTip8')
        })
        return
      }
      const confirmText = [this.$t('SchedulePanelPage.TextComputeTip9'), this.$t('SchedulePanelPage.TextComputeTip10')]
      const newDatas = []
      const h = this.$createElement
      for (const i in confirmText) {
        newDatas.push(h('p', null, confirmText[i]))
      }
      GetRunFlag().then(res => {
        if (res.run_flag === 1 || res.ana_run_flag === 1) {
          this.$confirm(this.$t('PublicText.TextWarn'), {
            title: this.$t('PublicText.TextWarn'),
            message: h('div', null, newDatas),
            confirmButtonText: this.$t('SchedulePanelPage.BtnContinueCompute'),
            cancelButtonText: this.$t('PublicBtn.Cancel'),
            confirmButtonClass: 'btnDanger',
            type: 'warning'
          }).then(() => {
            this.computeScheduleBoth()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('PublicText.TextCancel')
            })
          })
        } else {
          this.computeScheduleBoth()
        }
      })
    },
    computeScheduleBoth() {
      this.clickComputeCount = 1
      this.listenProgress()
      var is_click_apsMoProgData
      if (this.apsMoProgData === this.$t('PublicText.MesApiNotUpdate')) {
        is_click_apsMoProgData = true
      } else {
        is_click_apsMoProgData = false
      }
      const data = {
        'file_name_main': this.uploadFileNameMain,
        'file_name_small': this.uploadFileNameSmall,
        'is_click_apsMoProgData': is_click_apsMoProgData,
        'user_name': this.name
      }
      ComputeScheduleBoth(data).then(res => {
        if (res.code === 20000) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.stepNowBoth = 4
          this.refreshComputeShow(res)
        } else {
          this.$message({
            message: this.$t('SchedulePanelPage.TextComputeTip11'),
            type: 'error'
          })
        }
      })
    },
    // 更新钢网信息前的提示
    getApsMtool(mode) {
      const tip = this.$t('SchedulePanelPage.TextApiUploadTip1') + `<br/>` + this.$t('SchedulePanelPage.TextApiUploadTip2')
      GetRunFlag().then(res => {
        if (res.run_flag === 1) {
          this.$alert(tip, this.$t('PublicText.TextWarn'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            dangerouslyUseHTMLString: true,
            type: 'warning'
          })
        } else {
          this.continueGetApsMtool(mode)
        }
      })
    },
    // 更新钢网信息
    continueGetApsMtool(mode) {
      if (mode === 'main') {
        if (this.isImportMain === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else if (mode === 'small') {
        if (this.isImportSmall === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else if (mode === 'abl') {
        if (this.isImportABL === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else if (mode === 'both') {
        if (this.isImportBoth === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else {
        return
      }
      this.$confirm(this.$t('PublicText.TitleTip'), {
        title: this.$t('PublicText.TitleTip'),
        message: this.$t('SchedulePanelPage.TextApiUploadTip4'),
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        type: 'warning'
      }).then(() => {
        const updateLoading = {
          title: this.$t('PublicText.MesApiUpdating'),
          background: 'rgba(0, 0, 0, 0.5)'
        }
        this.loadingInstance = Loading.service(updateLoading)
        GetApsMtool().then(res => {
          if (res.code === 20000) {
            this.loadingInstance.close()
            this.$alert(res.message, this.$t('PublicText.TitleTip'), {
              confirmButtonText: this.$t('PublicBtn.Confirm'),
              type: res.message_type
            })
            this.apsMtoolMsg = this.$t('PublicText.MesApiUpdate')
            if (mode === 'main') {
              this.stepNowMain = 3
            } else if (mode === 'small') {
              this.stepNowSmall = 3
            } else if (mode === 'abl') {
              this.stepNowABL = 3
            } else if (mode === 'both') {
              this.stepNowBoth = 3
            }
          }
        }).catch(err => {
          this.loadingInstance.close() // 清除动画
          this.$alert(err, this.$t('SchedulePanelPage.TextApiUploadTip5'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // 更新程序信息前的提示
    getApsProgram(mode) {
      const tip = this.$t('SchedulePanelPage.TextApiUploadTip1') + `<br/>` + this.$t('SchedulePanelPage.TextApiUploadTip2')
      GetRunFlag().then(res => {
        if (res.run_flag === 1) {
          this.$alert(tip, this.$t('PublicText.TextWarn'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            dangerouslyUseHTMLString: true,
            type: 'warning'
          })
        } else {
          this.continueGetApsProgram(mode)
        }
      })
    },
    // 更新程序信息
    continueGetApsProgram(mode) {
      if (mode === 'main') {
        if (this.isImportMain === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else if (mode === 'small') {
        if (this.isImportSmall === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else if (mode === 'abl') {
        if (this.isImportABL === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else if (mode === 'both') {
        if (this.isImportBoth === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else {
        return
      }
      this.$confirm(this.$t('PublicText.TitleTip'), {
        title: this.$t('PublicText.TitleTip'),
        message: this.$t('SchedulePanelPage.TextApiUploadTip4'),
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        type: 'warning'
      }).then(() => {
        const updateLoading = {
          title: this.$t('PublicText.MesApiUpdating'),
          background: 'rgba(0, 0, 0, 0.5)'
        }
        this.loadingInstance = Loading.service(updateLoading)
        GetApsProgram().then(res => {
          if (res.code === 20000) {
            this.loadingInstance.close()
            this.$alert(res.message, this.$t('PublicText.TitleTip'), {
              confirmButtonText: this.$t('PublicBtn.Confirm'),
              type: res.message_type
            })
            this.apsProgramMsg = this.$t('PublicText.MesApiUpdate')
            if (mode === 'main') {
              this.stepNowMain = 3
            } else if (mode === 'small') {
              this.stepNowSmall = 3
            } else if (mode === 'abl') {
              this.stepNowABL = 3
            } else if (mode === 'both') {
              this.stepNowBoth = 3
            }
          }
        }).catch(err => {
          this.loadingInstance.close() // 清除动画
          this.$alert(err, this.$t('SchedulePanelPage.TextApiUploadTip5'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // 更新齐套信息前的提示
    getApsMoBaseData(mode) {
      const tip = this.$t('SchedulePanelPage.TextApiUploadTip1') + `<br/>` + this.$t('SchedulePanelPage.TextApiUploadTip2')
      GetRunFlag().then(res => {
        if (res.run_flag === 1) {
          this.$alert(tip, this.$t('PublicText.TextWarn'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            dangerouslyUseHTMLString: true,
            type: 'warning'
          })
        } else {
          this.continueGetApsMoBaseData(mode)
        }
      })
    },
    // 更新齐套信息
    continueGetApsMoBaseData(mode) {
      if (mode === 'main') {
        if (this.isImportMain === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else if (mode === 'small') {
        if (this.isImportSmall === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else if (mode === 'abl') {
        if (this.isImportABL === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else if (mode === 'both') {
        if (this.isImportBoth === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else {
        return
      }
      this.$confirm(this.$t('PublicText.TitleTip'), {
        title: this.$t('PublicText.TitleTip'),
        message: this.$t('SchedulePanelPage.TextApiUploadTip4'),
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        type: 'warning'
      }).then(() => {
        const updateLoading = {
          title: this.$t('PublicText.MesApiUpdating'),
          background: 'rgba(0, 0, 0, 0.5)'
        }
        this.loadingInstance = Loading.service(updateLoading)
        GetApsMoBaseData().then(res => {
          if (res.code === 20000) {
            this.loadingInstance.close()
            this.$alert(res.message, this.$t('PublicText.TitleTip'), {
              confirmButtonText: this.$t('PublicBtn.Confirm'),
              type: res.message_type
            })
            this.apsMoBaseData = this.$t('PublicText.MesApiUpdate')
            if (mode === 'main') {
              this.stepNowMain = 3
            } else if (mode === 'small') {
              this.stepNowSmall = 3
            } else if (mode === 'abl') {
              this.stepNowABL = 3
            } else if (mode === 'both') {
              this.stepNowBoth = 3
            }
          }
        }).catch(err => {
          this.loadingInstance.close() // 清除动画
          this.$alert(err, this.$t('SchedulePanelPage.TextApiUploadTip5'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // 更新工单进度前的提示
    getApsMoProgData(mode) {
      const tip = this.$t('SchedulePanelPage.TextApiUploadTip1') + `<br/>` + this.$t('SchedulePanelPage.TextApiUploadTip2')
      GetRunFlag().then(res => {
        if (res.run_flag === 1) {
          this.$alert(tip, this.$t('PublicText.TextWarn'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            dangerouslyUseHTMLString: true,
            type: 'warning'
          })
        } else {
          this.continueGetApsMoProgData(mode)
        }
      })
    },
    // 更新工单进度
    continueGetApsMoProgData(mode) {
      if (mode === 'main') {
        if (this.isImportMain === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else if (mode === 'small') {
        if (this.isImportSmall === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else if (mode === 'abl') {
        if (this.isImportABL === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else if (mode === 'both') {
        if (this.isImportBoth === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else {
        return
      }
      this.$confirm(this.$t('PublicText.TitleTip'), {
        title: this.$t('PublicText.TitleTip'),
        message: this.$t('SchedulePanelPage.TextApiUploadTip4'),
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        type: 'warning'
      }).then(() => {
        const updateLoading = {
          title: this.$t('PublicText.MesApiUpdating'),
          background: 'rgba(0, 0, 0, 0.5)'
        }
        this.loadingInstance = Loading.service(updateLoading)
        GetApsMoProgData().then(res => {
          if (res.code === 20000) {
            this.loadingInstance.close()
            this.$alert(res.message, this.$t('PublicText.TitleTip'), {
              confirmButtonText: this.$t('PublicBtn.Confirm'),
              type: res.message_type
            })
            this.apsMoProgData = this.$t('PublicText.MesApiUpdate')
            if (mode === 'main') {
              this.stepNowMain = 3
            } else if (mode === 'small') {
              this.stepNowSmall = 3
            } else if (mode === 'abl') {
              this.stepNowABL = 3
            } else if (mode === 'both') {
              this.stepNowBoth = 3
            }
          }
        }).catch(err => {
          this.loadingInstance.close() // 清除动画
          this.$alert(err, this.$t('SchedulePanelPage.TextApiUploadTip5'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // 更新包装时间前的提示
    getApsDeliveryDay(mode) {
      const tip = this.$t('SchedulePanelPage.TextApiUploadTip1') + `<br/>` + this.$t('SchedulePanelPage.TextApiUploadTip2')
      GetRunFlag().then(res => {
        if (res.run_flag === 1) {
          this.$alert(tip, this.$t('PublicText.TextWarn'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            dangerouslyUseHTMLString: true,
            type: 'warning'
          })
        } else {
          this.continueGetApsDeliveryDay(mode)
        }
      })
    },
    // 更新包装时间
    continueGetApsDeliveryDay(mode) {
      if (mode === 'main') {
        if (this.isImportMain === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else if (mode === 'small') {
        if (this.isImportSmall === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else if (mode === 'abl') {
        if (this.isImportABL === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else if (mode === 'both') {
        if (this.isImportBoth === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextApiUploadTip3')
          })
          return
        }
      } else {
        return
      }
      this.$confirm(this.$t('PublicText.TitleTip'), {
        title: this.$t('PublicText.TitleTip'),
        message: this.$t('SchedulePanelPage.TextApiUploadTip4'),
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        type: 'warning'
      }).then(() => {
        const updateLoading = {
          title: this.$t('PublicText.MesApiUpdating'),
          background: 'rgba(0, 0, 0, 0.5)'
        }
        this.loadingInstance = Loading.service(updateLoading)
        GetApsDeliveryDay().then(res => {
          if (res.code === 20000) {
            this.loadingInstance.close()
            this.$alert(this.$t('SchedulePanelPage.TextApiUploadTip7'), this.$t('PublicText.TitleTip'), {
              confirmButtonText: this.$t('PublicBtn.Confirm'),
              type: 'success'
            })
            this.apsDeliveryDay = this.$t('PublicText.MesApiUpdate')
            if (mode === 'main') {
              this.stepNowMain = 3
            } else if (mode === 'small') {
              this.stepNowSmall = 3
            } else if (mode === 'abl') {
              this.stepNowABL = 3
            } else if (mode === 'both') {
              this.stepNowBoth = 3
            }
          }
        }).catch(err => {
          this.loadingInstance.close() // 清除动画
          this.$alert(err, this.$t('SchedulePanelPage.TextApiUploadTip5'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // 下载文件
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
    // 导出主板
    exportScheduleDataMain() {
      if (!this.isImportMain && !this.isImportBoth) {
        this.$message({
          message: this.$t('SchedulePanelPage.TextExportTip1'),
          type: 'warning'
        })
        return
      }
      ExportMainScheduleData().then(res => {
        this.downloadFile(res)
        this.$message({
          message: this.$t('Msg.BeginDownload'),
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          message: this.$t('SchedulePanelPage.TextExportTip2'),
          type: 'error'
        })
      })
    },
    // 导出小板
    exportScheduleDataSmall() {
      if (!this.isImportSmall && !this.isImportBoth) {
        this.$message({
          message: this.$t('SchedulePanelPage.TextExportTip1'),
          type: 'warning'
        })
        return
      }
      ExportSmallScheduleData().then(res => {
        this.downloadFile(res)
        this.$message({
          message: this.$t('Msg.BeginDownload'),
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          message: this.$t('SchedulePanelPage.TextExportTip2'),
          type: 'error'
        })
      })
    },
    // 导出ABL
    exportScheduleDataABL() {
      if (!this.isImportABL && !this.isImportBoth) {
        this.$message({
          message: this.$t('SchedulePanelPage.TextExportTip1'),
          type: 'warning'
        })
        return
      }
      ExportSmallScheduleData().then(res => {
        this.downloadFile(res)
        this.$message({
          message: this.$t('Msg.BeginDownload'),
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          message: this.$t('SchedulePanelPage.TextExportTip2'),
          type: 'error'
        })
      })
    },
    downloadFileBackend(file_key) {
      DownloadFile(file_key).then(res => {
        this.downloadFile(res)
        this.$message({
          message: this.$t('Msg.BeginDownload'),
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          message: this.$t('Msg.DownloadFail'),
          type: 'error'
        })
      })
    },
    // post_statistics() {
    //   this.$confirm(this.$t('PublicText.TitleTip'), {
    //     title: this.$t('PublicText.TitleTip'),
    //     message: this.$t('SchedulePanelPage.TextApiUploadTip6'),
    //     confirmButtonText: this.$t('PublicBtn.Confirm'),
    //     cancelButtonText: this.$t('PublicBtn.Cancel'),
    //     type: 'warning'
    //   }).then(() => {
    //     const pushLoading = {
    //       text: this.$t('PublicText.MesApiPushing'),
    //       background: 'rgba(0, 0, 0, 0.5)'
    //     } // 导入排程动画
    //     this.loadingInstance = Loading.service(pushLoading)
    //     const form = {
    //       'user_name': this.name
    //     }
    //     SaveApsOutPutCount(form).then(res => {
    //       if (res.code === 20000) {
    //         this.$alert(res.message, this.$t('PublicText.MesApiPushSuccess'), {
    //           confirmButtonText: this.$t('PublicBtn.Confirm'),
    //           type: 'success'
    //         })
    //         this.saveApsOutPutCountTip = this.$t('PublicBtn.MesApiPushed')
    //       } else {
    //         this.$alert(this.$t('PublicText.MesApiPushError'), this.$t('PublicText.TextError'), {
    //           confirmButtonText: this.$t('PublicBtn.Confirm'),
    //           type: 'error'
    //         })
    //       }
    //       this.loadingInstance.close() // 清除动画
    //     }).catch(err => {
    //       this.loadingInstance.close() // 清除动画
    //       this.$alert(err, this.$t('PublicText.TextError'), {
    //         confirmButtonText: this.$t('PublicBtn.Confirm'),
    //         type: 'error'
    //       })
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: this.$t('PublicText.TextCancel')
    //     })
    //   })
    // },
    beforeDoBucklePoints(upload_file_name) {
      if (upload_file_name.includes(this.$t('FileKeyWord.MainWord'))) {
        if (this.isImportMain === false && this.isImportBoth === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextBucklePoints1')
          })
          return
        }
      }
      if (upload_file_name.includes(this.$t('FileKeyWord.SmallWord'))) {
        if (this.isImportSmall === false && this.isImportBoth === false) {
          this.$message({
            type: 'warning',
            message: this.$t('SchedulePanelPage.TextBucklePoints1')
          })
          return
        }
      }
      var tip_message = this.$t('SchedulePanelPage.TextBucklePoints2')
      if (this.apsMoProgData !== this.$t('PublicText.MesApiUpdate')) {
        tip_message = this.$t('SchedulePanelPage.TextBucklePoints3')
      }
      this.doBucklePoints(upload_file_name, tip_message)
    },
    doBucklePoints(upload_file_name, tip_message) {
      this.$confirm(this.$t('PublicText.TitleTip'), {
        title: this.$t('PublicText.TitleTip'),
        message: tip_message,
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        type: 'warning'
      }).then(() => {
        const pushLoading = {
          text: this.$t('SchedulePanelPage.TextBucklePoints4'),
          background: 'rgba(0, 0, 0, 0.5)'
        } // 导入排程动画
        this.loadingInstance = Loading.service(pushLoading)
        const form = {
          'file_name': upload_file_name
        }
        DoBucklePoints(form).then(res => {
          if (res.code === 20000) {
            this.$alert(res.message, this.$t('SchedulePanelPage.TextBucklePoints5'), {
              confirmButtonText: this.$t('PublicBtn.Confirm'),
              type: 'success'
            })
          } else {
            this.$alert(this.$t('SchedulePanelPage.TextBucklePoints6'), this.$t('PublicText.TextError'), {
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    modifyHoliday() {
      this.$confirm(this.$t('SchedulePanelPage.TextModifyHoliday'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        type: 'warning'
      }).then(() => {
        const data = {}
        data['pack_holiday_day_list'] = this.pack_holiday_day_list
        data['user_name'] = this.name
        ModifyHoliday(data).then(res => {
          if (res.code === 20000) {
            this.$message({
              message: res.message,
              type: res.message_type
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/Control/SchedulePanel.scss';
</style>
<style>
.my-table .el-table th.is-leaf{
  border: none;
}
.my-table .el-table td{
  border: none;
}
.my-table  .el-table::before{
  height: 0;
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
.box-button {
  text-align: left;
}
.button-row {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.button-margin {
  margin-left: 10px;
}
</style>

