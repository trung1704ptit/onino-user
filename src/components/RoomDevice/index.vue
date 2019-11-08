<template>
<router-link :to="'/room/thiet-bi/' + device.deviceId">
    <div class="box p-15 mr-15 box-shadow device-block" v-bind:class="switchValue && 'turn-on'">
        <div class="device-icon-wrap"><img :src="device.deviceIconUrl" class="device-icon" /></div>
        <h5 class="title white-text text-center">{{ device.deviceName }}</h5>
        <el-switch v-if="device.deviceType === 'switch'" v-model="switchValue" class="switch" @click.native.prevent="() => {}" />
        <el-slider v-if="device.deviceType === 'fullColorBub'" v-model="slideValue" @click.native.prevent="() => {}" />
        <switch-3-state v-if="device.deviceType === '3StateSwitch'" />
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
        device: Object
    },
    data() {
        return {
            switchValue: false,
            slideValue: 50
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
        }
    }
}
</script>

<style lang="scss" scoped>
.turn-on {
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(144, 236, 210, 1) 0%, rgba(241, 244, 178, 1) 88%);

    .title {
        color: var(--main-color)
    }
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
    border: 1px solid var(--main-color);

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
