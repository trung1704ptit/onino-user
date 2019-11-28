<template>
  <div class="mt-15 mb-15">
    <div class="flex">
      <div class="vertical-list" v-if="verticalDevices.length > 0">
        <room-device
          v-for="(device, index) in verticalDevices"
          :key="device.deviceId + index"
          :device="device"
          :inlineBlock="false"
        :hasSwitch="hasSwitch"
          :handleSelectDevice="handleSelectDevice"
          :active="groupSelected && groupSelected.deviceType && groupSelected.deviceType.toLowerCase() === device.deviceType.toLowerCase()"
        />
        <div
          v-if="hasPrevious"
          class="arrow-btn"
          style="transform: translate(-50%, 0); top: 20px; left: 50%; padding: 0 20px"
          @click="handlePrevious"
        >
          <i class="el-icon-arrow-up" />
        </div>
      </div>

      <actions
        class="control"
        v-if="groupDevices.length > 0"
        :groupDevices="groupDevices"
        :buttons="groupSelected.buttons"
        :handleDeleteDevice="handleDeleteDevice"
        :isShowButtons="isShowButtons"
      />
    </div>
    <div class="horizontal-list flex" v-if="horizontalDevices.length > 0">
      <room-device
        v-for="(device, index) in horizontalDevices"
        :key="device.deviceId + index"
        :handleEditDevice="handleClickEditDevice"
        :device="device"
        :inlineBlock="true"
        :hasSwitch="hasSwitch"
      />
      <div
        v-if="hasNext"
        class="arrow-btn"
        style="transform: translate(0, -50%); top: 50%; right: 20px"
        @click="handleNext"
      >
        <i class="el-icon-arrow-right" />
      </div>
    </div>
  </div>
</template>

<script>
import RoomDevice from "@/components/RoomDevice";
import CircleButtons from "@/components/DeviceButtons/CircleButtons";
import Actions from "./Actions";

export default {
  props: {
    roomDevices: Array,
    deviceTypes: Array,
    handleDeleteDevice: Function,
    isShowButtons: Boolean,
    hasSwitch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      verticalDevices: [],
      horizontalDevices: [],
      tempList: [],
      hasNext: false,
      hasPrevious: false,
      groupSelected: [],
      groupDevices: []
    };
  },
  components: {
    RoomDevice,
    CircleButtons,
    Actions
  },
  created() {
    this.initGroups(this.roomDevices);
  },
  methods: {
    handleNext() {
      this.tempList.push(this.verticalDevices[0]);
      this.verticalDevices.push(this.horizontalDevices[0]);
      this.horizontalDevices.splice(0, 1);

      if (this.horizontalDevices.length > 6) {
        this.hasNext = true;
      } else {
        this.hasNext = false;
      }
      this.hasPrevious = true;
      this.verticalDevices.splice(0, 1);
    },
    handlePrevious() {
      const devicePoped = this.tempList.pop();
      this.verticalDevices.unshift(devicePoped);

      const deviceSendBack = this.verticalDevices.pop();
      this.horizontalDevices.unshift(deviceSendBack);
      if (this.tempList.length === 0) {
        this.hasPrevious = false;
      } else {
        this.hasPrevious = true;
      }
      if (this.horizontalDevices.length > 6) {
        this.hasNext = true;
      } else {
        this.hasNext = false;
      }
    },
    handleSelectDevice(group) {
      this.groupSelected = group;
      this.groupDevices = this.roomDevices.filter(
        item => item.deviceType.toLowerCase() === group.deviceType.toLowerCase()
      );
    },
    initGroups(roomDevices) {
      const groups = this.deviceTypes.filter(type =>
        roomDevices.some(
          item =>
            item.deviceType.toLowerCase() === type.deviceType.toLowerCase()
        )
      );

      if (groups.length > 0) {
        this.groupSelected = groups[0];
        this.groupDevices = roomDevices.filter(
          item =>
            item.deviceType.toLowerCase() === groups[0].deviceType.toLowerCase()
        );
      }

      this.verticalDevices = groups.slice(0, 5);

      groups.splice(0, 5);
      this.horizontalDevices = groups;

      if (this.verticalDevices.length > 5) {
        this.hasPrevious = true;
      }
      if (this.horizontalDevices.length > 6) {
        this.hasNext = true;
      }
    }
  },
  watch: {
    roomDevices: function(val, oldVal) {
      this.initGroups(val)
    }
  }
};
</script>
