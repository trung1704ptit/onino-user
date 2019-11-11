<template>
  <div class="chart-container">
    <chart />
  </div>
</template>

<script>
import Chart from './Chart'

export default {
  name: 'MixChart',
  components: { Chart }
}
</script>

<style scoped>
.chart-container{
  width: 100%;
}
.app-main {
  min-height: auto;
}
</style>

