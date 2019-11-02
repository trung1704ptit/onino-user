<template>
<section class="box section m-15">
    <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
            <div class="align-center box mt-15 p-15 box-shadow">
                <img src="@/assets/img/o-cam.png" class="room-icon" />
                <h4 class="section-title m-15">{{ roomDetail.name }}</h4>
                <div class="flex space-between p-15">
                    <div>
                        <p class="dark-text">Thiết bị đang cắm</p>
                        <strong>2 thiết bị</strong>
                    </div>
                    <div>
                        <p class="dark-text">Điện năng tiêu thụ</p>
                        <strong>100 kWh</strong>
                    </div>
                </div>
            </div>
        </el-col>

        <!-- list device detail -->
        <el-col :xs="24" :sm="18">
            <div class="mb-15">
                <room-device-detail :handleEditRoom="handleEditRoom" />
                <room-device-detail :handleEditRoom="handleEditRoom" />
                <room-device-detail :handleEditRoom="handleEditRoom" />
                <room-device-detail :handleEditRoom="handleEditRoom" />
            </div>
        </el-col>
    </el-row>

    <!-- dialog for edit device -->
    <el-dialog :visible.sync="editRoomDevice">
        <el-row :gutter="10">
            <el-col :xs="24" :sm="6">
                <img src="@/assets/img/o-cam.png" class="room-icon" />
            </el-col>

            <el-col :xs="24" :sm="18">
                <el-input :placeholder="$t('room.deviceName')" name="deviceName" type="text" tabindex="1" />

                <div class="mt-15 align-left">
                    <el-button :loading="deleting" type="primary">
                        {{ $t('root.save') }}
                    </el-button>
                    <el-button @click="editRoomDevice = false">
                        {{ $t('root.cancel') }}
                    </el-button>
                </div>
            </el-col>
        </el-row>
    </el-dialog>
</section>
</template>

<script>
import {
    mapGetters
} from 'vuex';
import PickerColor from '@/components/PickerColor';
import TintColor from '@/utils/tint-color';
import i18n from '@/lang';
import {
    isEmpty
} from '@/utils/validate';
import RoomDeviceDetail from '@/components/RoomDeviceDetail'

export default {
    components: {
        RoomDeviceDetail
    },
    data() {
        return {
            editRoomDevice: false,
            roomDetail: {
                name: 'ổ  cắm'
            },
            roomToDelete: '',
            deleting: false,
            groupColor: {
                hex: '#435sd3'
            },
            roomDevices: [],
            numberOfDevices: 0,
            switchValue: false
        }
    },

    computed: {
        ...mapGetters([
            'room'
        ])
    },
    methods: {
        handleEditRoom(id) {
            this.editRoomDevice = true;
        },
    }
}
</script>

<style lang="scss" scoped>
.room-icon {
    width: 120px;
}
</style>
