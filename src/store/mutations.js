export default {
  changeNav(state, isActive) {
    state.isActive = isActive
  },
  changeLocalNav(state, localNav) {
    state.localName = localNav.localName
    state.nextLocalName = localNav.nextLocalName
    window.localStorage.setItem('localNav', JSON.stringify(localNav))
  }
}
