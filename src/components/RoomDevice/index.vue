<template>
<div class="box p-10 block-shadow device-block block" :class="(active || switchValue) && 'turn-on'" :style="{minWidth: width, display: inlineBlock ? 'inline-block' : ''}" @click="handleSelectDevice(device)" v-if="!device.isHide">
    <div class="device-icon-wrap">
        <img :src="deviceIconUrl" class="device-icon" />
    </div>
    <p class="title text-center uppercase m-0">{{ device.deviceName }}</p>
    <el-switch v-if="hasSwitch" v-model="switchValue" class="switch" @click.native.prevent="() => {}" />
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex';
import PickerColor from '@/components/PickerColor';
import TintColor, {
    changeColor
} from '@/utils/tint-color';
import i18n from '@/lang';

var mqtt = require('mqtt');
import {
    mqttBroker
} from '@/api/endpoint';
import {
    mqttAuthentication
} from '../../../secret'

export default {
    props: {
        handleDelete: Function,
        handleEditDevice: Function,
        device: Object,
        breakPoint: Boolean,
        width: {
            type: String,
            default: '180px'
        },
        hasSwitch: {
            type: Boolean,
            default: false
        },
        active: Boolean,
        inlineBlock: Boolean,
        handleSelectDevice: Function
    },
    data() {
        return {
            switchValue: false,
            slideValue: 50,
            deviceIconUrl: ''
        }
    },
    mounted() {
        if (this.device) {
            this.deviceIconUrl = this.device.deviceIconUrl;
            const tintImage = new TintColor(this.deviceIconUrl, this.switchValue ? '' : '#ffffff')
            tintImage.run().then(newImage => {
                this.deviceIconUrl = newImage.url;
            });
        }
    },
    watch: {
        switchValue: function (val, oldval) {
            this.changeSwitch(val)
        },
        slideValue: function (val, oldVal) {
            this.changeSwitch(val)
        }
    },
    methods: {
        changeSwitch(val) {
            const user = this.$store.state.user;

            var client = mqtt.connect(`ws://${mqttBroker.host}:${mqttBroker.port}/ws`, {
                username: mqttAuthentication.username,
                password: mqttAuthentication.password
            });

            client.subscribe(mqttBroker.subcribeTopic(user.userInfo.id), function (err) {
                if (!err) {}
            })

            const data = {
                token: user.token,
                userCommand: "desired",
                payload: [{
                    state: val ? 0 : 1,
                    deviceCommand: "desired",
                    deviceId: this.device.deviceId
                }]
            }

            client.publish(mqttBroker.publishTopic(user.userInfo.id), data)

            const response = {
                state: val ? 0 : 1,
                deviceCommand: "reported",
                deviceId: this.device.deviceId
            }

            client.on('message', function (topic, message) {
                client.end()
            })
        },
        handleClick() {
            this.handleSelectDevice(this.device);
        },
        getImage() {
            getImage();
        }
    }
}
</script>

<style lang="scss" scoped>
.room-icon {
    width: 80px;
}

.device-icon-wrap {
    width: 100%;
    display: flex;
    margin-top: 25px;
}

.device-icon {
    width: 45px;
    height: 45px;
    margin: auto;
    object-fit: contain;
}

.device-block {
    position: relative;
    margin: 0px 3px 10px 3px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    max-width: 200px;

    .title {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin-top: 10px;
        font-size: 14px;
    }

    .switch {
        position: absolute;
        top: 8px;
        right: 8px;
    }
}
</style>
