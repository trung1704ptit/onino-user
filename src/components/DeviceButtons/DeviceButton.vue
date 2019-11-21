<template>
<div class="button-wrapper" @click="handleClickButton">
    <el-button type="primary" @click="handleClickButton" class="button" :style="{ width: size + 'px', height: size + 'px' }">
        <img :src="icon" />
    </el-button>
    <div class="text">{{ title }}</div>
</div>
</template>

<script>
import TintColor from '@/utils/tint-color';

export default {
    props: {
        icon: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: '70'
        },
        title: {
            type: String,
            default: 'Tăng'
        },
        onClickButton: Function
    },
    data() {
        return {
            active: false
        }
    },
    methods: {
        handleClickButton() {
            this.active = !this.active;
            this.onClickButton();
        }
    },
    mounted() {
        new TintColor(this.icon, '#ffffff').run().then(newImage => {
            this.icon = newImage.url;
        })
    }
}
</script>

<style lang="scss" scoped>
.button-wrapper {
    text-align: center;
    margin: 15px;

    .button {
        border: 2px solid var(--main-color);
        border-radius: 50%;
        padding: 12px;
        cursor: pointer;
        background: transparent;
        background-position: center;
        transition: background 0.8s;

        img {
            width: 100%;
        }

        &:active {
            background-color: #6eb9f7;
            background-size: 100%;
            transition: background 0s;
        }
    }

    .text {
        margin-top: 10px;
        color: #fff;
    }

    &.active {
        color: var(--main-color);

        .circle {
            border: 2px solid var(--main-color);
        }
    }
}
</style>
