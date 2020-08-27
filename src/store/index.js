import Vuex from "vuex";
import Vue from "vue";

import services from '../services';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        bovespa: null
    },
    getters: {
        bovespa: state => state.bovespa,
    },
    actions: {
        async obterDadosBovespa({ commit }) {
            let bovespa = await services.obterDadosBovespa();
            commit("setBovespa", bovespa.data, { root: true })
        }
    },
    mutations: {
        setBovespa: (state, bovespa) => state.bovespa = bovespa,
    }
});

export default store;