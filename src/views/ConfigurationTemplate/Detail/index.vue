<template>
  <section class="p-15">
    <h2 class="text">{{ $t('configuration.addConfiguration') }}</h2>
    <el-form
      ref="form"
      :model="form"
      :rules="roomRules"
      autocomplete="off"
      class="form-wrapper app-form block-shadow bg-light"
      label-position="left"
    >
      <el-form-item prop="configurationName" class="el-form-item">
        <span class="svg-container">
          <i class="fa fa-keyboard-o" aria-hidden="true"></i>
        </span>
        <el-input
          ref="configurationName"
          v-model="form.configurationName"
          :placeholder="$t('configuration.configurationName')"
          name="configurationName"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-row :gutter="15">
        <el-col :xs="24" :lg="12">
          <div class="p-15 mt-15 block-shadow form-wrapper app-form bg-light" v-if="addDevice">
            <div>
              <el-input
                ref="configurationName"
                v-model="search"
                :placeholder="$t('room.deviceName')"
                name="configurationName"
                type="text"
              />
            </div>
            <p class="white-text m-0 mt-15">
              <i>Vui lòng nhấn vào thiết bị để thêm vào danh sách cấu hình</i>
            </p>
            <div class="room-list">
              <div v-for="room in roomList" :key="room.id">
                <room
                  :room="setDevicesWithRoomName(room)"
                  v-if="room.devices.length > 0"
                  :updateSelectedList="updateSelectedList"
                />
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :lg="12">
          <control
            :roomDevices="filterList"
            :deviceTypes="deviceTypes"
            v-if="filterList.length > 0"
            :handleDeleteDevice="handleDeleteDevice"
            :isShowButtons="false"
          />
        </el-col>
      </el-row>

      <div class="mt-15">
        <el-button :loading="creating" type="primary" @click.native.prevent="handleCreateRoom">
          <i class="fa fa-floppy-o" aria-hidden="true"></i>
          {{ $t('root.save') }}
        </el-button>
        <el-button v-if="!addDevice" type="primary" @click="addDevice = !addDevice">
          <i class="fa fa-plus-square" aria-hidden="true"></i>
          {{ $t('room.addDevice') }}
        </el-button>
        <el-button v-if="addDevice" @click="addDevice = !addDevice">
          <i class="el-icon-circle-close" aria-hidden="true"></i>
          {{ $t('root.cancel') }}
        </el-button>
      </div>
    </el-form>
  </section>
</template>

<script>
import { isEmpty, validateEmpty } from "@/utils/validate";
import i18n from "@/lang";
import Room from "../Room";
import Control from "@/components/Control/Control";
import { deviceTypes } from "@/config";
import { mapGetters } from "vuex";

export default {
  components: {
    Room,
    Control
  },
  data() {
    return {
      form: {
        configurationName: ""
      },
      roomRules: {
        configurationName: [
          {
            required: true,
            trigger: "blur",
            validator: validateEmpty
          }
        ]
      },
      creating: false,
      addDevice: true,
      search: "",
      groups: [],
      deviceList: [],
      filterList: [],
      deviceTypes
    };
  },
  mounted() {
    if (!this.roomList || this.roomList.length === 0) {
      this.$store.dispatch("room/getAllRoom").then(response => {
        this.groups = response;
      });
    }
  },
  computed: {
    roomList: {
      get: function() {
        return this.$store.state.room.roomList;
      },
      set: function() {}
    }
  },
  methods: {
    handleCreateRoom() {
      this.$refs.form.validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    updateSelectedList(device, room) {
      const roomIndex = this.roomList.findIndex(item => item.id === room.id);

      const deviceIndex = this.filterList.findIndex(
        item => item.deviceId === device.deviceId
      );

      if (deviceIndex > -1) {
      } else {
        this.filterList.push(device);
        this.removeDeviceFromRoomList(device, roomIndex);
      }
    },
    removeDeviceFromRoomList(device, roomIndex) {
      const currentRoom = this.roomList[roomIndex];
      currentRoom.devices = currentRoom.devices.filter(
        item => item.deviceId !== device.deviceId
      );
      this.roomList[roomIndex] = currentRoom;
    },
    addDeviceToRoomList(device, roomIndex) {
      const currentRoom = this.roomList[roomIndex];
      currentRoom.devices.push(device);
      this.roomList[roomIndex] = currentRoom;
    },
    setDevicesWithRoomName(room) {
      const devices = room.devices.map(item => {
        return {
          ...item,
          roomName: room.name
        };
      });
      const newRoom = {
        ...room,
        devices
      };
      return newRoom;
    },
    handleDeleteDevice(device) {
      this.filterList = this.filterList.filter(
        item => item.deviceId !== device.deviceId
      );
      const roomIndex = this.roomList.findIndex(
        room => room.id === device.assignedGroup
      );
      if (roomIndex > -1) {
        this.roomList[roomIndex].devices.push(device);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-wrapper {
  min-width: 200px;
  background: transparent;
}

.app-form {
  background: transparent;
}

.bg-light {
  background: var(--bg-light);
}
</style>
