<template>
  <div>
    <p class="white-text">Thiết lập thời gian Bật/Tắt thiết bị</p>

    <el-radio-group v-model="timerOption">
      <el-radio :label="1" class="white-text">{{ $t('root.setTimerByWeek') }}</el-radio>
      <el-radio :label="2" class="white-text">{{ $t('root.setTimer') }}</el-radio>
    </el-radio-group>

    <week-timer v-if="timerOption === 1" />

    <div class="flex section" v-if="timerOption == 2">
      <span class="time mr-15">{{ $t('root.timeStart') }}:</span>
      <datetime type="datetime" v-model="startTime"></datetime>
    </div>

    <div class="flex section" v-if="timerOption == 2">
      <span class="time mr-15">{{ $t('root.timeEnd') }}:</span>
      <datetime type="datetime" v-model="endTime"></datetime>
    </div>

    <el-button type="primary" class="mt-15">
      <i class="fa fa-floppy-o" aria-hidden="true"></i>
      {{ $t('root.save')}}
    </el-button>
  </div>
</template>

<script>
import Vue from "vue";
import { Datetime } from "vue-datetime";
// You need a specific loader for CSS files
import "vue-datetime/dist/vue-datetime.css";

import WeekTimer from "@/components/WeekTimer";

export default {
  data() {
    return {
      timerOption: 1,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString()
    };
  },
  components: {
    datetime: Datetime,
    WeekTimer
  }
};
</script>