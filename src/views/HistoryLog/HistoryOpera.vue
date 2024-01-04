<template>
  <div class="main-box">
    <el-card>
      <el-row>
        <el-col :span="20">
          <el-select v-model="typeValue" placeholder="搜索操作类型" clearable>
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input
            v-model="userValue"
            placeholder="搜索用户名"
            prefix-icon="el-icon-search"
            style="width: 200px;margin-left: 10px;"
            clearable
          />
          <el-input
            v-model="tableValue"
            placeholder="搜索操作对象"
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
            搜索
          </el-button>
          <el-button type="danger" icon="el-icon-delete" style="margin-left: 10px;" @click="filterDataDialog">
            删除历史日志
          </el-button>
        </el-col>
        <el-col :span="4">
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
          label="用户名"
          width="150"
          sortable
        />
        <el-table-column
          prop="table_name"
          label="操作对象"
          width="180"
          sortable
        />
        <el-table-column
          prop="action"
          label="操作"
          sortable
        />
        <el-table-column
          prop="action_type"
          label="操作类型"
          width="120"
          sortable
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.action_type === 'add'" size="small">添加</el-tag>
            <el-tag v-else-if="scope.row.action_type === 'delete'" size="small" type="danger">删除</el-tag>
            <el-tag v-else-if="scope.row.action_type === 'modify'" size="small" type="success">修改</el-tag>
            <el-tag v-else-if="scope.row.action_type === 'import'" size="small" type="info">导入</el-tag>
            <el-tag v-else-if="scope.row.action_type === 'export'" size="small" type="info">导出</el-tag>
            <el-tag v-else-if="scope.row.action_type === 'run'" size="small" type="warning">运行</el-tag>
            <el-tag v-else-if="scope.row.action_type === 'backup'" size="small" type="success">备份</el-tag>
            <el-tag v-else-if="scope.row.action_type === 'api'" size="small">接口</el-tag>
            <el-tag v-else size="small" type="info">其它</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="action_time"
          label="操作日期"
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
      title="删除历史日志"
      :visible.sync="filterDialogVisible"
      width="45%"
      @dragDialog="handleDrag"
    >
      <el-row>
        <el-form>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="12" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item label="删除几个月前的日志：" :label-width="formLabelWidth">
                <el-input-number v-model="save_months" :min="6" placeholder="请输入月份数" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFilterClose">关闭</el-button>
        <el-button type="danger" @click="filterData">确认删除</el-button>
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
        label: '添加'
      }, {
        value: 'delete',
        label: '删除'
      }, {
        value: 'edit',
        label: '修改'
      }, {
        value: 'import',
        label: '导入'
      }, {
        value: 'export',
        label: '导出'
      }, {
        value: 'run',
        label: '运行'
      }, {
        value: 'api',
        label: '接口'
      }, {
        value: 'other',
        label: '其它'
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
          message: '请至少输入一个关键词'
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
      this.$confirm(`确认要删除${this.save_months}个月前的日志？`, '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        if (this.save_months === undefined) {
          this.$alert('删除失败', '提示', {
            confirmButtonText: '确定',
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
            this.$alert(res.message, '提示', {
              confirmButtonText: '确定',
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
          message: '取消删除'
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
