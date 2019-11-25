<template>
  <div class="wrapper">
    <p class="text-center white-text uppercase">{{ deviceSelected.deviceName }}</p>

    <div class="flex space-around row mt-15">
      <device-button
        :icon="require('@/assets/img/icons/minus.png')"
        title="Giảm"
        v-if="showButton('minus')"
        :style="{display: showButton('minus') ? 'block' : 'none'}"
        :onClickButton="() => {}"
      />

      <device-button
        :icon="require('@/assets/img/icons/up-arrow.png')"
        title="Lên"
        v-if="showButton('up')"
        :style="{display: showButton('up') ? 'block' : 'none'}"
        :onClickButton="() => {}"
      />

      <device-button
        :icon="require('@/assets/img/icons/plus.png')"
        title="Tăng"
        :style="{display: showButton('plus') ? 'block' : 'none'}"
        v-if="showButton('plus')"
        :onClickButton="() => {}"
      />
    </div>
    <div class="flex space-between row">
      <device-button
        :icon="require('@/assets/img/icons/back.png')"
        title="Sang trái"
        v-if="showButton('back')"
        :style="{display: showButton('back') ? 'block' : 'none'}"
        :onClickButton="() => {}"
      />

      <device-button
        :icon="require('@/assets/img/icons/shutdown.png')"
        title="Bật / Tắt"
        offlineColor="#e64242"
        power
        on
        :onClickButton="() => clickButton('power')"
      />

      <device-button
        :icon="require('@/assets/img/icons/next.png')"
        title="Sang phải"
        :style="{display: showButton('next') ? 'block' : 'none'}"
        :onClickButton="() => {}"
        v-if="showButton('next')"
      />
    </div>
    <div class="flex space-around row">
      <device-button
        :icon="require('@/assets/img/icons/up-arrow.png')"
        title="Xuống"
        :style="{display: showButton('down') ? 'block' : 'none'}"
        :onClickButton="() => {}"
        v-if="showButton('down')"
      />
    </div>
  </div>
</template>

<script>
import DeviceButton from "./DeviceButton";
import { deviceTypes } from "@/config";

export default {
  props: {
    buttons: {
      type: Array,
      default: []
    },
    onClickButton: Function,
    deviceSelected: Object
  },
  data() {
    return {};
  },
  components: {
    DeviceButton
  },
  mounted() {},
  methods: {
    showButton(name) {
      return this.buttons.some(el => el === name);
    },
    clickButton(type) {
      this.onClickButton(type);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  .row {
    margin-bottom: 20px;
  }
}
</style>
