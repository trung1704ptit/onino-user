<template>
<el-dialog :title="$t('room.addDevice')" :visible.sync="isOpenPopup">
    <div v-for="(icon, index) in deviceIcons" :key="index" class="device-icon" :class="iconChecked === icon && 'active'" @click="handleClick(icon)">
        <img :src="icon" alt="device icon" />
    </div>
    <div style="text-align:right;">
        <el-button type="primary" @click="handleSave">
            <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ $t('root.save') }}
        </el-button>
    </div>
</el-dialog>
</template>

<script>
export default {
    props: {
        isOpenPopup: {
            type: Boolean,
            default: false
        },
        handleClose: Function,
        selectIcon: Function
    },

    data() {
        return {
            deviceIcons: [],
            iconChecked: ''
        }
    },
    mounted() {
        const deviceIcons = this.$store.state.public.deviceIcons;

        if (deviceIcons && deviceIcons.length > 0) {
            this.deviceIcons = deviceIcons;
        } else {
            this.$store.dispatch('public/getDeviceIcons').then(response => {
                this.deviceIcons = response;
            })
        }
    },
    methods: {
        handleClick: function (val) {
            this.iconChecked = '';
            this.selectIcon(val)
        },
        handleSave: function () {
            this.handleClose();
            this.iconChecked = '';
        }
    }
}
</script>

<style lang="scss" scoped>
.device-icon {
    padding: 10px 15px;
    border: 2px solid transparent;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
    position: relative;
    margin: 5px 5px 0 0;

    &.active,
    &:hover {
        border: 2px solid var(--main-color);
        background: #f1f1f1;
    }

    &.active {
        &:after {
            position: absolute;
            top: 3px;
            right: 3px;
            content: "\f058";
            font-family: FontAwesome;
            color: greenyellow;
        }
    }

    img {
        width: 50px;
        height: 50px;
    }
}
</style>
