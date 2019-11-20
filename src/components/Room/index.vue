<template>
<router-link :to="base + 'chi-tiet/' + room.id" class="mt-15">
    <div :class="room.class">
        <img :src="room.groupIconUrl" class="room-icon" :style="{'color': room.groupColor}" />
        <div class="title mb-15 uppercase">
            <span>{{ room.name }}</span>
        </div>
        <div class="flex space-between infor-bottom">
            <span><i class="fa fa-thermometer-half" aria-hidden="true"></i> {{ room.temperature }}°C</span>
            <span><i class="fa fa-tint" aria-hidden="true"></i> {{ room.humidity }}%</span>
        </div>
        <div class="actions">
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
    mounted() {
        if (this.room) {
            new TintColor(this.room.groupIconUrl, '#ffffff').run().then(newImage => {
                this.room.groupIconUrl = newImage.url;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
