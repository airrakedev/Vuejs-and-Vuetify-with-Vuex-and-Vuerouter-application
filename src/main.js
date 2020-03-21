import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import velocity from 'velocity-animate'

import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

import session from 'Session'

import Notifications from 'vue-notification'
Vue.use(Notifications, { velocity })

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
