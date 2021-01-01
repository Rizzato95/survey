import { Settings } from '@/models/Settings';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    settings: new Settings(process.env.VUE_APP_SERVICE_BASE_URL)
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
