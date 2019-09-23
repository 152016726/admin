const state = {
  multiScreen: false
}

const mutations = {
  toggle_multi_screen: (state, multiScreen) => {
    state.multiScreen = multiScreen;
  }
}

const actions = {
  toggleLiquid({commit}, multiScreen) {
    commit('toggle_multi_screen', multiScreen)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
