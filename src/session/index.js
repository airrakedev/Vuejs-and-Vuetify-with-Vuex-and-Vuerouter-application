import Vue from 'vue'
import VueSession from 'vue-session'

Vue.use(VueSession, { persist: true })
const session = Vue.prototype.$session

export default session