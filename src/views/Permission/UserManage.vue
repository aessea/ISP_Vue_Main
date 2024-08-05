<template>
  <div id="main-box">
    <el-card>
      <el-row>
        <el-col :span="16">
          <div>
            <el-button v-if="createUserDialogDisable === true" type="primary" @click="createUserDialog">
              <i class="el-icon-plus" />{{ $t('UserManagePage.CreateUser') }}
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
          <el-table-column prop="username" :label="$t('UserManagePage.username')" width="160" />
          <el-table-column prop="remark" :label="$t('UserManagePage.remark')" width="160" />
          <el-table-column prop="roles" :label="$t('UserManagePage.roles')" width="160" />
          <el-table-column prop="email" :label="$t('UserManagePage.email')" width="200" />
          <el-table-column prop="description" :label="$t('UserManagePage.description')" />
          <el-table-column prop="enable" :label="$t('UserManagePage.enable')" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.enable === true" size="small" type="success">{{ $t('PublicText.Enabled') }}</el-tag>
              <el-tag v-else-if="scope.row.enable === false" size="small" type="danger">{{ $t('PublicText.NotEnabled') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="150" fixed="right" :label="$t('TablePage.TitleOperate')">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="$t('UserManagePage.ModifyPwd')" placement="top">
                <el-button
                  v-if="handleModifyPasswordDisable === true"
                  type="success"
                  size="mini"
                  icon="el-icon-edit"
                  circle
                  @click="handleModifyPassword(scope.$index, scope.row)"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="$t('UserManagePage.ViewOrModifyInfo')" placement="top">
                <el-button
                  v-if="handleModifyUserInfoDisable === true"
                  type="primary"
                  size="mini"
                  icon="el-icon-edit-outline"
                  circle
                  @click="handleModifyUserInfo(scope.$index, scope.row)"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="$t('UserManagePage.DeleteUser')" placement="top">
                <el-button
                  v-if="handleDeleteUserDisable === true"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  @click="handleDeleteUser(scope.$index, scope.row)"
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
      <el-form ref="$form" :model="model" label-position="left" size="small">
        <div v-if="dialogBtnType === true">
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" tag="div">
              <el-form-item :rules="rules.username" prop="username" :label="$t('UserManagePage.username')">
                <el-input v-model="model.username" :placeholder="$t('Placeholder.Enter')" clearable autocomplete="new-username" />
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" tag="div">
              <el-form-item :rules="rules.password" prop="password" :label="$t('UserManagePage.password')">
                <el-input v-model="model.password" :placeholder="$t('Placeholder.Enter')" clearable show-password autocomplete="new-password" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="dialogBtnType === false">
          <el-form-item :rules="rules.username" prop="username" :label="$t('UserManagePage.username')">
            <el-input v-model="model.username" :placeholder="$t('Placeholder.Enter')" clearable />
          </el-form-item>
        </div>
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="12" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.roles" prop="roles" :label="$t('UserManagePage.roles')">
              <el-select v-model="model.roles" :placeholder="$t('Placeholder.Select')" :style="{width: '100%'}">
                <el-option v-for="(item) in rolesOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="!!item.disabled" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.remark" prop="remark" :label="$t('UserManagePage.remark')">
              <el-input v-model="model.remark" :placeholder="$t('Placeholder.Enter')" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="12" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.enable" prop="enable" :label="$t('UserManagePage.enable')">
              <el-switch v-model="model.enable" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.email" prop="email" :label="$t('UserManagePage.email')">
              <el-input v-model="model.email" :placeholder="$t('Placeholder.Enter')" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :rules="rules.description" prop="description" :label="$t('UserManagePage.description')">
          <el-input v-model="model.description" :placeholder="$t('Placeholder.Enter')" :rows="2" type="textarea" clearable />
        </el-form-item>
        <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
          <el-col :span="12" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.create_time" prop="create_time" :label="$t('UserManagePage.create_time')">
              <el-input v-model="model.create_time" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0" :push="0" :pull="0" tag="div">
            <el-form-item :rules="rules.last_login_time" prop="last_login_time" :label="$t('UserManagePage.last_login_time')">
              <el-input v-model="model.last_login_time" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFormClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button v-if="dialogBtnType === true" type="primary" @click="createUser">{{ $t('PublicBtn.Crrate') }}</el-button>
        <el-button v-else-if="dialogBtnType === false" type="primary" @click="modifyUserInfo">{{ $t('PublicBtn.Modify') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('UserManagePage.ModifyPwd')"
      :visible.sync="passwordDialogVisible"
      width="30%"
      :before-close="handlePasswordClose"
      @dragDialog="handleDrag"
    >
      <el-form ref="$pwdForm" :model="pwdModel" label-position="left" label-width="100px" size="small">
        <el-form-item :rules="pwdRules.password" prop="password" :label="$t('UserManagePage.NewPwd')">
          <el-input v-model="pwdModel.password" :placeholder="$t('UserManagePage.PleInputNewPwd')" :rows="2" show-password clearable />
        </el-form-item>
        <el-form-item :rules="pwdRules.password_twice" prop="password_twice" :label="$t('UserManagePage.ConfirmPwd')">
          <el-input v-model="pwdModel.password_twice" :placeholder="$t('UserManagePage.PleReInputNewPwd')" :rows="2" show-password clearable />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlePasswordClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="primary" @click="modifyUserPassword">{{ $t('PublicBtn.ConfirmModify') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import { Loading } from 'element-ui'
import elDragDialog from '@/directive/el-drag-dialog'
import { GetAllUserInfo, CreateUser, ModifyUserPassword, ModifyUserInfo, DeleteUser } from '@/api/Permission/UserManage'
export default {
  name: 'UserManage',
  directives: { elDragDialog },
  data() {
    var validatePass = (rule, value, callback) => {
      if (this.checkPass(value) < 4) {
        callback(new Error(this.$t('UserManagePage.PwdVerification')))
      } else {
        callback()
      }
    }
    return {
      loading: true, // 表格加载动画
      loadingInstance: null,
      table_data: [], // 表格数据
      dialogTitle: '', // 表单dialog标题
      dataDialogVisible: false, // 表单dialog显示
      dialogBtnType: true, // 表单dialog按钮 true为添加按钮 false为保存按钮
      // helpDialogVisible: false, // 帮助提示dialog
      passwordDialogVisible: false, // 修改密码dialog
      isClick: false, // 是否点击了保存或者提交
      // 表单相关数据
      forms: ['$form'],
      pwdForms: ['$pwdForm'],
      model: {
        id: null,
        username: null,
        password: null,
        roles: null,
        remark: null,
        enable: true,
        email: null,
        description: null,
        create_time: null,
        last_login_time: null
      },
      // 修改前的表单内容，用于对比表单前后的变化（应用：关闭前提示修改未保存）
      modelOriginal: {
        id: null,
        username: null,
        password: null,
        roles: null,
        remark: null,
        enable: true,
        email: null,
        description: null,
        create_time: null,
        last_login_time: null
      },
      pwdModel: {
        password: '',
        password_twice: ''
      },
      rules: {
        username: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }, {
          type: 'string',
          min: 5,
          max: 20,
          message: this.$t('Form.UserNameLength'),
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }, {
          type: 'string',
          min: 8,
          max: 20,
          message: this.$t('Form.PasswordLength'),
          trigger: 'blur'
        }, {
          validator: validatePass,
          trigger: 'blur'
        }],
        roles: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        remark: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        enable: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'change'
        }],
        email: [{
          type: 'email',
          message: this.$t('Form.NotNulEmailFormatErrorl'),
          trigger: 'blur'
        }],
        description: [],
        create_time: [],
        last_login_time: []
      },
      pwdRules: {
        password: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }, {
          type: 'string',
          min: 8,
          max: 20,
          message: this.$t('Form.PasswordLength'),
          trigger: 'blur'
        }, {
          validator: validatePass,
          trigger: 'blur'
        }],
        password_twice: [{
          required: true,
          message: this.$t('Form.InputPwdTwice'),
          trigger: 'blur'
        }, {
          type: 'string',
          min: 8,
          max: 20,
          message: this.$t('Form.PasswordLength'),
          trigger: 'blur'
        }, {
          validator: validatePass,
          trigger: 'blur'
        }]
      },
      rolesOptions: [],
      dataTableSelections: [], // 表格选中的数据
      createUserDialogDisable: true,
      handleModifyPasswordDisable: true,
      handleModifyUserInfoDisable: true,
      handleDeleteUserDisable: true,
      userName: '' // 要修改密码的用户名
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getAllUserInfo()
  },
  mounted() {

  },
  methods: {
    // dialog可拖拽
    handleDrag() {
      // this.$refs.select.blur()
    },
    // 获取所有用户信息
    getAllUserInfo() {
      this.loading = true
      GetAllUserInfo().then(res => {
        if (res.code === 20000) {
          this.table_data = res.table_data
          this.rolesOptions = res.role_list
          this.loading = false
        }
      })
    },
    // 刷新表格数据
    refreshTableData() {
      this.getAllUserInfo()
    },
    checkPass(pass) {
      // 密码长度大于6开始判断密码强度
      if (pass.length < 6) {
        return 0
      }
      //  判断密码中是否有数字、大小写字母、特殊符号
      var ls = 0 // 默认等级是0
      // 判断有没有小写字母
      if (pass.match(/([a-z])+/)) {
        ls++
      }
      // 判断有没有大写字母
      if (pass.match(/([A-Z])+/)) {
        ls++
      }
      // 判断数字
      if (pass.match(/([0-9])+/)) {
        ls++
      }
      // 判断有没有特殊符号
      if (pass.match(/[^a-zA-Z0-9]+/)) {
        ls++
      }
      return ls // 默认传出是1
    },
    // 创建用户dialog
    createUserDialog() {
      this.dialogTitle = this.$t('UserManagePage.CreateUser')
      this.dialogBtnType = true
      this.dataDialogVisible = true
      this.isClick = false
    },
    // 创建用户
    createUser() {
      this.isClick = true
      const data = this.model
      this.$refs['$form'].validate((valid) => {
        if (valid) {
          CreateUser(data).then(res => {
            if (res.code === 20000) {
              this.$notify({
                title: this.$t('UserManagePage.CreateUserSuccess'),
                message: res.message,
                type: 'success'
              })
              setTimeout(() => {
                this.closeFormDialog()
              }, 1000)
              this.refreshTableData()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: this.$t('TablePage.MsgModifyError')
          })
        }
      })
    },
    // 修改密码dialog
    handleModifyPassword(index, row) {
      this.passwordDialogVisible = true
      this.userName = row.username
    },
    // 关闭修改密码dialog
    handlePasswordClose() {
      this.pwdModel['password'] = ''
      this.pwdModel['password_twice'] = ''
      this.passwordDialogVisible = false
      this.$refs['$pwdForm'].clearValidate()
    },
    modifyUserPassword() {
      if (this.pwdModel['password'] !== this.pwdModel['password_twice']) {
        this.$message({
          type: 'error',
          message: this.$t('UserManagePage.TwiceInputError')
        })
        return
      }
      const data = this.pwdModel
      data['username'] = this.userName
      this.$refs['$pwdForm'].validate((valid) => {
        if (valid) {
          ModifyUserPassword(data).then(res => {
            if (res.code === 20000) {
              this.$notify({
                title: this.$t('PublicText.ModifySuccess'),
                message: res.message,
                type: 'success'
              })
              setTimeout(() => {
                this.handlePasswordClose()
              }, 1000)
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: this.$t('TablePage.MsgModifyError')
          })
        }
      })
    },
    // 修改用户信息dialog
    handleModifyUserInfo(index, row) {
      // 修改dialog
      this.dialogTitle = this.$t('UserManagePage.ViewOrModifyInfo')
      this.dialogBtnType = false
      this.scopeIndex = index
      this.scopeRow = row
      // 显示表单数据
      for (const key in this.model) {
        this.model[key] = row[key]
      }
      // 保存原来的表单数据，用于对比变化
      for (const key in this.modelOriginal) {
        this.modelOriginal[key] = this.model[key]
      }
      // 显示dialog
      this.dataDialogVisible = true
      this.isClick = false
    },
    // 修改用户信息
    modifyUserInfo() {
      if (!this.checkFormChange()) {
        this.$message({
          type: 'info',
          message: this.$t('TablePage.MsgModifyInfo')
        })
        return
      }
      this.isClick = true
      const data = this.model
      this.$refs['$form'].validate((valid) => {
        if (valid) {
          ModifyUserInfo(data).then(res => {
            if (res.code === 20000) {
              this.$notify({
                title: this.$t('PublicText.ModifySuccess'),
                message: res.message,
                type: 'success'
              })
              this.refreshTableData()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: this.$t('TablePage.MsgModifyError')
          })
        }
      })
    },
    handleDeleteUser(index, row) {
      this.$confirm(this.$t('UserManagePage.ConfirmDeleteUser'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('TablePage.BtnConfirmDelete'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        const data = {}
        data['id'] = row.id
        data['user_name'] = this.name
        DeleteUser(data).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: this.$t('PublicText.TitleTip'),
              message: res.message,
              type: 'success'
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
    // 检测表单数据是否发生变化，用于提示
    checkFormChange() {
      let isChange = false
      for (const key in this.model) {
        if (this.model[key] !== this.modelOriginal[key]) {
          isChange = true
          break
        }
      }
      return isChange
    },
    // 表单dialog关闭前提示
    handleFormClose() {
      if (this.checkFormChange() && !this.isClick) {
        this.$confirm(this.$t('TablePage.MsgModifyCloseWarn'), this.$t('PublicText.TitleTip'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          cancelButtonText: this.$t('PublicBtn.Cancel'),
          type: 'warning'
        }).then(() => {
          this.closeFormDialog()
        }).catch(() => {

        })
      } else {
        this.closeFormDialog()
      }
    },
    // 关闭表单dialog的一些操作
    closeFormDialog() {
      this.dataDialogVisible = false
      for (const key in this.model) {
        this.model[key] = ''
        this.modelOriginal[key] = ''
      }
      this.$refs['$form'].clearValidate() // 清除表单验证的文字提示信息
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
