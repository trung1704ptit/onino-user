<template>
<div class="box p-15">
    <div class="p-15"><group-device-slide /></div>
    <circle-buttons />
</div>
</template>

<script>
import CircleButtons from '@/components/DeviceButtons/CircleButtons';
import GroupDeviceSlide from './GroupDeviceSlide';

export default {
    components: {
        CircleButtons,
        GroupDeviceSlide
    }
}
</script>
