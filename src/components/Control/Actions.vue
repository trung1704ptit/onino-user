<template>
  <div>
    <div class="actions-wrapper">
      <circle-buttons
        :buttons="buttons"
        class="box box-shadow p-15 actions"
        :onClickButton="handleClickButton"
        :deviceSelected="deviceSelected"
        v-if="isShowButtons"
      />

      <timer class="box box-shadow p-15 actions" :deviceSelected="deviceSelected" />
    </div>
  </div>
</template>

<script>
import CircleButtons from "@/components/DeviceButtons/CircleButtons";
import Timer from "@/components/Timer";
import LangSelect from "@/components/LangSelect";

export default {
  props: {
    groupDevices: {
      type: Array,
      default: []
    },
    buttons: Array,
    handleDeleteDevice: Function,
    isShowButtons: Boolean,
    deviceSelected: Object
  },
  components: {
    CircleButtons,
    Timer,
    LangSelect
  },
  methods: {
    handleClickButton(type, value) {
      switch (type) {
        case "power":
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.actions-wrapper {
  @media screen and (min-width: 768px) {
    display: flex;
  }
}
.actions {
  width: 100%;
  margin: 15px;
  @media screen and (max-width: 768px) {
    margin: 15px 0;
  }
}
</style>
