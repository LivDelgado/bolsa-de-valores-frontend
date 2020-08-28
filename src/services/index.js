import Http from "../plugins/axios.js";
import Barramentos from "../constants/barramentos.js";

export default {
    obterDadosBovespa() {
      let barramento = Barramentos.BOVESPA;
      return Http().servico.get(barramento);
    },
    listarPossiveisEmpresas(empresa) {
      let barramento = `${Barramentos.BOVESPA}${Barramentos.CONSULTA_EMPRESA_NOME}${empresa}`;
      return Http().servico.get(barramento);
    },
    obterInformacoesEmpresa(simbolo) {
      let barramento = Barramentos.EMPRESAS + "/" + simbolo;
      return Http().servico.get(barramento);
    }
}  