<template>
<fragment>
    <div class="box p-15 mr-15 block-shadow device-block block" @click="dialogVisible = true">
        <div class="device-icon-wrap"><img :src="device.deviceIconUrl" class="device-icon" /></div>
        <p class="title text-center">{{ device.deviceName }}</p>
        <i class="fa fa-plus-circle add" aria-hidden="true" @click.stop.prevent="selectDevice = !selectDevice"></i>
        <i class="fa fa-minus-circle remove" aria-hidden="true" @click.stop.prevent="selectDevice = !selectDevice"></i>
    </div>
    <el-dialog :visible.sync="dialogVisible" :title="$t('configuration.settingDevice')" v-if="dialogVisible">
        <span class="mr-15">Trạng thái Bật/Tắt</span>
        <el-switch v-model="deviceStatus" />
        <el-slider v-model="slideValue" @click.native.prevent="() => {}" />
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{ $t('root.save') }}</el-button>
            <el-button @click="dialogVisible = false"><i class="fa fa-times-circle" aria-hidden="true"></i> {{ $t('root.cancel') }}</el-button>
        </span>
    </el-dialog>
</fragment>
</template>

<script>
import {
    mapGetters
} from 'vuex';
import TintColor from '@/utils/tint-color';
import i18n from '@/lang';
import { Fragment } from 'vue-fragment'

export default {
    components: {
        Fragment
    },
    props: {
        device: Object,
        updateSelectedList: Function
    },
    data() {
        return {
            selectDevice: false,
            dialogVisible: false,
            deviceStatus: false,
            slideValue: 30
        }
    },
    watch: {
        selectDevice: function (val, oldVal) {
            this.updateSelectedList(this.device)
        }
    }
}
</script>

<style lang="scss" scoped>
.device-icon-wrap {
    display: flex;
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

    &:hover {
        color: var(--main-color);
    }

    .title {
        margin-bottom: 0;
    }
}

.add,
.remove {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
    font-size: 22px;
}

.room-list {
    .add {
        display: block;
    }

    .remove {
        display: none;
    }
}

.selected-list {
    .add {
        display: none;
    }

    .device-block:hover {
        &>.remove {
            display: block;
        }
    }
}
</style>
