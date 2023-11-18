<template>
  <div class="main-box">
    <el-card>
      <el-row>
        <el-col :span="16">
          <div>
            <el-button @click="exportDataDialog">
              <i class="el-icon-download" />导出
            </el-button>
            <el-input
              v-model="api_name"
              placeholder="按照接口函数名或接口名称搜索"
              prefix-icon="el-icon-search"
              style="width: 300px;margin-left: 10px;"
              clearable
            />
            <el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="searchBy_name">
              搜索
            </el-button>
          </div>
        </el-col>
        <el-col :span="4">
          <div style="float: right;">
            <el-tooltip class="item" effect="dark" content="刷新表格" placement="top">
              <el-button size="small" icon="el-icon-refresh" circle @click="refreshTableData" />
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
      <el-table
        v-loading="loading"
        :data="table_data"
        style="width: 100%;
        margin-top: 16px;"
        :header-cell-style="{ background: '#eef1f6', color: '#606266', padding: '3px' }"
        max-height="1000px"
      >
        <el-table-column prop="name" label="接口函数名" sortable />
        <el-table-column prop="api_name" label="接口名称" sortable />
        <el-table-column prop="require_time" label="发送请求的时间" sortable />
        <el-table-column prop="require_type" label="请求类型" sortable />
        <el-table-column prop="time_consumed" label="耗时（单位：秒）" sortable />
        <el-table-column width="110" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-message"
              circle
              @click="handleDetail(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
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
        <el-descriptions class="margin-top" :column="1" border>
          <el-descriptions-item label="接口函数名">
            <el-tag size="small">{{ model.name }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="接口名称">{{ model.api_name }}</el-descriptions-item>
          <el-descriptions-item label="发送请求的时间">{{ model.require_time }}</el-descriptions-item>
          <el-descriptions-item label="请求类型">{{ model.require_type }}</el-descriptions-item>
          <el-descriptions-item label="耗时（单位：秒）">{{ model.time_consumed }}</el-descriptions-item>
        </el-descriptions>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFormClose">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      title="导出数据"
      :visible.sync="exportDialogVisible"
      :before-close="handleExportClose"
      width="45%"
      @dragDialog="handleDrag"
    >
      <el-row>
        <span>导出文件格式：</span>
        <el-radio-group v-model="exportRadio">
          <el-radio label="xlsx">.xlsx</el-radio>
        </el-radio-group>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleExportClose">关闭</el-button>
        <el-button type="primary" @click="exportData">确认导出</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GetTableData, ExportData, SearchData } from '@/api/HistoryLog/MesInterfaceLog'
import { FormatDatabaseDatetime } from '@/utils/date'
import XLSX from 'xlsx'
export default {
  name: 'MesInterfaceLog',
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
      exportRadio: 'xlsx', // 导出格式选择（方便以后扩展）,
      api_name: null, // 搜索用
      dataDialogVisible: false, // 表单dialog显示
      dialogTitle: null,
      scopeIndex: '', // 表格行数index
      scopeRow: '', // 表格行数据
      model: {}
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
  methods: {
    // 按接口函数名或接口名称搜索
    searchBy_name() {
      // 这样写当接口函数名和接口名称相同时会只有接口函数名搜索结果
      SearchData({ 'name': this.api_name }).then(res => {
        if (res.table_data.length > 0) {
          this.table_data = res.table_data
        } else {
          SearchData({ 'api_name': this.api_name }).then(res => {
            this.table_data = res.table_data
          })
        }
      })
    },
    // 查看数据详情
    handleDetail(index, row) {
      // index是表格行数，row是行数据
      this.dialogTitle = '数据详情'
      this.dataDialogVisible = true
      // 显示表单数据
      for (const key in row) {
        this.model[key] = row[key]
      }
    },
    // 表单dialog关闭前提示
    handleFormClose() {
      this.dataDialogVisible = false
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
          this.formatDatabaseDatetime()
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
            title: '导出成功',
            message: '本次共导出了 ' + dataCount + ' 条数据',
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

    // 将返回结果的时间格式化
    formatDatabaseDatetime() {
      this.table_data.forEach(item => {
        item.require_time = FormatDatabaseDatetime(item.require_time)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/HistoryLog/ScheduleResData.scss';
</style>
<style>
.btnDanger {
  background-color: #F56C6C !important;
  border-color: #F56C6C !important;
}

.btnDanger:hover {
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

.two-line-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2; /* 控制显示的行数 */
  max-height: 3.6em; /* 显示的最大高度 */
  line-height: 1.8em; /* 每行的高度 */
}
</style>
