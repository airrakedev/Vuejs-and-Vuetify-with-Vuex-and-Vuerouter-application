import Api from 'Api'
import _ from 'lodash'

import route from 'Router'

const state = {
   drawerStatus: false,
   genreList: [],
   snackBarNotice: {
      status: false,
      color: '',
      text: ''
   }
}

const getters = {
   getDrawerStatus: state => state.drawerStatus,
   getGenreList: state => state.genreList,
   getSnackBarNotice: state => state.snackBarNotice
}

const mutations = {
   TOGGLE_DRAWER(state) {
      state.drawerStatus = !state.drawerStatus
   },
   ALL_GENRE(state, payload) {
      state.genreList = payload
   },
   UPDATE_SNACKBAR(state, { status, color, text }) {
      state.snackBarNotice = {
         status,
         color,
         text
      }
   }
}

const actions = {
   toggleDrawer({ commit }) {
      commit('TOGGLE_DRAWER')
   },
   getAllGenre({ commit }) {
      return Api.get('/genres/v1')
         .then(res => {
            if (res.data.success) {
               return commit('ALL_GENRE', res.data.data)
            }
         })
         .catch(err => console.log(err, 'On getting all genres.'))
   }
}


export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions
}