<template>
<section class="p-15">
    <h2 class="text">{{ $t('configuration.addConfiguration') }}</h2>
    <el-form ref="form" :model="form" :rules="roomRules" autocomplete="off" class="form-wrapper app-form block-shadow bg-light" label-position="left">
        <div class="flex mb-15">
            <img :src="form.icon" style="width: 100px" @click="isOpenDeviceIconsPopup = true" />
            <el-form-item prop="configurationName" class="el-form-item">
                <span class="svg-container">
                    <i class="fa fa-keyboard-o" aria-hidden="true"></i>
                </span>
                <el-input ref="configurationName" v-model="form.configurationName" :placeholder="$t('configuration.configurationName')" name="configurationName" type="text" tabindex="1" />
            </el-form-item>
        </div>

        <div class="mt-15 selected-list" v-if="filterList.length > 0">
            <div v-for="room in filterList" :key="room.id">
                <room :room="room" v-if="room.devices.length > 0" :updateSelectedList="updateSelectedList" />
            </div>
        </div>

        <el-button :loading="creating" type="primary" @click.native.prevent="handleCreateRoom">
            <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ $t('root.save') }}
        </el-button>
        <el-button v-if="!addDevice" type="primary" @click="addDevice = true">
            <i class="fa fa-plus-square" aria-hidden="true"></i> {{ $t('room.addDevice') }}
        </el-button>
        <el-button v-if="addDevice" @click="addDevice = false">
            <i class="el-icon-circle-close" aria-hidden="true"></i> {{ $t('root.cancel') }}
        </el-button>
    </el-form>

    <div v-if="addDevice" class="p-15 mt-15 block-shadow form-wrapper app-form bg-light">
        <div class="p-15">
            <el-input ref="configurationName" v-model="search" :placeholder="$t('room.deviceName')" name="configurationName" type="text" />
        </div>
        <p class="white-text p-15"><i>Vui lòng nhấn vào thiết bị để thêm vào danh sách cấu hình</i></p>
        <div class="room-list">
            <div v-for="room in roomList" :key="room.id">
                <room :room="room" v-if="room.devices.length > 0" :updateSelectedList="updateSelectedList" />
            </div>
        </div>
    </div>
    <device-icons-popup
        :selectIcon="handleSelectIcon"
        :isOpenPopup="isOpenDeviceIconsPopup"
        :handleClose="handleClose"
        v-if="isOpenDeviceIconsPopup"
    />
</section>
</template>

<script>
import {
    isEmpty,
    validateEmpty
} from '@/utils/validate'
import i18n from '@/lang'
import Room from '../Room/index';
import DeviceIconsPopup from '@/components/DeviceIconsPopup';
import addIcon from '@/assets/img/add.svg';

import {
    mapGetters
} from 'vuex'

export default {
    data() {
        return {
            form: {
                configurationName: '',
                icon: ''
            },
            roomRules: {
                configurationName: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateEmpty
                }]
            },
            creating: false,
            addDevice: true,
            search: '',
            groups: [],
            deviceList: [],
            filterList: [],
            isOpenDeviceIconsPopup: false
        }
    },
    mounted() {
        if (!this.roomList || this.roomList.length === 0) {
            this.$store.dispatch('room/getAllRoom').then(response => {
                this.groups = response;
            })
        }
        this.form.icon = addIcon;
    },
    computed: {
        roomList: {
            get: function () {
                return this.$store.state.room.roomList;
            },
            set: function () {}
        }
    },
    components: {
        Room,
        DeviceIconsPopup
    },
    methods: {
        handleCreateRoom() {
            this.$refs.form.validate(valid => {
                if (valid) {

                } else {
                    return false;
                }
            })
        },
        updateSelectedList(device, room) {
            // check room already exists or not
            const index = this.filterList.findIndex(item => room.id === item.id);
            const roomIndex = this.roomList.findIndex(item => item.id === room.id);

            if (index > -1) {
                const currentRoom = this.filterList[index];
                let currentDevices = currentRoom.devices;

                // check device exist on list
                const deviceIndex = currentDevices.findIndex(item => item.deviceId === device.deviceId);

                if (deviceIndex > -1) {
                    currentDevices = currentDevices.filter(item => item.deviceId !== device.deviceId);
                    this.addDeviceToRoomList(device, roomIndex);
                } else {
                    currentDevices.push(device);
                    this.removeDeviceFromRoomList(device, roomIndex);
                }

                this.filterList[index].devices = currentDevices;

            } else {
                // push room to list when room does not exists
                this.filterList.push(room);

                this.removeDeviceFromRoomList(device, roomIndex);
            }
        },
        removeDeviceFromRoomList(device, roomIndex) {
            const currentRoom = this.roomList[roomIndex];
            currentRoom.devices = currentRoom.devices.filter(item => item.deviceId !== device.deviceId);
            this.roomList[roomIndex] = currentRoom;
        },
        addDeviceToRoomList(device, roomIndex) {
            const currentRoom = this.roomList[roomIndex];
            currentRoom.devices.push(device);
            this.roomList[roomIndex] = currentRoom;
        },
        handleSelectIcon(image) {
            this.form.icon = image;
        },
        handleClose() {
            this.isOpenDeviceIconsPopup = false;
        }
    },
}
</script>

<style lang="scss" scoped>
.form-wrapper {
    min-width: 200px;
    background: transparent;
}
.el-form-item {
    width: 100%;
    margin: auto auto auto 15px;
}

.app-form {
    background: transparent;
}

.bg-light {
    background: var(--bg-light);
}
</style>
