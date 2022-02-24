<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          clearable
          :placeholder="$t('table.placeholder')"
          v-model="queryForm.query"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initGetUsersList">{{
        $t('table.search')
      }}</el-button>
      <el-button type="primary" @click="handleDialogValue()">{{
        $t('table.adduser')
      }}</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
        v-for="item in options"
        :key="item.label"
        :width="item.width"
      >
        <template #default="{ row }" v-if="item.prop == 'create_time'">
          {{ getTime(row.create_time) }}
        </template>
        <template v-slot="{ row }" v-else-if="item.prop == 'mg_state'">
          <el-switch v-model="row.mg_state" @change="changeState(row)" />
        </template>
        <template #default="{ row }" v-else-if="item.prop == 'action'">
          <el-button
            type="primary"
            :icon="Edit"
            @click="handleDialogValue(row)"
          ></el-button>
          <el-button :icon="Search"></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            @click="delUser(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      v-model:currentPage="queryForm.pagenum"
      :page-size="queryForm.pagesize"
      :page-sizes="[1, 2, 5, 10]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </el-card>
  <Dialog
    @initUserList="initGetUsersList"
    v-model="dialogVisible"
    :dialogTitle="dialogTitle"
    :dialogTableValue="dialogTableValue"
  />
</template>

<script setup>
import { ref } from 'vue'
import { getUsers, changeUserState, deleteUser } from '../../service/users'
import { options } from './options'
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import { getTime } from './getTime'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import Dialog from './cpns/dialog.vue'
const i18n = useI18n()

const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 2
})
const total = ref(null)

const dialogVisible = ref(false)
const dialogTitle = ref('添加用户')
const dialogTableValue = ref({})

const tableData = ref([])

// 初始化列表
const initGetUsersList = async () => {
  const res = await getUsers(queryForm.value)
  console.log(res)
  tableData.value = res.users
  total.value = res.total
}
initGetUsersList()

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetUsersList()
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetUsersList()
}

// 定义判断 handleDialogValue 的形参是否为空
const isNull = (date) => {
  if (!date) return true
  if (JSON.stringify(date) === '{}') return true
  if (JSON.stringify(date) === '[]') return true
}
const handleDialogValue = (row) => {
  if (isNull(row)) {
    dialogTitle.value = '添加用户'
  } else {
    dialogTitle.value = '编辑用户'
    dialogTableValue.value = JSON.parse(JSON.stringify(row))
    console.log(row)
  }

  dialogVisible.value = true
}

const changeState = async (info) => {
  await changeUserState(info.id, info.mg_state)
  ElMessage({
    message: i18n.t('message.updeteSuccess'),
    type: 'success'
  })
}

// 删除用户
const delUser = (row) => {
  ElMessageBox.confirm(
    i18n.t('dialog.deleteTitle'),
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteUser(row.id)
      initGetUsersList()
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败'
      })
    })
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 20px;
  box-sizing: border-box;
}

::v-deep .el-input__suffix {
  align-items: center;
}

.pager {
  float: right;
  margin-top: 20px;
}
</style>
