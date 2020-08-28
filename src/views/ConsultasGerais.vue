<template>
  <v-layout column>
    <CarouselEmpresas />
    <Bovespa />
  </v-layout>
</template>

<script>
import Bovespa from "../components/Bovespa.vue";
import CarouselEmpresas from "../components/CarouselEmpresas.vue";

export default {
  components: {
    Bovespa,
    CarouselEmpresas
  }
};
</script>