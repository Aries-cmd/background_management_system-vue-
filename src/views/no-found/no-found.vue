<template>
  <div>
    <h2>亲，您访问的页面消失了呢，<span @click="routerClick">点击我</span>返回首页</h2>
  </div>
</template>

<script setup>
import router from '../../router/index'

const routerClick = () => {
  router.replace('/main')
  console.log(1)
}
</script>

<style>
h2 {
  width: 300px;
  margin: 0 auto;
  margin-top: 200px;
}

span {
  color: lightgreen;
  cursor: pointer;
}
</style>
