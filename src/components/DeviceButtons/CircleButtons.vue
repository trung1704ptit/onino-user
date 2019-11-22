<template>
  <div class="wrapper">
    <div class="flex space-around row mt-15">
      <device-button :icon="minusIcon" title="Giảm" v-if="showButton('minus')" :onClickButton="() => {}"/>

      <device-button :icon="plusIcon" title="Tăng" v-if="showButton('plus')"  :onClickButton="() => {}"/>
    </div>
    <div class="flex space-between row">
      <device-button :icon="backIcon" title="Sang trái" v-if="showButton('back')"  :onClickButton="() => {}" />

      <device-button :icon="shutDownIcon" title="Bật / Tắt" offlineColor="#e64242" power  :onClickButton="() => {}" />

      <device-button :icon="nextIcon" title="Sang phải" v-if="showButton('next')"  :onClickButton="() => {}" />
    </div>
    <div class="flex space-around row">
      <device-button :icon="plusIcon" title="Giảm" v-if="showButton('plus')"  :onClickButton="() => {}" />

      <device-button :icon="plusIcon" title="Giảm" v-if="showButton('plus')"  :onClickButton="() => {}" />
    </div>
  </div>
</template>

<script>
import DeviceButton from "./DeviceButton";
import plusIcon from "@/assets/img/icons/plus.png";
import nextIcon from "@/assets/img/icons/next.png";
import backIcon from "@/assets/img/icons/back.png";
import shutDownIcon from "@/assets/img/icons/shutdown.png";

import minusIcon from "@/assets/img/icons/minus.png";
import { deviceTypes } from "@/config";

export default {
  props: {
    buttons: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      plusIcon: plusIcon,
      shutDownIcon: shutDownIcon,
      minusIcon: minusIcon,
      backIcon,
      nextIcon
    };
  },
  components: {
    DeviceButton
  },
  mounted() {},
  methods: {
    showButton(name) {
      return this.buttons.some(el => el === name);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 500px;
  margin: auto;

  .row {
    margin-bottom: 20px;
  }
}
</style>
