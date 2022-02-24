import { createStore } from 'vuex'
import appModule from './modules/app'

export default createStore({
  state: () => ({}),
  mutations: {},
  actions: {},
  modules: {
    appModule
  }
})
