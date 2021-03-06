import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from "./getters"
import app from './modules/app'
import settings from "./modules/settings"
import permission from "./modules/permission"
import tagsView from './modules/tagsView'
import resize from "./modules/resize";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    app,
    settings,
    permission,
    tagsView,
    resize
  },
  getters
});

export default store
