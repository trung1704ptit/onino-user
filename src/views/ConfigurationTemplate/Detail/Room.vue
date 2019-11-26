<template>
<div class="device-block block">
    <h3 class="text uppercase">{{ room.name }}</h3>
    <device v-for="device in room.devices" :key="device.id" :device="device" :handleSetting="handleClick" />
</div>
</template>

<script>
import Device from './Device';

export default {
    props: {
        room: Object,
        handleSetting: Function
    },
    components: {
        Device
    },
    methods: {
        handleClick(device) {
            this.handleSetting(device)
        }
    }
}
</script>
