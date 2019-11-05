<template>
<router-link :to="'/room/thiet-bi/' + device.deviceId">
    <div class="box p-15 mr-15 box-shadow device-block" v-bind:class="switchValue && 'turn-on'">
        <div class="device-icon-wrap"><img :src="device.deviceIconUrl" class="device-icon" /></div>
        <h5 class="title dark-text text-center">{{ device.deviceName }}</h5>
        <!-- <div class="actions">
            <i class="fa fa-pencil-square-o" aria-hidden="true" :title="$t('root.edit')" @click.prevent.stop="handleEditDevice(device)"></i>
        </div> -->
        <el-switch v-model="switchValue" class="switch" @click.native.prevent="toggleSwitch" />
    </div>
</router-link>
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
    props: {
        handleDelete: Function,
        handleEditDevice: Function,
        device: Object
    },
    data() {
        return {
            switchValue: false
        }
    },
    methods: {
        toggleSwitch(e) {
            e.preventDefault();
        },
    },
    watch: {
        switchValue: function (val, oldval) {
            this.switchValue = val
        }
    }
}
</script>

<style lang="scss" scoped>
.turn-on {
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(144, 236, 210, 1) 0%, rgba(241, 244, 178, 1) 88%);
}

.room-icon {
    width: 120px;
}
.device-icon-wrap {
    width: 200px;
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
    min-width: 220px;
    margin: 15px 15px 15px 0;

    @media only screen and (max-width: 480px) {
        min-width: 100%
    }

    .title {
        margin-bottom: 0;
    }

    .actions {
        position: absolute;
        display: inline-grid;
        top: 35px;
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
        top: 15px;
        right: 15px;
    }
}

@media screen and (max-width: 768px) {
    .device-block {
        min-width: calc(50% - 20px);
    }
}
</style>
