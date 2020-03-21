import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

import Admin from './admin'
import Customer from './customer'
import Global from './global'
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    Admin,
    Customer,
    Global
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [ createPersistedState({
    // path:[]
    storage: window.sessionStorage
  }) ]
})
