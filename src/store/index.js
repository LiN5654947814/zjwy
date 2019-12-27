import Vue from 'vue'
import Vuex from 'vuex'
import action from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: false,
    token: ''
  },
  mutations: mutations,
  actions: action,
  modules: {}
})
