<template>
<div class="wrapper">
    <div class="flex space-around row mt-15">
        <device-button :icon="minusIcon" />

        <device-button :icon="plusIcon" />
    </div>
    <div class="flex space-between row">
        <device-button :icon="plusIcon" />

        <device-button :icon="shutDownIcon" />

        <device-button :icon="plusIcon" />

    </div>
    <div class="flex space-around row">
        <device-button :icon="plusIcon" />

        <device-button :icon="plusIcon" />
    </div>
</div>
</template>

<script>
import DeviceButton from './DeviceButton';
import plusIcon from '@/assets/img/icons/plus.png';
import shutDownIcon from '@/assets/img/icons/shutdown.png';
import minusIcon from '@/assets/img/icons/minus.png'

export default {
    data() {
        return {
            plusIcon: plusIcon,
            shutDownIcon: shutDownIcon,
            minusIcon: minusIcon
        }
    },
    components: {
        DeviceButton
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    max-width: 500px;
    margin: auto;

    .row {
        margin-bottom: 20px;
    }
}
</style>
