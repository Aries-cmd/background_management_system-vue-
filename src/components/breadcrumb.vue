<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <span class="no-redirect" v-if="index === breadcrumbList.length - 1">{{
        $t(`menus.${item.path.substr(1)}`)
      }}</span>
      <span class="redirect" @click="handleRedirect(item.path)" v-else>{{
        $t(`menus.${item.path.substr(1)}`)
      }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const router = useRouter()

const breadcrumbList = ref([])

const initBreadcrumbList = () => {
  breadcrumbList.value = route.matched
  console.log(breadcrumbList.value)
}

const handleRedirect = (path) => {
  router.push(path)
}

watch(
  route,
  () => {
    initBreadcrumbList()
  },
  { deep: true, immediate: true }
)
</script>

<style scoped>
.redirect {
  cursor: pointer;
}
</style>
