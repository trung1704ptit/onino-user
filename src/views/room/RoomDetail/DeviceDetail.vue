<template>
<section class="section m-15">
    <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
            <div class="align-center box mt-15 p-15 box-shadow">
                <img :src="iconSelected || deviceDetail.deviceIconUrl" class="room-icon mb-15" @click="isOpenDeviceIconsPopup = true" />
                <h4 class="section-title m-15">{{ deviceDetail.deviceName }}</h4>

                <p class="guide-change" @click="isOpenDeviceIconsPopup = true"><i>({{ $t('room.clickToChangeDeviceIcon') }})</i></p>

                <el-form ref="deviceDetail" :model="deviceDetail" :rules="deviceRules" autocomplete="off" label-position="left">
                    <el-form-item prop="roomName" class="el-form-item">
                        <el-input ref="deviceName" v-model="deviceDetail.deviceName" :placeholder="$t('room.roomName')" name="deviceName" type="text" tabindex="1" />
                    </el-form-item>
                    <div class="m-15">
                        <el-button :loading="updating" type="primary" @click="handleEditDevice">
                            <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ $t('root.save') }}
                        </el-button>

                        <el-button>
                            <i class="el-icon-circle-close" /> {{ $t('root.cancel') }}
                        </el-button>
                    </div>
                </el-form>

                <device-icons-popup :selectIcon="handleSelectIcon" :isOpenPopup="isOpenDeviceIconsPopup" :handleClose="handleCloseDeviceIonsPopup" v-if="isOpenDeviceIconsPopup" />
            </div>
        </el-col>

        <el-col :xs="24" :sm="18">
            <div class="align-center box mt-15 p-15 box-shadow">
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
    </el-row>
</section>
</template>

<script>
import {
    mapGetters
} from 'vuex';
import TintColor from '@/utils/tint-color';
import DeviceIconsPopup from '@/components/DeviceIconsPopup';
import {
    isEmpty,
    validateEmpty
} from '@/utils/validate'
import i18n from '@/lang'

export default {
    components: {
        DeviceIconsPopup
    },
    data() {
        return {
            deviceDetail: {},
            deviceIcons: [],
            isOpenDeviceIconsPopup: false,
            iconSelected: '',
            deviceRules: {
                deviceName: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateEmpty
                }]
            },
            updating: false
        }
    },

    computed: {},
    mounted() {
        // get data of device
        const deviceId = this.$route.params.id;
        this.$store.dispatch('device/getDeviceById', deviceId).then(response => {
            this.deviceDetail = response;
        })

        // get device icons
        const deviceIcons = this.$store.state.public.deviceIcons;

        if (deviceIcons && deviceIcons.length > 0) {
            this.deviceIcons = deviceIcons;
        } else {
            this.$store.dispatch('public/getDeviceIcons').then(response => {
                this.deviceIcons = response;
            })
        }
    },
    methods: {
        handleSelectIcon(val) {
            this.iconSelected = val;
            this.deviceDetail.deviceIconUrl = val;
        },
        handleCloseDeviceIonsPopup(val) {
            this.isOpenDeviceIconsPopup = val;
        },
        handleEditDevice() {
            this.$refs.deviceDetail.validate(valid => {
                if (valid) {
                    this.updating =  true;
                    console.log(this.deviceDetail);
                } else {
                    return false;
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.room-icon {
    width: 120px;
    cursor: pointer;
}

.guide-change {
    font-size: 14px;
    font-style: italic;
    cursor: pointer;
}
</style>
