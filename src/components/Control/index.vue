<template>
  <div class="box p-15">
    <group-devices :groupDevices="groupDevices" />
    <el-row :gutter="15" class="mt-15">
      <el-col :xs="24" :sm="isShowClock ? 12 : 24">
        <circle-buttons :buttons="buttons" class="box box-shadow p-15" :onClickButton="handleClickButton" />
      </el-col>
      <el-col :xs="24" :sm="12" v-if="isShowClock">
        <timer class="box box-shadow p-15" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CircleButtons from "@/components/DeviceButtons/CircleButtons";
import Timer from "@/components/Timer";
import GroupDevices from "./GroupDevices";

export default {
  data() {
    return {
      isShowClock: false
    }
  },
  props: {
    groupDevices: Array,
    buttons: Array
  },
  components: {
    CircleButtons,
    GroupDevices,
    Timer
  },
  methods: {
    handleClickButton(type, value) {
      switch (type) {
        case 'clock':
          this.isShowClock = !this.isShowClock;
      }
    }
  }
};
</script>
