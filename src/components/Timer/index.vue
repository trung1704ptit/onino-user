<template>
  <div>
    <week-timer />
    <el-button type="primary" class="mt-15"> <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ $t('root.save')}}</el-button>
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