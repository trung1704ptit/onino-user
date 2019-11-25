<template>
  <div class="bg-light p-15">
    <group-devices :groupDevices="groupDevices" :handleSelect="handleSelect" :deviceSelected="deviceSelected"/>

    <div class="control-wrapper">
      <circle-buttons
        :buttons="buttons"
        class="box box-shadow p-15 m-15 control"
        :onClickButton="handleClickButton"
        :deviceSelected="deviceSelected"
      />

      <timer class="box box-shadow p-15 m-15 control" :deviceSelected="deviceSelected" />
    </div>
  </div>
</template>

<script>
import CircleButtons from "@/components/DeviceButtons/CircleButtons";
import Timer from "@/components/Timer";
import GroupDevices from "./GroupDevices";

export default {
  data() {
    return {
      deviceSelected: {}
    };
  },
  props: {
    groupDevices: {
      type: Array,
      default: []
    },
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
        case "power":
      }
    },
    handleSelect(device) {
      this.deviceSelected = device;
    }
  },
  mounted() {
    if (this.groupDevices) {
      this.deviceSelected = this.groupDevices[0];
    }
  },
  watch: {
    groupDevices: function (group) {
      this.deviceSelected = group[0].on = false
    }
  }
};
</script>

<style lang="scss" scoped>
.control-wrapper {
  @media screen and (min-width: 768px) {
    display: flex;
  }
}
.control {
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
}
</style>