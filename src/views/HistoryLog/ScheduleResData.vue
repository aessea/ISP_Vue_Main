<template>
  <div class="main-box">
    <el-card>
      <el-row>
        <el-col :span="20">
          <!-- <el-button v-if="buttons.includes('HistoryRun/deleteHistoryLog')" type="danger" @click="deleteHistoryLog">
            <i class="el-icon-delete" />删除一个月前的日志
          </el-button> -->
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
            <!-- <el-tooltip class="item" effect="dark" content="查看说明" placement="top">
              <el-button
                size="small"
                icon="el-icon-warning-outline"
                circle
                @click="helpTips"
              />
            </el-tooltip> -->
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
        <el-table-column prop="date" label="排程日期" sortable />
        <el-table-column prop="schedule_type" label="排程类型" sortable />
        <el-table-column prop="mode" label="预排/正排" sortable />
        <el-table-column prop="feasible" label="是否可行解" sortable />
        <el-table-column prop="obj_value" label="目标值" sortable />
        <el-table-column prop="overdue_value" label="逾期" sortable />
        <el-table-column prop="idle_value" label="idle" sortable />
        <el-table-column prop="line_balance" label="线平衡" sortable />
        <el-table-column prop="group_count" label="分组数" sortable />
        <el-table-column prop="run_time" label="排程运行时长（分钟）" width="200" sortable />
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GetTableData } from '@/api/HistoryLog/ScheduleResData'
export default {
  name: 'ScheduleResData',
  data() {
    return {
      loading: true, // 表格加载动画
      table_data: [], // 表格数据
      // 分页相关
      total_num: 0,
      pageSize: 20,
      currentPage: 1,
      isSearch: false
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
