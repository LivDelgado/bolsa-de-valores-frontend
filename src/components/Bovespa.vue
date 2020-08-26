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
                <v-layout align-end justify-center pa-0 mt-0 mb-4>
                  <span>BOVV11.SAO</span>
                </v-layout>
                <v-layout row wrap pl-3 justify-space-around align-center class="d-flex">
                  <v-flex class="text-center">
                    <p>Pontos</p>
                    <h3>102.117</h3>
                  </v-flex>
                  <v-flex class="text-center">
                    <p>Volume</p>
                    <h3>102.117</h3>
                  </v-flex>
                  <v-flex class="text-center">
                    <p>Máximo (Dia)</p>
                    <h3>102.117</h3>
                  </v-flex>
                  <v-flex class="text-center">
                    <p>Mínimo (Dia)</p>
                    <h3>102.117</h3>
                  </v-flex>
                  <v-flex class="text-center">
                    <p>Variação</p>
                    <h3>-0.18%</h3>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-layout align-end justify-center pa-0 mt-0 mb-4>
                <span>Última atualização em: 25/08/2020</span>
              </v-layout>
            </v-card>
            <v-sheet color="#1C1C1C">
              <v-sparkline
                :value="this.valoresGraficoBovespa"
                :labels="this.labelsGraficoBovespa"
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
export default {
  data: () => ({
    atualizacoes: [
      {
        data: "2020-08-25",
        open_value: "103.0000",
        high_value: "103.4300",
        low_value: "102.0400",
        close_value: "102.5300",
        volume_value: "1364900",
      },
      {
        data: "2020-08-24",
        open_value: "101.8200",
        high_value: "102.9400",
        low_value: "101.8200",
        close_value: "102.6800",
        volume_value: "1065760",
      },
      {
        data: "2020-08-21",
        open_value: "102.0000",
        high_value: "102.0600",
        low_value: "100.8100",
        close_value: "101.8000",
        volume_value: "1392930",
      },
      {
        data: "2020-08-20",
        open_value: "99.9500",
        high_value: "102.2500",
        low_value: "99.3200",
        close_value: "102.0000",
        volume_value: "1373510",
      },
      {
        data: "2020-08-19",
        open_value: "102.4000",
        high_value: "102.6600",
        low_value: "101.1500",
        close_value: "101.2800",
        volume_value: "1729650",
      },
      {
        data: "2020-08-18",
        open_value: "102.0000",
        high_value: "102.7700",
        low_value: "101.5500",
        close_value: "102.4000",
        volume_value: "1677750",
      },
    ],
  }),
  computed: {
    valoresGraficoBovespa() {
      return this.atualizacoes
        .map((atualizacao) => parseInt(atualizacao.high_value))
        .slice(0, 30)
        .reverse();
    },
    labelsGraficoBovespa() {
      return this.atualizacoes
        .map((atualizacao) => {
          let dataSplitted = atualizacao.data.split("-");
          return `${dataSplitted[2]}/${dataSplitted[1]}`;
        })
        .slice(0, 30)
        .reverse();
    },
  },
};
</script>