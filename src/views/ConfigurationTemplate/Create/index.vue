<template>
<section class="p-15">
    <h2 class="text">{{ $t('configuration.addConfiguration') }}</h2>
    <el-row :gutter="15">
        <el-col :xs="24" :sm="6">
            <el-form ref="form" :model="form" :rules="roomRules" autocomplete="off" class="form-wrapper app-form block-shadow" label-position="left">
                <el-form-item prop="configurationName" class="el-form-item">
                    <span class="svg-container">
                        <i class="fa fa-keyboard-o" aria-hidden="true"></i>
                    </span>
                    <el-input ref="configurationName" v-model="form.configurationName" :placeholder="$t('configuration.configurationName')" name="configurationName" type="text" tabindex="1" />
                </el-form-item>
                <el-button :loading="creating" type="primary" @click.native.prevent="handleCreateRoom">
                    <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ $t('root.save') }}
                </el-button>
                <el-button v-if="!addDevice" type="primary" @click="addDevice = !addDevice">
                    <i class="fa fa-plus-square" aria-hidden="true"></i> {{ $t('room.addDevice') }}
                </el-button>
                <el-button v-if="addDevice" @click="addDevice = !addDevice">
                    <i class="el-icon-circle-close" aria-hidden="true"></i> {{ $t('root.cancel') }}
                </el-button>
            </el-form>
        </el-col>
        <el-col :xs="24" :sm="18">
            <div v-if="addDevice" class="p-15 box block-shadow form-wrapper app-form">
                <el-input ref="configurationName" v-model="search" :placeholder="$t('configuration.configurationName')" name="configurationName" type="text" />
            </div>
        </el-col>
    </el-row>
</section>
</template>

<script>
import PickerColor from '@/components/PickerColor';
import TintColor from '@/utils/tint-color';
import {
    isEmpty,
    validateEmpty
} from '@/utils/validate'
import i18n from '@/lang'

import {
    mapGetters
} from 'vuex'

export default {
    data() {
        return {
            form: {
                configurationName: ''
            },
            roomRules: {
                configurationName: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateEmpty
                }]
            },
            creating: false,
            addDevice: false,
            search: ''
        }
    },
    computed: {},
    components: {
        PickerColor
    },
    methods: {
        handleCreateRoom() {
            this.$refs.form.validate(valid => {
                if (valid) {

                } else {
                    return false;
                }
            })
        }
    },
}
</script>

<style>
</style>
