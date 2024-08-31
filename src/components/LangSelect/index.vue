<template>
  <div class="ChannelSelected mr">
    <el-dropdown v-if="switch_language_enable === true" split-button placement="bottom-start" @command="beforeSwitchLanguage">
      <span class="el-dropdown-link">
        {{ current_language }}
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh">中文</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { SwitchLanguage, GetRunFlag, GetLanguagePermission } from '@/api/common'
import { mapGetters } from 'vuex'
export default {
  name: 'LanguageSelect',
  data() {
    return {
      current_language: '',
      t: this.$i18n.locale,
      switch_language_enable: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'language'
    ])
  },
  created() {
    this.getLanguagePermission()
    this.current_language = this.language === 'zh' ? '中文' : 'English'
  },
  methods: {
    // 获取语言
    getLanguagePermission() {
      const data = {
        'user_name': this.name
      }
      // 获取改角色是否有修改权限
      GetLanguagePermission(data).then(res => {
        this.switch_language_enable = res.switch_language_enable
      }).catch(err => {
        console.log(err)
      })
    },
    beforeSwitchLanguage(command) {
      this.$confirm(this.$t('Msg.ConfirmSwitchLanguage'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('PublicBtn.Confirm'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        type: 'warning'
      }).then(() => {
        this.handleCommand(command)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // 根据下拉框的中被选中的值切换语言
    handleCommand(command) {
      const data = {
        'lang': command
      }
      GetRunFlag().then(res => {
        if (res.all_run_flag === 1) {
          this.$message({
            type: 'warning',
            message: this.$t('Msg.SwitchLanguageTip')
          })
          return
        } else {
          SwitchLanguage(data).then(res => {

          })
          if (command === 'zh') {
            this.current_language = '中文'
          } else {
            this.current_language = 'English'
          }
          this.$i18n.locale = command
          this.$store.dispatch('app/setLanguage', command)
          // 重新加载
          setTimeout(() => {
            window.location.reload()
          }, 1000)
          this.$message({
            type: 'success',
            message: this.$t('Msg.LangSwitchSuccess')
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.ChannelSelected {
    ::v-deep {
    .el-dropdown {
        color: white;
    }
    }
  .el-dropdown-link {
    &:hover {
      cursor: pointer;
    }
    }
}
</style>

