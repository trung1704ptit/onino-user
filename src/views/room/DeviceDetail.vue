<template>
<section class="box section box-shadow m-15 p-15">
    <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
            <div class="align-center">
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
            </div>
        </el-col>

        <el-col :xs="24" :sm="18">
            <div class="mb-15">
                <div class="box p-15 mr-15 box-shadow device-block">
                    <img src="https://s3.ap-southeast-1.amazonaws.com/stg.onino.icons/device/common_television.png" class="device-icon" />
                    <h5 class="title dark-text">Ổ cắm</h5>
                    <div class="actions">
                        <i class="fa fa-pencil-square-o" aria-hidden="true" :title="$t('root.edit')" @click="editRoomDevice = true"></i>
                    </div>
                    <el-switch @click="toggleSwitch" v-model="switchValue" class="switch" />
                </div>

                <div class="box p-15 mr-15 box-shadow device-block">
                    <img src="https://s3.ap-southeast-1.amazonaws.com/stg.onino.icons/device/common_television.png" class="device-icon" />
                    <h5 class="title dark-text">Ổ cắm</h5>
                    <div class="actions">
                        <i class="fa fa-pencil-square-o" aria-hidden="true" :title="$t('root.edit')" @click="editRoomDevice = true"></i>
                    </div>
                    <el-switch @click="toggleSwitch" v-model="switchValue" class="switch" />
                </div>

                <div class="box p-15 mr-15 box-shadow device-block">
                    <img src="https://s3.ap-southeast-1.amazonaws.com/stg.onino.icons/device/common_television.png" class="device-icon" />
                    <h5 class="title dark-text">Ổ cắm</h5>
                    <div class="actions">
                        <i class="fa fa-pencil-square-o" aria-hidden="true" :title="$t('root.edit')" @click="editRoomDevice = true"></i>
                    </div>
                    <el-switch @click="toggleSwitch" v-model="switchValue" class="switch" />
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

export default {
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
        handleEditRoom(id) {},
        confirmDelete(groupId) {},
        handleDelete() {},
        toggleSwitch(e) {
            e.preventDefault();
            this.switchValue = !this.switchValue
            this.editRoomDevice = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.room-icon {
    width: 120px;
}

.device-icon {
    width: 50px;
}

.device-block {
    position: relative;
    display: inline-block;
    min-width: 200px;
    margin-bottom: 15px;
    background: #E9EFE4;

    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(144, 236, 210, 1) 0%, rgba(241, 244, 178, 1) 88%);

    @media only screen and (max-width: 480px) {
        min-width: 100%
    }

    .title {
        margin-bottom: 0;
    }

    .actions {
        position: absolute;
        display: inline-grid;
        top: 10px;
        right: 15px;

        .fa {
            margin-top: 8px;
            cursor: pointer;
        }

        .fa.fa-trash-o {
            color: var(--red)
        }

        .fa.fa-pencil-square-o {
            color: var(--main-color)
        }
    }

    .switch {
        position: absolute;
        bottom: 15px;
        right: 15px;
    }
}

.form-wrapper {
    padding: 30px 0;
}

@media screen and (max-width: 768px) {
    .device-block {
        min-width: calc(50% - 20px);
    }

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
