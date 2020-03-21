import Vue from 'vue'
import session from 'Session'

import Api from 'Api'
import _ from 'lodash'


const state = {
    clientId: null,
    clientSession: session.exists(),
    clientProfile: {},
    clientStatus: false,

    mylist: []
}

const getters = {
    getClientId: state => state.clientId,
    getClientSession: state => state.clientSession,
    getClientProfile: state => state.clientProfile,
    getClientStatus: state => state.clientStatus,

    getClientList: state => state.mylist
}

const mutations = {
    SUCCESS_SUBMIT_CLIENT_REGISTRATION_NOTIFY(state, res) {
        Vue.notify({
            group: 'movie',
            type: 'success',
            title: 'Registration Success!',
            text: session.exists() ? 'You have successfully created customer account!' : 'Please login your account.',
            duration: 5000
        })
    },
    FAILED_SUBMIT_CLIENT_REGISTRATION_NOTIFY(state, res) {
        Vue.notify({
            group: 'movie',
            type: 'error',
            title: 'Failed Registration!',
            text: session.exists() ? 'You\'ve failed to create customer account!' : 'Fail to submit your registration.',
            duration: 5000
        })
    },
    LOGIN_SUCCESS(state, res) {

        session.start()
        state.clientSession = session.exists()
        state.clientId = res.data.message._id,
            state.clientProfile = _.pick(res.data.message, [ 'firstname', 'lastname', 'phone', 'email', 'address' ])
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

        Vue.notify({
            group: 'movie',
            type: 'warning',
            title: 'Logging Out!',
            text: 'You are now logged out.',
            duration: 6000
        })
    },

    LOGIN_ERROR(state, res) {
        console.log('ni error ko?')
        Vue.notify({
            group: 'movie',
            type: 'error',
            title: 'Unable to login.',
            text: res.message,
            duration: 5000
        })
    }
}



const actions = {
    submitClientRegistration({ commit }, payload) {

        return Api.post('/customer/v1/register', payload)
            .then(response => {

                if (!response.data.success) return commit('FAILED_SUBMIT_CLIENT_REGISTRATION_NOTIFY', response)

                commit('SUCCESS_SUBMIT_CLIENT_REGISTRATION_NOTIFY', response.data)
                return response.data
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
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}