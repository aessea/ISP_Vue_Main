<template>
  <div id="main-box">
    <el-card>
      <el-row>
        <el-col :span="16">
          <div>
            <el-button v-if="createUserDialogDisable === true" type="primary" @click="createUserDialog">
              <i class="el-icon-plus" />创建新角色
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
          :data="table_data"
          :header-cell-style="{background:'#eef1f6',color:'#606266', padding: '3px'}"
          :cell-style="{padding: '3px'}"

          stripe
        >
          <el-table-column prop="role_name" label="用户角色" width="160" />
          <el-table-column prop="role_menus" label="可访问的页面">
            <template slot-scope="scope">
              <el-tag
                v-for="(val, key) in scope.row.role_menus"
                :key="key"
                style="margin-right: 5px;"
              >
                {{ val }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column width="150" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="查看或修改信息" placement="top">
                <el-button
                  v-if="handleModifyRoleInfoDisable === true && scope.row.role_name !== '超级管理员'"
                  type="primary"
                  size="mini"
                  icon="el-icon-edit-outline"
                  circle
                  @click="handleModifyRoleInfo(scope.$index, scope.row)"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除角色" placement="top">
                <el-button
                  v-if="handleDeleteRoleDisable === true && scope.row.role_name !== '超级管理员'"
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
          <el-input v-model="input_role_name" placeholder="请输入角色名称" clearable />
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
        <el-button @click="handleFormClose">关闭</el-button>
        <el-button type="primary" @click="handleRolePermissionVisible">权限设置</el-button>
        <el-button v-if="createOrModify === true" type="primary" @click="createRole">创建角色</el-button>
        <el-button v-if="createOrModify === false" type="primary" @click="modifyRoleInfo">确认修改</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      title="权限选择 "
      :visible.sync="rolePermissionDialogVisible"
      width="60%"
      @dragDialog="handleDrag"
    >
      <div style="text-align: center">
        <el-transfer
          v-model="role_data_value"
          style="text-align: left; display: inline-block"
          :left-default-checked="role_data_left"
          :right-default-checked="role_data_right"
          :titles="['所有权限', '已授权的权限']"
          :button-texts="['收回权限', '添加权限']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }"
          :data="role_data_list"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleRolePermissionClose">关闭</el-button>
        <el-button type="primary" @click="handleRolePermissionConfirm">确认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      title="说明"
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
// import { Loading } from 'element-ui'
import elDragDialog from '@/directive/el-drag-dialog'
import { GetAllRoleInfo, CreateRole, ModifyRoleInfo, DeleteRole } from '@/api/Permission/RolePermission'
export default {
  name: 'RolePermission',
  directives: { elDragDialog },
  data() {
    return {
      role_data_value: [],
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
      helpDialogVisible: false, // 帮助提示dialog
      isClick: false, // 是否点击了保存或者提交
      createUserDialogDisable: true,
      handleModifyPasswordDisable: true,
      handleModifyRoleInfoDisable: true,
      handleDeleteRoleDisable: true,
      rolePermissionDialogVisible: false,
      createOrModify: true,
      row_id: -1
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
      for (const key in this.role_data_value) {
        this.input_role_data_list.push(this.role_menu_dict[this.role_data_value[key]])
      }
    },
    handleRolePermissionClose() {
      this.rolePermissionDialogVisible = false
      this.role_data_value = []
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
      this.dialogTitle = '创建用户'
      this.createOrModify = true
      this.dataDialogVisible = true
      this.isClick = false
      this.input_role_name = ''
      this.role_data_value = []
      this.input_role_data_list = []
    },
    // 创建用户
    createRole() {
      this.isClick = true
      const data = {
        'id': this.row_id,
        'role_name': this.input_role_name,
        'role_menu_list': this.role_data_value
      }
      CreateRole(data).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: '提示',
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
      this.dialogTitle = '修改角色信息'
      this.createOrModify = false
      this.input_role_name = row['role_name']
      this.input_role_data_list = row['role_menus']
      this.role_data_value = []
      this.row_id = row['id']
      for (const key in row['role_menus']) {
        this.role_data_value.push(this.menu_role_dict[row['role_menus'][key]])
      }
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
        'role_menu_list': this.role_data_value
      }
      ModifyRoleInfo(data).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: '提示',
            message: res.message,
            type: res.message_type
          })
          this.refreshTableData()
        }
      })
    },
    handleDeleteRole(index, row) {
      this.$confirm('确定要删除该角色？', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        const data = {}
        data['role_name'] = row.role_name
        DeleteRole(data).then(res => {
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
          message: '取消删除'
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
    // 帮助提示按钮
    helpTips() {
      this.helpDialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/css/Permission/RolePermission.scss';
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
