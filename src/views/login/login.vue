<template>
  <div class="login">
    <h1 class="title">{{ $t('login.title') }}</h1>
    <div class="login-form">
      <el-form label-width="60px" :rules="rules" :model="form" ref="formRef">
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入账号"
            :prefix-icon="Avatar"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Unlock"
            show-password
          ></el-input>
        </el-form-item>
        <el-button class="el-button" type="primary" @click="handleLogin"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { Avatar, Unlock } from '@element-plus/icons-vue'
// import { login } from '../../service/login'

const store = useStore()
const form = ref({
  username: '',
  password: ''
})

// 配置 rules
const rules = {
  username: [
    { required: true, message: '用户名是必传内容', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是五到十个字母，或数字',
      teigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码是必传内容', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,}$/,
      message: '密码必须大于三位，可以是字母、数字',
      teigger: 'blur'
    }
  ]
}

const formRef = ref(null)
// 验证登录方法
const handleLogin = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      // alert('submit')
      // console.log(valid)  // true
      // const res = await login(form.value)
      // console.log(res)
      store.dispatch('appModule/login', form.value)
    } else {
      alert('error')
    }
  })
}
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}

.title {
  width: 200px;
  text-align: center;
  padding-left: 15px;
  margin: 0 auto;
  margin-top: 100px;
  color: #4eb8f6;
}

.login-form {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.el-button {
  width: 100%;
}
</style>
