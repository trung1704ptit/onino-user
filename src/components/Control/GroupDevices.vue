<template>
  <div class="text-center">
    <fragment v-if="groupDevices && groupDevices.length < 6">
      <room-device
        v-for="device in groupDevices"
        :key="device.deviceId"
        :device="device"
        width="120px"
        inlineBlock
        :handleSelectDevice="handleClick"
        :active="deviceSelected.deviceId === device.deviceId"
        hasMoreSetting
        :handleDeleteDevice="handleDeleteDevice"
      />
    </fragment>

    <carousel
      v-if="groupDevices && groupDevices.length > 6"
      :perPage="8"
      :perPageCustom="[[480, 2], [768, 4], [992, 6], [1920, 8]]"
      :scrollPerPage="false"
      :paginationEnabled="false"
      navigationEnabled
      navigationNextLabel='<i class="el-icon-arrow-right" />'
      navigationPrevLabel='<i class="el-icon-arrow-left" />'
    >
      <slide class="slide" v-for="device in groupDevices" :key="device.deviceId">
        <room-device
          :device="device"
          :width="'100%'"
          hasSwitch
          :handleSelectDevice="handleClick"
          :active="deviceSelected.deviceId === device.deviceId"
        />
      </slide>
    </carousel>
  </div>
</template>

<script>
import RoomDevice from "@/components/RoomDevice";
import { Fragment } from "vue-fragment";


export default {
  props: {
    groupDevices: Array,
    handleSelect: Function,
    deviceSelected: Object,
    handleDeleteDevice: Function
  },
  components: {
    RoomDevice,
    Fragment
  },
  methods: {
    handleClick(device) {
      this.handleSelect(device);
    }
  }
};
</script>

<style lang="scss" scoped>
.slide {
  padding: 5px;
}
.device {
  display: grid;
  cursor: pointer;

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    margin: auto;
  }
}
</style>
