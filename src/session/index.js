import Vue from 'vue'
import VueSession from 'vue-session'

Vue.use(VueSession)
const session = Vue.prototype.$session

export default session