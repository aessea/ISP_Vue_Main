<template>
  <div class="main-box">
    <el-card>
      <el-row>
        <el-col :span="20">
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
            <el-button type="primary" icon="el-icon-date" style="margin-left: 10px;" @click="filterDataDialog">
              过滤存储数据
            </el-button>
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
              size="mini"
              icon="el-icon-info"
              circle
              @click="handleDetail(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :hide-on-single-page="false"
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
        <el-button type="primary" @click="exportPostData">导出发送数据</el-button>
        <el-button type="primary" @click="exportReceiveData">导出接收数据</el-button>
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

    <el-dialog
      v-el-drag-dialog
      title="过滤数据"
      :visible.sync="filterDialogVisible"
      width="45%"
      @dragDialog="handleDrag"
    >
      <el-row>
        <el-form>
          <el-form-item label="需要保留的数据日期范围：" :label-width="formLabelWidth">
            <el-date-picker
              v-model="dateRange"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            />
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFilterClose">关闭</el-button>
        <el-button type="danger" plain @click="filterData">确认过滤</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GetTableData, ExportData, SearchData, GetPostData, GetReceiveData, FilterTableData } from '@/api/HistoryLog/MesInterfaceLog'
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
      model: {},
      // 过滤数据相关
      filterDialogVisible: false,
      dateRange: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近十五天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
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
      this.scopeIndex = index
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
    // 按日期过滤表格数据
    filterDataDialog() {
      this.filterDialogVisible = true
    },
    handleFilterClose() {
      this.filterDialogVisible = false
    },
    filterData() {
      if (this.dateRange === '') {
        this.$message({
          title: '过滤失败',
          message: '请先选择需要保留的日期范围！',
          type: 'error'
        })
        return
      }
      const start_date = new Date(this.dateRange[0]).getTime()
      const end_date = new Date(this.dateRange[1]).getTime()
      const data = {
        start_date,
        end_date
      }
      FilterTableData(data).then(res => {
        console.log(res)
        if (res.code === 20000) {
          this.$notify({
            title: '过滤成功',
            message: res.message,
            type: 'success'
          })
          this.refreshTableData()
          setTimeout(() => {
            this.filterDialogVisible = false
          }, 1000)
        }
      })
    },
    fixJSONString(string) {
    // 匹配非双引号开头的键名，并在其键名上加上双引号
      const fixedString = string.replace(/'/g, '"')
      return fixedString
    },
    // 导出当前row的接收数据
    exportReceiveData() {
      const data = { 'id': this.table_data[this.scopeIndex].id }
      GetReceiveData(data).then(res => {
        if (res.code === 20000) {
          if (res.receive_data === '' || res.receive_data === null) {
            this.$notify({
              title: '导出失败',
              message: '当前接口接收数据为空',
              type: 'error'
            })
            return
          }
          try {
            const tableName = `${this.table_data[this.scopeIndex].api_name}-接收数据`
            const jsonString = this.fixJSONString(res.receive_data)
            const receive_data_array = JSON.parse(jsonString)
            const dataCount = receive_data_array.length
            const fields = Object.keys(receive_data_array[0])
            const newData = [...receive_data_array]
            const sheet = XLSX.utils.json_to_sheet(newData, { header: fields })
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, sheet, tableName)
            XLSX.writeFile(wb, tableName + '.xlsx')
            this.loading = false
            this.$notify({
              title: '导出成功',
              message: '本次共导出了 ' + dataCount + ' 条数据',
              type: 'success'
            })
          } catch (error) {
            this.$message({
              message: '数据解析错误',
              type: 'error'
            })
          }
        }
      })
    },
    // 导出发送数据
    exportPostData() {
      const data = { 'id': this.table_data[this.scopeIndex].id }
      GetPostData(data).then(res => {
        if (res.code === 20000) {
          if (res.post_data === '' || res.post_data === null) {
            this.$notify({
              title: '导出失败',
              message: '当前接发送数据为空',
              type: 'error'
            })
            return
          }
          try {
            const tableName = `${this.table_data[this.scopeIndex].api_name}-发送数据`
            const jsonString = this.fixJSONString(res.post_data)
            const post_data_array = JSON.parse(jsonString)
            console.log(post_data_array)
            const dataCount = post_data_array.length
            const fields = Object.keys(post_data_array[0])
            const newData = [...post_data_array]
            const sheet = XLSX.utils.json_to_sheet(newData, { header: fields })
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, sheet, tableName)
            XLSX.writeFile(wb, tableName + '.xlsx')
            this.loading = false
            this.$notify({
              title: '导出成功',
              message: '本次共导出了 ' + dataCount + ' 条数据',
              type: 'success'
            })
          } catch (error) {
            console.log(error)
            // 这里是针对解析 JSON 字符串出现异常时的处理
            this.$message({
              type: 'error',
              message: '数据解析错误'
            })
          }
        }
      })
    },
    // 确认导出
    exportData() {
      ExportData().then(res => {
        if (res.code === 20000) {
          const dataCount = res.data_count
          // 导出表格数据时不包括post_data和receive_data
          const unwantedColumns = ['post_data', 'receive_data']
          // const unwantedFields = ['接收数据', '发送数据']
          const sheetData = res.table_data.map(item => {
            const filteredItem = {}
            for (const key in item) {
              if (!unwantedColumns.includes(key)) {
                filteredItem[key] = item[key]
              }
            }
            return filteredItem
          })
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
