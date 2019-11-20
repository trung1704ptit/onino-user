<template>
<div class="button-wrapper">
    <div class="circle" :style="{ width: size + 'px', height: size + 'px' }">
        <img :src="icon" />
    </div>
    <div class="text">Tăng</div>
</div>
</template>

<script>
export default {
    props: {
        icon: String,
        size: {
            type: String,
            default: '70'
        }
    }
}
</script>

<style lang="scss" scoped>
.button-wrapper {
    text-align: center;
    margin: 15px;

    .circle {
        border: 1px solid #fff;
        border-radius: 50%;
        padding: 12px;
        cursor: pointer;

        img {
            width: 100%;
        }
    }

    .text {
        margin-top: 10px;
        color: #fff;
    }

    &:hover,
    &.active {
        color: var(--main-color);

        .circle {
            border: 1px solid var(--main-color);
        }
    }
}
</style>
