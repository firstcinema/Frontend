import Vue from 'vue';
import App from './App.vue';
import Routes from './Routes';
import InstantSearch from 'vue-instantsearch';
import authMixin from './mixins/auth';
import { store } from './store';

Vue.config.productionTip = false

Vue.use(InstantSearch);

new Vue({
    mixins: [authMixin],
    render: h => h(App),
    router: Routes,
    store: store
}).$mount('#app');