<template>
<div class="text-center">
    <fragment v-if="groupDevices && groupDevices.length < 6">
        <room-device
            v-for="device in groupDevices"
            :key="device.deviceId"
            :device="device"
            width="120px"
            :hasSwitch="true"
            inlineBlock
            :handleSelectDevice="handleClick"
            :active="deviceSelected.deviceId === device.deviceId"
        />
    </fragment>
    
    <carousel v-if="groupDevices && groupDevices.length > 6" :perPage="8" :perPageCustom="[[480, 2], [768, 4], [992, 6], [1920, 8]]" :scrollPerPage="false" :paginationEnabled="false" navigationEnabled navigationNextLabel='<i class="el-icon-arrow-right" />' navigationPrevLabel='<i class="el-icon-arrow-left" />'>
        <slide class="slide" v-for="device in groupDevices" :key="device.deviceId">
            <room-device
                :device="device"
                :width="'100%'"
                :hasSwitch="true"
                :handleSelectDevice="handleClick"
                :active="deviceSelected.deviceId === device.deviceId"
            />
        </slide>
    </carousel>
</div>
</template>

<script>
import Vue from 'vue';
import VueCarousel, {
    Carousel,
    Slide
} from 'vue-carousel';
import RoomDevice from '@/components/RoomDevice';
import { Fragment } from 'vue-fragment';

Vue.use(VueCarousel);

export default {
    data() {
        return {
            deviceSelected: false
        }
    },
    props: {
        groupDevices: Array
    },
    components: {
        Carousel,
        RoomDevice,
        Fragment
    },
    methods: {
        handleClick(device) {
            this.deviceSelected = device;
        }
    }
}
</script>

<style lang="scss" scoped>
.slide {
    padding: 5px;
}
.device {
    display: grid;
    cursor: pointer;

    img {
        width: 60px;
        height: 60px;
        object-fit: contain;
        margin: auto;
    }
}
</style>
