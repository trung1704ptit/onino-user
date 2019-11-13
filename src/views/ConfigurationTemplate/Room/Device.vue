<template>
<div class="box p-15 mr-15 block-shadow device-block block" @click="checkboxVal = !checkboxVal">
    <div class="device-icon-wrap"><img :src="device.deviceIconUrl" class="device-icon" /></div>
    <h5 class="title text-center">{{ device.deviceName }}</h5>
    <el-checkbox v-model="checkboxVal" class="checkbox" @click.native.stop="()=>{}"></el-checkbox>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex';
import TintColor from '@/utils/tint-color';
import i18n from '@/lang';

export default {
    props: {
        device: Object,
        updateSelectedList: Function
    },
    data() {
        return {
            checkboxVal: false
        }
    },
    watch: {
        checkboxVal: function (val, oldVal) {
            this.updateSelectedList(this.device.deviceId, val)
        }
    }
}
</script>

<style lang="scss" scoped>
.device-icon-wrap {
    display: flex;
}

.checkbox {
    position: absolute;
    top: 10px;
    right: 10px;
}

.device-icon {
    width: 60px;
    height: 50px;
    margin: auto;
    object-fit: contain;
}

.device-block {
    position: relative;
    display: inline-block;
    cursor: pointer;
    width: 150px;
    margin: 15px 15px 15px 0;

    @media only screen and (max-width: 480px) {
        min-width: 100%
    }

    .title {
        margin-bottom: 0;
    }
}
</style>
