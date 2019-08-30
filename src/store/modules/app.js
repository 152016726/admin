import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  toggle_sidebar: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  close_sidebar: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  toggle_device: (state, device) => {
    state.device = device;
  }
}

const actions = {
  toggleSidebar({commit}) {
    commit('toggle_sidebar')
  },
  closeSideBar({commit}, {withoutAnimation}) {
    commit('close_sidebar', withoutAnimation)
  },
  toggleDevice({commit}, device) {
    commit('toggle_device', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
