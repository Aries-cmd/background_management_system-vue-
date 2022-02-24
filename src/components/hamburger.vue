<template>
  <div class="hamburger" id="hamburger">
    <div @click="toggleIconClick">
      <el-icon v-if="toggleIcon" :size="30" color="#5b5c64"><fold /></el-icon>
      <el-icon v-else :size="30" color="#fff"><expand /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { Fold, Expand } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

// 直接从 store.getters['appModule/getTokenType'] 和
// store.state.appModule.iconType 获取数据不会是响应式，
// 要想是响应式，就要用如下方式
const toggleIcon = computed(() => {
  // 两个都行
  return store.state.appModule.iconType
  // return store.getters['appModule/getTokenType']
})
const toggleIconClick = () => {
  store.commit('appModule/changeIconType')
  console.log(toggleIcon.value)
}

// 两种方式均可以获取 vuex子模块的state的值
// console.log(store.getters['appModule/getTokenType'])
// console.log(store.state.appModule.iconType, 1)
</script>

<style scoped>
.hamburger {
  cursor: pointer;
  margin-right: 20px;
}
</style>
