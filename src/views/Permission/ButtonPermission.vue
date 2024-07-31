<template>
  <div id="main-box">
    <el-card>
      <el-row>
        <el-col :span="16">
          <el-select v-model="roleNameValue" :placeholder="$t('ButtonPermissionPage.SearchRoleName')" clearable>
            <el-option
              v-for="item in all_role_name_list"
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
            {{ $t('title.Search') }}
          </el-button>
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
            <!-- <el-tooltip class="item" effect="dark" :content="$t('TablePage.BtnViewInstruction')" placement="top">
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
      <div class="table-box">
        <el-table
          id="mytable"
          v-loading="loading"
          :data="table_data"
          :header-cell-style="{background:'#eef1f6',color:'#606266', padding: '3px'}"
          :cell-style="{padding: '3px'}"
          stripe
        >
          <el-table-column prop="role_name_display" :label="$t('ButtonPermissionPage.role_name')" width="200" />
          <el-table-column prop="menu_name_display" :label="$t('ButtonPermissionPage.menu_name')" width="280" />
          <el-table-column prop="enable_button_list" :label="$t('ButtonPermissionPage.enable_button_list')">
            <template slot-scope="scope">
              <el-tag
                v-for="(val, key) in scope.row.enable_button_list"
                :key="key"
                style="margin-right: 5px;"
              >
                {{ val }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column width="150" fixed="right" :label="$t('TablePage.TitleOperate')">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="$t('ButtonPermissionPage.ModifyBtnPer')" placement="top">
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

    <!-- <el-dialog
      v-el-drag-dialog
      title="用户权限管理说明"
      :visible.sync="helpDialogVisible"
      width="60%"
      @dragDialog="handleDrag"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="helpDialogVisible = false">{{ $t('PublicBtn.Close') }}</el-button>
      </span>
    </el-dialog> -->

    <el-dialog
      v-el-drag-dialog
      :title="$t('ButtonPermissionPage.ButtonPerSet')"
      :visible.sync="buttonpDialogVisible"
      width="60%"
      @dragDialog="handleDrag"
    >
      <el-checkbox-group v-model="data_dict.enable_button_list">
        <el-checkbox v-for="button_permission in data_dict.all_enable_button_list" :key="button_permission.index" :label="button_permission" />
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modifyButton">{{ $t('PublicBtn.ConfirmModify') }}</el-button>
        <el-button @click="buttonpDialogVisible = false">{{ $t('PublicBtn.Close') }}</el-button>
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
      buttonpDialogVisible: false,
      loading: true, // 表格加载动画
      loadingInstance: null,
      table_data: [], // 表格数据
      // helpDialogVisible: false, // 帮助提示dialog
      all_role_name_list: [],
      // 分页相关
      total_num: 0,
      pageSize: 30,
      currentPage: 1,
      // 搜索相关
      roleNameValue: '', // 搜索的用户名
      isSearch: false, // 是否点击了搜索
      // 权限修改相关
      data_dict: {
        row_id: -1,
        role_name_display: '',
        menu_name: '',
        menu_name_display: '',
        all_enable_button_list: [],
        has_permission_buttons: [],
        enable_button_list: []
      }
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
            this.all_role_name_list = res.all_role_name_list
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
            this.all_role_name_list = res.all_role_name_list
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
      this.buttonpDialogVisible = true
      this.data_dict.has_permission_buttons = row.has_permission_buttons
      this.data_dict.enable_button_list = row.enable_button_list
      this.data_dict.all_enable_button_list = row.all_enable_button_list
      this.data_dict.row_id = row.id
      this.data_dict.role_name_display = row.role_name_display
      this.data_dict.menu_name_display = row.menu_name_display
    },
    modifyButton() {
      this.$confirm(this.$t('ButtonPermissionPage.ConfirmModRole'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        type: 'warning'
      }).then(() => {
        const data = this.data_dict
        ModifyButton(data).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: this.$t('PublicText.TitleTip'),
              message: res.message,
              type: res.message_type
            })
            this.refreshTableData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    searchData() {
      if (this.roleNameValue === '') {
        this.$message({
          type: 'warning',
          message: this.$t('ButtonPermissionPage.PleSelectRole')
        })
        return
      }
      this.isSearch = true
      this.getTableData(1, this.pageSize, true)
    }
    // 帮助提示按钮
    // helpTips() {
    //   this.helpDialogVisible = true
    // }
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
.el-table .warning-row {
  color: #E6A23C;
}

</style>
