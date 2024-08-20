<template>
  <div class="main-box">
    <el-card>
      <el-row>
        <el-col :span="20">
          <div>
            <el-button @click="exportDataDialog">
              <i class="el-icon-download" />{{ $t('TablePage.BtnExport') }}
            </el-button>
            <el-input
              v-model="api_name"
              :placeholder="$t('MesInterfaceLogPage.TextSearchData')"
              prefix-icon="el-icon-search"
              style="width: 300px;margin-left: 10px;"
              clearable
            />
            <el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="searchBy_name">
              {{ $t('PublicBtn.Search') }}
            </el-button>
            <el-button type="danger" icon="el-icon-delete" style="margin-left: 10px;" @click="filterDataDialog">
              {{ $t('PublicText.BtnDeleteHisLog') }}
            </el-button>
          </div>
        </el-col>
        <el-col :span="4">
          <div style="float: right;">
            <el-tooltip class="item" effect="dark" :content="$t('TablePage.BtnRefreshTable')" placement="top">
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
        <el-table-column prop="name" :label="$t('MesInterfaceLogPage.name')" sortable />
        <el-table-column prop="api_name" :label="$t('MesInterfaceLogPage.api_name')" sortable />
        <el-table-column prop="require_time" :label="$t('MesInterfaceLogPage.require_time')" sortable />
        <el-table-column prop="require_type" :label="$t('MesInterfaceLogPage.require_type')" sortable />
        <el-table-column prop="time_consumed" :label="$t('MesInterfaceLogPage.time_consumed')" sortable />
        <el-table-column width="110" fixed="right" :label="$t('TablePage.TitleOperate')">
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
          <el-descriptions-item :label="$t('MesInterfaceLogPage.name')">
            <el-tag size="small">{{ model.name }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item :label="$t('MesInterfaceLogPage.api_name')">{{ model.api_name }}</el-descriptions-item>
          <el-descriptions-item :label="$t('MesInterfaceLogPage.require_time')">{{ model.require_time }}</el-descriptions-item>
          <el-descriptions-item :label="$t('MesInterfaceLogPage.require_type')">{{ model.require_type }}</el-descriptions-item>
          <el-descriptions-item :label="$t('MesInterfaceLogPage.time_consumed')">{{ model.time_consumed }}</el-descriptions-item>
        </el-descriptions>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="exportPostData">{{ this.$t('MesInterfaceLogPage.ExportPostData') }}</el-button>
        <el-button type="primary" @click="exportReceiveData">{{ this.$t('MesInterfaceLogPage.ExportReceiveData') }}</el-button>
        <el-button @click="handleFormClose">{{ $t('PublicBtn.Close') }}</el-button>
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
      :title="$t('MesInterfaceLogPage.DeleteHisData')"
      :visible.sync="filterDialogVisible"
      width="45%"
      @dragDialog="handleDrag"
    >
      <el-row>
        <el-form>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="12" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :label="$t('FileDataPage.TextDeleteAgoFile')">
                <el-input-number v-model="save_months" :placeholder="$t('FileDataPage.TextInputMonth')" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFilterClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="danger" @click="filterData">{{ this.$t('PublicBtn.ConfirmDelete') }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import elDragDialog from '@/directive/el-drag-dialog'
import { GetTableData, ExportData, SearchData, GetPostData, GetReceiveData, FilterTableData } from '@/api/HistoryLog/MesInterfaceLog'
import { FormatDatabaseDatetime } from '@/utils/date'
import XLSX from 'xlsx'

export default {
  name: 'MesInterfaceLog',
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
      exportRadio: 'xlsx', // 导出格式选择（方便以后扩展）,
      api_name: null, // 搜索用
      dataDialogVisible: false, // 表单dialog显示
      dialogTitle: null,
      scopeIndex: '', // 表格行数index
      scopeRow: '', // 表格行数据
      model: {},
      // 过滤数据相关
      filterDialogVisible: false,
      save_months: 1
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
    handleDrag() {
      // // this.$refs.select.blur()
    },
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
      this.dialogTitle = this.$t('MesInterfaceLogPage.FileDetail')
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
      this.$confirm(this.$t('HistoryOperaPage.DeleteHisLog1') + this.save_months + this.$t('HistoryOperaPage.DeleteHisLog2'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('TablePage.BtnConfirmDelete'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        if (this.save_months === undefined) {
          this.$alert(this.$t('PublicText.DeleteFailed'), this.$t('PublicText.TitleTip'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'error'
          })
          return
        }
        const save_months = this.save_months
        const data = {
          save_months
        }
        FilterTableData(data).then(res => {
          if (res.code === 20000) {
            this.$alert(res.message, this.$t('PublicText.TitleTip'), {
              confirmButtonText: this.$t('PublicBtn.Confirm'),
              type: res.message_type
            })
            this.refreshTableData()
            setTimeout(() => {
              this.filterDialogVisible = false
            }, 1000)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
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
              title: this.$t('MesInterfaceLogPage.MsgExport1'),
              message: this.$t('MesInterfaceLogPage.MsgExport2'),
              type: 'error'
            })
            return
          }
          try {
            const tableName = this.table_data[this.scopeIndex].api_name + this.$t('MesInterfaceLogPage.receive_data')
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
              title: this.$t('TablePage.MsgExportSuccess'),
              message: this.$t('TablePage.MsgExportData1') + dataCount + this.$t('TablePage.MsgExportData2'),
              type: 'success'
            })
          } catch (error) {
            this.$message({
              message: this.$t('MesInterfaceLogPage.MsgExport3'),
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
              title: this.$t('MesInterfaceLogPage.MsgExport1'),
              message: this.$t('MesInterfaceLogPage.MsgExport4'),
              type: 'error'
            })
            return
          }
          try {
            const tableName = this.table_data[this.scopeIndex].api_name + this.$t('MesInterfaceLogPage.post_data')
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
              title: this.$t('TablePage.MsgExportSuccess'),
              message: this.$t('TablePage.MsgExportData1') + dataCount + this.$t('TablePage.MsgExportData2'),
              type: 'success'
            })
          } catch (error) {
            console.log(error)
            // 这里是针对解析 JSON 字符串出现异常时的处理
            this.$message({
              type: 'error',
              message: this.$t('MesInterfaceLogPage.MsgExport3')
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
