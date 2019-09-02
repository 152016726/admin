const state = {
  visitedViews: [], // 访问记录
  cachedViews: []   // 浏览缓存
}

const mutations = {
  add_visited_views: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(Object.assign({}, view, {
      title: view.meta.title || 'no-name'
    }))
  },
  add_cached_view: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  del_visited_view: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  del_cached_view: (state, view) => {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(index, 1)
        break
      }
    }
  },
  del_others_visited_views: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  del_all_visited_views: state => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  del_all_cached_views: state => {
    state.cachedViews = []
  },
  update_visited_views: (state, view) => {
    for (let key of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

const actions = {
  addView({dispatch}, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({commit}, view) {
    commit('add_visited_views', view)
  },
  addCachedView({commit}, view) {
    commit('add_cached_view', view)
  },
  delView({dispatch, state}, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({commit, state}, view) {
    return new Promise(resolve => {
      commit('del_visited_view', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({commit, state}, view) {
    return new Promise(resolve => {
      commit('del_cached_view', view)
      resolve([...state.cachedViews])
    })
  },
  delOthersViews({dispatch, state}, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews({commit, state}, view) {
    return new Promise(resolve => {
      commit('del_others_visited_views', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews({commit, state}, view) {
    return new Promise(resolve => {
      commit('del_others_cached_views', view)
      resolve([...state.cachedViews])
    })
  },
  delAllViews({dispatch, state}) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews')
      dispatch('delAllCachedViews')
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({commit, state}) {
    return new Promise(resolve => {
      commit('del_all_visited_views')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({commit, state}) {
    return new Promise(resolve => {
      commit('del_all_cached_views')
      resolve([...state.cachedViews])
    })
  },
  updateVisitedViews({commit}, view) {
    commit('update_visited_views', view)
  }
}
