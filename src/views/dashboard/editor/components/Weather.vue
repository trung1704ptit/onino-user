<template>
  <div class="box p-15">
      <div class="flex space-between banner">
          <div><svg-icon icon-class="international" /></div>
          <div>Hà Nội</div>
          <div>Nắng to</div>
          <div>27 C</div>
          <div>Độ ẩm 50%</div>
          <div>{{ moment(new Date()).format("DD/MM/YYYY")   }}</div>
      </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
    methods: {
        moment: () => moment()
    }
}
</script>

<style lang="scss" scoped>
    .banner {
        font-size: 16px;
    }
</style>
