<template>
  <div id="main-box">
    <el-card>
      <el-row>
        <el-col :span="16">
          <div>
            <el-button v-if="buttons.includes('BlockTimeData/add')" type="primary" @click="addDataDialog">
              <i class="el-icon-plus" />{{ $t('TablePage.BtnAppend') }}
            </el-button>
            <el-button v-if="buttons.includes('BlockTimeData/addMultiDataDialog')" type="primary" @click="addMultiDataDialog">
              <i class="el-icon-plus" />{{ this.$t('BlockTimeDataPage.BtnAddMultiData') }}
            </el-button>
            <el-button v-if="buttons.includes('BlockTimeData/delete')" type="danger" @click="deleteData">
              <i class="el-icon-delete" />{{ $t('TablePage.BtnDelete') }}
            </el-button>
            <el-button v-if="buttons.includes('BlockTimeData/backupData')" type="backupBtn" @click="backupData">
              <i class="el-icon-document-copy" />{{ this.$t('BlockTimeDataPage.BtnBackupData') }}
            </el-button>
            <el-button v-if="buttons.includes('BlockTimeData/recoverBackupData')" type="backupBtn" @click="recoverBackupData">
              <i class="el-icon-refresh-left" />{{ this.$t('BlockTimeDataPage.BtnRecoverBackupData') }}
            </el-button>
            <el-button v-if="buttons.includes('BlockTimeData/manageBackupData')" type="backupBtn" @click="manageBackupData">
              <i class="el-icon-edit-outline" />{{ this.$t('BlockTimeDataPage.BtnManageBackupData') }}
            </el-button>
            <el-button v-if="buttons.includes('BlockTimeData/import')" @click="importDataDialog">
              <i class="el-icon-upload2" />{{ $t('TablePage.BtnImport') }}
            </el-button>
            <el-button v-if="buttons.includes('BlockTimeData/export')" @click="exportDataDialog">
              <i class="el-icon-download" />{{ $t('TablePage.BtnExport') }}
            </el-button>
            <el-button v-if="buttons.includes('BlockTimeData/export')" @click="addHolidayLinesDialog">
              {{ this.$t('BlockTimeDataPage.BtnAddHolidayLines') }}
            </el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="float: right;">
            <el-tooltip class="item" effect="dark" :content="$t('BlockTimeDataPage.TitleSyncData')" placement="top">
              <el-button
                v-if="buttons.includes('BlockTimeData/sync')"
                size="small"
                icon="el-icon-download"
                circle
                @click="beforeSyncDatabaseData"
              />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('TablePage.BtnRefreshTable')" placement="top">
              <el-button
                size="small"
                icon="el-icon-refresh"
                circle
                @click="refreshTableData"
              />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('TablePage.BtnViewInstruction')" placement="top">
              <el-button
                size="small"
                icon="el-icon-warning-outline"
                circle
                @click="helpTips"
              />
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
      <div class="table-box">
        <el-table
          id="mytable"
          v-loading="loading"
          :data="table_data"
          :header-cell-style="{background:'#eef1f6',color:'#606266', padding: '3px'}"
          :cell-style="{padding: '3px'}"
          :span-method="objectSpanMethod"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="line_name" :label="lang_dict.line_name" width="110" sortable />
          <el-table-column prop="start_time" :label="lang_dict.start_time" width="180" sortable />
          <el-table-column prop="end_time" :label="lang_dict.end_time" width="180" sortable />
          <!-- <el-table-column prop="lock_time" :label="lang_dict.lock_time" sortable /> -->
          <el-table-column prop="lock_time" width="180" :label="lang_dict.lock_time">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.flag === true" size="small" type="primary">{{ scope.row.lock_time }}</el-tag>
              <el-tag v-else-if="scope.row.flag === false" size="small" type="info">{{ $t('PublicBtn.Close') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="flag" :label="lang_dict.flag" width="160">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.flag === true" size="small" type="primary">{{ $t('PublicBtn.Open') }}</el-tag>
              <el-tag v-else-if="scope.row.flag === false" size="small" type="info">{{ $t('PublicBtn.Close') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="default_lock_time_flag" width="180" :label="lang_dict.default_lock_time_flag">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.default_lock_time_flag === true" size="small" type="primary">{{ $t('PublicBtn.Open') }}</el-tag>
              <el-tag v-else-if="scope.row.default_lock_time_flag === false" size="small" type="info">{{ $t('PublicBtn.Close') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :label="lang_dict.remark" />
          <el-table-column width="110" fixed="right" :label="$t('TablePage.TitleOperate')">
            <template slot-scope="scope">
              <el-button
                v-if="buttons.includes('BlockTimeData/modify')"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                circle
                @click="handleModify(scope.$index, scope.row)"
              />
              <el-button
                v-if="buttons.includes('BlockTimeData/delete')"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
                @click="handleDelete(scope.$index, scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          :hide-on-single-page="true"
          :page-size="pageSize"
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="total_num"
          style="margin-top: 16px;"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <el-dialog
      v-el-drag-dialog
      :title="$t('BlockTimeDataPage.BtnAddMultiData')"
      :visible.sync="dialogMultiVisible"
      width="76%"
      :before-close="handleMultiClose"
      @dragDialog="handleDrag"
    >
      <el-row style="margin-bottom: 3px;">
        <el-col :span="8">
          <el-input v-model="dayTimeText" class="textBtn" :placeholder="$t('Placeholder.Enter')" />
        </el-col>
        <el-col :span="8">
          <el-input v-model="nightTimeText" class="textBtn" :placeholder="$t('Placeholder.Enter')" />
        </el-col>
        <el-col :span="8">
          <el-input v-model="maintainTimeText" class="textBtn" :placeholder="$t('Placeholder.Enter')" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-date-picker
            v-model="dayTime"
            type="datetimerange"
            :range-separator="$t('PublicText.To')"
            :start-placeholder="$t('BlockTimeDataPage.DateTimeStart')"
            :end-placeholder="$t('BlockTimeDataPage.DateTimeEnd')"
            style="margin-bottom: 10px;"
          />
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="nightTime"
            type="datetimerange"
            :range-separator="$t('PublicText.To')"
            :start-placeholder="$t('BlockTimeDataPage.DateTimeStart')"
            :end-placeholder="$t('BlockTimeDataPage.DateTimeEnd')"
            style="margin-bottom: 10px;"
          />
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="maintainTime"
            type="datetimerange"
            :range-separator="$t('PublicText.To')"
            :start-placeholder="$t('BlockTimeDataPage.DateTimeStart')"
            :end-placeholder="$t('BlockTimeDataPage.DateTimeEnd')"
            style="margin-bottom: 10px;"
          />
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 3px;">
        <el-col :span="8">
          <el-input v-model="customTimeText" class="textBtn" :placeholder="$t('Placeholder.Enter')" />
        </el-col>
        <el-col :span="16">
          <el-input v-model="customTime2Text" class="textBtn" :placeholder="$t('Placeholder.Enter')" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-date-picker
            v-model="customTime"
            type="datetimerange"
            :range-separator="$t('PublicText.To')"
            :start-placeholder="$t('BlockTimeDataPage.DateTimeStart')"
            :end-placeholder="$t('BlockTimeDataPage.DateTimeEnd')"
            style="margin-bottom: 10px;"
          />
        </el-col>
        <el-col :span="16">
          <el-date-picker
            v-model="customDateTime"
            type="daterange"
            :range-separator="$t('PublicText.To')"
            :start-placeholder="$t('BlockTimeDataPage.DateStart')"
            :end-placeholder="$t('BlockTimeDataPage.DateEnd')"
            unlink-panels
          />
          <el-time-picker
            v-model="customHourTime"
            is-range
            :range-separator="$t('PublicText.To')"
            :start-placeholder="$t('BlockTimeDataPage.DateTimeStart')"
            :end-placeholder="$t('BlockTimeDataPage.DateTimeEnd')"
          />
        </el-col>
      </el-row>
      <el-table
        :data="tableDataMulti"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        max-height="460"
      >
        <el-table-column prop="line_name" :label="lang_dict.line_name" width="100" />
        <el-table-column prop="dayTime" :label="$t('BlockTimeDataPage.DayTime')" :render-header="renderHeaderDay">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.dayTime">{{ dayTimeText }}</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="nightTime" :label="$t('BlockTimeDataPage.NightTime')" :render-header="renderHeaderNight">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.nightTime">{{ nightTimeText }}</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="maintainTime" :label="$t('BlockTimeDataPage.MaintainTime')" :render-header="renderHeaderMaintain">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.maintainTime" style="margin-top: 5px;">{{ maintainTimeText }}</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="customTime" :label="$t('BlockTimeDataPage.CustomTime')" :render-header="renderHeaderCustom">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.customTime" style="margin-top: 5px;">{{ customTimeText }}</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="customTime2" :label="$t('BlockTimeDataPage.CustomTime2')" :render-header="renderHeaderCustom2">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.customTime2" style="margin-top: 5px;">{{ customTime2Text }}</el-checkbox>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleMultiClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button v-if="dialogBtnType === true" type="primary" @click="addMultiData">{{ $t('PublicBtn.Append') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="dialogTitle"
      :visible.sync="dataDialogVisible"
      width="60%"
      :before-close="handleFormClose"
      @dragDialog="handleDrag"
    >
      <el-form ref="$form" :model="model" label-position="left" size="small">
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.line_name" prop="line_name" :label="lang_dict.line_name">
              <el-select v-model="model.line_name" :placeholder="$t('Placeholder.Select')" :style="{width: '100%'}">
                <el-option v-for="(item) in lineOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="!!item.disabled" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.start_time" prop="start_time" :label="lang_dict.start_time">
              <el-date-picker v-model="model.start_time" value-format="yyyy-MM-dd HH:00:00" type="datetime" :placeholder="$t('Placeholder.Select')" format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.end_time" prop="end_time" :label="lang_dict.end_time">
              <el-date-picker v-model="model.end_time" value-format="yyyy-MM-dd HH:00:00" type="datetime" :placeholder="$t('Placeholder.Select')" format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="model.lock_time ? rules.flag:[{required: false, trigger: 'blur'}]" prop="flag" :label="lang_dict.flag">
              <el-switch v-model="model.flag" :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="model.flag===true ? rules.lock_time:[{required: false, trigger: 'blur'}]" prop="lock_time" :label="lang_dict.lock_time">
              <el-date-picker v-model="model.lock_time" type="datetime" :placeholder="$t('Placeholder.Select')" value-format="yyyy-MM-dd HH:00:00" :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.default_lock_time_flag" prop="default_lock_time_flag" :label="lang_dict.default_lock_time_flag">
              <el-switch v-model="model.default_lock_time_flag" :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.remark" prop="remark" :label="lang_dict.remark">
              <el-input v-model="model.remark" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.CREATED_BY" prop="CREATED_BY" :label="lang_dict.CREATED_BY">
              <el-input v-model="model.CREATED_BY" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.CREATED_TIME" prop="CREATED_TIME" :label="lang_dict.CREATED_TIME">
              <el-input v-model="model.CREATED_TIME" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.UPDATED_BY" prop="UPDATED_BY" :label="lang_dict.UPDATED_BY">
              <el-input v-model="model.UPDATED_BY" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.UPDATED_TIME" prop="UPDATED_TIME" :label="lang_dict.UPDATED_TIME">
              <el-input v-model="model.UPDATED_TIME" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFormClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button v-if="dialogBtnType === true" type="primary" @click="addDataAndContinue">{{ this.$t('TablePage.BtnAppendContinue') }}</el-button>
        <el-button v-if="dialogBtnType === true" type="primary" @click="addData">{{ $t('TablePage.BtnAppend') }}</el-button>
        <el-button v-else-if="dialogBtnType === false" type="primary" @click="modifyData">{{ $t('TablePage.BtnModify') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('TablePage.TitleFormDescription')"
      :visible.sync="helpDialogVisible"
      width="60%"
      @dragDialog="handleDrag"
    >
      <p>{{ $t('BlockTimeDataPage.TextBackupData1') }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="helpDialogVisible = false">{{ $t('PublicBtn.Close') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('BlockTimeDataPage.BtnBackupData')"
      :visible.sync="backupDialog"
      width="30%"
      :before-close="handleCloseBackup"
      @dragDialog="handleDrag"
    >
      <span style="font-size:16px;">{{ $t('BlockTimeDataPage.TextBackupData1') }}</span>
      <el-input v-model="backupName" :placeholder="$t('Placeholder.Enter')" style="width: 200px;" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseBackup">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="primary" @click="confirmBackup">{{ $t('PublicBtn.Confirm') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('BlockTimeDataPage.BtnRecoverBackupData')"
      :visible.sync="recoverBackupDialog"
      width="30%"
      :before-close="handleCloseRecoverBackup"
      @dragDialog="handleDrag"
    >
      <span style="font-size:16px;">{{ $t('BlockTimeDataPage.TextBackupData3') }}</span>
      <el-select v-model="backupName" :placeholder="$t('Placeholder.Select')">
        <el-option
          v-for="item in backupOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <p>{{ $t('BlockTimeDataPage.TextBackupData4') }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseRecoverBackup">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="primary" @click="confirmRecoverBackup">{{ $t('BlockTimeDataPage.ConfirmRecovery') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('BlockTimeDataPage.BtnManageBackupData')"
      :visible.sync="manageBackupDialog"
      width="40%"
      :before-close="handleCloseManageBackup"
      @dragDialog="handleDrag"
    >
      <el-table
        :header-cell-style="{background:'#eef1f6', color:'#606266', padding: '3px'}"
        :cell-style="{padding: '3px'}"
        :data="backupTableData"
        max-height="400px"
        @selection-change="handleBackupSelection"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="backup_name" :label="$t('BlockTimeDataPage.TextBackupName')" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseManageBackup">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="danger" @click="deleteBackupData">{{ $t('TablePage.BtnDelete') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('TablePage.TitleImportData')"
      :visible.sync="importDialogVisible"
      width="60%"
      :before-close="handleImportClose"
      @dragDialog="handleDrag"
    >
      <el-row>
        <el-col :span="10">
          <el-radio-group v-model="importMode" style="margin-top: 26px;">
            <el-radio label="original">{{ this.$t('BlockTimeDataPage.OriginalImport') }}</el-radio>
            <el-radio label="append">{{ $t('TablePage.BtnAppendData') }}</el-radio>
            <el-radio label="replace">{{ $t('TablePage.BtnReplaceData') }}</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="4">
          <el-checkbox v-model="autoBackup" style="margin-top:26px;">{{ this.$t('BlockTimeDataPage.AutoBackup') }}</el-checkbox>
        </el-col>
        <el-col :span="9">
          <div style="display: flex;margin-top: 16px;margin-bottom: 16px;">
            <el-upload
              ref="upload"
              name="file"
              class="upload-demo"
              accept=".xlsx"
              action=""
              :on-change="handleChange"
              :auto-upload="false"
              :show-file-list="true"
              :file-list="uploadFileList"
            >
              <el-button slot="trigger" type="primary" style="margin-left: 10px;">
                <i class="el-icon-upload" />
                {{ this.$t('TablePage.BtnUploadFile') }}
              </el-button>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleImportClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="primary" @click="confirmImport">{{ $t('TablePage.BtnConfirmImport') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('TablePage.TitleExportData')"
      :visible.sync="exportDialogVisible"
      :before-close="handleExportClose"
      width="45%"
      @dragDialog="handleDrag"
    >
      <el-row>
        <span>{{ $t('PublicBtn.ConfirmModify') }}</span>
        <el-radio-group v-model="exportRadio">
          <el-radio label="xlsx">.xlsx</el-radio>
        </el-radio-group>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleExportClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="primary" @click="exportData">{{ $t('TablePage.BtnConfirmExport') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('BlockTimeDataPage.BtnAddHolidayLines')"
      :visible.sync="holidayLinesDialogVisible"
      :before-close="handleAddHolidyLinesClose"
      width="70%"
      @dragDialog="handleDrag"
    >
      <el-row>
        <el-checkbox-group v-model="chosen_line_list">
          <el-checkbox v-for="line in all_line_list" :key="line" :label="line" name="type" />
        </el-checkbox-group>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleAddHolidyLinesClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="primary" @click="addHolidayLines">{{ this.$t('PublicBtn.Confirm') }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import XLSX from 'xlsx'
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'
// import { Loading } from 'element-ui'
import elDragDialog from '@/directive/el-drag-dialog'
import { GetTableData, AddData, ModifyData, DeleteData, HandleDelete, AddMultiData,
  ExportData, ImportData, GetBackupName, BackupData, RecoverBackupData, DeleteBackupData,
  GetDefaultData, SyncDatabaseData, AddHolidayLines, GetHolidayLines, GetLangDict } from '@/api/DayConfig/BlockTimeData'
import { GetLineProcess } from '@/api/common'
import { deepClone } from '@/utils'
export default {
  name: 'BlockTimeData',
  directives: { elDragDialog },
  data() {
    return {
      lang_dict: {}, // 从后端获取表格列名
      loading: true, // 表格加载动画
      importLoading: {
        text: this.$t('PublicText.ImportLoadiing'),
        background: 'rgba(0, 0, 0, 0.5)'
      }, // 导入动画
      loadingInstance: null,
      table_data: [], // 表格数据
      dialogTitle: '', // 表单dialog标题
      dataDialogVisible: false, // 表单dialog显示
      dialogBtnType: true, // 表单dialog按钮 true为添加按钮 false为保存按钮
      dialogMultiVisible: false, // 添加多个维护dialog
      helpDialogVisible: false, // 帮助提示dialog
      scopeIndex: '', // 表格行数index
      scopeRow: '', // 表格行数据
      importDialogVisible: false, // 导入数据dialog
      exportDialogVisible: false, // 导出dialog
      holidayLinesDialogVisible: false, // 按默认锁定时间的线体dialog
      all_line_list: [], // 所有线体
      chosen_line_list: [], // 选中的线体
      importType: false, // false为替换数据 true为添加数据
      uploadFileName: '', // 上传的文件名
      uploadFileList: [], // 上传的文件列表
      uploadFile: null, // 上传的文件
      importMode: 'original', // 导入方式选择:追加或替换（方便以后扩展）
      exportRadio: 'xlsx', // 导出格式选择（方便以后扩展）
      isClick: false, // 是否点击了保存或者提交
      // 添加多个维护
      dayTime: [],
      nightTime: [],
      maintainTime: [],
      customTime: [],
      tableDataMulti: [],
      customDateTime: [],
      customHourTime: [],
      dayTimeText: this.$t('BlockTimeDataPage.DayTime'),
      nightTimeText: this.$t('BlockTimeDataPage.NightTime'),
      maintainTimeText: this.$t('BlockTimeDataPage.MaintainTime'),
      customTimeText: this.$t('BlockTimeDataPage.CustomTime'),
      customTime2Text: this.$t('BlockTimeDataPage.CustomTime2'),
      // 表单相关数据
      forms: ['$form'],
      model: {
        id: null,
        line_name: null,
        start_time: null,
        end_time: null,
        flag: false,
        default_lock_time_flag: false,
        lock_time: null,
        remark: null,
        CREATED_BY: null,
        CREATED_TIME: null,
        UPDATED_BY: null,
        UPDATED_TIME: null
      },
      // 修改前的表单内容，用于对比表单前后的变化（应用：关闭前提示修改未保存）
      modelOriginal: {
        id: null,
        line_name: null,
        start_time: null,
        end_time: null,
        flag: false,
        default_lock_time_flag: false,
        lock_time: null,
        remark: null,
        CREATED_BY: null,
        CREATED_TIME: null,
        UPDATED_BY: null,
        UPDATED_TIME: null
      },
      // 备份model用于恢复初始状态
      modelBackup: {},
      rules: {
        line_name: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        start_time: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        end_time: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        flag: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        lock_time: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        default_lock_time_flag: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        remark: [],
        CREATED_BY: [],
        CREATED_TIME: [],
        UPDATED_BY: [],
        UPDATED_TIME: []
      },
      lineOptions: [], // 维护线别
      lineOptions_2: [],
      // 分页相关
      total_num: 0, // 总共有多少条数据(后端返回)
      currentPage: 1, // 当前在第几页
      pageSize: 200, // 每页多少条数据
      dataTableSelections: [], // 表格选中的数据
      // 备份相关
      backupOptions: [], // 恢复备份选项
      backupName: '', // 备份名
      backupDialog: false, // 备份数据dialog
      recoverBackupDialog: false, // 恢复备份dialog
      manageBackupDialog: false, // 备份管理dialog
      backupTableData: [], // 备份管理数据
      backupTableSelections: [], // 备份管理选中的数据
      autoBackup: true // 是否自动备份，默认开启
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'buttons'
    ])
  },
  created() {
    GetLangDict().then(res => {
      this.lang_dict = res.lang_dict
    })
    this.getTableData(this.currentPage, this.pageSize)
    this.getDefaultData()
    this.initializeDate()
    this.getLineProcess()
    this.getHolidayLines()
  },
  mounted() {
    // this.getTableData(this.currentPage, this.pageSize)
    this.modelBackup = deepClone(this.model)
  },
  methods: {
    flitterData(arr) {
      var spanOneArr = []
      let concatOne = 0
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1)
        } else {
          // cityName 修改
          if (item.line_name === arr[index - 1].line_name) { // 第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1
            spanOneArr.push(0)
          } else {
            spanOneArr.push(1)
            concatOne = index
          }
        }
      })
      return {
        one: spanOneArr
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        // this.tableData  修改
        const _row = (this.flitterData(this.table_data).one)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    renderHeaderDay() {
      return (
        <div>
          <el-button size='mini' onClick={() => this.handleChooseAllDay()}>{ this.$t('BlockTimeDataPage.SelectAll') }</el-button>
        </div>
      )
    },
    // 获取初始化数据
    getDefaultData() {
      GetDefaultData().then(res => {
        if (res.code === 20000) {
          this.lineOptions = res.data
          this.lineOptions_2 = res.data2
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: this.$t('PublicText.InitialFailed')
        })
      })
    },
    handleChooseAllDay() {
      for (const key in this.tableDataMulti) {
        this.tableDataMulti[key].dayTime = !this.tableDataMulti[key].dayTime
      }
    },
    renderHeaderNight() {
      return (
        <div>
          <el-button size='mini' onClick={() => this.handleChooseAllNight()}>{ this.$t('BlockTimeDataPage.SelectAll') }</el-button>
        </div>
      )
    },
    handleChooseAllNight() {
      for (const key in this.tableDataMulti) {
        this.tableDataMulti[key].nightTime = !this.tableDataMulti[key].nightTime
      }
    },
    renderHeaderMaintain() {
      return (
        <div>
          <el-button size='mini' onClick={() => this.handleChooseAllMaintain()}>{ this.$t('BlockTimeDataPage.SelectAll') }</el-button>
        </div>
      )
    },
    handleChooseAllMaintain() {
      for (const key in this.tableDataMulti) {
        this.tableDataMulti[key].maintainTime = !this.tableDataMulti[key].maintainTime
      }
    },
    renderHeaderCustom() {
      return (
        <div>
          <el-button size='mini' onClick={() => this.handleChooseAllCustom()}>{ this.$t('BlockTimeDataPage.SelectAll') }</el-button>
        </div>
      )
    },
    handleChooseAllCustom() {
      for (const key in this.tableDataMulti) {
        this.tableDataMulti[key].customTime = !this.tableDataMulti[key].customTime
      }
    },
    renderHeaderCustom2() {
      return (
        <div>
          <el-button size='mini' onClick={() => this.handleChooseAllCustom2()}>{ this.$t('BlockTimeDataPage.SelectAll') }</el-button>
        </div>
      )
    },
    handleChooseAllCustom2() {
      for (const key in this.tableDataMulti) {
        this.tableDataMulti[key].customTime2 = !this.tableDataMulti[key].customTime2
      }
    },
    // dialog可拖拽
    handleDrag() {
      // // this.$refs.select.blur()
    },
    // 初始化日期
    initializeDate() {
      // 初始化白班早下班时间区间
      const date_start_1 = new Date()
      const date_end_1 = new Date()
      date_start_1.setHours(16, 30, 0)
      this.dayTime.push(date_start_1)
      date_end_1.setHours(20, 0, 0)
      this.dayTime.push(date_end_1)
      // 初始化夜班早下班时间区间
      const date_start_2 = new Date()
      const date_end_2 = new Date()
      date_start_2.setDate(date_start_2.getDate() + 1)
      date_start_2.setHours(5, 30, 0)
      this.nightTime.push(date_start_2)
      date_end_2.setDate(date_end_2.getDate() + 1)
      date_end_2.setHours(8, 0, 0)
      this.nightTime.push(date_end_2)
      // 初始化白班保养时间区间
      const date_start_3 = new Date()
      const date_end_3 = new Date()
      date_start_3.setHours(8, 0, 0)
      this.maintainTime.push(date_start_3)
      date_end_3.setHours(20, 0, 0)
      this.maintainTime.push(date_end_3)
      // 初始化自定义时间(方式一)
      const date_start_4 = new Date()
      const date_end_4 = new Date()
      date_start_4.setHours(8, 0, 0)
      this.customTime.push(date_start_4)
      date_end_4.setHours(20, 0, 0)
      this.customTime.push(date_end_4)
      // 初始化自定义时间(方式二)
      const date_start_5 = new Date()
      const date_end_5 = new Date()
      date_start_5.setHours(8, 0, 0)
      this.customDateTime.push(date_start_5)
      this.customHourTime.push(date_start_5)
      date_end_5.setHours(20, 0, 0)
      this.customDateTime.push(date_end_5)
      this.customHourTime.push(date_end_5)
    },
    // 分页
    handlePageChange(val) {
      this.currentPage = val
      this.getTableData(val, this.pageSize) // 翻页
    },
    // 分页展示表格数据
    getTableData(currentPage, pageSize) {
      this.loading = true
      const data = { 'current_page': currentPage, 'page_size': pageSize }
      GetTableData(data).then(res => {
        if (res.code === 20000) {
          this.table_data = res.table_data
          this.total_num = res.total_num
          this.loading = false
        }
      })
    },
    // 刷新表格数据
    refreshTableData(isAddData = false) {
      if (isAddData) { // 如果是导入/添加/点击刷新按钮，刷新时返回第一页
        this.currentPage = 1
        this.getTableData(1, this.pageSize)
      } else { // 否则只刷新当前页
        this.getTableData(this.currentPage, this.pageSize)
      }
    },
    // 添加数据
    addDataDialog() {
      this.dialogTitle = this.$t('TablePage.TitleAppendData')
      this.dialogBtnType = true
      this.dataDialogVisible = true
      this.isClick = false
    },
    // 添加数据
    addData() {
      this.isClick = true
      const data = this.model
      data['user_name'] = this.name
      this.$refs['$form'].validate((valid) => {
        if (valid) {
          AddData(data).then(res => {
            if (res.code === 20000) {
              this.$notify({
                title: this.$t('PublicText.TitleTip'),
                message: this.$t('TablePage.MsgAppendSuccess'),
                type: 'success'
              })
              this.closeFormDialog()
              this.refreshTableData(true)
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: this.$t('TablePage.MsgAppendError')
          })
        }
      })
    },
    // 添加数据并继续添加下一个
    addDataAndContinue() {
      this.isClick = true
      const data = this.model
      data['user_name'] = this.name
      this.$refs['$form'].validate((valid) => {
        if (valid) {
          AddData(data).then(res => {
            if (res.code === 20000) {
              this.$notify({
                title: this.$t('PublicText.TitleTip'),
                message: this.$t('TablePage.MsgAppendSuccess'),
                type: 'success'
              })
              this.model = deepClone(this.modelBackup)
              this.modelOriginal = deepClone(this.modelBackup)
              this.isClick = false
              this.$refs['$form'].clearValidate() // 清除表单验证的文字提示信息
              this.refreshTableData(true)
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: this.$t('TablePage.MsgAppendError')
          })
        }
      })
    },
    // 添加多个线体维护
    // 创建多个维护表选项
    generateMultiTable() {
      this.tableDataMulti = []
      for (const key in this.lineOptions_2) {
        const temp = {}
        temp['line_name'] = this.lineOptions_2[key]
        temp['dayTime'] = false
        temp['nightTime'] = false
        temp['maintainTime'] = false
        temp['customTime'] = false
        temp['customTime2'] = false
        this.tableDataMulti.push(temp)
      }
    },
    addMultiDataDialog() {
      this.generateMultiTable()
      this.dialogMultiVisible = true
    },
    addMultiData() {
      const map_name = {
        'day_time_text': this.dayTimeText,
        'night_time_text': this.nightTimeText,
        'maintain_time_text': this.maintainTimeText,
        'custom_time_text': this.customTimeText,
        'custom_time_text2': this.customTime2Text
      }
      const data = {
        'user_name': this.name,
        'day_time': this.dayTime,
        'night_time': this.nightTime,
        'maintain_time': this.maintainTime,
        'custom_time': this.customTime,
        'custom_date_time': this.customDateTime,
        'custom_hour_time': this.customHourTime,
        'block_time_data': this.tableDataMulti,
        'map_name': map_name
      }
      AddMultiData(data).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: this.$t('PublicText.TitleTip'),
            message: this.$t('BlockTimeDataPage.MsgAppendData1') + res.count + this.$t('BlockTimeDataPage.MsgAppendData2'),
            type: 'success'
          })
          this.refreshTableData(true)
        }
      })
    },
    handleMultiClose() {
      this.dialogMultiVisible = false
    },
    // 获取表格勾选数据
    handleSelectionChange(val) {
      this.dataTableSelections = val
    },
    // 删除所有表格勾选的数据
    deleteData() {
      const dataLength = this.dataTableSelections.length
      if (dataLength === 0) {
        this.$message({
          type: 'warning',
          message: this.$t('TablePage.MsgSelectWarn')
        })
        return
      }
      const idList = []
      for (let i = 0; i < dataLength; i++) {
        idList.push(this.dataTableSelections[i].id)
      }
      this.$confirm(this.$t('TablePage.MsgDeleteMultiDataWarn1') + dataLength + this.$t('TablePage.MsgDeleteMultiDataWarn2'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('TablePage.BtnConfirmDelete'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        const data = { 'id_list': idList, 'user_name': this.name }
        DeleteData(data).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: this.$t('PublicText.TitleTip'),
              message: this.$t('TablePage.MsgDeleteMultiDataWarn3') + dataLength + this.$t('TablePage.MsgDeleteMultiDataWarn4'),
              type: 'success'
            })
            this.refreshTableData() // 刷新表格数据
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // 修改数据
    handleModify(index, row) {
      // 修改dialog
      this.dialogTitle = this.$t('TablePage.TitleModifyData')
      this.dialogBtnType = false
      this.scopeIndex = index
      this.scopeRow = row
      // 显示表单数据
      // 显示表单数据
      for (const key in this.model) {
        this.model[key] = row[key]
      }
      // 保存原来的表单数据，用于对比变化
      for (const key in this.modelOriginal) {
        this.modelOriginal[key] = this.model[key]
      }
      // 显示dialog
      this.dataDialogVisible = true
      this.isClick = false
    },
    // 编辑数据发送到后端保存
    modifyData() {
      if (!this.checkFormChange()) {
        this.$message({
          type: 'info',
          message: this.$t('TablePage.MsgModifyInfo')
        })
        return
      }
      this.isClick = true
      const data = this.model
      data['user_name'] = this.name
      this.$refs['$form'].validate((valid) => {
        if (valid) {
          ModifyData(data).then(res => {
            if (res.code === 20000) {
              this.$notify({
                title: res.message,
                message: this.$t('TablePage.MsgModifySuccess'),
                type: 'success'
              })
              this.refreshTableData()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: this.$t('TablePage.MsgAppendError')
          })
        }
      })
    },
    // 以下是备份数据相关
    getBackupName() {
      GetBackupName().then(res => {
        if (res.code === 20000) {
          this.backupOptions = res.backup_options
          this.backupTableData = res.backup_table_data
        }
      })
    },
    handleCloseBackup() {
      this.backupDialog = false
      this.backupName = ''
    },
    backupData() {
      this.backupDialog = true
    },
    confirmBackup() {
      BackupData({ 'user_name': this.name, 'backup_name': this.backupName }).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: res.title,
            message: res.message,
            type: 'success'
          })
          setTimeout(() => {
            this.handleCloseBackup()
          }, 1000)
        }
      })
    },
    handleCloseRecoverBackup() {
      this.recoverBackupDialog = false
      this.backupName = ''
    },
    recoverBackupData() {
      this.getBackupName()
      this.recoverBackupDialog = true
    },
    confirmRecoverBackup() {
      RecoverBackupData({ 'backup_name': this.backupName, 'user_name': this.name }).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: res.title,
            message: res.message,
            type: 'success'
          })
          this.refreshTableData(true)
        }
      })
    },
    manageBackupData() {
      this.getBackupName()
      this.manageBackupDialog = true
    },
    handleCloseManageBackup() {
      this.manageBackupDialog = false
    },
    handleBackupSelection(val) {
      this.backupTableSelections = val
    },
    deleteBackupData() {
      const dataLength = this.backupTableSelections.length
      if (dataLength === 0) {
        this.$message({
          type: 'warning',
          message: this.$t('TablePage.MsgSelectWarn')
        })
        return
      }
      const nameList = []
      for (let i = 0; i < dataLength; i++) {
        nameList.push(this.backupTableSelections[i].backup_name)
      }
      this.$confirm(this.$t('BlockTimeDataPage.MsgDeleteData1') + dataLength + this.$t('BlockTimeDataPage.MsgDeleteData3'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('TablePage.BtnConfirmDelete'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        const data = { 'name_list': nameList, 'user_name': this.name }
        DeleteBackupData(data).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: this.$t('PublicText.TitleTip'),
              message: this.$t('BlockTimeDataPage.MsgDeleteData2') + dataLength + this.$t('BlockTimeDataPage.MsgDeleteData3'),
              type: 'success'
            })
            this.getBackupName()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // 检测表单数据是否发生变化，用于提示
    checkFormChange() {
      let isChange = false
      for (const key in this.model) {
        if (this.model[key] !== this.modelOriginal[key]) {
          isChange = true
          break
        }
      }
      return isChange
    },
    // 表单dialog关闭前提示
    handleFormClose() {
      if (this.checkFormChange() && !this.isClick) {
        this.$confirm(this.$t('TablePage.MsgModifyCloseWarn'), this.$t('PublicText.TitleTip'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          cancelButtonText: this.$t('PublicBtn.Cancel'),
          type: 'warning'
        }).then(() => {
          this.closeFormDialog()
        }).catch(() => {

        })
      } else {
        this.closeFormDialog()
      }
    },
    // 关闭表单dialog的一些操作
    closeFormDialog() {
      this.dataDialogVisible = false
      this.model = deepClone(this.modelBackup)
      this.modelOriginal = deepClone(this.modelBackup)
      this.$refs['$form'].clearValidate() // 清除表单验证的文字提示信息
    },
    // 表格中删除数据
    handleDelete(index, row) {
      this.$confirm(this.$t('TablePage.MsgDeleteWarn'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('TablePage.BtnConfirmDelete'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        const data = {}
        data['id'] = row.id
        data['line_name'] = row.line_name
        data['user_name'] = this.name
        HandleDelete(data).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: this.$t('PublicText.TitleTip'),
              message: this.$t('TablePage.MsgDeleteSuccess'),
              type: 'success'
            })
            this.refreshTableData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // Excel导入到数据库
    importDataDialog() {
      this.importDialogVisible = true
    },
    // 确认导入
    confirmImport() {
      if (this.importMode === 'replace' || this.importMode === 'original') {
        this.$confirm(this.$t('TablePage.MsgImportReplace'), this.$t('PublicText.TitleTip'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          cancelButtonText: this.$t('PublicBtn.Cancel'),
          confirmButtonClass: 'btnDanger',
          type: 'warning'
        }).then(() => {
          this.importData()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('PublicBtn.MsgUnimport')
          })
        })
      } else {
        this.importData()
      }
    },
    // 导入数据
    importData() {
      // this.loadingInstance = Loading.service(this.importLoading)
      const form = new FormData()
      form.append('file', this.uploadFile)
      form.append('file_name', this.uploadFileName)
      form.append('user_name', this.name)
      form.append('import_mode', this.importMode)
      form.append('auto_backup', this.autoBackup)
      ImportData(form).then(res => {
        if (res.code === 20000) {
          this.$alert(this.$t('TablePage.MsgExportData1') + res.data_count + this.$t('TablePage.MsgExportData2'), res.message, {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'success'
          })
          // this.loadingInstance.close() // 清除动画
          // 1秒后自动关闭窗口
          setTimeout(() => {
            this.handleImportClose()
          }, 1000)
          this.refreshTableData(true)
        }
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(err, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'error'
        })
      })
    },
    // 导入数据窗口关闭
    handleImportClose() {
      this.importDialogVisible = false
      // 清理已上传文件
      this.$refs.upload.clearFiles()
      this.uploadFileName = ''
      this.uploadFile = null
    },
    // 获取上传文件
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.uploadFileList = [fileList[fileList.length - 1]] // 选择最后一次选择文件
        this.uploadFileName = this.uploadFileList[0].name // 更新文件名
        this.uploadFile = this.uploadFileList[0].raw // 更新文件
      }
    },
    // 数据库导出到Excel
    exportDataDialog() {
      this.exportDialogVisible = true
    },

    // 确认导出
    exportData() {
      ExportData().then(res => {
        if (res.code === 20000) {
          const dataCount = res.data_count
          const sheetData = res.table_data
          const fields = res.fields
          const tableName = res.table_name
          const fields_display = res.fields_display
          const newData = [fields_display, ...sheetData]
          const sheet = XLSX.utils.json_to_sheet(newData, { header: fields, skipHeader: true })
          const wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, sheet, tableName)
          XLSX.writeFile(wb, tableName + '.xlsx')
          this.$notify({
            title: this.$t('TablePage.MsgExportSuccess'),
            message: this.$t('TablePage.MsgExportData1') + dataCount + this.$t('TablePage.MsgExportData2'),
            type: 'success'
          })
          // 1秒后自动关闭窗口
          setTimeout(() => {
            this.handleExportClose() // 导出后自动关闭窗口
          }, 1000)
        }
      })
    },
    // 测试库同步正式库的维护时间表（提示）
    beforeSyncDatabaseData() {
      this.$confirm(this.$t('BlockTimeDataPage.MsgSyncData1'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        this.syncDatabaseData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // 测试库同步正式库的维护时间表
    syncDatabaseData() {
      const syncLoading = {
        text: this.$t('PublicText.SyncLoadiing'),
        background: 'rgba(0, 0, 0, 0.6)'
      }
      this.loadingInstance = Loading.service(syncLoading)
      const data = {
        'user_name': this.name
      }
      SyncDatabaseData(data).then(res => {
        if (res.code === 20000) {
          this.loadingInstance.close() // 清除动画
          this.$alert(res.message, this.$t('PublicText.TitleTip'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'success'
          })
          this.refreshTableData(true)
        }
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(err, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'error'
        })
      })
    },
    // 导入数据窗口关闭
    handleExportClose() {
      this.exportDialogVisible = false
    },
    // 默认锁定时间线体窗口关闭
    handleAddHolidyLinesClose() {
      this.holidayLinesDialogVisible = false
    },
    // 显示按默认锁定时间的线体窗口
    addHolidayLinesDialog() {
      this.holidayLinesDialogVisible = true
    },
    // 添加按默认锁定时间的线体
    addHolidayLines() {
      // 上传后端
      const data = {
        'holiday_lines': this.chosen_line_list
      }
      AddHolidayLines(data).then((res) => {
        if (res.code === 20000) {
          this.$notify({
            title: res.message,
            type: 'success'
          })
          setTimeout(() => {
            this.holidayLinesDialogVisible = false
          }, 1000)
        }
      }).catch(err => {
        this.$alert(err, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'error'
        })
      })
    },
    // 帮助提示按钮
    helpTips() {
      this.helpDialogVisible = true
    },
    getLineProcess() {
      GetLineProcess().then(res => {
        this.all_line_list = res.all_line_list
      })
    },
    getHolidayLines() {
      GetHolidayLines().then(res => {
        this.chosen_line_list = res.holidayLines
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/css/common/TablePage';
</style>
<style>
.btnDanger{
  background-color: #F56C6C !important;
  border-color: #F56C6C !important;
}
.btnDanger:hover{
  background-color: #f04747 !important;
  border-color: #f04747 !important;
}
.el-pagination {
    text-align: center;
}

.upload-demo {
  display: flex;
 }
.el-list-enter-active,
.el-list-leave-active {
  transition: none;
}
.el-list-enter,
.el-list-leave-active {
  opacity: 0;
}
.el-upload-list {
  height: 40px;
 }

.el-table .warning-row {
  color: #E6A23C;
}
.textBtn .el-input__inner{
  border: none;
  height: 16px;
}
</style>
