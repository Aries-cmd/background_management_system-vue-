<template>
  <el-container class="main-wrapper">
    <el-aside :width="asideWidth" class="main-aside">
      <main-menu></main-menu>
    </el-aside>
    <el-container>
      <el-header class="main-header">
        <header-top></header-top>
      </el-header>
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import MainMenu from './cpns/main-menu/main-menu.vue'
import HeaderTop from './cpns/header/header.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const asideWidth = computed(() => {
  return store.state.appModule.iconType ? '220px' : '60px'
})
</script>

<style>
.main-wrapper {
  width: 100%;
  height: 100%;
}

.main-aside {
  /* width: 15%; */
  background: #2f4158;
}

.main-header {
  height: 70px;
}

.main-content {
  background: yellow;
}
</style>
