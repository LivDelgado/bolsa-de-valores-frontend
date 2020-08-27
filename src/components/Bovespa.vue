<template>
  <v-container>
    <v-layout max-width="900" ma-5 px-3 py-4>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header class="green--text">
            <h2>BOVESPA</h2>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card class="ma-0 pa-0">
              <v-card-text>
                <v-layout align-end justify-space-around pa-0 mt-0 mb-4>
                  <span>{{ this.bovespa ? this.bovespa.info.symbol : "" }}</span>
                </v-layout>
                <v-layout row wrap justify-space-around align-center class="d-flex">
                  <v-flex xs2 class="text-center">
                    <p>Pontos</p>
                    <h3>{{ this.bovespa ? parseFloat(this.bovespa.info.price_value).toFixed(2) : "" }}</h3>
                  </v-flex>
                  <v-flex xs2 class="text-center">
                    <p>Volume</p>
                    <h3>{{ this.bovespa ? parseFloat(this.bovespa.info.volume_value).toFixed(2) : ""}}</h3>
                  </v-flex>
                  <v-flex xs2 class="text-center">
                    <p>Máximo (Dia)</p>
                    <h3>{{ this.bovespa ? parseFloat(this.bovespa.info.high_value).toFixed(2) : ""}}</h3>
                  </v-flex>
                  <v-flex xs2 class="text-center">
                    <p>Mínimo (Dia)</p>
                    <h3>{{ this.bovespa ? parseFloat(this.bovespa.info.low_value).toFixed(2) : "" }}</h3>
                  </v-flex>
                  <v-flex xs2 class="text-center">
                    <p>Variação</p>
                    <h3 :class="[ this.variacaoPositiva ? 'positiva' : 'negativa']">{{ this.bovespa ? this.bovespa.info.change_percentage : ""}}</h3>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-layout align-end justify-center pa-0 mt-0 mb-4>
                <span
                  class="caption"
                >Última atualização em: {{ this.bovespa ? this.formatarDataCompleta(this.bovespa.info.date) : ""}}</span>
              </v-layout>
            </v-card>
            <v-sheet color="#1C1C1C">
              <v-sparkline
                :value="this.valoresGraficoBovespa"
                :labels="this.labelsGraficoBovespa"
                :line-width="2"
                color="#088A08"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
              ></v-sparkline>
            </v-sheet>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-layout>
  </v-container>
</template>

<style scoped>
.positiva {
  color: green;
}

.negativa {
  color: red;
}
</style>


<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapGetters(["bovespa"]),
    valoresGraficoBovespa() {
      if (this.bovespa) {
        return this.bovespa.updates
          .map((atualizacao) => parseInt(atualizacao.value))
          .reverse();
      } else {
        return null;
      }
    },
    labelsGraficoBovespa() {
      if (this.bovespa) {
        return this.bovespa.updates.map((atualizacao) => {
          atualizacao.date = this.formatarDataDiaMes(atualizacao.date);
        }).reverse();
      } else {
        return null;
      }
    },
    variacaoPositiva() {
      return this.bovespa ? this.bovespa.info.change_percentage.charAt(0) != '-' : false;
    }
  },
  methods: {
    ...mapActions(["obterDadosBovespa"]),
    formatValue(value) {
      value = value.replace(".", "");
      let formattedValue = `${value.slice(0, -1)}.${value.charAt(
        value.length - 1
      )}`;
      return parseFloat(formattedValue).toFixed(2);
    },
    formatarDataDiaMes(date) {
      let dataSplitted = date.split("-");
      return `${dataSplitted[2]}/${dataSplitted[1]}`;
    },
    formatarDataCompleta(date) {
      let dataSplitted = date.split("-");
      return `${dataSplitted[2]}/${dataSplitted[1]}/${dataSplitted[0]}`;
    }
  },
  beforeMount: async function () {
    await this.obterDadosBovespa();
  },
};
</script>