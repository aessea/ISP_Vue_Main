<template>
  <div id="main-box">
    <el-card>
      <el-row>
        <el-col :span="16">
          <el-select v-model="roleNameValue" placeholder="搜索角色名称" clearable>
            <el-option
              v-for="item in role_name_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button
            type="primary"
            icon="el-icon-search"
            style="margin-left: 10px;"
            @click="searchData"
          >
            搜索
          </el-button>
        </el-col>
        <el-col :span="8">
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
        >
          <el-table-column prop="role_name" label="角色名称" />
          <el-table-column prop="classify_front" label="前端菜单名" />
          <el-table-column prop="button_name_front" label="前端按钮名称" />
          <el-table-column prop="rule_menus" label="是否允许使用该按钮">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.enable === '允许'" type="success">{{ scope.row.enable }}</el-tag>
              <el-tag v-else-if="scope.row.enable === '不允许'" type="danger">{{ scope.row.enable }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="150" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="修改按钮权限" placement="top">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit-outline"
                  circle
                  @click="handleModifyButton(scope.$index, scope.row)"
                />
              </el-tooltip>
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
      title="用户权限管理说明"
      :visible.sync="helpDialogVisible"
      width="60%"
      @dragDialog="handleDrag"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="helpDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import elDragDialog from '@/directive/el-drag-dialog'
import { ModifyButton, SearchRoleData } from '@/api/Permission/ButtonPermission'
export default {
  name: 'ButtonPermission',
  directives: { elDragDialog },
  data() {
    return {
      loading: true, // 表格加载动画
      loadingInstance: null,
      table_data: [], // 表格数据
      helpDialogVisible: false, // 帮助提示dialog
      role_name_list: [],
      // 分页相关
      total_num: 0,
      pageSize: 30,
      currentPage: 1,
      // 搜索相关
      roleNameValue: '', // 搜索的用户名
      isSearch: false // 是否点击了搜索
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    // this.getAllButtonInfo()
    this.getTableData(this.currentPage, this.pageSize, this.isSearch)
  },
  mounted() {

  },
  methods: {
    // dialog可拖拽
    handleDrag() {
      // this.$refs.select.blur()
    },
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
          'role_name_value': this.roleNameValue
        }
        SearchRoleData(data).then(res => {
          if (res.code === 20000) {
            this.table_data = res.table_data
            this.total_num = res.total_num
            this.role_name_list = res.role_name_list
            this.loading = false
          }
        })
      } else {
        const data = {
          'current_page': currentPage,
          'page_size': pageSize,
          'role_name_value': this.roleNameValue
        }
        SearchRoleData(data).then(res => {
          if (res.code === 20000) {
            this.table_data = res.table_data
            this.total_num = res.total_num
            this.role_name_list = res.role_name_list
            this.loading = false
          }
        })
      }
    },
    // 刷新表格
    refreshTableData() {
      this.isSearch = false
      this.roleNameValue = ''
      this.currentPage = 1
      this.getTableData(1, this.pageSize, false)
    },
    handleModifyButton(index, row) {
      this.$confirm('确定要修改按钮权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          'id': row.id
        }
        ModifyButton(data).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: '提示',
              message: res.message,
              type: res.message_type
            })
            this.refreshTableData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        })
      })
    },
    searchData() {
      if (this.roleNameValue === '') {
        this.$message({
          type: 'warning',
          message: '请选择角色名称'
        })
        return
      }
      this.isSearch = true
      this.getTableData(1, this.pageSize, true)
    },
    // 帮助提示按钮
    helpTips() {
      this.helpDialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/css/Permission/ButtonPermission.scss';
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

</style>
