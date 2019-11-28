<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import VueCarousel, { Carousel, Slide } from "vue-carousel";
Vue.use(VueCarousel);

export default {
  name: "App",
  components: {
    Carousel
  }
};
</script>
