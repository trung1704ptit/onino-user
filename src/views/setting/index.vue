<template>
<div>
    <div class="box block-shadow p-15 m-15">
        <h2 class="text">{{ $t('root.language')}}</h2>
        <el-radio-group v-model="lang">
            <el-radio label="vi" border>
                Tiếng Việt
            </el-radio>
            <el-radio label="en" border>
                English
            </el-radio>
        </el-radio-group>
    </div>

    <div class="box block-shadow p-15 m-15">
        <h2 class="text">{{ $t('notification.notification')}}</h2>
        <p class="white-text">Bật tất cả thông báo</p>
    </div>

    <div class="box block-shadow p-15 m-15">
        <h2 class="text">{{ $t('root.authentication')}}</h2>
        <p class="white-text">Đã chia sẻ cho 2 người</p>
    </div>

    <div class="box block-shadow p-15 m-15">
        <h2 class="text">{{ $t('root.systemInformation')}}</h2>
        <p class="white-text">Phiên bản: 1.0.0</p>
    </div>
</div>
</template>

<script>
import i18n from '@/lang'

export default {
    computed: {
        lang: {
            get() {
                return this.$store.state.app.language
            },
            set(lang) {
                this.$i18n.locale = lang
                this.$store.dispatch('app/setLanguage', lang)
            }
        }
    },
    watch: {
        lang() {
            this.$message({
                message: i18n.t('lang.switchLanguageSuccess'),
                type: 'success'
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.el-radio {
    color: #fff;
}

.el-radio.is-bordered.is-checked {
    box-shadow: 0 3px 6px rgba(5, 136, 203, .6);
}
</style>
