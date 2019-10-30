<template>
<section class="box section box-shadow m-15 p-15">
    <el-row :gutter="10">
        <el-col :xs="24" :sm="4">
            <h4 class="mt-0">{{ $t('room.iconColor') }}</h4>
            <picker-color :colors="iconColor" :updateColor="updateColor" />

            <h4>{{ $t('room.bgColor') }}</h4>
            <picker-color :colors="bgColor" :updateColor="updateBackground" />
        </el-col>
        <el-col :xs="24" :sm="18">
            <h4 class="mt-0">{{ $t('root.preview') }}</h4>
            <div class="room-list">
                <div v-for="(icon, index) in groupIcons" :key="index" :style="{'color': iconColor.hex, 'background': bgColor.hex, 'text-align': 'center'}" class="room-block">
                    <img :src="icon" class="preview-icon" />
                </div>
            </div>
        </el-col>
    </el-row>
</section>
</template>

<script>
import PickerColor from '@/components/PickerColor';
import TintColor from '@/utils/tint-color';
import {
    mapGetters
} from 'vuex'

export default {
    data() {
        return {
            iconColor: {
                hex: '#B13227'
            },
            bgColor: {
                hex: '#4CD7A9'
            },
            roomIcon: 'https://res.cloudinary.com/drcrre4xg/image/upload/c_scale,w_200/v1515227140/star-yellow_hjfybq.png',
            groupIcons: []
        }
    },

    computed: {
        ...mapGetters([
            'room'
        ])
    },
    created() {
        this.groupIcons = this.room.groupIcons;
    },
    mounted() {
        if (this.room.groupIcons.length == 0) {
            this.$store.dispatch('room/getGroupIcons').then(response => {
                this.groupIcons = response;
            })
        }
        new TintColor(this.roomIcon, this.iconColor.hex).run().then(newImage => {
            this.roomIcon = newImage.url;
        })
    },
    watch: {
        iconColor: function (val, oldval) {
            if (oldval !== val) {
                new TintColor(this.roomIcon, this.iconColor.hex).run().then(newImage => {
                    this.roomIcon = newImage.url;
                })
            }
        }
    },
    components: {
        PickerColor
    },
    methods: {
        onOk() {
            console.log('ok')
        },
        onCancel() {
            console.log('cancel')
        },
        updateColor(value) {
            this.iconColor = value
        },
        updateBackground(value) {
            this.bgColor = value;
        }
    },
}
</script>

<style lang="scss" scoped>
.room-block {
    border: 2px solid transparent;
    padding: 15px 30px;
    margin-right: 10px;
    border-radius: 4px;
    display:inline-block;

    &:hover {
        border: 2px solid var(--main-color)
    }
}

.preview-icon {
    width: 50px;
}
</style>
