import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/style/_main.scss'

// Import vee-validate italian language
import { ValidationObserver, ValidationProvider, localize } from 'vee-validate';
import it from 'vee-validate/dist/locale/it.json';

localize('it', it);

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
