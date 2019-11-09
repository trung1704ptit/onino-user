<template>
<section class="p-15">
    <el-row :gutter="10">
        <el-col :xs="24" :sm="18">
            <h4 class="text">{{ $t('room.groupIcon') }}</h4>

            <div class="room-list">
                <div v-for="(icon, index) in groupIcons" :key="index" class="room-block" :class="groupIconUrl == icon ? 'active' : ''" @click="handleSelect(icon)">
                    <img :src="icon" class="preview-icon" />
                </div>
            </div>

            <el-form ref="roomForm" :model="roomForm" :rules="roomRules" autocomplete="off" class="app-form form-wrapper box box-shadow section" label-position="left">
                <el-form-item prop="roomName" class="el-form-item">
                    <span class="svg-container">
                        <i class="fa fa-keyboard-o" aria-hidden="true"></i>
                    </span>
                    <el-input ref="roomName" v-model="roomForm.roomName" :placeholder="$t('room.roomName')" name="roomName" type="text" tabindex="1" />
                </el-form-item>
                <el-button :loading="creating" type="primary" @click.native.prevent="handleCreateRoom">
                    <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ $t('root.save') }}
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
    isEmpty, validateEmpty
} from '@/utils/validate'
import i18n from '@/lang'

import {
    mapGetters
} from 'vuex'

export default {
    data() {
        return {
            groupIcons: [],
            groupIconUrl: 'https://s3.ap-southeast-1.amazonaws.com/stg.onino.icons/group/defaultRoom.png',
            roomForm: {
                roomName: ''
            },
            roomRules: {
                roomName: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateEmpty
                }]
            },
            creating: false
        }
    },

    computed: {
        ...mapGetters([
            'room'
        ]),
        bgColor:{
            get: function (){
                return this.bgColor1.hex + ',' + this.bgColor2.hex
            },
            set: function () {}
        }
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
        new TintColor(this.groupIconUrl, '#fff').run().then(newImage => {
            this.groupIconUrl = newImage.url;
        })
    },
    components: {
        PickerColor
    },
    methods: {
        handleSelect(item) {
            this.groupIconUrl = item
        },
        handleCreateRoom() {
            this.$refs.roomForm.validate(valid => {
                if (valid) {
                    this.creating = true
                    const data = {
                        groupBackGroundUrl: '#304156,#304156',
                        groupColor: '#fff',
                        groupIconUrl: this.groupIconUrl,
                        groupName: this.roomForm.roomName
                    }
                    this.$store.dispatch('room/createRoom', data).then(() => {
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
