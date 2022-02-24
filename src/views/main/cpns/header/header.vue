<template>
  <div class="nav-bar">
    <hamburger />
    <breadcrumb />
    <div class="navbar-right">
      <driver />
      <full-screen />
      <lang />
      <avatar />
    </div>
  </div>
</template>

<script setup>
import Hamburger from '../../../../components/hamburger.vue'
import Breadcrumb from '../../../../components/breadcrumb.vue'
import Avatar from '../../../../components/avatar.vue'
import Lang from '../../../../components/lang.vue'
import FullScreen from '../../../../components/fullScreen.vue'
import Driver from '../../../../components/driver/index.vue'
</script>

<style scoped>
.nav-bar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.navbar-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
