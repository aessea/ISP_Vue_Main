<template>
  <div class="ChannelSelected mr">
    <el-dropdown split-button placement="bottom-start" @command="handleCommand">
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
import { SwitchLanguage } from '@/api/common'
export default {
  name: 'LanguageSelect',
  data() {
    return {
      language: '',
      t: this.$i18n.locale
    }
  },
  created() {
    this.language = this.$i18n.locale === 'zh' ? '中文' : 'English'
    let temp_language
    if (this.language === '中文') {
      temp_language = 'zh'
    } else {
      temp_language = 'en'
    }
    sessionStorage.setItem('lang', temp_language)
  },
  methods: {
    // 根据下拉框的中被选中的值切换语言
    handleCommand(command) {
      if (command === 'zh') {
        this.lang = '中文'
      } else {
        this.lang = 'English'
      }
      const data = {
        'lang': command
      }
      SwitchLanguage(data).then(res => {

      })
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

