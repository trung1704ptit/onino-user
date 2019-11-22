<template>
  <div class="box p-15">
    <group-devices :groupDevices="groupDevices" />
    <el-row :gutter="15" class="mt-15">
      <el-col :xs="24" :sm="14">
        <circle-buttons :buttons="buttons" />
      </el-col>
      <el-col :xs="24" :sm="10">
        <timer />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CircleButtons from "@/components/DeviceButtons/CircleButtons";
import Timer from "@/components/Timer";
import GroupDevices from "./GroupDevices";

export default {
  props: {
    groupDevices: Array,
    buttons: Array
  },
  components: {
    CircleButtons,
    GroupDevices,
    Timer
  }
};
</script>
