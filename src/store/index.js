import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import createMutationsSharer from "vuex-shared-mutations";

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
   plugins: [createPersistedState({
      // path:[]
      storage: window.sessionStorage
   }),
   createMutationsSharer({
      predicate: (mutation, state) => {
         // console.log(state, "Boom")
         return mutation
      }
   })
   ]
})
