import { login as loginAPI } from '../../service/login'
import router from '../../router'
import { setTokenTime } from '../../utils/auth'
export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
    iconType: true,
    lang: localStorage.getItem('lang') || 'zh'
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    changeIconType(state) {
      state.iconType = !state.iconType
    },
    changeLang(state, lang) {
      state.lang = lang
    }
  },
  getters: {
    getTokenType(state) {
      return state.iconType
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginAPI(userInfo)
          .then((res) => {
            commit('setToken', res.token)
            // 在登录的时候设置时间戳 token
            setTokenTime()
            router.replace('/main')
            window.location.href = '/main'
            console.log(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 退出操作
    logout({ commit }) {
      // 把 token 设置为空
      commit('setToken', '')
      // 清空所有 缓存
      localStorage.clear()
      // 将页面跳转到登录页面
      router.replace('/login')
    }
  }
}
