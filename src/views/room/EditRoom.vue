<template>
<section class="section m-15 p-15">
    <el-row :gutter="10">
        <el-col :xs="24" :sm="18">
            <h4 class="text">{{ $t('room.groupIcon') }}</h4>

            <div class="room-list">
                <div v-for="(icon, index) in groupIcons" :key="index" class="room-block" :class="groupIconUrl == icon ? 'active' : ''" @click="handleSelect(icon)">
                    <img :src="icon" class="preview-icon" />
                </div>
            </div>

            <el-form ref="roomDetail" :model="roomDetail" :rules="roomRules" autocomplete="off" class="app-form form-wrapper box" label-position="left">
                <el-form-item prop="name" class="el-form-item">
                    <span class="svg-container">
                        <i class="fa fa-home" aria-hidden="true"></i>
                    </span>
                    <el-input ref="name" v-model="roomDetail.name" :placeholder="$t('room.roomName')" name="name" type="text" tabindex="1" />
                </el-form-item>
                <el-button :loading="creating" type="primary" @click.native.prevent="handleCreateRoom">
                    <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ $t('root.save') }}
                </el-button>
                <el-button :loading="creating" type="primary" @click.native.prevent="handleViewDetail(roomDetail.id)">
                    <i class="el-icon-info" /> {{ $t('room.roomDetail') }}
                </el-button>
            </el-form>
        </el-col>
    </el-row>
</section>
</template>

<script>
import PickerColor from '@/components/PickerColor';
import TintColor from '@/utils/tint-color';
import {
    isEmpty
} from '@/utils/validate'
import i18n from '@/lang'

import {
    mapGetters
} from 'vuex'

export default {
    data() {
        const validateName = (rule, value, callback) => {
            if (isEmpty(value)) {
                callback(new Error(i18n.t('root.emptyString')))
            } else {
                callback()
            }
        }
        return {
            groupIcons: [],
            groupIconUrl: '',
            roomDetail: {
                name: ''
            },
            roomRules: {
                name: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateName
                }]
            },
            creating: false
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
        new TintColor(this.groupIconUrl, this.roomDetail.groupColor).run().then(newImage => {
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
                this.groupIconUrl = roomDetail.groupIconUrl;
            }
        } else {
            this.$store.dispatch('room/getAllRoom').then(response => {
                const roomDetail = response.filter(item => item.id === roomId)[0];

                if (roomDetail) {
                    this.roomDetail = roomDetail;
                    this.groupIconUrl = roomDetail.groupIconUrl;
                }
            })
        }
    },
    components: {
        PickerColor
    },
    methods: {
        handleSelect(item) {
            this.groupIconUrl = item
        },
        handleCreateRoom() {
            this.$refs.roomDetail.validate(valid => {
                if (valid) {
                    this.creating = true
                    const data = {
                        groupBackGroundUrl: this.roomDetail.groupBackGroundUrl,
                        groupColor: this.roomDetail.groupColor,
                        groupIconUrl: this.groupIconUrl,
                        groupName: this.roomDetail.name,
                        id: this.roomDetail.id
                    }
                    this.$store.dispatch('room/updateRoom', data).then(() => {
                        this.$message({
                            message: i18n.t('room.createRoomSuccess'),
                            type: 'success',
                            showClose: true,
                            duration: 4000
                        });
                        if (this.room.roomListLoaded) {
                            this.$store.dispatch('room/getAllRoom');
                        }
                        this.creating = false;
                    })
                } else {
                    return false;
                }
            })
        },
        handleViewDetail(id) {
            this.$router.push(`/room/chi-tiet/${id}`)
        }
    },
}
</script>

<style>
.vc-chrome {
    width: 100% !important;
}
</style>

<style lang="scss" scoped>
@import './edit-style.scss';
</style>
