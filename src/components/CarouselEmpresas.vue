<template>
  <v-container v-if="this.empresasSelecionadas.length > 0">
    <v-layout max-width="750" ma-5 mx-1 px-7 py-4 pb-0>
      <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item v-for="(empresa, i) in empresasSelecionadas" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <v-layout column align-center justify-center class="fill-height">
              <span class="text-h3 text-lighten-5 pb-6">{{ empresa.name }}</span>
              <span class="text-h1">{{ formatValue(empresa.price_value) }}</span>
              <span class="text-caption pt-5 align-center">{{ empresa.symbol }}</span>
            </v-layout>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    colors: [
      "purple darken-2",
      "indigo darken-3",
      "cyan darken-1",
      "blue-grey darken-1",
    ],
  }),
  computed: {
      ...mapGetters(["empresasSelecionadas"])
  },
  methods: {
    ...mapActions(["obterInformacoesEmpresa", "obterDadosEmpresasSelecionadas"]),
    formatValue(value) {
      return value.toLocaleString("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    },
  },
  created: async function () {
    this.obterDadosEmpresasSelecionadas();
  },
};
</script>