<template>
  <div id="main-box">
    <el-card>
      <el-row>
        <el-col :span="24">
          <div style="float: right;">
            <el-tooltip class="item" effect="dark" content="刷新表格" placement="top">
              <el-button
                size="small"
                icon="el-icon-refresh"
                circle
                @click="refreshTableData"
              />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看说明" placement="top">
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
          <el-table-column prop="func_module" label="功能所属模块" sortable />
          <el-table-column prop="func_des" label="功能名称" sortable />
          <el-table-column prop="remark" label="备注说明" sortable />
          <el-table-column prop="is_run" label="是否开启改功能">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.is_run === true" size="small" type="success">开启</el-tag>
              <el-tag v-else size="small" type="danger">关闭</el-tag>
            </template>
          </el-table-column>

          <el-table-column width="110" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                circle
                @click="handleModify(scope.$index, scope.row)"
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
      <el-form ref="$form" :model="model" label-position="left" size="small">
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.func_index" prop="func_index" label="显示顺序(数字升序)">
              <el-input v-model="model.func_index" placeholder="请输入数字" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.func_module" prop="func_module" label="功能所属模块">
              <el-input v-model="model.func_module" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.func_des" prop="func_des" label="功能名称">
              <el-input v-model="model.func_des" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.is_run" prop="is_run" label="是否开启">
              <el-switch v-model="model.is_run" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="24" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.remark" prop="remark" label="备注说明">
              <el-input v-model="model.remark" placeholder="请输入" :rows="1" type="textarea" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFormClose">关闭</el-button>
        <el-button type="primary" @click="modifyData">确认修改</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      title="表格说明"
      :visible.sync="helpDialogVisible"
      width="60%"
      @dragDialog="handleDrag"
    >
      <span>关于表格的各种说明可以写在这</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="helpDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import { Loading } from 'element-ui'
import elDragDialog from '@/directive/el-drag-dialog'
import { GetTableData, ModifyData } from '@/api/Permission/RunControlConfig'
import { LineOptions } from '@/utils/items'
export default {
  name: 'RunControlConfig',
  directives: { elDragDialog },
  data() {
    return {
      loading: true, // 表格加载动画
      importLoading: {
        text: '拼命导入中...',
        background: 'rgba(0, 0, 0, 0.5)'
      }, // 导入动画
      loadingInstance: null,
      table_data: [], // 表格数据
      dialogTitle: '', // 表单dialog标题
      dataDialogVisible: false, // 表单dialog显示
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
        func_index: null,
        func_des: null,
        is_run: null,
        func_name: null,
        remark: null
      },
      // 修改前的表单内容，用于对比表单前后的变化（应用：关闭前提示修改未保存）
      modelOriginal: {
        id: null,
        func_des: null,
        is_run: null,
        func_name: null,
        remark: null
      },
      rules: {
        func_des: [{
          required: true,
          message: '功能描述不能为空',
          trigger: 'blur'
        }],
        is_run: [{
          required: true,
          message: '需要选择是否开启',
          trigger: 'blur'
        }]
      },
      line_name_data: LineOptions, // 维护线别
      // 分页相关
      total_num: 0, // 总共有多少条数据(后端返回)
      currentPage: 1, // 当前在第几页
      pageSize: 20, // 每页多少条数据
      dataTableSelections: [] // 表格选中的数据
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
    // 获取表格勾选数据
    handleSelectionChange(val) {
      this.dataTableSelections = val
    },
    // 修改数据
    handleModify(index, row) {
      // 修改dialog
      this.dialogTitle = '修改数据'
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
          message: '数据未修改，无需提交'
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
                message: '数据已修改',
                type: 'success'
              })
              this.refreshTableData()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '提交失败，请按照要求填写数据！'
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
      this.closeFormDialog()
    },
    // 关闭表单dialog的一些操作
    closeFormDialog() {
      this.dataDialogVisible = false
      this.model['func_des'] = null
      this.modelOriginal['func_des'] = null
      this.model['is_run'] = null
      this.modelOriginal['is_run'] = null
      this.model['remark'] = null
      this.modelOriginal['remark'] = null
      this.model['func_index'] = null
      this.modelOriginal['func_index'] = null
      this.model['func_module'] = null
      this.modelOriginal['func_module'] = null
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
