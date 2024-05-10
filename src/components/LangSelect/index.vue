<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      请选择语言
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  name: 'LangSelect',
  data() {
    return {

    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  watch: {

  },
  created() {
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$message.success('switch language success')
    }
  }
}
</script>

<style>

</style>
