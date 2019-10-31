<template>
<section class="box section box-shadow m-15 p-15">
    <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
            <div class="align-center">
                <img src="@/assets/img/bed.png" class="room-icon" />
                <h4 class="section-title m-15">Phòng ngủ</h4>
            </div>
        </el-col>

        <el-col :xs="24" :sm="18">
            <div class="flex p-15 box-shadow box notify">
                <div>
                    <i class="fa fa-wifi" aria-hidden="true"></i>
                    <span class="ml-15">4 Thiết bị đã phát hiện</span>
                </div>
                <div class="message">Đã phát hiện 4 thiết bị có kết nối Bluetooth trong phòng. <router-link to="/" class="link underline">Nhấp để kết nối</router-link>
                </div>
            </div>

            <div class="flex space-between mt-15 text">
                <span><i class="fa fa-thermometer-half" aria-hidden="true"></i> 28C</span>
                <span><i class="fa fa-tint" aria-hidden="true"></i> 80%</span>
                <span><i class="fa fa-bolt" aria-hidden="true"></i> 269W</span>
                <span><i class="fa fa-lightbulb-o" aria-hidden="true"></i> 100ml</span>
            </div>

            <el-button type="primary" @click="this.$router.push(`/room/cap-nhat/${room.id}`)">
                {{ $t('root.edit') }}
            </el-button>
            <el-button type="danger">
                {{ $t('root.delete') }}
            </el-button>
        </el-col>
    </el-row>
</section>
</template>

<script>
import { mapGetters } from 'vuex';
import PickerColor from '@/components/PickerColor';

export default {
    data() {
        return {
            roomDetail: {
                name: ''
            }
        }
    },

    computed: {
        ...mapGetters([
            'room'
        ])
    },

    mounted() {
        new TintColor(this.groupIconUrl, this.groupColor.hex).run().then(newImage => {
            this.groupIconUrl = newImage.url;
        })
        const roomList = this.$store.state.room.roomList;
        const roomId = this.$route.params.id;

        if (this.room.groupIcons.length == 0) {
            this.$store.dispatch('room/getGroupIcons').then(response => {
                this.groupIcons = response;
            })
        }

        if (roomList && roomList.length > 0) {
            const roomDetail = roomList.filter(item => item.id === roomId)[0];

            if (roomDetail) {
                this.roomDetail = roomDetail;
            }
        } else {
            this.$store.dispatch('room/getAllRoom').then(response => {
                const roomDetail = response.filter(item => item.id === roomId)[0];

                if (roomDetail) {
                    this.roomDetail = roomDetail;
                }
            })
        }
    }
}
</script>

<style lang="scss">
.notify {
    color: #fff;
    background: var(--green)
}

.message {
    margin-left: 15px;
    padding-left: 15px;
    border-left: 2px solid #fff;
}

.link {
    color: #fff;
}
</style>
