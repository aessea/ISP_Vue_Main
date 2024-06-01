<template>
  <div id="main-box">
    <el-card>
      <el-row>
        <el-col :span="24">
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
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane :label="$t('ParamsConfigPage.MainConfig')" name="main">
            <el-table
              id="mytable"
              v-loading="loading"
              :data="table_data_main"
              :header-cell-style="{background:'#eef1f6',color:'#606266', padding: '3px'}"
              :cell-style="{padding: '3px'}"
              stripe
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="param_classify" :label="$t('ParamsConfigPage.param_classify')" width="200" sortable>
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.param_classify === UNKONWN_CLASSIFY" size="small" type="info">{{ scope.row.param_classify }}</el-tag>
                  <el-tag v-else size="small" type="primary">{{ scope.row.param_classify }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="param_name_front" :label="$t('ParamsConfigPage.param_name_front')" sortable>
                <template slot-scope="scope">
                  <span style="font-weight: bold" type="info">{{ scope.row.param_name_front }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="param_value" :label="$t('ParamsConfigPage.param_value')">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.param_value === true" size="small" type="success">{{ $t('PublicBtn.Open') }}</el-tag>
                  <el-tag v-else-if="scope.row.param_value === false" size="small" type="danger">{{ $t('PublicBtn.Close') }}</el-tag>
                  <span v-else type="info">{{ scope.row.param_value }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="param_description" :label="$t('ParamsConfigPage.param_description')" />
              <el-table-column width="110" fixed="right" :label="$t('TablePage.TitleOperate')">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="$t('ParamsConfigPage.BtnModifyConfig')" placement="top">
                    <el-button
                      v-if="scope.row.config_enable"
                      type="primary"
                      size="mini"
                      icon="el-icon-edit"
                      circle
                      @click="handleModify(scope.$index, scope.row)"
                    />
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" :content="$t('ParamsConfigPage.BtnRestoreDefault')" placement="top">
                    <el-button
                      v-if="scope.row.config_enable"
                      type="danger"
                      size="mini"
                      icon="el-icon-refresh"
                      circle
                      @click="restoreDefault(scope.$index, scope.row)"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane :label="$t('ParamsConfigPage.SmallConfig')" name="small">
            <el-table
              id="mytable"
              v-loading="loading"
              :data="table_data_small"
              :header-cell-style="{background:'#eef1f6',color:'#606266', padding: '3px'}"
              :cell-style="{padding: '3px'}"

              stripe
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="param_classify" :label="$t('ParamsConfigPage.param_classify')" width="200" sortable>
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.param_classify === UNKONWN_CLASSIFY" size="small" type="info">{{ scope.row.param_classify }}</el-tag>
                  <el-tag v-else size="small" type="primary">{{ scope.row.param_classify }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="param_name_front" :label="$t('ParamsConfigPage.param_name_front')" sortable>
                <template slot-scope="scope">
                  <span style="font-weight: bold" type="info">{{ scope.row.param_name_front }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="param_value" :label="$t('ParamsConfigPage.param_value')">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.param_value === true" size="small" type="success">{{ $t('PublicBtn.Open') }}</el-tag>
                  <el-tag v-else-if="scope.row.param_value === false" size="small" type="danger">{{ $t('PublicBtn.Close') }}</el-tag>
                  <span v-else type="info">{{ scope.row.param_value }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="param_description" :label="$t('ParamsConfigPage.param_description')" />
              <el-table-column width="110" fixed="right" :label="$t('TablePage.TitleOperate')">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="$t('ParamsConfigPage.BtnModifyConfig')" placement="top">
                    <el-button
                      v-if="scope.row.config_enable"
                      type="primary"
                      size="mini"
                      icon="el-icon-edit"
                      circle
                      @click="handleModify(scope.$index, scope.row)"
                    />
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" :content="$t('ParamsConfigPage.BtnRestoreDefault')" placement="top">
                    <el-button
                      v-if="scope.row.config_enable"
                      type="danger"
                      size="mini"
                      icon="el-icon-refresh"
                      circle
                      @click="restoreDefault(scope.$index, scope.row)"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
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
      <el-form ref="$form" :model="model" label-position="left" size="small">
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.param_classify" prop="param_classify" :label="$t('ParamsConfigPage.param_classify')">
              <el-select v-model="model.param_classify" :placeholder="$t('Placeholder.Select')" style="width: 100%" disabled>
                <el-option
                  v-for="item in param_classify_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.param_name_front" prop="param_name_front" :label="$t('ParamsConfigPage.param_name_front')">
              <el-input v-model="model.param_name_front" :placeholder="$t('Placeholder.Enter')" clearable disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.param_value" prop="param_value" :label="$t('ParamsConfigPage.param_value')">
              <el-input-number v-if="model.param_value_type === 'int'" v-model="model.param_value" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" clearable />
              <el-input-number v-else-if="model.param_value_type === 'float'" v-model="model.param_value" :placeholder="$t('Placeholder.Enter')" :step="0.1" :style="{width: '100%'}" clearable />
              <el-date-picker v-else-if="model.param_value_type === 'datetime'" v-model="model.param_value" value-format="yyyy-MM-dd HH:00:00" type="datetime" :placeholder="$t('Placeholder.Select')" format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" />
              <el-date-picker v-else-if="model.param_value_type === 'date'" v-model="model.param_value" :placeholder="$t('Placeholder.Select')" value-format="yyyy-MM-dd" :style="{width: '100%'}" />
              <el-time-picker v-else-if="model.param_value_type === 'time'" v-model="model.param_value" arrow-control :placeholder="$t('Placeholder.Select')" value-format="HH:mm:ss" :style="{width: '100%'}" />
              <el-switch v-else-if="model.param_value_type === 'bool'" v-model="model.param_value" style="width: 100%" />
              <el-input v-else v-model="model.param_value" :placeholder="$t('Placeholder.Enter')" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.param_before_value" prop="param_before_value" :label="$t('ParamsConfigPage.param_before_value')">
              <el-input v-model="model.param_before_value" placeholder="" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.param_default_value" prop="param_default_value" :label="$t('ParamsConfigPage.param_default_value')">
              <el-input v-model="model.param_default_value" placeholder="" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.param_default_name" prop="param_default_name" :label="$t('ParamsConfigPage.param_default_name')">
              <el-input v-model="model.param_default_name" placeholder="" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.serial_number" prop="serial_number" :label="$t('ParamsConfigPage.serial_number')">
              <el-input v-model="model.serial_number" :placeholder="$t('Placeholder.Enter')" clearable disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="24" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.param_description" prop="param_description" :label="$t('ParamsConfigPage.param_description')">
              <el-input v-model="model.param_description" :placeholder="$t('Placeholder.Enter')" :rows="1" type="textarea" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="12" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.update_user" prop="update_user" :label="$t('ParamsConfigPage.update_user')">
              <el-input v-model="model.update_user" :placeholder="$t('ParamsConfigPage.update_user')" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.update_time" prop="update_time" :label="$t('ParamsConfigPage.update_time')">
              <el-input v-model="model.update_time" :placeholder="$t('ParamsConfigPage.update_time')" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-form-item :rules="rules.visible_roles" prop="visible_roles" :label="$t('ParamsConfigPage.visible_roles')">
            <el-col :span="24" :offset="0" :push="0" :pull="0" tag="div">
              <el-checkbox-group v-model="model.visible_roles" disabled>
                <el-checkbox v-for="role in all_role_list" :key="role.index" :label="role" />
              </el-checkbox-group>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFormClose">{{ $t('PublicBtn.Close') }}</el-button>
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
      <span>{{ $t('TablePage.MsgIllustrate') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="helpDialogVisible = false">{{ $t('PublicBtn.Close') }}</el-button>
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
        <span>{{ $t('TablePage.ConfirmModify') }}</span>
        <el-radio-group v-model="exportRadio">
          <el-radio label="xlsx">.xlsx</el-radio>
        </el-radio-group>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleExportClose">{{ $t('PublicBtn.Close') }}</el-button>
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
import { GetTableData, ModifyData, ExportData, RestoreDefault } from '@/api/Control/ParamsConfig'
export default {
  name: 'ParamsConfig',
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
      table_data_main: [], // 主板配置
      table_data_small: [], // 小板配置
      table_data_other: [], // 其它配置
      activeName: 'main',
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
      uploadFileList: [], // 上传的文件列表model:
      uploadFile: null, // 上传的文件
      importMode: 'add', // 导入方式选择:追加或替换（方便以后扩展）
      exportRadio: 'xlsx', // 导出格式选择（方便以后扩展）
      isClick: false, // 是否点击了保存或者提交
      // 表单相关数据
      forms: ['$form'],
      model: {
        id: null,
        param_type: null,
        param_classify: null,
        param_name_backend: null,
        param_name_front: null,
        param_value: null,
        param_value_type: null,
        param_default_value: null,
        param_before_value: null,
        param_default_name: null,
        update_time: null,
        update_user: null,
        serial_number: null,
        param_description: null,
        show_in_front: null,
        visible_roles: []
      },
      // 修改前的表单内容，用于对比表单前后的变化（应用：关闭前提示修改未保存）
      modelOriginal: {
        id: null,
        param_type: null,
        param_classify: null,
        param_name_backend: null,
        param_name_front: null,
        param_value: null,
        param_value_type: null,
        param_default_value: null,
        param_default_name: null,
        param_before_value: null,
        update_time: null,
        update_user: null,
        serial_number: null,
        param_description: null,
        show_in_front: null,
        visible_roles: []
      },
      rules: {
        param_name_front: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        param_value: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        param_type: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        param_classify: []
      },
      // 分页相关
      total_num: 0, // 总共有多少条数据(后端返回)
      currentPage: 1, // 当前在第几页
      pageSize: 100, // 每页多少条数据
      dataTableSelections: [], // 表格选中的数据
      lineTypeOptions: [
        { label: this.$t('ParamsConfigPage.MainConfig'), value: 'main' },
        { label: this.$t('ParamsConfigPage.SmallConfig'), value: 'small' },
        { label: this.$t('ParamsConfigPage.OtherConfig'), value: 'other' }
      ],
      param_classify_options: [], // 参数分类选项
      all_role_list: [],
      UNKONWN_CLASSIFY: this.$t('ParamsConfigPage.UnknownClassify')
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
  },
  methods: {
    // dialog可拖拽
    handleDrag() {
      // this.$refs.select.blur()
    },
    // 示例表格行颜色
    setCellColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 1 && columnIndex <= 2) {
        return 'color: #F56C6C;font-weight: bold;'
      } else if (rowIndex === 1 && columnIndex > 2) {
        return 'color: #E6A23C;font-weight: bold;'
      }
      return ''
    },
    // 分页
    handlePageChange(val) {
      this.currentPage = val
      this.getTableData(val, this.pageSize) // 翻页
    },
    // 分页展示表格数据
    getTableData(currentPage, pageSize) {
      this.loading = true
      const data = { 'current_page': currentPage, 'page_size': pageSize, 'user_name': this.name }
      GetTableData(data).then(res => {
        if (res.code === 20000) {
          this.table_data_main = res.table_data_main
          this.table_data_small = res.table_data_small
          this.table_data_other = res.table_data_other
          this.param_classify_options = res.param_classify_options
          this.all_role_list = res.all_role_list
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
    // 获取表格勾选数据
    handleSelectionChange(val) {
      this.dataTableSelections = val
    },
    // 修改数据
    handleModify(index, row) {
      // 修改dialog
      this.dialogTitle = this.$t('TablePage.TitleModifyData')
      this.dialogBtnType = false
      this.scopeIndex = index
      this.scopeRow = row
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
    // 恢复默认值
    restoreDefault(index, row) {
      for (const key in this.model) {
        this.model[key] = row[key]
      }
      this.$confirm(this.$t('ParamsConfigPage.TipRestoreDefault'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        type: 'warning'
      }).then(() => {
        const data = this.model
        data['user_name'] = this.name
        RestoreDefault(data).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: this.$t('PublicText.TitleTip'),
              message: res.message,
              type: res.message_type
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
      for (const key in this.model) {
        this.model[key] = ''
        this.modelOriginal[key] = ''
      }
      this.$refs['$form'].clearValidate() // 清除表单验证的文字提示信息
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
  @import '../../assets/css/Control/ParamsConfig.scss';
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
