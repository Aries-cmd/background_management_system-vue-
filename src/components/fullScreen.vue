<template>
  <div @click="handleFullScreen" class="screen" id="fullScreen">
    <el-icon v-if="key" :size="35" color="#5b5c64" title="全屏">
      <full-screen />
    </el-icon>
    <el-icon v-else :size="30" color="#5b5c64" title="缩小">
      <full-screen />
    </el-icon>
  </div>
  &nbsp;&nbsp;&nbsp;&nbsp;
</template>

<script setup>
import { FullScreen } from '@element-plus/icons-vue'
import screenFull from 'screenfull'
import { ref } from 'vue'

const key = ref(true)

const handleFullScreen = () => {
  if (screenFull.isEnabled) {
    screenFull.toggle()
    key.value = !(key.value)
  }
}
</script>

<style scoped>
.screen {
  cursor: pointer;
}
</style>
