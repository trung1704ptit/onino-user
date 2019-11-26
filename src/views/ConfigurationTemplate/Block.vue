<template>
<router-link to="/cau-hinh/chi-tiet/6567dsd2sdsed">
    <div class="card-panel box block block-shadow" :class="className">
        <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
            <div class="card-panel-toggle">
                <el-switch v-model="switchValue" class="switch" @click.native.prevent="() => {}"/>
            </div>
            <div class="actions">
                <i class="fa fa-trash-o" aria-hidden="true" :title="$t('root.delete')" @click.prevent="() => {}"></i>
                <router-link :to="'/cau-hinh/cap-nhat/'"><i class="fa fa-pencil-square-o" aria-hidden="true" :title="$t('root.edit')"></i></router-link>
            </div>
            <span class="card-panel-text text">Buổi sáng</span>
        </div>
    </div>
</router-link>
</template>

<script>
import Room from '@/components/Room'
import i18n from '@/lang'
import {
    mapGetters,
    mapstate
} from 'vuex'

import CountTo from 'vue-count-to'

export default {
    components: {
        CountTo
    },
    data() {
        return {
            switchValue: false,
            className: ''
        }
    },
    mounted() {

    },
    computed: {},
    methods: {},
    watch: {
        switchValue: function (val, oldVal) {
            this.className = val ? 'turn-on' : ''
        }
    }
}
</script>

<style lang="scss" scoped>
.actions {
    top: 30px;
    right: 85px;
}

.card-panel {
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    padding: 5px;
    margin: 15px 15px 15px 0;
    color: var(--white);
    border: 3px solid transparent;

    &.turn-on {
        color: var(--main-color);
        border: 3px solid var(--main-color);
        border-radius: 10px;
        box-shadow: 0 3px 6px rgba(5, 136, 203, .6)
    }

    .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
    }

    .card-panel-icon {
        float: left;
        font-size: 48px;
    }

    .card-panel-description {
        float: right;
        margin: 26px;
        margin-left: 0px;

        .card-panel-toggle {
            margin-bottom: 12px;
            text-align: right;
        }

        .card-panel-text {
            font-size: 14px;
        }
    }
}
</style>
