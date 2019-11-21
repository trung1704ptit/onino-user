<template>
<div class="box p-15">
    <group-devices :groupDevices="groupDevices" />
    <circle-buttons />
</div>
</template>

<script>
import CircleButtons from '@/components/DeviceButtons/CircleButtons';
import GroupDevices from './GroupDevices';

export default {
    props: {
        groupDevices: Array
    },
    components: {
        CircleButtons,
        GroupDevices
    }
}
</script>
