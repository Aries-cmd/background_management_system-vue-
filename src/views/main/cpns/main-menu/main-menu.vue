<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#2f4158"
    class="el-menu-vertical-demo"
    text-color="#fff"
    router="true"
    collapse-transition
    :default-active="defaultActive"
    unique-opened
    :collapse="!$store.state.appModule.iconType"
  >
    <el-sub-menu
      :index="item.id"
      v-for="(item, index) in menusList"
      :key="item.id"
    >
      <template #title>
        <template v-if="index == 0">
          <el-icon>
            <user />
          </el-icon>
        </template>
        <template v-else-if="index == 1">
          <el-icon>
            <setting />
          </el-icon>
        </template>
        <template v-else-if="index == 2">
          <el-icon>
            <shop />
          </el-icon>
        </template>
        <template v-else-if="index == 3">
          <el-icon>
            <tickets />
          </el-icon>
        </template>
        <template v-else-if="index == 4">
          <el-icon>
            <pie-chart />
          </el-icon>
        </template>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item-group v-for="iten in item.children" :key="iten.id">
        <el-menu-item @click="savePath(iten.path)" :index="'/' + iten.path">
          <div class="test-item">
            <el-icon><menu-item /></el-icon>
            <span>{{ $t(`menus.${iten.path}`) }}</span>
          </div>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { menuList } from '../../../../service/menu'
import {
  Menu as MenuItem,
  User,
  Setting,
  Shop,
  Tickets,
  PieChart
} from '@element-plus/icons-vue'

// 在 main 页面默认选择一个默认路由使得 menus-item 中的某个被选中
const defaultActive = ref(localStorage.getItem('path') || '/users')

// 获取从服务器床过来的 menu-items 的参数
const menusList = ref([])
const initMenusList = async () => {
  // const res = await menuList()
  // console.log(res)
  menusList.value = await menuList()
}
initMenusList()

// 默认情况下设置了 defaultActive 之后不管处于哪个路由下
// 只要一刷新 左边的 menus 菜单默认还是 用户管理 被选中
// 可我们不想这么做，这个时候就可以定义一个函数让 defaultActive 的值处于响应式
const savePath = (path) => {
  localStorage.setItem('path', `/${path}`)
}

// 设置当水平折叠收起菜单的过程更自然些
const store = useStore()
const offsetMarginLeft = computed(() => {
  return store.state.appModule.iconType ? '25px' : '0px'
})
</script>

<style>
.el-menu-vertical-demo {
  height: 100%;
}
span {
  margin-left: v-bind(offsetMarginLeft);
}
.test-item {
  margin-left: v-bind(offsetMarginLeft);
}
</style>
