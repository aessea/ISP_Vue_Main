<template>
  <div id="main-box">
    <el-card>
      <el-row>
        <el-col :span="16">
          <div>
            <el-button v-if="buttons.includes('ProcessData/add')" type="primary" @click="addDataDialog">
              <i class="el-icon-plus" />{{ this.$t('TablePage.BtnAppend') }}
            </el-button>
            <!-- <el-button v-if="buttons.includes('ProcessData/delete')" type="danger" @click="deleteData">
              <i class="el-icon-delete" />{{ this.$t('TablePage.BtnDelete') }}
            </el-button>
            <el-button v-if="buttons.includes('ProcessData/import')" @click="importDataDialog">
              <i class="el-icon-upload2" />{{ this.$t('TablePage.BtnImport') }}
            </el-button> -->
            <el-button v-if="buttons.includes('ProcessData/export')" @click="exportDataDialog">
              <i class="el-icon-download" />{{ this.$t('TablePage.BtnExport') }}
            </el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="float: right;">
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
          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="制程" width="120" sortable fixed />
          <el-table-column prop="TB" label="面" width="50" />
          <el-table-column prop="paired_process" label="配对制程名" width="100" />
          <el-table-column prop="grouping_factor_day" label="第一块工单划分参数(天)" width="240" />
          <el-table-column prop="grouping_factor_overtime" label="第二块划分参数(天)" width="160" />
          <el-table-column prop="grouping_factor_hour" label="第二块工单控制大小" width="170" />
          <el-table-column prop="grouping_combination_flag" label="第三块是否可并" width="130">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.grouping_combination_flag === 1" size="small" type="success">是</el-tag>
              <el-tag v-else-if="scope.row.grouping_combination_flag === 0" size="small" type="danger">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="first_second_flag" label="第一块和第二块是否可并" width="180">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.first_second_flag === 1" size="small" type="success">是</el-tag>
              <el-tag v-else-if="scope.row.first_second_flag === 0" size="small" type="danger">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="first_second_combination_flag" label="没有第三块时，前两块是否可以合并" width="260">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.first_second_combination_flag === 1" size="small" type="success">是</el-tag>
              <el-tag v-else-if="scope.row.first_second_combination_flag === 0" size="small" type="danger">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="buffer_time" label="上下板间隔时间" width="130" />
          <el-table-column prop="is_point" label="是否按点数" width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.is_point === true" size="small" type="success">是</el-tag>
              <el-tag v-else-if="scope.row.is_point === false" size="small" type="danger">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="deleted_process_flag" label="先加工面是否转删除线体" width="200">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.deleted_process_flag === true" size="small" type="success">是</el-tag>
              <el-tag v-else-if="scope.row.deleted_process_flag === false" size="small" type="danger">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="locked_buffer_time" label="锁定内上下板间隔时间(时)" width="200" />
          <el-table-column prop="netboard_buffer_time" label="网板冲突间隔时间(时)" width="180" />
          <el-table-column prop="ct_predict_lower" label="CT预测下限" width="120" />
          <el-table-column prop="ct_predict_upper" label="CT预测上限" width="120" />
          <el-table-column prop="process_sequence" label="先后加工顺序" width="120" />
          <el-table-column prop="process_order" label="制程分配点数的优先顺序" width="120" sortable />
          <el-table-column prop="switch_name" label="原制程名" width="120" sortable />
          <el-table-column width="110" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="buttons.includes('ProcessData/modify')"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                circle
                @click="handleModify(scope.$index, scope.row)"
              />
              <el-button
                v-if="buttons.includes('ProcessData/delete')"
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
      :title="dialogTitle"
      :visible.sync="dataDialogVisible"
      width="60%"
      :before-close="handleFormClose"
      @dragDialog="handleDrag"
    >
      <el-card class="card-form" shadow="never">
        <el-form ref="$form" :model="model" label-position="left" size="small">
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.name" prop="name" label="制程">
                <el-input v-model="model.name" :placeholder="$t('Placeholder.Enter')" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.TB" prop="TB" label="面">
                <el-select v-model="model.TB" placeholder="Top面/Button面/Single面" :style="{width: '100%'}">
                  <el-option v-for="(item) in TBOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="!!item.disabled" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.paired_process" prop="paired_process" label="配对制程名">
                <el-input v-model="model.paired_process" placeholder="对应的另一面，如果是单面则为空" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.process_order" prop="process_order" label="制程分配点数的优先顺序">
                <el-input v-model="model.process_order" :placeholder="$t('Placeholder.Enter')" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.process_sequence" prop="process_sequence" label="先后加工顺序">
                <el-input v-model="model.process_sequence" placeholder="请输入0或1或2" oninput="this.value=this.value.replace(/[^0-2]/g, '')" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.grouping_factor_day" prop="grouping_factor_day" label="第一块和第二块工单划分参数">
                <el-input-number v-model="model.grouping_factor_day" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.grouping_factor_overtime" prop="grouping_factor_overtime" label="第三块划分参数">
                <el-input-number v-model="model.grouping_factor_overtime" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.grouping_factor_hour" prop="grouping_factor_hour" label="第二块工单控制大小">
                <el-input-number v-model="model.grouping_factor_hour" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.first_second_flag" prop="first_second_flag" label="第一块和第二块是否可并">
                <el-input v-model="model.first_second_flag" placeholder="0否,1是" oninput="this.value=this.value.replace(/[^0-1]/g, '')" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.grouping_combination_flag" prop="grouping_combination_flag" label="第三块是否可并">
                <el-input v-model="model.grouping_combination_flag" placeholder="0否,1是" oninput="this.value=this.value.replace(/[^0-1]/g, '')" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.first_second_combination_flag" prop="first_second_combination_flag" label="没有第三块时，前两块是否可以合并">
                <el-input v-model="model.first_second_combination_flag" placeholder="0否,1是" oninput="this.value=this.value.replace(/[^0-1]/g, '')" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.locked_buffer_time" prop="locked_buffer_time" label="锁定内上下板间隔时间(时)">
                <el-input-number v-model="model.locked_buffer_time" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.netboard_buffer_time" prop="netboard_buffer_time" label="网板冲突间隔时间(时)">
                <el-input-number v-model="model.netboard_buffer_time" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.ct_predict_lower" prop="ct_predict_lower" label="CT预测下限">
                <el-input-number v-model="model.ct_predict_lower" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.ct_predict_upper" prop="ct_predict_upper" label="CT预测上限">
                <el-input-number v-model="model.ct_predict_upper" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.buffer_time" prop="buffer_time" label="上下板间隔时间">
                <el-input-number v-model="model.buffer_time" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.is_point" prop="is_point" label="是否按点数">
                <el-switch v-model="model.is_point" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.switch_name" prop="switch_name" label="原制程名">
                <el-input v-model="model.switch_name" :placeholder="$t('Placeholder.Enter')" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.deleted_process_flag" prop="deleted_process_flag" label="先加工面是否转删除线体">
                <el-switch v-model="model.deleted_process_flag" style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFormClose">{{ this.$t('PublicBtn.Close') }}</el-button>
        <el-button v-if="dialogBtnType === true" type="primary" @click="addData">{{ this.$t('TablePage.BtnAppend') }}</el-button>
        <el-button v-else-if="dialogBtnType === false" type="primary" @click="modifyData">{{ this.$t('TablePage.BtnModify') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('TablePage.TitleFormDescription')"
      :visible.sync="helpDialogVisible"
      width="60%"
      @dragDialog="handleDrag"
    >
      <span>{{ this.$t('TablePage.MsgIllustrate') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="helpDialogVisible = false">{{ this.$t('PublicBtn.Close') }}</el-button>
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
        <el-col :span="8">
          <el-radio-group v-model="importMode" style="margin-top: 26px;">
            <el-radio label="append">{{ this.$t('TablePage.BtnAppendData') }}</el-radio>
            <el-radio label="replace">{{ this.$t('TablePage.BtnReplaceData') }}</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="16">
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
                上传文件
              </el-button>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleImportClose">{{ this.$t('PublicBtn.Close') }}</el-button>
        <el-button type="primary" @click="confirmImport">{{ this.$t('TablePage.BtnConfirmImport') }}</el-button>
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
        <span>{{ this.$t('TablePage.MsgExportType') }}</span>
        <el-radio-group v-model="exportRadio">
          <el-radio label="xlsx">.xlsx</el-radio>
        </el-radio-group>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleExportClose">{{ this.$t('PublicBtn.Close') }}</el-button>
        <el-button type="primary" @click="exportData">{{ this.$t('TablePage.BtnConfirmExport') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import XLSX from 'xlsx'
import { mapGetters } from 'vuex'
// import { Loading } from 'element-ui'
import elDragDialog from '@/directive/el-drag-dialog'
import { GetTableData, AddData, ModifyData, DeleteData, HandleDelete, ExportData, ImportData } from '@/api/LongConfig/ProcessData'
import { deepClone } from '@/utils'
export default {
  name: 'ProcessData',
  directives: { elDragDialog },
  data() {
    return {
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
      helpDialogVisible: false, // 帮助提示dialog
      scopeIndex: '', // 表格行数index
      scopeRow: '', // 表格行数据
      importDialogVisible: false, // 导入数据dialog
      exportDialogVisible: false, // 导出dialog
      importType: false, // false为替换数据 true为添加数据
      uploadFileName: '', // 上传的文件名
      uploadFileList: [], // 上传的文件列表
      uploadFile: null, // 上传的文件
      importMode: 'append', // 导入方式选择:追加或替换（方便以后扩展）
      exportRadio: 'xlsx', // 导出格式选择（方便以后扩展）
      isClick: false, // 是否点击了保存或者提交
      // 表单相关数据
      forms: ['$form'],
      model: {
        id: null,
        name: null,
        TB: null,
        paired_process: null,
        grouping_factor_day: undefined,
        grouping_factor_hour: undefined,
        grouping_factor_overtime: undefined,
        grouping_combination_flag: null,
        first_second_flag: null,
        first_second_combination_flag: null,
        is_point: false,
        buffer_time: undefined,
        locked_buffer_time: undefined,
        netboard_buffer_time: undefined,
        ct_predict_lower: undefined,
        ct_predict_upper: undefined,
        process_order: null,
        process_sequence: null,
        onehot_code: null,
        switch_name: null,
        deleted_process_flag: false
      },
      // 修改前的表单内容，用于对比表单前后的变化（应用：关闭前提示修改未保存）
      modelOriginal: {
        id: null,
        name: null,
        TB: null,
        paired_process: null,
        grouping_factor_day: undefined,
        grouping_factor_hour: undefined,
        grouping_factor_overtime: undefined,
        grouping_combination_flag: null,
        first_second_flag: null,
        first_second_combination_flag: null,
        is_point: false,
        buffer_time: undefined,
        locked_buffer_time: undefined,
        netboard_buffer_time: undefined,
        ct_predict_lower: undefined,
        ct_predict_upper: undefined,
        process_order: null,
        process_sequence: null,
        onehot_code: null,
        switch_name: null,
        deleted_process_flag: false
      },
      modelBackup: {},
      rules: {
        name: [{
          required: true,
          message: '制程不能为空',
          trigger: 'blur'
        }],
        TB: [{
          required: true,
          message: '面不能为空',
          trigger: 'change'
        }],
        paired_process: [{
        }],
        grouping_factor_day: [{
          required: true,
          message: '第一块和第二块工单划分参数(天)不能为空',
          trigger: 'blur'
        }],
        grouping_factor_hour: [{
          required: true,
          message: '第二块工单控制大小(时)不能为空',
          trigger: 'blur'
        }],
        grouping_factor_overtime: [{
          required: true,
          message: '第三块划分参数(天)不能为空',
          trigger: 'blur'
        }],
        grouping_combination_flag: [{
          required: true,
          message: '第三块是否可并不能为空',
          trigger: 'blur'
        }],
        first_second_combination_flag: [{
          required: true,
          message: '没有第三块时，前两块是否可并不能为空',
          trigger: 'blur'
        }],
        is_point: [{
          required: true,
          message: '是否按点数不能为空',
          trigger: 'blur'
        }],
        buffer_time: [{
          required: true,
          message: '上下板间隔时间不能为空',
          trigger: 'blur'
        }],
        first_second_flag: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        locked_buffer_time: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        netboard_buffer_time: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        ct_predict_lower: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        ct_predict_upper: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        process_sequence: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        process_order: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        switch_name: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        deleted_process_flag: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }]
      },
      // 分页相关
      total_num: 0, // 总共有多少条数据(后端返回)
      currentPage: 1, // 当前在第几页
      pageSize: 20, // 每页多少条数据
      dataTableSelections: [], // 表格选中的数据
      TBOptions: [
        { label: 'T', value: 'T' },
        { label: 'B', value: 'B' },
        { label: 'S', value: 'S' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'buttons'
    ])
  },
  created() {
    this.getTableData(this.currentPage, this.pageSize)
  },
  mounted() {
    // this.getTableData(this.currentPage, this.pageSize)
    this.modelBackup = deepClone(this.model)
  },
  methods: {
    // dialog可拖拽
    handleDrag() {
      // this.$refs.select.blur()
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
                title: this.$t('TablePage.TitleTip'),
                message: this.$t('TablePage.MsgAppendSuccess'),
                type: 'success'
              })
              this.model = deepClone(this.modelBackup)
              this.modelOriginal = deepClone(this.modelBackup)
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
      this.$confirm(this.$t('TablePage.MsgDeleteMultiDataWarn1') + dataLength + this.$t('TablePage.MsgDeleteMultiDataWarn2'), this.$t('TablePage.TitleTip'), {
        confirmButtonText: this.$t('TablePage.BtnConfirmDelete'),
        cancelButtonText: this.$t('TablePage.BtnUndelete'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        const data = { 'id_list': idList, 'user_name': this.name }
        DeleteData(data).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: this.$t('TablePage.TitleTip'),
              message: this.$t('TablePage.MsgDeleteMultiDataWarn3') + dataLength + this.$t('TablePage.MsgDeleteMultiDataWarn4'),
              type: 'success'
            })
            this.refreshTableData() // 刷新表格数据
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('TablePage.BtnUndelete')
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
        this.$confirm(this.$t('TablePage.MsgModifyCloseWarn'), this.$t('TablePage.TitleTip'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          cancelButtonText: this.$t('TablePage.BtnUndelete'),
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
      this.$confirm(this.$t('TablePage.MsgDeleteWarn'), this.$t('TablePage.TitleTip'), {
        confirmButtonText: this.$t('TablePage.BtnConfirmDelete'),
        cancelButtonText: this.$t('TablePage.BtnUndelete'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        const data = {}
        data['id'] = row.id
        data['name'] = row.name
        data['user_name'] = this.name
        HandleDelete(data).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: this.$t('TablePage.TitleTip'),
              message: this.$t('TablePage.MsgDeleteSuccess'),
              type: 'success'
            })
            this.refreshTableData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('TablePage.BtnUndelete')
        })
      })
    },
    // Excel导入到数据库
    importDataDialog() {
      this.importDialogVisible = true
    },
    // 确认导入
    confirmImport() {
      if (this.importMode === 'replace') {
        this.$confirm(this.$t('TablePage.MsgImportReplace'), this.$t('TablePage.TitleTip'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          cancelButtonText: this.$t('TablePage.BtnUndelete'),
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
          }, 2000)
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
            title: this.$t('tablepage.msgexportsuccess'),
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
    // 导入数据窗口关闭
    handleExportClose() {
      this.exportDialogVisible = false
    },
    // 帮助提示按钮
    helpTips() {
      this.helpDialogVisible = true
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

</style>
