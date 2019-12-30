export default {
  changeNav({ commit }, isActive) {
    commit('changeNav', isActive)
  },
  changeLocalNav({ commit }, localNav) {
    commit('changeLocalNav', localNav)
  }
}
