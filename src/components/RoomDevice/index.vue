<template>
  <div
    class="box p-10 block-shadow device-block block"
    :class="(active || switchValue) && 'turn-on'"
    :style="{minWidth: width, display: inlineBlock ? 'inline-block' : ''}"
    @click="handleSelectDevice(device)"
    v-if="!device.isHide"
  >
    <div class="device-icon-wrap">
      <img :src="deviceIconUrl" class="device-icon" />
    </div>
    <p class="title text-center uppercase m-0" :style="{fontSize: fontSize + 'px', lineHeight: fontSize + 4 + 'px' }">{{ device.deviceName }}</p>
    <el-switch
      v-if="hasSwitch"
      v-model="switchValue"
      class="action"
      @click.native.prevent="() => {}"
    />
    <el-dropdown trigger="click" @command="handleSelectAction" class="action" v-if="hasMoreSetting">
      <div>
        <i class="el-icon-more white-text" />
      </div>
      <el-dropdown-menu slot="dropdown" class="dropdown-menu">
        <el-dropdown-item command="edit">{{ $t('root.edit') }}</el-dropdown-item>
        <el-dropdown-item command="delete">{{ $t('root.delete') }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PickerColor from "@/components/PickerColor";
import TintColor, { changeColor } from "@/utils/tint-color";
import i18n from "@/lang";

var mqtt = require("mqtt");
import { mqttBroker } from "@/api/endpoint";
import { mqttAuthentication } from "../../../secret";

export default {
  props: {
    handleDeleteDevice: Function,
    handleEditDevice: Function,
    device: Object,
    breakPoint: Boolean,
    width: {
      type: String,
      default: "170px"
    },
    hasSwitch: {
      type: Boolean,
      default: false
    },
    hasMoreSetting: {
      type: Boolean,
      default: false
    },
    active: Boolean,
    inlineBlock: Boolean,
    handleSelectDevice: Function,
    fontSize: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {
      switchValue: false,
      slideValue: 50,
      deviceIconUrl: ""
    };
  },
  mounted() {
    if (this.device) {
      this.deviceIconUrl = this.device.deviceIconUrl;
      const tintImage = new TintColor(
        this.deviceIconUrl,
        this.switchValue ? "" : "#ffffff"
      );
      tintImage.run().then(newImage => {
        this.deviceIconUrl = newImage.url;
      });
    }
  },
  watch: {
    switchValue: function(val, oldval) {
      this.changeSwitch(val);
    },
    slideValue: function(val, oldVal) {
      this.changeSwitch(val);
    }
  },
  methods: {
    changeSwitch(val) {
      const user = this.$store.state.user;

      var client = mqtt.connect(
        `ws://${mqttBroker.host}:${mqttBroker.port}/ws`,
        {
          username: mqttAuthentication.username,
          password: mqttAuthentication.password
        }
      );

      client.subscribe(mqttBroker.subcribeTopic(user.userInfo.id), function(
        err
      ) {
        if (!err) {
        }
      });

      const data = {
        token: user.token,
        userCommand: "desired",
        payload: [
          {
            state: val ? 0 : 1,
            deviceCommand: "desired",
            deviceId: this.device.deviceId
          }
        ]
      };

      client.publish(mqttBroker.publishTopic(user.userInfo.id), data);

      const response = {
        state: val ? 0 : 1,
        deviceCommand: "reported",
        deviceId: this.device.deviceId
      };

      client.on("message", function(topic, message) {
        client.end();
      });
    },
    handleClick() {
      this.handleSelectDevice(this.device);
    },
    handleSelectAction(command) {
        if (command === 'delete') {
            this.handleDeleteDevice(this.device);
        }
    }
  }
};
</script>

<style lang="scss" scoped>
.room-icon {
  width: 80px;
}

.device-icon-wrap {
  width: 100%;
  display: flex;
  margin-top: 10px;
}
.device-icon {
  width: 40px;
  height: 40px;
  margin: auto;
  object-fit: contain;
}

.device-block {
  position: relative;
  margin: 0px 3px 10px 3px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  max-width: 180px;

  .title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-top: 10px;
  }

  .action {
    position: absolute;
    top: 8px;
    right: 8px;
  }
}

.dropdown-menu {
  overflow: unset;
}
</style>
