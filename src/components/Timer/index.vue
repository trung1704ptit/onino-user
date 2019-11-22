<template>
  <div>
    <week-timer />
    <datetime />
  </div>
</template>

<script>
import Vue from "vue";
import { Datetime } from "vue-datetime";
// You need a specific loader for CSS files
import "vue-datetime/dist/vue-datetime.css";

import WeekTimer from "@/components/WeekTimer";

export default {
  components: {
    datetime: Datetime,
    WeekTimer
  }
};
</script>