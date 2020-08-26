import Http from "../plugins/axios.js";
import Barramentos from "../constants/barramentos.js";

export default {
    obterDadosBovespa() {
      let barramento = Barramentos.BOVESPA;
      return Http().servico.get(barramento);
    }
}  