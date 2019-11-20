<template>
<div class="box p-15 mr-15 block-shadow device-block block" :class="(active || switchValue) && 'turn-on'" :style="{minWidth: width, display: inlineBlock ? 'inline-block' : ''}" @click="handleClick" v-if="!device.isHide">
    <div class="device-icon-wrap">
        <img :src="deviceIconUrl" class="device-icon" />
    </div>
    <h5 class="title text-center">{{ device.deviceName }}</h5>
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
import Switch3State from '@/components/Switch3State';
import {
    isEmpty
} from '@/utils/validate'

var mqtt = require('mqtt');
import {
    mqttBroker
} from '@/api/endpoint';
import {
    mqttAuthentication
} from '../../../secret'

export default {
    components: {
        Switch3State
    },
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
        inlineBlock: Boolean
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
        handleClick() {},
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
    margin-top: 10px;
}

.device-icon {
    width: 60px;
    height: 60px;
    margin: auto;
    object-fit: contain;

    @media only screen and (max-width: 768px) {
        width: 50px;
        height: 50px;
    }
}

.device-block {
    position: relative;
    margin: 0px 5px 10px 0;
    cursor: pointer;
    transition: all 0.5s ease-in-out;

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
        top: 8px;
        right: 8px;
    }
}

@media screen and (max-width: 768px) {
    .device-block {
        min-width: calc(50% - 20px);
    }
}
</style>
