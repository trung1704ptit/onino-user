<template>
  <div class="dashboard-editor-container">
    <weather />

    <configuration-template-slide />

    <automation-slide />

    <room-slide />

    <camera-slide />
  </div>
</template>

<script>
import Vue from 'vue'
import VueCarousel, { Carousel, Slide }  from 'vue-carousel';
import CameraSlide from '@/views/camera/CameraSlide';
import RoomSlide from '@/views/room/RoomSlide';
import Weather from './components/Weather';
import ConfigurationTemplateSlide from '@/views/ConfigurationTemplate/Slide';
import AutomationSlide from '@/views/Automation/Slide';

Vue.use(VueCarousel);

export default {
  name: 'DashboardAdmin',
  components: {
    Carousel,
    Slide,
    Weather,
    CameraSlide,
    RoomSlide,
    ConfigurationTemplateSlide,
    AutomationSlide
  },
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 15px;
  position: relative;
}
</style>
