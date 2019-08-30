import {getToken, setToken, removeToken} from '@/utils/token'
import router, {resetRouter} from "../../router";

const static_token = 'token:xxxxxxxx';

const state = {
  token: getToken(),
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
// user login
  login({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', static_token)
      setToken(static_token)
      resolve()
    })
  },
  // user logout
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
      resolve()
    })
  },
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      commit('SET_ROLES', ['editor'])
      resolve({roles: ['editor']})
    })
  },
  changeRoles({commit, dispatch}) {
    return new Promise(async (resolve, reject) => {
      const {roles} = await dispatch('getInfo')
      resetRouter()

      const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true})

      router.addRoutes(accessRoutes)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
