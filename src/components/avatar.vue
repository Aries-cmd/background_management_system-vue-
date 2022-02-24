<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="40" :src="avatarUrl"></el-avatar>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const avatarUrl = ref(
  'https://s3.bmp.ovh/imgs/2022/02/780eb39829206d96.png'
)

const logout = () => {
  store.dispatch('appModule/logout')
}
</script>

<style scoped>
.el-icon--right {
  color: #6bc7ff;
}
</style>
