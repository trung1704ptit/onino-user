<template>
<router-link :to="base + 'chi-tiet/' + room.id" :style="{'background-image': 'linear-gradient(' + room.groupBackGroundUrl + ')'}">
    <div :class="room.class">
        <img :src="room.groupIconUrl" class="room-icon" :style="{'color': room.groupColor}" />
        <div class="title mb-15 dark-text">
            <span>{{ room.name }}</span>
        </div>
        <div class="flex space-between dark-text">
            <span><i class="fa fa-thermometer-half" aria-hidden="true"></i> {{ room.temperature }}°C</span>
            <span><i class="fa fa-tint" aria-hidden="true"></i> {{ room.humidity }}%</span>
        </div>
        <div class="actions dark-text">
            <i class="fa fa-trash-o" aria-hidden="true" :title="$t('root.delete')" @click.prevent="handleDelete(room.id)"></i>
            <router-link :to="'/room/cap-nhat/' + room.id"><i class="fa fa-pencil-square-o" aria-hidden="true" :title="$t('root.edit')"></i></router-link>
        </div>
    </div>
</router-link>
</template>

<script>
import TintColor from '@/utils/tint-color';

export default {
    props: {
        base: { type: String, default: '' },
        room: {
            type: Object,
            default: function () {
                return {}
            }
        },
        dialogConfirmDelete: {
            type: Boolean,
            default: false
        },
        handleDelete: Function
    },
    created() {
        if (this.room) {
            new TintColor(this.room.groupIconUrl, this.room.groupColor).run().then(newImage => {
                this.room.groupIconUrl = newImage.url;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
