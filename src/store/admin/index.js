import Vue from 'vue'
import session from 'Session'

import Api from 'Api'
import _ from 'lodash'

import route from 'Router'

const state = {
   adminSessionStatus: session.has('admin-session'),
   adminId: null,
   adminProfile: {},
   allMovies: [],
   allClients: []
}

const getters = {
   getAdminSessionStatus: state => state.adminSessionStatus,
   getAdminId: state => state.adminId,
   getAdminProfile: state => state.adminProfile,
   getAllMovies: state => state.allMovies,
   getAllClients: state => state.allClients,
   isMovieAvailable: state => state.allMovies.length != 0
}


const mutations = {
   LOGIN_SUCCESS(state, res) {

      session.start()
      session.set('admin-session', true)
      state.adminSessionStatus = session.has('admin-session')
      state.adminId = res.data._id
      state.adminProfile = _.pick(res.data, ['firstname', 'lastname', 'email'])

      Vue.notify({
         group: 'movie',
         type: 'success',
         title: `Welcome  ${res.data.firstname}!`,
         text: 'You are now logged.',
         duration: 7500
      })
      route.push({ name: 'AdminDashboard' })
   },

   LOGOUT_USER(state) {
      session.destroy()
      localStorage.clear()
      state.adminSessionStatus = session.has('admin-session')

      Vue.notify({
         group: 'movie',
         type: 'warning',
         title: 'Logging Out!',
         text: 'You are now logged out.',
         duration: 6000
      })
   },

   LOGIN_ERROR(state, res) {

      Vue.notify({
         group: 'movie',
         type: 'error',
         title: 'Unable to login.',
         text: res.message,
         duration: 5000
      })
   },
   MOVIE_CREATED_SUCCES(state) {
      Vue.notify({
         group: 'movie',
         type: 'success',
         title: `Movie successfullu created!`,
         text: 'Please check your movie record in ypur list.',
         duration: 5000
      })
   },
   MOVIE_FAILED_TO_CREATE(state, data) {
      let message = !data ? 'Unable to create a movie' : data.message
      Vue.notify({
         group: 'movie',
         type: 'error',
         title: message,
         text: 'Couldn\'t continue the process.',
         duration: 9500
      })
   },
   GETTING_ALL_MOVIES(state, data) {
      state.allMovies = data.data

   },
   FILTER_MOVIE_ON_DISPLAY(state, action) {
      let current = state.allMovies

      let day = new Date("2019-09-13T14:58:20.133Z");
      let now = new Date();
      let todayYear = now.getFullYear()
      let todayMonth = now.getMonth()
      let today = now.getDate()

      switch (action) {

         case 'trending':
            state.allMovies = { docs: current.docs.filter(item => item.inStock <= 2) }
            break;

         case 'featured':
            state.allMovies = { docs: current.docs.filter(item => item.inStock > 2) }
            break;

         case 'new':
            var lastTwodays = current.docs.filter((item) => {
               let created = new Date(item.created)
               created.setDate(created.getDate() + 2)
               if (todayYear == created.getFullYear() && todayMonth == created.getMonth()) {
                  return today >= created.getDate() || created.getDate() > created.getDate() - 1
               }
            })
            state.allMovies = { docs: lastTwodays }
            break;
      }

   },
   GETTING_ALL_CLIENTS(state, data) {
      state.allClients = data.data
   },
   FAILED_GETTING_ALL_MOVIES(state) {
      Vue.notify({
         group: 'movie',
         type: 'error',
         title: `Can't find any movie records.`,
         duration: 6000
      })
   },
   FAILED_GETTING_ALL_CLIENTS(state) {
      Vue.notify({
         group: 'movie',
         type: 'error',
         title: `Can't find any client records.`,
         duration: 6000
      })
   },
   INVALID_PROFILE_IMAGE(state) {
      Vue.notify({
         group: 'movie',
         type: 'error',
         title: `Invalid movie profile.`,
         text: 'Please upload image files only.',
         duration: 6000
      })
   }
}


const actions = {
   async adminLogin({ commit }, payload) {
      return await Api.post('/admin/v1/login', payload)
         .then(res => {

            if (!res.data.success) {
               commit("LOGIN_ERROR", res.data)
               return res
            }

            commit('LOGIN_SUCCESS', res.data)
            return res
         })
         .catch((err) => {
            commit('LOGIN_ERROR', err)
         })
   },

   createMovie({ commit }, payload) {

      return Api.post('/movie/v1', payload)
         .then(res => {
            if (!res.data.success) {
               return commit('MOVIE_FAILED_TO_CREATE', res.data)
            }
            commit('MOVIE_CREATED_SUCCES')
            return res
         })
         .catch(err => {
            commit('MOVIE_FAILED_TO_CREATE')
         })
   },

   // GET ALL MOVIES
   async gettingAllMovies({ commit }, params) {
      return await Api.get('/movie/v1', { params })
         .then(res => {
            if (!res.data.success) {
               return commit('FAILED_GETTING_ALL_MOVIES')
            }
            return commit('GETTING_ALL_MOVIES', res.data)
         })
         .catch(err => {
            commit('FAILED_GETTING_ALL_MOVIES')
         })
   },
   gettingAllClient({ commit }, params) {
      return Api.get('/customer/v1/all-clients', { params })
         .then(res => {
            if (!res.data.success) {
               return commit('FAILED_GETTING_ALL_CLIENTS')
            }
            return commit('GETTING_ALL_CLIENTS', res.data)
         })
         .catch(err => {
            commit('FAILED_GETTING_ALL_CLIENTS')
         })
   },
   // ADMIN LOGOUT
   adminLogout({ commit }, payload) {
      commit('LOGOUT_USER', payload)
      route.push('/')
   }
}


export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions
}