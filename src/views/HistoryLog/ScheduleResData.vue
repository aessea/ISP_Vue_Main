<template>
  <div class="main-box">
    <el-card>
      <el-row>
        <el-col :span="16">
          <div>
            <el-button @click="exportDataDialog">
              <i class="el-icon-download" />{{ $t('TablePage.BtnExport') }}
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
          </div>
        </el-col>
      </el-row>
      <el-table
        v-loading="loading"
        :data="table_data"
        style="width: 100%;margin-top: 16px;"
        :header-cell-style="{background:'#eef1f6',color:'#606266', padding: '3px'}"
        max-height="1000px"
      >
        <el-table-column prop="date" :label="lang_dict.date" sortable />
        <el-table-column prop="schedule_type" :label="lang_dict.schedule_type" sortable />
        <el-table-column prop="mode" :label="lang_dict.mode" sortable />
        <el-table-column prop="feasible" :label="lang_dict.feasible" sortable />
        <el-table-column prop="obj_value" :label="lang_dict.obj_value" sortable />
        <el-table-column prop="overdue_value" :label="lang_dict.overdue_value" sortable />
        <el-table-column prop="idle_value" :label="lang_dict.idle_value" sortable />
        <el-table-column prop="line_balance" :label="lang_dict.line_balance" sortable />
        <el-table-column prop="group_count" :label="lang_dict.group_count" sortable />
        <el-table-column prop="run_time" :label="lang_dict.run_time" width="200" sortable />
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
    </el-card>

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

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GetTableData, ExportData, GetLangDict } from '@/api/HistoryLog/ScheduleResData'
import elDragDialog from '@/directive/el-drag-dialog'
import XLSX from 'xlsx'
export default {
  name: 'ScheduleResData',
  directives: { elDragDialog },
  data() {
    return {
      loading: true, // 表格加载动画
      table_data: [], // 表格数据
      // 分页相关
      total_num: 0,
      pageSize: 20,
      currentPage: 1,
      isSearch: false,
      exportDialogVisible: false,
      exportRadio: 'xlsx', // 导出格式选择（方便以后扩展）
      lang_dict: {} // 从后端获取表格列名
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
  },
  methods: {
    // dialog可拖拽
    handleDrag() {
      // // this.$refs.select.blur()
    },
    // 分页
    handlePageChange(val) {
      this.currentPage = val
      this.getTableData(val, this.pageSize, this.isSearch) // 翻页
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
    // 刷新表格
    refreshTableData() {
      this.currentPage = 1
      this.getTableData(1, this.pageSize)
    },
    // 帮助
    helpTips() {

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
    // 导入数据窗口关闭
    handleExportClose() {
      this.exportDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/HistoryLog/ScheduleResData.scss';
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
.el-table .warning-row {
  color: #E6A23C;
}
.el-table .error-row {
  color: #F56C6C;
}
</style>
