<template>
<section class="p-15 bg-light m-15 box-shadow">
    <h2 class="text">Cấu hình Buổi sáng</h2>
    <el-row :gutter="15">
        <el-col :xs="24" :sm="18">
            <div v-if="addDevice" class="form-wrapper app-form p-15">
                <div class="p-15">
                    <el-input ref="configurationName" v-model="search" :placeholder="$t('room.deviceName')" name="configurationName" type="text" />
                </div>
                <div class="room-list">
                    <div v-for="room in roomList" :key="room.id">
                        <room :room="room" v-if="room.devices.length > 0" :handleSetting="handleSetting" />
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :xs="24" :sm="6">
            <div class="box p-15" v-if="deviceSetting">
                <div class="flex space-between">
                    <span class="text">{{ deviceSetting.deviceName}}</span>
                    <el-switch v-model="deviceStatus" />
                </div>

                <div>
                    <p class="white-text">{{ $t('root.weekLoop') }}</p>
                    <week-timer />
                </div>
            </div>
        </el-col>
    </el-row>
</section>
</template>

<script>
import {
    isEmpty,
    validateEmpty
} from '@/utils/validate'
import i18n from '@/lang'
import Room from './Room'
import WeekTimer from '@/components/WeekTimer';

// import {
//     mapGetters
// } from 'vuex'

export default {
    components: {
        Room,
        WeekTimer
    },
    data() {
        return {
            deviceSetting: null,
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
            addDevice: true,
            search: '',
            groups: [],
            deviceList: [],
            filterList: [],
            deviceStatus: true
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
    methods: {
        handleSetting(device) {
            this.deviceSetting = device;
        }
    },
    watch: {
        deviceStatus: function (val) {
            let message = 'root.turnOnDeviceSuccess';
            if (!val) {
                message = 'root.turnOffDeviceSuccess'
            }
            this.$message({
                message: i18n.t(message),
                type: 'success'
            })
        }
    }
}
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
