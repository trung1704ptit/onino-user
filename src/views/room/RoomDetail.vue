<template>
<section class="box section box-shadow m-15 p-15">
    <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
            <div class="align-center">
                <img :src="roomDetail.groupIconUrl" class="room-icon" />
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
                <span><i class="fa fa-thermometer-half" aria-hidden="true"></i> {{ roomDetail.temperature }}°C</span>
                <span><i class="fa fa-tint" aria-hidden="true"></i> {{ roomDetail.humidity }}%</span>
                <span><i class="fa fa-bolt" aria-hidden="true"></i> 269W</span>
                <span><i class="fa fa-lightbulb-o" aria-hidden="true"></i> 100ml</span>
            </div>

            <div class="button-list">
                <el-button type="primary" @click="handleEditRoom(roomDetail.id)">
                    <i class="el-icon-edit" /> {{ $t('root.edit') }}
                </el-button>
                <el-button type="danger" @click="confirmDelete(roomDetail.id)" :loading="deleting">
                    <i class="el-icon-delete" /> {{ $t('root.delete') }}
                </el-button>
            </div>

            <el-dialog :title="$t('room.confirmDelete')" :visible.sync="dialogConfirmDelete">
                <div>{{ $t('room.confirmDeleteMessage') }}</div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogConfirmDelete = false">
                        {{ $t('root.cancel') }}
                    </el-button>
                    <el-button :loading="deleting" type="primary" @click="handleDelete">
                        {{ $t('root.confirm') }}
                    </el-button>
                </div>
            </el-dialog>
        </el-col>
    </el-row>
</section>
</template>

<script>
import {
    mapGetters
} from 'vuex';
import PickerColor from '@/components/PickerColor';
import TintColor from '@/utils/tint-color';
import i18n from '@/lang'

export default {
    data() {
        return {
            dialogConfirmDelete: false,
            roomToDelete: '',
            deleting: false,
            roomDetail: {},
            groupColor: {
                hex: '#435sd3'
            }
        }
    },

    computed: {
        ...mapGetters([
            'room'
        ])
    },

    mounted() {
        const roomList = this.$store.state.room.roomList;
        const roomId = this.$route.params.id;

        if (roomList && roomList.length > 0) {
            const roomDetail = roomList.filter(item => item.id === roomId)[0];

            if (roomDetail) {
                this.roomDetail = roomDetail;
                new TintColor(roomDetail.groupIconUrl, roomDetail.groupColor).run().then(newImage => {
                    this.roomDetail.groupIconUrl = newImage.url;
                })
            } else {
                this.$router.push('/room/tat-ca')
            }
        } else {
            this.$store.dispatch('room/getAllRoom').then(response => {
                const roomDetail = response.filter(item => item.id === roomId)[0];

                if (roomDetail) {
                    this.roomDetail = roomDetail;
                    new TintColor(roomDetail.groupIconUrl, roomDetail.groupColor).run().then(newImage => {
                        this.roomDetail.groupIconUrl = newImage.url;
                    })
                } else {
                    this.$router.push('/room/tat-ca')
                }
            })
        }
    },
    methods: {
        handleEditRoom(id) {
            this.$router.push(`/room/cap-nhat/${id}`)
        },
        confirmDelete(groupId) {
            console.log(groupId);
            this.roomToDelete = groupId;
            this.dialogConfirmDelete = true;
        },
        handleDelete() {
            this.deleting = true;
            this.$store.dispatch('room/deleteRoom', this.roomToDelete).then(response => {
                this.$message({
                    message: i18n.t('room.deleteRoomSuccess'),
                    type: 'success',
                    showClose: true,
                    duration: 4000
                });
                this.dialogConfirmDelete = false;
                this.deleting = false;
                this.$router.push('/room/tat-ca')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.button-list {
    margin-top: 50px;
}
</style>
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
