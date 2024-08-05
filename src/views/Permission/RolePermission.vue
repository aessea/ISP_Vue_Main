<template>
  <div id="main-box">
    <el-card>
      <el-row>
        <el-col :span="16">
          <div>
            <el-button v-if="createUserDialogDisable === true" type="primary" @click="createUserDialog">
              <i class="el-icon-plus" />{{ this.$t('RolePermissionPage.CreateRole') }}
            </el-button>
            <el-button v-if="createUserDialogDisable === true" type="success" @click="addEnableRolesDialog">
              {{ this.$t('RolePermissionPage.EnableSwitchRoles') }}
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
          <el-table-column prop="role_name" :label="$t('RolePermissionPage.role_name')" width="160" />
          <el-table-column prop="enable_menu_list" :label="$t('RolePermissionPage.enable_menu_list')">
            <template slot-scope="scope">
              <el-tag
                v-for="(val, key) in scope.row.enable_menu_list"
                :key="key"
                style="margin-right: 5px;"
              >
                {{ val }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column width="150" fixed="right" :label="$t('TablePage.TitleOperate')">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="$t('UserManagePage.ViewOrModifyInfo')" placement="top">
                <el-button
                  v-if="handleModifyRoleInfoDisable === true"
                  type="primary"
                  size="mini"
                  icon="el-icon-edit-outline"
                  circle
                  @click="handleModifyRoleInfo(scope.$index, scope.row)"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="$t('RolePermissionPage.DeleteRole')" placement="top">
                <el-button
                  v-if="handleDeleteRoleDisable === true"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  @click="handleDeleteRole(scope.$index, scope.row)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog
      v-el-drag-dialog
      :title="dialogTitle"
      :visible.sync="dataDialogVisible"
      width="60%"
      :before-close="handleFormClose"
      @dragDialog="handleDrag"
    >
      <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
        <el-col :span="8">
          <el-input v-model="input_role_name" :placeholder="$t('RolePermissionPage.PleInputRoleName')" clearable />
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
        <el-col :span="24" style="margin-top: 10px;">
          <el-tag
            v-for="(val, key) in input_role_data_list"
            :key="key"
            style="margin-right: 5px;"
          >
            {{ val }}
          </el-tag>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFormClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="primary" @click="handleRolePermissionVisible">{{ $t('RolePermissionPage.PermissionSet') }}</el-button>
        <el-button v-if="createOrModify === true" type="primary" @click="createRole">{{ $t('PublicBtn.ConfirmCreate') }}</el-button>
        <el-button v-if="createOrModify === false" type="primary" @click="modifyRoleInfo">{{ $t('PublicBtn.ConfirmModify') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('RolePermissionPage.PermissionSelect')"
      :visible.sync="rolePermissionDialogVisible"
      width="60%"
      @dragDialog="handleDrag"
    >
      <div class="transfer-dev">
        <el-transfer
          v-model="select_enable_menu_list"
          style="text-align: left; display: inline-block"
          :left-default-checked="role_data_left"
          :right-default-checked="role_data_right"
          :titles="[$t('RolePermissionPage.AllPermissions'), $t('RolePermissionPage.AutPermissions')]"
          :button-texts="[$t('RolePermissionPage.RevokePermissions'), $t('RolePermissionPage.AddPermissions')]"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }"
          :data="role_data_list"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleRolePermissionClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="primary" @click="handleRolePermissionConfirm">{{ $t('PublicBtn.Confirm') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('RolePermissionPage.EnableSwitchRoles')"
      :visible.sync="addEnableRolesDialogVisible"
      :before-close="handleAddEnableRolesClose"
      width="70%"
      @dragDialog="handleDrag"
    >
      <el-row>
        <el-checkbox-group v-model="choose_role_list">
          <el-checkbox v-for="line in all_roles_list" :key="line" :label="line" name="type" />
        </el-checkbox-group>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleAddEnableRolesClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="primary" @click="addEnableSwitchRoles">{{ this.$t('PublicBtn.Confirm') }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import { Loading } from 'element-ui'
import elDragDialog from '@/directive/el-drag-dialog'
import { GetAllRoleInfo, CreateRole, ModifyRoleInfo, DeleteRole, AddEnableSwitchRoles } from '@/api/Permission/RolePermission'
export default {
  name: 'RolePermission',
  directives: { elDragDialog },
  data() {
    return {
      select_enable_menu_list: [],
      role_data_list: [],
      role_data_left: [],
      role_data_right: [],
      input_role_name: '',
      input_role_data_list: [],
      role_menu_dict: [],
      loading: true, // 表格加载动画
      loadingInstance: null,
      table_data: [], // 表格数据
      dialogTitle: '', // 表单dialog标题
      dataDialogVisible: false, // 表单dialog显示
      // helpDialogVisible: false, // 帮助提示dialog
      isClick: false, // 是否点击了保存或者提交
      createUserDialogDisable: true,
      handleModifyPasswordDisable: true,
      handleModifyRoleInfoDisable: true,
      handleDeleteRoleDisable: true,
      rolePermissionDialogVisible: false,
      createOrModify: true,
      row_id: -1,
      choose_role_list: [], // 允许切换语言的角色列表
      all_roles_list: [], // 所有角色名称
      addEnableRolesDialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getAllRoleInfo()
  },
  mounted() {

  },
  methods: {
    // dialog可拖拽
    handleDrag() {
      // this.$refs.select.blur()
    },
    handleRolePermissionConfirm() {
      this.rolePermissionDialogVisible = false
      this.input_role_data_list = []
      this.role_name_backend_to_front()
    },
    role_name_backend_to_front() {
      for (const key in this.select_enable_menu_list) {
        this.input_role_data_list.push(this.role_menu_dict[this.select_enable_menu_list[key]])
      }
    },
    handleRolePermissionClose() {
      this.rolePermissionDialogVisible = false
      this.select_enable_menu_list = []
      this.input_role_data_list = []
    },
    // 获取所有用户信息
    getAllRoleInfo() {
      this.loading = true
      GetAllRoleInfo().then(res => {
        if (res.code === 20000) {
          this.table_data = res.table_data
          this.role_data_list = res.role_data_list
          this.role_menu_dict = res.role_menu_dict
          this.menu_role_dict = res.menu_role_dict
          this.all_roles_list = res.all_roles_list
          this.choose_role_list = res.choose_role_list
          this.loading = false
        }
      })
    },
    // 刷新表格数据
    refreshTableData() {
      this.getAllRoleInfo()
    },
    handleRolePermissionVisible() {
      this.rolePermissionDialogVisible = true
    },
    // 创建用户dialog
    createUserDialog() {
      this.dialogTitle = this.$t('RolePermissionPage.CreateRole')
      this.createOrModify = true
      this.dataDialogVisible = true
      this.isClick = false
      this.input_role_name = ''
      this.select_enable_menu_list = []
      this.input_role_data_list = []
    },
    // 创建用户
    createRole() {
      this.isClick = true
      const data = {
        'id': this.row_id,
        'role_name': this.input_role_name,
        'enable_menu_list': this.select_enable_menu_list
      }
      CreateRole(data).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: this.$t('PublicText.TitleTip'),
            message: res.message,
            type: res.message_type
          })
          setTimeout(() => {
            this.closeFormDialog()
          }, 1000)
          this.refreshTableData()
        }
      })
    },
    // 修改角色信息dialog
    handleModifyRoleInfo(index, row) {
      // 修改dialog
      this.dialogTitle = this.$t('UserManagePage.ViewOrModifyInfo')
      this.createOrModify = false
      this.input_role_name = row['role_name']
      this.input_role_data_list = row['enable_menu_list']
      this.select_enable_menu_list = []
      this.row_id = row['id']
      for (const key in row['enable_menu_list']) {
        console.log(row['enable_menu_list'][key])
        this.select_enable_menu_list.push(this.menu_role_dict[row['enable_menu_list'][key]])
      }
      console.log('')
      // 显示dialog
      this.dataDialogVisible = true
      this.isClick = false
    },
    // 修改角色信息
    modifyRoleInfo() {
      this.isClick = true
      const data = {
        'id': this.row_id,
        'role_name': this.input_role_name,
        'enable_menu_list': this.select_enable_menu_list
      }
      ModifyRoleInfo(data).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: this.$t('PublicText.TitleTip'),
            message: res.message,
            type: res.message_type
          })
          this.refreshTableData()
        }
      })
    },
    handleDeleteRole(index, row) {
      this.$confirm(this.$t('RolePermissionPage.ConfirmDelRole'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('TablePage.BtnConfirmDelete'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        const data = {}
        data['role_name'] = row.role_name
        DeleteRole(data).then(res => {
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
    // 表单dialog关闭前提示
    handleFormClose() {
      this.closeFormDialog()
    },
    // 关闭表单dialog的一些操作
    closeFormDialog() {
      this.dataDialogVisible = false
    },
    // 添加按默认锁定时间的线体
    handleAddEnableRolesClose() {
      this.addEnableRolesDialogVisible = false
    },
    addEnableRolesDialog() {
      this.addEnableRolesDialogVisible = true
    },
    addEnableSwitchRoles() {
      // 上传后端
      const data = {
        'enable_roles_list': this.choose_role_list
      }
      AddEnableSwitchRoles(data).then((res) => {
        if (res.code === 20000) {
          this.$notify({
            title: res.message,
            type: 'success'
          })
        }
      }).catch(err => {
        this.$alert(err, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'error'
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
.el-table .warning-row {
  color: #E6A23C;
}
.transfer-dev{
  text-align: center;
}
.transfer-dev .el-transfer-panel {
  width:350px;
}
</style>
