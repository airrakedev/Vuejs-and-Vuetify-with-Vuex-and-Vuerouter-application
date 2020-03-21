import Api from 'Api'
import _ from 'lodash'

import route from 'Router'

const state = {
    drawerStatus: true,
    genreList: []
}

const getters = {
    getDrawerStatus: state => state.drawerStatus,
    getGenreList: state => state.genreList
}

const mutations = {
    TOGGLE_DRAWER(state) {
        state.drawerStatus = !state.drawerStatus
    },
    ALL_GENRE(state, payload) {
        state.genreList = payload
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