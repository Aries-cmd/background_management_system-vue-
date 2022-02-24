<template>
  <el-dropdown class="lang" @command="handleCommand">
    <span class="el-dropdown-link">
      {{ lang }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="中文" :disabled="currentLanguage == 'zh'"
          >中文</el-dropdown-item
        >
        <el-dropdown-item command="English" :disabled="currentLanguage == 'en'"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
const store = useStore()
const i18n = useI18n()

const lang = ref('语言切换')

// 选项弹出框
const handleCommand = (command) => {
  // 判断元素是否是中文
  var pattern = new RegExp('[\u4E00-\u9FA5]+')

  if (pattern.test(command)) {
    lang.value = '语言切换'
    i18n.locale.value = 'zh'
    ElMessage(`您已切换到 ${command}`)
    console.log(i18n.locale.value)
    localStorage.setItem('lang', i18n.locale.value)
    store.commit('appModule/changeLang', i18n.locale.value)
  } else {
    lang.value = 'language toggle'
    i18n.locale.value = 'en'
    ElMessage(`You have switched the interface language to ${command}`)
    console.log(i18n.locale.value)
    localStorage.setItem('lang', i18n.locale.value)
    store.commit('appModule/changeLang', i18n.locale.value)
  }
}

// 获取语言标识符
const currentLanguage = computed(() => {
  return i18n.locale.value
})
</script>

<style>
.lang {
  cursor: pointer;
}
</style>
