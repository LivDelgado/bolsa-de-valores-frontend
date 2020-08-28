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
            // função criada para lidar com a limitação de requisições por minuto da API da alpha vantage
            let sleep = function (ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            let empresasSelecionadas = []
            let google = await dispatch("obterInformacoesEmpresa", "GOOG");
            if (google) {
                google.name = "Google";
                empresasSelecionadas.push(google);
            }
            // intervalo necessário para que todos os dados possam ser retornados
            await sleep(20000);
            let microsoft = await dispatch("obterInformacoesEmpresa", "MSFT");
            if (microsoft) {
                microsoft.name = "Microsoft"
                empresasSelecionadas.push(microsoft);
            }
            // intervalo necessário para que todos os dados possam ser retornados
            await sleep(20000);
            let amazon = await dispatch("obterInformacoesEmpresa", "AMZN");
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