<template>
  <v-app>
    <v-app-bar app color="#006600" dark >
      <v-layout class="justify-space-around">
        <v-btn-toggle v-model="consulta" tile color="white accent-3" group>
          <v-btn value="geral">Consultas Gerais</v-btn>
          <v-btn value="usuario">Suas Consultas</v-btn>
        </v-btn-toggle>
      </v-layout>
    </v-app-bar>

    <v-main>
      <ConsultasGerais v-show="consulta=='geral'"/>
    </v-main>
  </v-app>
</template>

<script>
import ConsultasGerais from "./views/ConsultasGerais";

export default {
  name: "App",

  components: {
    ConsultasGerais,
  },

  data: () => ({
    consulta: 'geral'
  }),
};
</script>
