<template>
<div class="box p-15 mr-15 block-shadow device-block block" @click="handleClick">
    <div class="device-icon-wrap"><img :src="device.deviceIconUrl" class="device-icon" /></div>
    <p class="title text-center">{{ device.deviceName }}</p>
    <i class="fa fa-sliders icon" aria-hidden="true"></i>
</div>
</template>

<script>
export default {
    props: {
        device: Object,
        handleSetting: Function
    },
    methods: {
        handleClick() {
            this.handleSetting(this.device)
        }
    }
}
</script>

<style lang="scss" scoped>
.device-icon-wrap {
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
    cursor: pointer;
    width: 150px;
    margin: 15px 15px 15px 0;

    @media only screen and (max-width: 480px) {
        min-width: 100%
    }

    &:hover {
        color: var(--main-color);
    }

    .title {
        margin-bottom: 0;
    }
}
.icon {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
