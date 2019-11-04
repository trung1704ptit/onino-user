<template>
<div class="box box-shadow p-15 text-center inline-block add-device-form">
    <h4>{{ $t('root.device') }} {{ form.index + 1 }}</h4>
    <img v-if="iconSelected" :src="iconSelected" class="room-icon mb-15" @click="isOpenDeviceIconsPopup = true" />
    <img v-if="!iconSelected" src='@/assets/img/add-icon.png'  class="room-icon mb-15" @click="isOpenDeviceIconsPopup = true" />
    <el-input :placeholder="$t('root.name')" name="serialNumber" type="text" tabindex="1" v-model="form.deviceName" />
    <device-icons-popup :selectIcon="handleSelectIcon" :isOpenPopup="isOpenDeviceIconsPopup" :handleClose="handleCloseDeviceIonsPopup" v-if="isOpenDeviceIconsPopup" />
</div>
</template>

<script>
import DeviceIconsPopup from '@/components/DeviceIconsPopup'

export default {
    props: {
        form: {}
    },
    components: {
        DeviceIconsPopup
    },
    data() {
        return {
            isOpenDeviceIconsPopup: false,
            iconSelected: '',
            defaultUrl: '@/assets/img/add-icon.png'
        }
    },
    methods: {
        handleSelectIcon(val) {
            this.iconSelected = val;
            this.form.deviceIconUrl = val;
        },
        handleCloseDeviceIonsPopup(val) {
            this.isOpenDeviceIconsPopup = val;
        }
    }
}
</script>

<style lang="scss" scoped>
.room-icon {
    height: 50px;
    width: 50px;
}
</style>
