import Vuex from "vuex";
import Vue from "vue";

import services from '../services';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        bovespa: null,
        empresasSelecionadas: [],
    },
    getters: {
        bovespa: state => state.bovespa,
        empresasSelecionadas: state => state.empresasSelecionadas,
    },
    actions: {
        async obterDadosBovespa({ commit }) {
            let bovespa = await services.obterDadosBovespa();
            commit("setBovespa", bovespa.data, { root: true })
        },
        async obterInformacoesEmpresa(store, symbol) {
            try {
                let response = await services.obterInformacoesEmpresa(symbol);
                return response.data;
            } catch {
                alert("Erro ao obter informações da empresa " + symbol)
            }
        },
        async obterDadosEmpresasSelecionadas({ dispatch, commit }) {
            let empresasSelecionadas = []
            let google = dispatch("obterInformacoesEmpresa", "GOOG");
            if (google) {
                google.name = "Google";
                empresasSelecionadas.push(google);
            }
            let microsoft = dispatch("obterInformacoesEmpresa", "MSFT");
            if (microsoft) {
                microsoft.name = "Microsoft"
                empresasSelecionadas.push(microsoft);
            }
            let amazon = dispatch("obterInformacoesEmpresa", "AMZN");
            if (amazon) {
                amazon.name = "Amazon.com Inc."
                empresasSelecionadas.push(amazon);
            }
            commit("setEmpresasSelecionadas", empresasSelecionadas);
        },

    },
    mutations: {
        setBovespa: (state, bovespa) => state.bovespa = bovespa,
        setEmpresasSelecionadas: (state, empresasSelecionadas) => state.empresasSelecionadas = empresasSelecionadas,
    }
});

export default store;