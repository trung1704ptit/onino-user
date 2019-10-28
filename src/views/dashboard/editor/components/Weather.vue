<template>
  <div class="box p-15">
      <div class="flex space-between banner">
          <div><svg-icon icon-class="international" /></div>
          <div>Hà Nội</div>
          <div>Nắng to</div>
          <div>28°C</div>
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
    .box {
        font-size: 16px;
        color: #fff;
        background: #8360c3;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #2ebf91, #8360c3);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #2ebf91, #8360c3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        @media screen and (max-width: 768px){
            font-size: 14px;
        }
    }
</style>
