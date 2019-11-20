<template>
<carousel :per-page="7" :scrollPerPage="true" :paginationEnabled="false" navigationEnabled navigationNextLabel='<i class="el-icon-arrow-right" />' navigationPrevLabel='<i class="el-icon-arrow-left" />'>
    <slide class="slide">
        <room-device :device="device" :width="'100%'" :hasSwitch="true"/>
    </slide>
    <slide class="slide">
        <room-device :device="device" :width="'100%'" :hasSwitch="true" />
    </slide>
    <slide class="slide">
        <room-device :device="device" :width="'100%'" :hasSwitch="true" />
    </slide>
    <slide class="slide">
        <room-device :device="device" :width="'100%'" :hasSwitch="true" />
    </slide>
    <slide class="slide">
        <room-device :device="device" :width="'100%'" :hasSwitch="true" />
    </slide>
    <slide class="slide">
        <room-device :device="device" :width="'100%'" :hasSwitch="true" />
    </slide>
    <slide class="slide">
        <room-device :device="device" :width="'100%'" :hasSwitch="true" :inlineBlock="true"/>
    </slide>
    <slide class="slide">
        <room-device :device="device" :width="'100%'" :hasSwitch="true" :inlineBlock="true"/>
    </slide>
    <slide class="slide">
        <room-device :device="device" :width="'100%'" :hasSwitch="true" :inlineBlock="true"/>
    </slide>
</carousel>
</template>

<script>
import Vue from 'vue';
import VueCarousel, {
    Carousel,
    Slide
} from 'vue-carousel';
import RoomDevice from '@/components/RoomDevice';

Vue.use(VueCarousel);

export default {
    data() {
        return {
            device: {
                deviceIconUrl: 'https://s3.ap-southeast-1.amazonaws.com/stg.onino.icons/device/lighting_light-outside-002.png',
                assignedGroup: "5dc63327428cfd00010123a2",
                deviceId: "5dc6345f428cfd00010123a4",
                deviceName: "cong tac-0",
                deviceType: "sensor",
                indexInThing: 0,
                ownerId: "5daebf23428cfd00010122f5",
                thingId: "5dbfed0c4d14ca0001776388",
            }
        }
    },
    components: {
        Carousel,
        RoomDevice
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
