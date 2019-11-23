<template>
  <div>
    <p class="white-text">Thiết lập thời gian Bật/Tắt thiết bị</p>

    <el-radio-group v-model="timerOption">
      <el-radio :label="1" class="white-text">{{ $t('root.setTimerByWeek') }}</el-radio>
      <el-radio :label="2" class="white-text">{{ $t('root.setTimerByDay') }}</el-radio>
    </el-radio-group>

    <week-timer v-if="timerOption === 1" />

    <day-timer v-if="timerOption === 2" />

    <el-button type="primary" class="mt-15">
      <i class="fa fa-floppy-o" aria-hidden="true"></i>
      {{ $t('root.save')}}
    </el-button>
  </div>
</template>

<script>
import WeekTimer from "@/components/WeekTimer";
import DayTimer from '@/components/DayTimer';

export default {
  data() {
    return {
      timerOption: 1,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString()
    };
  },
  components: {
    WeekTimer,
    DayTimer
  }
};
</script>