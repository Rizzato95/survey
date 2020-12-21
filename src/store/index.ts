import { Survey } from '@/models/Survey';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    survey: new Survey(),

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
