import axios from 'axios'
import { ElMessage } from 'element-plus'
import { BASE_URL, TIME_OUT } from './config'
import { diffTokenTime } from '../utils/auth'
import store from '../store'

const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      // 判断是否已到过期时间
      if (diffTokenTime()) {
        // 调用退出方法
        store.dispatch('appModule/logout')
        return Promise.reject(new Error('token 失效了'))
      }
    }
    // console.log(config)
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

// 相应拦截器
request.interceptors.response.use(
  (response) => {
    console.log(response)
    const { data, meta } = response.data

    if (meta.status === 200 || meta.status === 201) {
      return data
    } else {
      ElMessage({
        message: meta.msg,
        type: 'error'
      })
      return Promise.reject(new Error(meta.msg))
    }
  },
  (error) => {
    // 如果响应拦截错误
    error.response && ElMessage.error(error.response.data)
    return Promise.reject(new Error(error.response.data))
  }
)

export { request }
