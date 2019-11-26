<template>
<div class="device-block block">
    <h3 class="text uppercase">{{ room.name }}</h3>
    <device v-for="device in room.devices" :key="device.id" :device="device" :updateSelectedList="updateList" />
</div>
</template>

<script>
import Device from './Device';

export default {
    props: {
        room: Object,
        updateSelectedList: Function
    },
    components: {
        Device
    },
    methods: {
        updateList(device, val) {
            const room = {
                ...this.room,
                devices: [device]
            }
            this.updateSelectedList(device, room)
        }
    }
}
</script>
