<template>
  <div id="main-box">
    <el-card>
      <el-row>
        <el-col :span="16">
          <div>
            <el-button v-if="buttons.includes('StatisticsFiles/delete')" type="danger" @click="deleteFiles">
              <i class="el-icon-delete" />删除文件
            </el-button>
            <el-button v-if="buttons.includes('StatisticsFiles/deleteOld')" type="danger" @click="deleteBeforeFiles">
              <i class="el-icon-delete" />删除三个月前的文件
            </el-button>
            <el-button v-if="buttons.includes('StatisticsFiles/reset')" type="primary" @click="resetAllFileList">
              <i class="el-icon-refresh" />重置文件列表
            </el-button>
          </div>
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
          :data="file_list"
          :header-cell-style="{background:'#eef1f6',color:'#606266', padding: '3px'}"
          :cell-style="{padding: '3px'}"

          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="file_name" label="文件名" sortable />
          <el-table-column prop="file_time" label="创建时间" sortable width="200" />
          <el-table-column prop="remark" label="备注" sortable width="160" />
          <el-table-column prop="create_user" label="创建人" sortable width="160" />
          <el-table-column width="110" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="buttons.includes('StatisticsFiles/download')"
                type="primary"
                size="mini"
                icon="el-icon-download"
                circle
                @click="downloadFile(scope.$index, scope.row)"
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
import { GetFilesList, DeleteFiles, DownloadFile, DeleteBeforeFiles, ResetAllFileList } from '@/api/FileManage/StatisticsFiles'
export default {
  name: 'StatisticsFiles',
  directives: { elDragDialog },
  data() {
    return {
      loading: true, // 表格加载动画
      loadingInstance: null,
      file_list: [], // 表格数据
      helpDialogVisible: false, // 帮助提示dialog
      scopeIndex: '', // 表格行数index
      scopeRow: '', // 表格行数据
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
    this.getFilesList(this.currentPage, this.pageSize)
  },
  mounted() {
    // this.getFilesList(this.currentPage, this.pageSize)
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
      this.getFilesList(val, this.pageSize) // 翻页
    },
    // 分页展示表格数据
    getFilesList(currentPage, pageSize) {
      this.loading = true
      const data = { 'current_page': currentPage, 'page_size': pageSize }
      GetFilesList(data).then(res => {
        if (res.code === 20000) {
          this.file_list = res.file_list
          this.total_num = res.total_num
          this.loading = false
        }
      })
    },
    // 刷新表格数据
    refreshTableData(isAddData = false) {
      if (isAddData) { // 如果是导入/添加/点击刷新按钮，刷新时返回第一页
        this.currentPage = 1
        this.getFilesList(1, this.pageSize)
      } else { // 否则只刷新当前页
        this.getFilesList(this.currentPage, this.pageSize)
      }
    },
    // 获取表格勾选数据
    handleSelectionChange(val) {
      this.dataTableSelections = val
    },
    // 删除所有表格勾选的数据
    deleteFiles() {
      const dataLength = this.dataTableSelections.length
      if (dataLength === 0) {
        this.$message({
          type: 'warning',
          message: '请至少选中一个文件'
        })
        return
      }
      const idList = []
      for (let i = 0; i < dataLength; i++) {
        idList.push(this.dataTableSelections[i].id)
      }
      this.$confirm('确定要删除选中的 ' + dataLength + ' 个文件？', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        const data = { 'id_list': idList, 'user_name': this.name }
        DeleteFiles(data).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: '删除成功',
              message: '成功删除选中的 ' + dataLength + ' 个文件',
              type: 'success'
            })
            this.refreshTableData() // 刷新表格数据
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    // 删除三个月前的文件
    deleteBeforeFiles() {
      this.$confirm('确定要删除三个月前的文件？', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        DeleteBeforeFiles().then(res => {
          if (res.code === 20000 && res.count > 0) {
            this.$notify({
              title: '删除成功',
              message: '成功删除:' + res.count + '个文件',
              type: 'success'
            })
            this.refreshTableData() // 刷新表格数据
          } else if (res.count === 0) {
            this.$message({
              type: 'warning',
              message: '未查找到三个月前的文件'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    // 下载文件
    frontDownloadFile(res) {
      const link = document.createElement('a')
      const blob = new Blob([res.data])
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      const temp = res.headers['content-disposition'].split('attachment;filename=')[1]
      const file_name = decodeURIComponent(temp)
      link.download = file_name
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(link.href) // 释放URL对象
      document.body.removeChild(link)
    },
    // 下载文件
    downloadFile(index, row) {
      DownloadFile({ 'id': row.id }).then(res => {
        this.frontDownloadFile(res)
        this.$message({
          message: '开始下载',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '下载失败',
          type: 'error'
        })
      })
    },
    // 帮助提示按钮
    helpTips() {
      this.helpDialogVisible = true
    },
    resetAllFileList() {
      this.$confirm('确定要重置文件列表？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ResetAllFileList().then(res => {
          this.$alert(res.message, '提示', {
            confirmButtonText: '确定',
            type: 'success'
          })
          this.refreshTableData() // 刷新表格数据
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
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
