<template>
  <div id="main-box">
    <el-card>
      <el-row>
        <el-col :span="16">
          <div>
            <el-button v-if="buttons.includes('ApiStatisticsFiles/deleteFile')" type="danger" @click="deleteFiles">
              <i class="el-icon-delete" />{{ this.$t('FileDataPage.BtnDeleteFile') }}
            </el-button>
            <el-button v-if="buttons.includes('ApiStatisticsFiles/deleteBulkFiles')" type="danger" @click="filterDataDialog">
              <i class="el-icon-delete" />{{ this.$t('FileDataPage.BtnDeleteBulkFiles') }}
            </el-button>
            <el-button v-if="buttons.includes('ApiStatisticsFiles/resetFileList')" type="primary" @click="resetAllFileList">
              <i class="el-icon-refresh" />{{ this.$t('FileDataPage.BtnResetFilesList') }}
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
          <el-table-column prop="file_name" :label="$t('FileDataPage.file_name')" sortable />
          <el-table-column prop="file_time" :label="$t('FileDataPage.file_time')" sortable width="200" />
          <el-table-column prop="remark" :label="$t('FileDataPage.remark')" width="160" />
          <el-table-column prop="create_user" :label="$t('FileDataPage.create_user')" width="160" />
          <el-table-column width="110" fixed="right" :label="$t('TablePage.TitleOperate')">
            <template slot-scope="scope">
              <el-button
                v-if="buttons.includes('ApiStatisticsFiles/downloadFile')"
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
      :title="$t('TablePage.TitleFormDescription')"
      :visible.sync="helpDialogVisible"
      width="60%"
      @dragDialog="handleDrag"
    >
      <span>{{ $t('TablePage.MsgIllustrate') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="helpDialogVisible = false">{{ $t('PublicBtn.Close') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('FileDataPage.BtnDeleteBulkFiles')"
      :visible.sync="filterDialogVisible"
      width="45%"
      @dragDialog="handleDrag"
    >
      <el-row>
        <el-form>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="12" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :label="$t('FileDataPage.TextDeleteAgoFile')">
                <el-input-number v-model="save_months" :min="3" :placeholder="$t('FileDataPage.TextInputMonth')" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFilterClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="danger" @click="deleteBeforeFiles">{{ this.$t('PublicBtn.ConfirmDelete') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import { Loading } from 'element-ui'
import elDragDialog from '@/directive/el-drag-dialog'
import { GetFilesList, DeleteFiles, DownloadFile, DeleteBeforeFiles, ResetAllFileList } from '@/api/FileManage/ApiStatisticsFiles'
export default {
  name: 'ApiStatisticsFiles',
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
      dataTableSelections: [], // 表格选中的数据
      filterDialogVisible: false,
      save_months: 3
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
    filterDataDialog() {
      this.filterDialogVisible = true
    },
    handleFilterClose() {
      this.filterDialogVisible = false
    },
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
          message: this.$t('FileDataPage.MsgDeleteFile1')
        })
        return
      }
      const idList = []
      for (let i = 0; i < dataLength; i++) {
        idList.push(this.dataTableSelections[i].id)
      }
      this.$confirm(this.$t('FileDataPage.MsgDeleteFile2') + dataLength + this.$t('FileDataPage.MsgDeleteFile4') + '?', this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('TablePage.BtnConfirmDelete'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        const data = { 'id_list': idList, 'user_name': this.name }
        DeleteFiles(data).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: this.$t('PublicText.TitleTip'),
              message: this.$t('FileDataPage.MsgDeleteFile7') + dataLength + this.$t('FileDataPage.MsgDeleteFile4'),
              type: 'success'
            })
            this.refreshTableData() // 刷新表格数据
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // 删除三个月前的文件
    deleteBeforeFiles() {
      this.$confirm(this.$t('FileDataPage.MsgDeleteFile5') + this.save_months + this.$t('FileDataPage.MsgDeleteFile6'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('TablePage.BtnConfirmDelete'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        const save_months = this.save_months
        const data = { save_months }
        DeleteBeforeFiles(data).then(res => {
          if (res.code === 20000 && res.count > 0) {
            this.$notify({
              title: this.$t('PublicText.TitleTip'),
              message: this.$t('FileDataPage.MsgDeleteFile7') + res.count + this.$t('FileDataPage.MsgDeleteFile4'),
              type: 'success'
            })
            this.refreshTableData() // 刷新表格数据
          } else if (res.count === 0) {
            this.$message({
              type: 'warning',
              message: this.$t('FileDataPage.MsgDeleteFile8') + this.save_months + this.$t('FileDataPage.MsgDeleteFile9')
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
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
          message: this.$t('Msg.BeginDownload'),
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          message: this.$t('Msg.DownloadFail'),
          type: 'error'
        })
      })
    },
    // 帮助提示按钮
    helpTips() {
      this.helpDialogVisible = true
    },
    resetAllFileList() {
      this.$confirm(this.$t('FileDataPage.MsgDeleteFile10'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        type: 'warning'
      }).then(() => {
        ResetAllFileList().then(res => {
          this.$alert(res.message, this.$t('PublicText.TitleTip'), {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'success'
          })
          this.refreshTableData() // 刷新表格数据
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
