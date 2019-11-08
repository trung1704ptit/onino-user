<template>
<section class="box section box-shadow m-15 p-15">
    <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
            <div class="align-center">
                <img :src="roomDetail.groupIconUrl" class="room-icon" />
                <h4 class="section-title m-15 uppercase">{{ roomDetail.name }}</h4>
                <p class="white-text m-0" style="font-size: 14px"><i>({{ roomDevices.length }} thiết bị đang hoạt động)</i></p>

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
                            <i class="el-icon-circle-close" /> {{ $t('root.cancel') }}
                        </el-button>
                        <el-button :loading="deleting" type="primary" @click="handleDelete">
                            {{ $t('root.confirm') }}
                        </el-button>
                    </div>
                </el-dialog>
            </div>
        </el-col>

        <el-col :xs="24" :sm="18">
            <!-- Banner -->
            <div class="box-shadow box notify p-15">
                <div class="flex space-between">
                    <span><i class="fa fa-thermometer-half" aria-hidden="true"></i> {{ roomDetail.temperature }}°C</span>
                    <span><i class="fa fa-tint" aria-hidden="true"></i> {{ roomDetail.humidity }}%</span>
                    <span><i class="fa fa-bolt" aria-hidden="true"></i> 269W</span>
                    <span><i class="fa fa-lightbulb-o" aria-hidden="true"></i> 100ml</span>
                </div>
            </div>

            <!-- List of devices -->
            <div class="mt-15 mb-15">
                <span v-for="(device, index) in roomDevices" :key="device.deviceId">
                    <br v-if="index > 0 && device.thingId !== roomDevices[index - 1].thingId" />
                    <room-device :handleEditDevice="handleClickEditDevice" :device="device" />
                </span>
            </div>

            <!-- Button add form -->
            <el-button type="primary" @click.native.prevent="addDeviceForm = true" v-if="!addDeviceForm">
                <i class="el-icon-circle-plus" /> {{ $t('room.addDevice') }}
            </el-button>

            <!-- serial number form -->
            <el-form class="form-wrapper box app-form" :model="deviceForm" :rules="formRules" ref="deviceForm" v-if="addDeviceForm">
                <el-form-item prop="serialNumber" class="el-form-item">
                    <span class="svg-container">
                        <i class="fa fa-indent" aria-hidden="true"></i>
                    </span>
                    <el-input v-model="deviceForm.serialNumber" :placeholder="$t('room.deviceSerial')" name="serialNumber" type="text" tabindex="1" />
                </el-form-item>

                <el-form-item prop="deviceName" class="el-form-item">
                    <span class="svg-container">
                        <i class="fa fa-tag" aria-hidden="true"></i>
                    </span>
                    <el-input v-model="deviceForm.deviceName" :placeholder="$t('room.deviceName')" name="deviceName" type="text" tabindex="2" />
                </el-form-item>

                <el-button type="primary" @click="getDeviceInfo">
                    <i class="el-icon-search" /> {{ $t('root.getInfo') }}
                </el-button>

                <el-button @click.native.prevent="addDeviceForm = false">
                    <i class="el-icon-circle-close" /> {{ $t('root.cancel') }}
                </el-button>
            </el-form>

            <!-- device icon form -->
            <div v-if="deviceRegistered">
                <device-icon-form v-for="(form, index) in formAdded" :key="index" :form="form" />
                <div class="mt-15" style="text-align: right">
                    <el-button type="primary" @click="handleUpdateDeviceRegistered">
                        <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ $t('root.save') }}
                    </el-button>
                    <el-button @click.native.prevent="deviceRegistered = false">
                        <i class="el-icon-circle-close" /> {{ $t('root.cancel') }}
                    </el-button>
                </div>
            </div>
        </el-col>
    </el-row>
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
import RoomDevice from '@/components/RoomDevice';
import DeviceIconsPopup from '@/components/DeviceIconsPopup'
import DeviceIconForm from './DeviceIconForm';

export default {
    components: {
        RoomDevice,
        DeviceIconsPopup,
        DeviceIconForm
    },
    data() {
        const validateEmpty = (rule, value, callback) => {
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
                serialNumber: '',
                deviceName: ''
            },
            formRules: {
                serialNumber: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateEmpty
                }],
                deviceName: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateEmpty
                }]
            },
            roomDevices: [],
            numberOfDevices: 3,
            deviceList: [],
            deviceEdited: null,
            addDeviceForm: false,
            deviceRegistered: false,
            formAdded: [],
            isOpenDeviceIconsPopup: false,
            deviceUpdating: false
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
            const devices = response.devices;

            this.roomDevices = response.devices;
        })
    },
    methods: {
        handleClickEditDevice(device) {
            this.deviceEdited = device;
        },
        handleUpdateDevice() {
            this.deviceUpdating = true;
            const data = [{
                assignedGroupId: this.roomDetail.id,
                deviceIconUrl: this.deviceEdited.deviceIconUrl,
                deviceId: this.deviceEdited.deviceId,
                deviceName: this.deviceEdited.deviceName
            }]

            this.$store.dispatch('device/updateDevice', data).then(response => {
                this.deviceUpdating = false;
                this.$message({
                    message: i18n.t('room.updateDeviceSuccess'),
                    type: 'success',
                    showClose: true,
                    duration: 4000
                });
                const roomId = this.$route.params.id;
                this.$store.dispatch('room/getRoomDevices', roomId).then(response => {
                    this.roomDevices = response.devices;
                })
                this.deviceRegistered = false;
            }).then(error => {
                console.log(error)
            })
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
        handleEditRoom(id) {
            this.$router.push(`/room/cap-nhat/${id}`)
        },
        getDeviceInfo() {
            this.$refs.deviceForm.validate(valid => {
                if (valid) {
                    const data = {
                        assignedGroupId: this.roomDetail.id,
                        deviceName: this.deviceForm.deviceName,
                        thingSerialNumber: this.deviceForm.serialNumber
                    }
                    this.$store.dispatch('device/registerDevice', data).then(response => {
                        this.deviceRegistered = true;
                        this.formAdded = response.devices;
                    }).catch(error => {
                        console.log(error)
                    })
                } else {
                    return false;
                }
            })
        },
        handleUpdateDeviceRegistered() {
            const data = this.formAdded.map(form => {
                return {
                    assignedGroupId: this.roomDetail.id,
                    deviceIconUrl: form.deviceIconUrl,
                    deviceId: form.deviceId,
                    deviceName: form.deviceName
                }
            })
            this.$store.dispatch('device/updateDevice', data).then(response => {
                this.$message({
                    message: i18n.t('room.updateDeviceSuccess'),
                    type: 'success',
                    showClose: true,
                    duration: 4000
                });
                const roomId = this.$route.params.id;
                this.$store.dispatch('room/getRoomDevices', roomId).then(response => {
                    this.roomDevices = response.devices;
                })
                this.deviceRegistered = false;
            }).then(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.room-icon {
    width: 120px;
    height: 120px;
    object-fit: contain;
    cursor: pointer;
}

.edit-device-preview {
    width: 100%;
    height: 100px;
    object-fit: contain;
    cursor: pointer;
}

.form-wrapper {
    padding: 30px 0;
}

.add-device-form {
    margin: 15px 15px 15px 0;
    border-radius: 4px;
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
