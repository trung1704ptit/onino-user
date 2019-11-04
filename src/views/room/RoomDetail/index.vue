<template>
<section class="box section box-shadow m-15 p-15">
    <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
            <div class="align-center">
                <img :src="roomDetail.groupIconUrl" class="room-icon" />
                <h4 class="section-title m-15">{{ roomDetail.name }}</h4>
                <p class="dark-text m-0" style="font-size: 14px"><i>({{ roomDevices.length }} thiết bị đang hoạt động)</i></p>

                <el-button type="primary" @click="handleEditRoom(roomDetail.id)" class="mt-15">
                    <i class="el-icon-edit" /> {{ $t('root.edit') }}
                </el-button>
                <el-button type="danger" @click="confirmDelete(roomDetail.id)" :loading="deleting" class="mt-15 delete-btn">
                    <i class="el-icon-delete" /> {{ $t('root.delete') }}
                </el-button>

                <el-dialog :title="$t('room.confirmDelete')" :visible.sync="dialogConfirmDelete">
                    <div>{{ $t('room.confirmDeleteMessage') }}</div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogConfirmDelete = false">
                            {{ $t('root.cancel') }}
                        </el-button>
                        <el-button :loading="deleting" type="primary" @click="handleDelete">
                            {{ $t('root.confirm') }}
                        </el-button>
                    </div>
                </el-dialog>
            </div>
        </el-col>

        <el-col :xs="24" :sm="18">
            <div class="flex p-15 box-shadow box notify">
                <div>
                    <i class="fa fa-wifi" aria-hidden="true"></i>
                    <span class="ml-15">4 Thiết bị đã phát hiện</span>
                </div>
                <div class="message">Đã phát hiện 4 thiết bị có kết nối Bluetooth trong phòng. <router-link to="/" class="link underline">Nhấp để kết nối</router-link>
                </div>
            </div>

            <div class="flex space-between text section">
                <span><i class="fa fa-thermometer-half" aria-hidden="true"></i> {{ roomDetail.temperature }}°C</span>
                <span><i class="fa fa-tint" aria-hidden="true"></i> {{ roomDetail.humidity }}%</span>
                <span><i class="fa fa-bolt" aria-hidden="true"></i> 269W</span>
                <span><i class="fa fa-lightbulb-o" aria-hidden="true"></i> 100ml</span>
            </div>

            <div class="mt-15 mb-15">
                <span v-for="device in roomDevices" :key="device.deviceId">
                    <room-device-detail :handleEditDevice="handleEditDevice" :device="device" />
                </span>
            </div>

            <el-button type="primary" @click.native.prevent="addDeviceForm = true" v-if="!addDeviceForm">
                <i class="el-icon-circle-plus" /> {{ $t('room.addDevice') }}
            </el-button>

            <el-form class="form-wrapper" :model="deviceForm" :rules="formRules" ref="deviceForm" v-if="addDeviceForm">
                <el-form-item prop="serialNumber" class="el-form-item">
                    <span class="svg-container">
                        <i class="fa fa-indent" aria-hidden="true"></i>
                    </span>
                    <el-input v-model="deviceForm.serialNumber" :placeholder="$t('room.deviceSerial')" name="serialNumber" type="text" tabindex="1" />
                </el-form-item>

                <el-button type="primary" @click="getDeviceInfo">
                    <i class="el-icon-search" /> {{ $t('root.getInfo') }}
                </el-button>
            </el-form>

            <div>
                <device-icon-form v-for="(form, index) in formAdded" :key="index" :form="form" />

                <div class="mt-15" style="text-align: right">
                    <el-button type="primary" @click="handleScanDevice">
                        <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ $t('root.save') }}
                    </el-button>
                    <el-button @click.native.prevent="deviceScanned = false">
                        <i class="el-icon-circle-close" /> {{ $t('root.cancel') }}
                    </el-button>
                </div>
            </div>
        </el-col>
    </el-row>

    <!-- dialog for edit device -->
    <el-dialog :visible.sync="editRoomDevice" v-if="editRoomDevice">
        <el-row :gutter="10">
            <el-col :xs="24" :sm="6">
                <img src="@/assets/img/o-cam.png" class="room-icon" />
            </el-col>

            <el-col :xs="24" :sm="18">
                <el-input :placeholder="$t('room.deviceName')" name="deviceName" type="text" tabindex="1" v-model="editRoomDevice.deviceName" />

                <div class="mt-15 align-left">
                    <el-button :loading="deleting" type="primary">
                        {{ $t('root.save') }}
                    </el-button>
                    <el-button @click="editRoomDevice = null">
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
} from '@/utils/validate'
import RoomDeviceDetail from '@/components/RoomDeviceDetail';
import DeviceIconsPopup from '@/components/DeviceIconsPopup'
import DeviceIconForm from './DeviceIconForm';

export default {
    components: {
        RoomDeviceDetail,
        DeviceIconsPopup,
        DeviceIconForm
    },
    data() {
        const validateSerial = (rule, value, callback) => {
            if (isEmpty(value)) {
                callback(new Error(i18n.t('root.emptyString')))
            } else {
                callback()
            }
        }
        return {
            dialogConfirmDelete: false,
            roomDetail: {},
            roomToDelete: '',
            deleting: false,
            groupColor: {
                hex: '#435sd3'
            },
            deviceForm: {
                serialNumber: ''
            },
            formRules: {
                serialNumber: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateSerial
                }]
            },
            roomDevices: [],
            numberOfDevices: 3,
            deviceList: [],
            editRoomDevice: null,
            addDeviceForm: false,
            deviceScanned: false,
            formAdded: [],
            isOpenDeviceIconsPopup: false
        }
    },

    computed: {
        ...mapGetters([
            'room'
        ])
    },

    mounted() {
        const roomList = this.$store.state.room.roomList;
        const roomDevices = this.$store.state.room.roomDevices;
        const roomId = this.$route.params.id;

        if (roomList && roomList.length > 0) {
            const roomDetail = roomList.filter(item => item.id === roomId)[0];

            if (roomDetail) {
                this.roomDetail = roomDetail;
                new TintColor(roomDetail.groupIconUrl, roomDetail.groupColor).run().then(newImage => {
                    this.roomDetail.groupIconUrl = newImage.url;
                })
            } else {
                this.$router.push('/room/tat-ca')
            }
        } else {
            this.$store.dispatch('room/getAllRoom').then(response => {
                const roomDetail = response.filter(item => item.id === roomId)[0];

                if (roomDetail) {
                    this.roomDetail = roomDetail;
                    new TintColor(roomDetail.groupIconUrl, roomDetail.groupColor).run().then(newImage => {
                        this.roomDetail.groupIconUrl = newImage.url;
                    })
                } else {
                    this.$router.push('/room/tat-ca')
                }
            })
        }

        this.$store.dispatch('room/getRoomDevices', roomId).then(response => {
            this.roomDevices = response.devices;
        })

        this.$store.dispatch('device/getDeviceList').then(response => {
            this.deviceList = response.devices;
        })
    },
    methods: {
        handleEditDevice(device) {
            this.editRoomDevice = device;
        },
        confirmDelete(groupId) {
            this.roomToDelete = groupId;
            this.dialogConfirmDelete = true;
        },
        handleDelete() {
            this.deleting = true;
            this.$store.dispatch('room/deleteRoom', this.roomToDelete).then(response => {
                this.$message({
                    message: i18n.t('room.deleteRoomSuccess'),
                    type: 'success',
                    showClose: true,
                    duration: 4000
                });
                this.dialogConfirmDelete = false;
                this.deleting = false;
                this.$router.push('/room/tat-ca')
            })
        },
        handleScanDevice() {
            console.log(this.formAdded);
            this.$refs.deviceForm.validate(valid => {

                if (valid) {} else {
                    return false;
                }
            })
        },
        handleEditRoom(id) {
            this.$router.push(`/room/cap-nhat/${id}`)
        },
        getDeviceInfo() {
            this.deviceScanned = true;
            this.formAdded = [];
            const form = [];
            for (let i = 0; i < 3; i++) {
                form.push({
                    deviceIconUrl: '',
                    deviceName: '',
                    index: i
                })
            }
            this.formAdded = form;
        }
    }
}
</script>

<style lang="scss" scoped>
.room-icon {
    width: 120px;
    height: 120px;
    cursor: pointer;
}

.form-wrapper {
    padding: 30px 0;
}

.add-device-form {
    margin: 15px 0 15px 15px;
}

@media screen and (max-width: 768px) {
    .delete-btn {
        margin: 15px 0;
    }
}
</style>
<style lang="scss">
.notify {
    color: #fff;
    background: var(--green)
}

.message {
    margin-left: 15px;
    padding-left: 15px;
    border-left: 2px solid #fff;
}

.link {
    color: #fff;
}
</style>
