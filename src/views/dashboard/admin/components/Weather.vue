<template>
  <!-- <div class="box p-15 box-shadow">
      <div class="flex space-between banner">
          <div><svg-icon icon-class="international" /></div>
          <div>Hà Nội</div>
          <div>Nắng to</div>
          <div>28°C</div>
          <div>Độ ẩm 50%</div>
          <div>{{ moment(new Date()).format("DD/MM/YYYY")   }}</div>
      </div>
  </div>-->
  <a
    class="weatherwidget-io box mb-15 box-shadow"
    href="https://forecast7.com/en/21d00105d82/hanoi/"
    data-label_1="HANOI"
    data-label_2="WEATHER"
    data-font="Helvetica"
    data-icons="Climacons Animated"
    data-theme="weather_one"
  ></a>
</template>

<script>
import moment from "moment";

export default {
  beforeCreate() {
    !(function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = "https://weatherwidget.io/js/widget.min.js";
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, "script", "weatherwidget-io-js");
  }
  // methods: {
  //     moment: () => moment()
  // }
};
</script>
