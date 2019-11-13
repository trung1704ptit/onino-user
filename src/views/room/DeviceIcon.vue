<template>
<div class="box room-block block-shadow" :class="groupIconUrl == icon ? 'active' : ''" @click="handleSelect(icon)">
    <img :src="icon" class="preview-icon" />
</div>
</template>

<script>
import TintColor from '@/utils/tint-color';

export default {
    props: {
        icon: String,
        handleSelect: Function,
        groupIconUrl: String
    },
    mounted() {
        // https://image.flaticon.com/icons/png/512/402/402342.png
        new TintColor(this.icon, this.groupIconUrl == this.icon ? '#0588cb' : '#ffffff').run().then(newImage => {
            this.icon = newImage.url;
        })
    }
}
</script>

<style lang="scss" scoped>
@import './edit-style.scss';
</style>
