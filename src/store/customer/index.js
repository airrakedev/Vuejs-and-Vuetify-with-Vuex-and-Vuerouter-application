import Vue from 'vue'

import Api from 'Api'
import _ from 'lodash'
import session from 'Session'
import route from 'Router'

const state = {
   clientId: null,
   clientSession: false,
   clientProfile: {},
   clientStatus: false,

   myMovieList: [],
   clientTotalMovie: null,
   clientTotalQtyShopMovie: null
}

const getters = {
   getClientId: state => state.clientId,
   getClientSession: state => state.clientSession,
   getClientProfile: state => state.clientProfile,
   getClientStatus: state => state.clientStatus,
   getClientList: state => state.myMovieList,
   getIfIHaveMovies: state => (state.myMovieList != 0),
   getClientTotalMovie: state => state.clientTotalMovie,
   getAllQtyShopMovie: state => state.myMovieList.reduce((accu, currentItem) => (currentItem.qty + accu), 0)
}

const mutations = {

   GET_TOTAL_AMOUNT_SHOP_MOVIE(state) {
      // Total shop movies
      let total = state.myMovieList.reduce((accu, currentItem) => (currentItem.rentPrice * currentItem.qty) + accu, 0)
      state.clientTotalMovie = Math.round((total + Number.EPSILON) * 100) / 100
   },

   ADJUST_MY_MOVIE_LIST(state, { id, action }) {
      let allMovie = state.myMovieList
      let getMovie = allMovie.filter((item) => item._id == id);
      switch (action) {
         case 'add':
            state.myMovieList.forEach((item, i) => {
               if (item._id == id) {
                  let currentQty = state.myMovieList[i].qty + 1
                  state.myMovieList[i].qty = currentQty
               }
            });
            break;
         case 'minus':
            state.myMovieList.forEach((item, i) => {
               if (item._id == id) {
                  let currentQty = state.myMovieList[i].qty

                  if (currentQty <= 1) return state.myMovieList.splice(i, 1)

                  state.myMovieList[i].qty = currentQty - 1
               }
            });
            break;
         case 'delete':
            state.myMovieList.forEach((item, i) => {
               if (item._id == id) state.myMovieList.splice(i, 1)

            });
            break;
      }

   },
   ADD_MOVIE_ITEM(state, movie) {
      let myMovieList = state.myMovieList;
      let { _id, rentPrice, title } = movie;
      // filter each list if the movie was already added
      let checkMovieInList = myMovieList.filter((item) => item._id == _id);
      if (checkMovieInList.length > 0) {
         myMovieList.forEach((item, i) => {
            if (item._id === _id) {
               let currentQty = { _id: item._id, title: item.title, rentPrice, qty: parseInt(item.qty + 1) };

               myMovieList.splice(i, 1)
               myMovieList.push(currentQty)
            }
         });
      } else {
         state.myMovieList.push(movie)
      }
   },
   SUCCESS_SUBMIT_CLIENT_REGISTRATION_NOTIFY(state, res) {
      Vue.notify({
         group: 'movie',
         type: 'success',
         title: 'Registration Success!',
         text: this.$session.exists() ? 'You have successfully created customer account!' : 'Please login your account.',
         duration: 4500
      })
   },
   FAILED_SUBMIT_CLIENT_REGISTRATION_NOTIFY(state, res) {
      Vue.notify({
         group: 'movie',
         type: 'error',
         title: 'Failed Registration!',
         text: session.exists() ? 'You\'ve failed to create customer account!' : 'Fail to submit your registration.',
         duration: 4500
      })
   },

   SUCCESS_CHECKOUT(state) {
      state.myMovieList = []
      state.clientTotalMovie = null
      state.clientTotalQtyShopMovie = null
      Vue.notify({
         group: 'movie',
         type: 'success',
         title: 'Checkout Success!',
         text: 'You successfully checkout your movies.',
         duration: 4500
      })
   },
   FAILED_CHECKOUT(state, message) {
      Vue.notify({
         group: 'movie',
         type: 'error',
         title: 'Failed Checkout!',
         text: message,
         duration: 4500
      })
   },
   ADDING_MY_MOVIE_LIST(state, movie) {
      state.myMovieList.push(movie)
   },
   LOGIN_SUCCESS(state, res) {
      session.start()
      state.clientSession = session.exists()
      state.clientId = res.data.message._id,
         state.clientProfile = _.pick(res.data.message, ['firstname', 'lastname', 'phone', 'email', 'address', 'country', 'zipcode'])
      state.clientStatus = res.data.message.status

      Vue.notify({
         group: 'movie',
         type: 'success',
         title: `Welcome ${res.data.message.firstname}`,
         text: 'You are logged in and free to select our catalog of movies.',
         duration: 7500
      })
   },

   LOGOUT_USER(state) {
      session.destroy()
      localStorage.clear()
      state.clientSession = session.exists()

      state.clientId = null
      state.clientSession = false
      state.clientProfile = {}
      state.clientStatus = false
      state.myMovieList = []
      state.clientTotalMovie = null
      state.clientTotalQtyShopMovie = null


      Vue.notify({
         group: 'movie',
         type: 'warning',
         title: 'Logging Out!',
         text: 'You are now logged out.',
         duration: 4500
      })
   },

   LOGIN_ERROR(state, res) {
      Vue.notify({
         group: 'movie',
         type: 'error',
         title: 'Unable to login.',
         text: res.message,
         duration: 4500
      })
   },
   NO_DOUBLE_LOGIN(state) {
      Vue.notify({
         group: 'movie',
         type: 'error',
         title: 'Please logout the Admin account.',
         text: 'Admin account is currently logged in',
         duration: 4500
      })
   }
}



const actions = {
   submitClientRegistration({ commit }, payload) {
      return Api.post('/customer/v1/register', payload)
         .then(response => {
            if (!response.data.success) return commit('FAILED_SUBMIT_CLIENT_REGISTRATION_NOTIFY', response)
            commit('SUCCESS_SUBMIT_CLIENT_REGISTRATION_NOTIFY', response.data)
            return
         })
         .catch((err) => {
            commit('FAILED_SUBMIT_CLIENT_REGISTRATION_NOTIFY', {})
         })
   },

   async loginUser({ commit }, payload) {
      return await Api.post('/customer/v1/login', payload)
         .then(res => {
            if (!res.data.success) return commit('LOGIN_ERROR', res.data)
            commit('LOGIN_SUCCESS', res)
            return res
         })
         .catch(error => commit('LOGIN_ERROR', error))
   },

   clientCheckOut({ commit }, payload) {
      return Api.post('/purchase/v1/create', payload)
         .then(response => {
            console.log(response, "Checkout")
            if (!response.data.success) return commit('FAILED_CHECKOUT', response.data.message)
            commit('SUCCESS_CHECKOUT')

            route.push({ name: 'MovieRecord' })
            return
         })
         .catch((err) => {
            console.log(err, 'Error on checkout')
            commit('FAILED_CHECKOUT', 'Error on checkout')
         })
   },

   getMyCheckOut({ commit }, params) {
      console.log(params, 'Hopjfe')
      return Api.get('/purchase/v1', { params })
         .then(response => {
            console.log(response, "My Checkout")
            // if (!response.data.success) return commit('FAILED_CHECKOUT', response.data.message)
            // commit('SUCCESS_CHECKOUT')

            // route.push({ name: 'MovieRecord' })
            return
         })
         .catch((err) => {
            console.log(err, 'Error on checkout')
            commit('FAILED_CHECKOUT', 'Error on checkout')
         })
   },

   updateMyMovieList({ commit }, payload) {
      commit('ADJUST_MY_MOVIE_LIST', payload)
      // Total movie
      commit('GET_TOTAL_AMOUNT_SHOP_MOVIE')
   },

   addMyMovieToCart({ commit }, payload) {
      commit('ADD_MOVIE_ITEM', payload)
      // Total movie
      commit('GET_TOTAL_AMOUNT_SHOP_MOVIE')
   }
}


export default {
   namespaced: true,
   state,
   getters,
   mutations,
   actions
}