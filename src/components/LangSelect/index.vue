<template>
  <div class="ChannelSelected mr">
    <el-dropdown v-if="switch_language_enable === true" split-button placement="bottom-start" @command="beforeSwitchLanguage">
      <span class="el-dropdown-link">
        {{ language }}
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh">中文</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { SwitchLanguage, GetLanguage, GetRunFlag } from '@/api/common'
import { mapGetters } from 'vuex'
export default {
  name: 'LanguageSelect',
  data() {
    return {
      language: '',
      t: this.$i18n.locale,
      switch_language_enable: false
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getLanguage()
    // this.language = this.$i18n.locale === 'zh' ? '中文' : 'English'
  },
  methods: {
    // 获取语言
    getLanguage() {
      const data = {
        'user_name': this.name
      }
      GetLanguage(data).then(res => {
        if (res.language_code === 'zh') {
          this.language = '中文'
        } else {
          this.language = 'English'
        }
        sessionStorage.setItem('lang', res.language_code)
        this.switch_language_enable = res.switch_language_enable
      }).catch(err => {
        console.log(err)
        // 获取失败则默认设置为中文
        this.language = '中文'
        sessionStorage.setItem('lang', 'zh')
        this.$message({
          type: 'info',
          message: '默认设置为中文'
        })
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
            this.language = '中文'
          } else {
            this.language = 'English'
          }
          this.$i18n.locale = command
          // console.log('this.$i18n.locale', this.$i18n.locale)
          sessionStorage.setItem('lang', command)
          // console.log(sessionStorage.getItem('lang'))
          window.location.reload()
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

