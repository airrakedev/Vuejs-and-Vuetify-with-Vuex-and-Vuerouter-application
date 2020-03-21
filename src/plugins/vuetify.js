import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: { dark: false },
    icons: {
        iconfont: 'mdiSvg', // default - only for display purposes
    }
});
