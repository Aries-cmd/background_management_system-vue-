<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="30%"
    @close="handleClose"
  >
    <el-form ref="formRef" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item
        v-if="dialogTitle == '添加用户'"
        label="密码"
        prop="password"
      >
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button class="left" @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref, defineProps, watch } from 'vue'
import { addUser, editUser } from '../../../service/users'
import { ElMessage } from 'element-plus'
import i18n from '../../../i18n/index'
const t = i18n.global.t

const props = defineProps({
  dialogTitle: {
    type: String,
    required: true,
    default: ''
  },
  dialogTableValue: {
    type: Object,
    default: () => {}
  }
})

const form = ref({
  username: '',
  password: '',
  email: '',
  mobile: ''
})

watch(
  () => props.dialogTableValue,
  () => {
    console.log(props.dialogTableValue, 'dialog')
    form.value = props.dialogTableValue
  },
  { deep: true, immediate: true }
)

const emits = defineEmits(['update:modelValue', 'initUserList'])

const handleClose = () => {
  emits('update:modelValue', false)
  form.value = {
    username: '',
    password: '',
    email: '',
    mobile: ''
  }
}

const handleConfirm = async () => {
  if (form.value.username.length >= 3) {
    props.dialogTitle === '添加用户'
      ? await addUser(form.value)
      : await editUser(form.value)
    form.value = {
      username: '',
      password: '',
      email: '',
      mobile: ''
    }
    handleClose()
    ElMessage({
      message: t('message.updeteSuccess'),
      type: 'success'
    })
    emits('initUserList')
  } else {
    ElMessage({
      message: '输入用户名或密码不符合格式要求',
      type: 'error'
    })
  }
}

// 配置 rules
const rules = {
  username: [
    { required: true, message: '用户名是必传内容', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '用户名必须大于或等于三位，可以是字母、数字',
      teigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码是必传内容', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,}$/,
      message: '密码必须大于或五位，可以是字母、数字',
      teigger: 'blur'
    }
  ],
  email: [
    { required: false, message: '', trigger: 'blur' },
    {
      pattern: '...',
      message: '请输入正确邮箱',
      teigger: 'blur'
    }
  ],
  mobile: [
    { required: false, message: '', trigger: 'blur' },
    {
      pattern: '...',
      message: '请输入正确手机号',
      teigger: 'blur'
    }
  ]
}
</script>

<style>
.left {
  float: left;
}
</style>
