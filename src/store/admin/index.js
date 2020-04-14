import Vue from 'vue'
import session from 'Session'

import Api from 'Api'
import _ from 'lodash'

import route from 'Router'

const state = {
    adminSessionStatus: session.has('admin-session'),
    adminId: null,
    adminProfile: {}
}

const getters = {
    getAdminSessionStatus: state => state.adminSessionStatus,
    getAdminId: state => state.adminId,
    getAdminProfile: state => state.adminProfile
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
    MOVIE_FAILED_TO_CREATE(state) {
        Vue.notify({
            group: 'movie',
            type: 'error',
            title: `Unable to create movie.`,
            text: 'Something went wrong.',
            duration: 5000
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
                console.log(err, 'asdajsdja')
                commit('LOGIN_ERROR', err)
            })
    },

    createMovie({ commit }, payload) {

        return Api.post('/movie/v1', payload)
            .then(res => {
                commit('MOVIE_CREATED_SUCCES')
                console.log(res, 'Responses with multipart/form-data')
                return res
            })
            .catch(err => {
                commit('MOVIE_FAILED_TO_CREATE')
                console.log(err, "Error on saving a movie.")
            })
    },

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