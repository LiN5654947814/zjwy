import Vue from 'vue'
import Vuex from 'vuex'
import action from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: mutations,
  actions: action,
  modules: {}
})
