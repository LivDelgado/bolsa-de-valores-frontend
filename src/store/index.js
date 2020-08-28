import Vuex from "vuex";
import Vue from "vue";

import services from '../services';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        bovespa: null,
    },
    getters: {
        bovespa: state => state.bovespa,
    },
    actions: {
        async obterDadosBovespa({ commit }) {
            let bovespa = await services.obterDadosBovespa();
            commit("setBovespa", bovespa.data, { root: true })
        },
        async obterInformacoesEmpresa(store, symbol) {
            try {
                console.log(symbol);
                let response = await services.obterInformacoesEmpresa(symbol);
                return response.data;
            } catch {
                alert("Erro ao obter informações da empresa " + symbol)
            }
        }
    },
    mutations: {
        setBovespa: (state, bovespa) => state.bovespa = bovespa,
    }
});

export default store;