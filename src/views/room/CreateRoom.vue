<template>
<section class="box section box-shadow m-15 p-15">
    <el-row :gutter="10">
        <el-col :xs="24" :sm="4">
            <h4 class="mt-0">{{ $t('room.groupColor') }}</h4>
            <picker-color :colors="groupColor" :updateColor="updateColor" />

            <h4>{{ $t('room.bgColor') }}</h4>
            <picker-color :colors="bgColor" :updateColor="updateBackground" />
        </el-col>
        <el-col :xs="24" :sm="18">
            <h4 class="mt-0">{{ $t('root.preview') }}</h4>

            <div class="room-list">
                <div v-for="(icon, index) in groupIcons" :key="index" :style="{'color': groupColor.hex, 'background': bgColor.hex, 'text-align': 'center'}" class="room-block" :class="groupIconUrl == icon ? 'active' : ''" @click="handleSelect(icon)">
                    <img :src="icon" class="preview-icon" />
                </div>
            </div>

            <el-form ref="roomForm" :model="roomForm" :rules="roomRules" autocomplete="off" class="form-wrapper" label-position="left">
                <el-form-item prop="roomName" class="el-form-item">
                    <span class="svg-container">
                        <i class="fa fa-home" aria-hidden="true"></i>
                    </span>
                    <el-input ref="roomName" v-model="roomForm.roomName" :placeholder="$t('room.roomName')" name="roomName" type="text" tabindex="1" />
                </el-form-item>
                <el-button :loading="creating" type="primary" @click.native.prevent="handleCreateRoom">
                    {{ $t('root.save') }}
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
        const validateRoomName = (rule, value, callback) => {
            if (isEmpty(value)) {
                callback(new Error(i18n.t('root.emptyString')))
            } else {
                callback()
            }
        }
        return {
            groupColor: {
                hex: '#B13227'
            },
            bgColor: {
                hex: '#4CD7A9'
            },
            groupIcons: [],
            groupIconUrl: 'https://s3.ap-southeast-1.amazonaws.com/stg.onino.icons/group/defaultRoom.png',
            roomForm: {
                roomName: ''
            },
            roomRules: {
                roomName: [{ required: true, trigger: 'blur', validator: validateRoomName }]
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
        if (this.room.groupIcons.length == 0) {
            this.$store.dispatch('room/getGroupIcons').then(response => {
                this.groupIcons = response;
            })
        }
        new TintColor(this.groupIconUrl, this.groupColor.hex).run().then(newImage => {
            this.groupIconUrl = newImage.url;
        })
    },
    watch: {
        groupColor: function (val, oldval) {
            if (oldval !== val) {
                new TintColor(this.groupIconUrl, this.groupColor.hex).run().then(newImage => {
                    this.groupIconUrl = newImage.url;
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
            this.groupColor = value
        },
        updateBackground(value) {
            this.bgColor = value;
        },
        handleSelect(item) {
            this.groupIconUrl = item
        },
        handleCreateRoom() {
            this.$refs.roomForm.validate(valid => {
                if (valid) {
                    this.creating = true
                    const data = {
                        groupBackGroundUrl: this.bgColor.hex,
                        groupColor: this.groupColor.hex,
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

<style lang="scss" scoped>
.form-wrapper {
    padding: 50px 0;
    width: 50%;
    margin: 0;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
}

.room-block {
    border: 2px solid transparent;
    padding: 15px 30px;
    margin-right: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    display: inline-block;
    position: relative;
    cursor: pointer;

    &.active {
        &:after {
            position: absolute;
            content: "\f058";
            font-family: FontAwesome;
            top: 5px;
            right: 5px;
            color: #85F271;
        }
    }

    &:hover,
    &.active {
        border: 2px solid var(--main-color)
    }
}

.preview-icon {
    width: 50px;
}
</style>
