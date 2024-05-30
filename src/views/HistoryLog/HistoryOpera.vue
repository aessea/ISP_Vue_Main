<template>
  <div class="main-box">
    <el-card>
      <el-row>
        <el-col :span="20">
          <el-select v-model="typeValue" :placeholder="$t('HistoryOperaPage.TextSearchType')" clearable>
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input
            v-model="userValue"
            :placeholder="$t('HistoryOperaPage.TextSearchUser')"
            prefix-icon="el-icon-search"
            style="width: 200px;margin-left: 10px;"
            clearable
          />
          <el-input
            v-model="tableValue"
            :placeholder="$t('HistoryOperaPage.TextSearchObject')"
            prefix-icon="el-icon-search"
            style="width: 200px;margin-left: 10px;"
            clearable
          />
          <el-button
            type="primary"
            icon="el-icon-search"
            style="margin-left: 10px;"
            @click="searchData"
          >
            {{ $t('PublicBtn.Search') }}
          </el-button>
          <el-button type="danger" icon="el-icon-delete" style="margin-left: 10px;" @click="filterDataDialog">
            {{ $t('PublicText.BtnDeleteHisLog') }}
          </el-button>
        </el-col>
        <el-col :span="4">
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
      <el-table
        v-loading="loading"
        :data="table_data"
        style="width: 100%;margin-top: 16px;"
        :header-cell-style="{background:'#eef1f6',color:'#606266', padding: '3px'}"
        :cell-style="{padding: '3px'}"
        max-height="1000px"
        stripe
      >
        <el-table-column
          prop="user_name"
          :label="$t('HistoryOperaPage.user_name')"
          width="150"
          sortable
        />
        <el-table-column
          prop="table_name"
          :label="$t('HistoryOperaPage.table_name')"
          width="180"
          sortable
        />
        <el-table-column
          prop="action"
          :label="$t('HistoryOperaPage.action')"
          sortable
        />
        <el-table-column
          prop="action_type"
          :label="$t('HistoryOperaPage.action_type')"
          width="120"
          sortable
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.action_type === 'add'" size="small">{{ $t('PublicBtn.Append') }}</el-tag>
            <el-tag v-else-if="scope.row.action_type === 'delete'" size="small" type="danger">{{ $t('PublicBtn.Delete') }}</el-tag>
            <el-tag v-else-if="scope.row.action_type === 'modify'" size="small" type="success">{{ $t('PublicBtn.Modify') }}</el-tag>
            <el-tag v-else-if="scope.row.action_type === 'import'" size="small" type="info">{{ $t('PublicBtn.Import') }}</el-tag>
            <el-tag v-else-if="scope.row.action_type === 'export'" size="small" type="info">{{ $t('PublicBtn.Export') }}</el-tag>
            <el-tag v-else-if="scope.row.action_type === 'run'" size="small" type="warning">{{ $t('PublicBtn.Run') }}</el-tag>
            <el-tag v-else-if="scope.row.action_type === 'backup'" size="small" type="success">{{ $t('PublicBtn.Backup') }}</el-tag>
            <el-tag v-else-if="scope.row.action_type === 'api'" size="small">{{ $t('PublicBtn.Api') }}</el-tag>
            <el-tag v-else size="small" type="info">{{ $t('PublicBtn.Other') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="action_time"
          :label="$t('HistoryOperaPage.action_time')"
          width="230"
          sortable
        />
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
      :title="$t('HistoryOperaPage.BtnDeleteHisLog')"
      :visible.sync="filterDialogVisible"
      width="45%"
      @dragDialog="handleDrag"
    >
      <el-row>
        <el-form>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="12" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :label="$t('HistoryOperaPage.TextDeleteMonthAgo')" :label-width="formLabelWidth">
                <el-input-number v-model="save_months" :min="6" :placeholder="$t('FileDataPage.TextInputMonth')" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFilterClose">{{ this.$t('PublicBtn.Close') }}</el-button>
        <el-button type="danger" @click="filterData">{{ $t('PublicBtn.ConfirmDelete') }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { GetTableData, SearchData, DeleteHistoryLog } from '@/api/HistoryLog/HistoryOpera'
export default {
  name: 'HistoryOpera',
  data() {
    return {
      loading: true, // 表格加载动画
      table_data: [], // 表格数据
      // 分页相关
      total_num: 0,
      pageSize: 20,
      currentPage: 1,
      // 搜索类型
      typeOptions: [{
        value: 'add',
        label: this.$t('PublicBtn.Append')
      }, {
        value: 'delete',
        label: this.$t('PublicBtn.Delete')
      }, {
        value: 'edit',
        label: this.$t('PublicBtn.Modify')
      }, {
        value: 'import',
        label: this.$t('PublicBtn.Import')
      }, {
        value: 'export',
        label: this.$t('PublicBtn.Export')
      }, {
        value: 'run',
        label: this.$t('PublicBtn.Run')
      }, {
        value: 'backup',
        label: this.$t('PublicBtn.Backup')
      }, {
        value: 'api',
        label: this.$t('PublicBtn.Api')
      }, {
        value: 'other',
        label: this.$t('PublicBtn.Other')
      }],
      tableValue: '', // 搜索表名
      typeValue: '', // 搜索类型
      userValue: '', // 搜索用户
      isSearch: false, // 是否点击了搜索
      // 过滤数据相关
      filterDialogVisible: false,
      save_months: 6
    }
  },
  created() {
    this.getTableData(this.currentPage, this.pageSize, this.isSearch)
  },
  methods: {
    // 分页
    handlePageChange(val) {
      this.currentPage = val
      this.getTableData(val, this.pageSize, this.isSearch) // 翻页
    },
    // 分页展示表格数据
    getTableData(currentPage, pageSize, isSearch) {
      this.loading = true
      if (isSearch === true) {
        const data = {
          'current_page': currentPage,
          'page_size': pageSize,
          'type_value': this.typeValue,
          'user_value': this.userValue,
          'table_value': this.tableValue
        }
        SearchData(data).then(res => {
          if (res.code === 20000) {
            this.table_data = res.table_data
            this.total_num = res.total_num
            this.loading = false
          }
        })
      } else {
        const data = {
          'current_page': currentPage,
          'page_size': pageSize
        }
        GetTableData(data).then(res => {
          if (res.code === 20000) {
            this.table_data = res.table_data
            this.total_num = res.total_num
            this.loading = false
          }
        })
      }
    },
    // 搜索 搜索结果怎么分页TODO
    searchData() {
      if (this.typeValue === '' && this.userValue === '' && this.tableValue === '') {
        this.$message({
          type: 'warning',
          message: this.$t('HistoryOperaPage.SelectOneKeyWord')
        })
        return
      }
      this.isSearch = true
      this.getTableData(1, this.pageSize, true)
    },
    // 刷新表格
    refreshTableData() {
      this.isSearch = false
      this.typeValue = ''
      this.userValue = ''
      this.tableValue = ''
      this.currentPage = 1
      this.getTableData(1, this.pageSize, false)
    },
    // 帮助
    helpTips() {

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
        DeleteHistoryLog(data).then(res => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/HistoryLog/HistoryOpera.scss';
</style>
<style>
.el-pagination {
    text-align: center;
}
.btnDanger{
  background-color: #F56C6C !important;
  border-color: #F56C6C !important;
}
.btnDanger:hover{
  background-color: #f04747 !important;
  border-color: #f04747 !important;
}
</style>
