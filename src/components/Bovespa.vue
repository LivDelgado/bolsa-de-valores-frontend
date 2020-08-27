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
                  <span>{{ this.bovespa.simbolo }}</span>
                </v-layout>
                <v-layout row wrap justify-space-around align-center class="d-flex">
                  <v-flex xs2 class="text-center">
                    <p>Pontos</p>
                    <h3>{{ formatValue(this.atualizacaoRecente.close_value) }}</h3>
                  </v-flex>
                  <v-flex xs2 class="text-center">
                    <p>Volume</p>
                    <h3>{{ this.atualizacaoRecente.volume_value }}</h3>
                  </v-flex>
                  <v-flex xs2 class="text-center">
                    <p>Máximo (Dia)</p>
                    <h3>{{ formatValue(this.atualizacaoRecente.high_value) }}</h3>
                  </v-flex>
                  <v-flex xs2 class="text-center">
                    <p>Mínimo (Dia)</p>
                    <h3>{{ formatValue(this.atualizacaoRecente.low_value) }}</h3>
                  </v-flex>
                  <v-flex xs2 class="text-center">
                    <p>Variação</p>
                    <h3>{{ this.variacao }}</h3>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-layout align-end justify-center pa-0 mt-0 mb-4>
                <span class="caption">Última atualização em: 25/08/2020</span>
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

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapGetters(["bovespa"]),
    atualizacaoRecente() {
      return this.bovespa.atualizacoes[0];
    },
    valoresGraficoBovespa() {
      return this.bovespa.atualizacoes
        .map((atualizacao) => parseInt(atualizacao.high_value))
        .slice(0, 10)
        .reverse();
    },
    labelsGraficoBovespa() {
      return this.bovespa.atualizacoes
        .map((atualizacao) => {
          let dataSplitted = atualizacao.data.split("-");
          return `${dataSplitted[2]}/${dataSplitted[1]}`;
        })
        .slice(0, 10)
        .reverse();
    },
    variacao() {
      if (this.bovespa.atualizacoes[1]) {
        let atualizacaoHoje = this.formatValue(
          this.bovespa.atualizacoes[0].close_value
        );
        let atualizacaoOntem = this.formatValue(
          this.bovespa.atualizacoes[1].close_value
        );
        let caractere = "";
        let valorVariacao = 0;
        if (atualizacaoHoje > atualizacaoOntem) {
          caractere = "+";
          valorVariacao =
            ((atualizacaoHoje - atualizacaoOntem) * 100) / atualizacaoOntem;
        } else {
          caractere = "-";
          valorVariacao =
            ((atualizacaoOntem - atualizacaoHoje) * 100) / atualizacaoOntem;
        }
        return `${caractere} ${valorVariacao.toFixed(2)}%`;
      } else {
        return "-";
      }
    },
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
  },
  mounted: async function () {
    await this.obterDadosBovespa();
  },
};
</script>