<template>
<section class="p-15">
    <h2 class="text">{{ $t('configuration.addConfiguration') }}</h2>
    <el-form ref="form" :model="form" :rules="roomRules" autocomplete="off" class="box form-wrapper app-form block-shadow" label-position="left">
        <el-form-item prop="configurationName" class="el-form-item">
            <span class="svg-container">
                <i class="fa fa-keyboard-o" aria-hidden="true"></i>
            </span>
            <el-input ref="configurationName" v-model="form.configurationName" :placeholder="$t('configuration.configurationName')" name="configurationName" type="text" tabindex="1" />
        </el-form-item>
        <el-button :loading="creating" type="primary" @click.native.prevent="handleCreateRoom">
            <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ $t('root.save') }}
        </el-button>
        <el-button v-if="!addDevice" type="primary" @click="addDevice = !addDevice">
            <i class="fa fa-plus-square" aria-hidden="true"></i> {{ $t('room.addDevice') }}
        </el-button>
        <el-button v-if="addDevice" @click="addDevice = !addDevice">
            <i class="el-icon-circle-close" aria-hidden="true"></i> {{ $t('root.cancel') }}
        </el-button>
    </el-form>

    <div class="p-15 mt-15 block-shadow">
        <div v-for="room in filterList" :key="room.id">
            <room :room="room" v-if="room.devices.length > 0" :updateSelectedList="updateSelectedList" />
        </div>
    </div>

    <div v-if="addDevice" class="p-15 mt-15 block-shadow form-wrapper app-form">
        <div class="p-15">
            <el-input ref="configurationName" v-model="search" :placeholder="$t('room.deviceName')" name="configurationName" type="text" />
        </div>
        <div>
            <div v-for="room in roomList" :key="room.id">
                <room :room="room" v-if="room.devices.length > 0" :updateSelectedList="updateSelectedList" />
            </div>
        </div>
    </div>
</section>
</template>

<script>
import {
    isEmpty,
    validateEmpty
} from '@/utils/validate'
import i18n from '@/lang'
import Room from '../Room/index'

import {
    mapGetters
} from 'vuex'

export default {
    data() {
        return {
            form: {
                configurationName: ''
            },
            roomRules: {
                configurationName: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateEmpty
                }]
            },
            creating: false,
            addDevice: false,
            search: '',
            groups: [],
            deviceList: [],
            filterList: []
        }
    },
    mounted() {
        if (!this.roomList || this.roomList.length === 0) {
            this.$store.dispatch('room/getAllRoom').then(response => {
                this.groups = response;
            })
        }
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
        Room
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

            if (index > -1) {
                const currentRoom = this.filterList[index];
                let currentDevices = currentRoom.devices;

                // check device exist on list
                const deviceIndex = currentDevices.findIndex(item => item.deviceId === device.deviceId);
                if (deviceIndex > -1) {
                    currentDevices = currentDevices.filter(item => item.deviceId !== device.deviceId);
                } else {
                    currentDevices.push(device);
                }
                this.filterList[index].devices = currentDevices;
            } else {
                // push room to list when room is not exists
                this.filterList.push(room);
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.form-wrapper {
    min-width: 200px;
}
</style>
