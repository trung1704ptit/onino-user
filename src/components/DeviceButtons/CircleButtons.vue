<template>
<div class="wrapper">
    <div class="flex space-around row mt-15">
        <device-button
            :icon="minusIcon"
            title="Giảm"
        />

        <device-button :icon="plusIcon" title="Tăng" />
    </div>
    <div class="flex space-between row">
        <device-button :icon="plusIcon" title="Giảm" />

        <device-button :icon="shutDownIcon" title="Bật / Tắt" isShutdown="true" />

        <device-button :icon="plusIcon" title="Giảm" />

    </div>
    <div class="flex space-around row">
        <device-button :icon="plusIcon" title="Giảm" />

        <device-button :icon="plusIcon" title="Giảm" />
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
