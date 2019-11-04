<template>
<div class="box box-shadow p-15 text-center inline-block add-device-form">
    <h4 v-if="form.indexInThing">{{ $t('root.device') }} {{ form.indexInThing + 1 }}</h4>

    <img :src="iconSelected || form.deviceIconUrl" class="room-icon mb-15" @click="isOpenDeviceIconsPopup = true" />    
    <p class="guide-change" @click="isOpenDeviceIconsPopup = true">({{ $t('room.clickToChangeDeviceIcon') }})</p>
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
    cursor: pointer;
}
.room-icon {
    height: 50px;
    width: 50px;
    object-fit: contain;
}
.guide-change {
    font-size: 12px;
    font-style: italic;
    cursor: pointer;
}
</style>
