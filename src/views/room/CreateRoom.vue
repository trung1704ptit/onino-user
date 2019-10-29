<template>
<section class="box section box-shadow m-15 p-15">
    <el-row :gutter="10">
        <el-col :xs="24" :sm="4">
            <h4 class="mt-0">{{ $t('room.iconColor') }}</h4>
            <picker-color :colors="iconColor" :updateColor="updateColor" />

            <h4>{{ $t('room.bgColor') }}</h4>
            <picker-color :colors="bgColor" :updateColor="updateBackground" />
        </el-col>
        <el-col :xs="24" :sm="2">
            <h4 class="mt-0">{{ $t('root.preview') }}</h4>
            <div :style="{'color': iconColor.hex, 'background': bgColor.hex, 'padding': '20px', 'text-align': 'center'}">Text</div>
        </el-col>
    </el-row>
</section>
</template>

<script>
import PickerColor from '@/components/PickerColor';

export default {
    data() {
        return {
            iconColor: { hex: '#E8F0EB' },
            bgColor: { hex: '#23ACAA' }
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
